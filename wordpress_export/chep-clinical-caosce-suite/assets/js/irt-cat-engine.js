/**
 * CHEP College of Nursing Sciences - 3-Parameter Logistic (3PL) IRT Engine
 * Modeled strictly after NCSBN Next-Gen NCLEX Computerized Adaptive Testing standards
 */
window.IrtCatEngine = (function() {
    function probability3PL(theta, a, b, c) {
        var exponent = -1.7 * a * (theta - b);
        var logistic = 1.0 / (1.0 + Math.exp(exponent));
        return c + (1.0 - c) * logistic;
    }

    function fisherInformation(theta, a, b, c) {
        var P = probability3PL(theta, a, b, c);
        var Q = 1.0 - P;
        if (P <= c || P >= 1.0) return 0.001;
        var numerator = Math.pow(1.7 * a, 2) * Q * Math.pow(P - c, 2);
        var denominator = P * Math.pow(1.0 - c, 2);
        return numerator / denominator;
    }

    function estimateAbility(responses) {
        if (!responses || responses.length === 0) {
            return { theta: 0.0, sem: 1.0 };
        }
        var theta = 0.0;
        for (var iter = 0; iter < 12; iter++) {
            var score = 0.0;
            var info = 1.0; // Prior information
            for (var i = 0; i < responses.length; i++) {
                var r = responses[i];
                var P = probability3PL(theta, r.a, r.b, r.c);
                var I = fisherInformation(theta, r.a, r.b, r.c);
                info += I;
                score += (r.isCorrect ? 1.0 : 0.0) - P;
            }
            if (info <= 0) break;
            var delta = score / info;
            theta += Math.max(-0.6, Math.min(0.6, delta));
            theta = Math.max(-3.5, Math.min(3.5, theta));
            if (Math.abs(delta) < 0.01) break;
        }

        var totalInfo = 1.0;
        for (var j = 0; j < responses.length; j++) {
            totalInfo += fisherInformation(theta, responses[j].a, responses[j].b, responses[j].c);
        }
        var sem = 1.0 / Math.sqrt(totalInfo);
        return { theta: Math.round(theta * 100) / 100, sem: Math.round(sem * 100) / 100 };
    }

    function evaluateStoppingRule(theta, sem, questionCount, minQ, maxQ, passCutoff) {
        minQ = minQ || 10;
        maxQ = maxQ || 30;
        passCutoff = passCutoff || 0.0;

        var lowerBound = theta - (1.96 * sem);
        var upperBound = theta + (1.96 * sem);

        if (questionCount < minQ) {
            return { isComplete: false, decision: "IN_PROGRESS" };
        }
        if (lowerBound > passCutoff) {
            return { isComplete: true, decision: "PASS" };
        }
        if (upperBound < passCutoff) {
            return { isComplete: true, decision: "FAIL" };
        }
        if (questionCount >= maxQ) {
            return { isComplete: true, decision: theta >= passCutoff ? "PASS" : "FAIL" };
        }
        return { isComplete: false, decision: "IN_PROGRESS" };
    }

    function selectNextItem(currentTheta, pool, administeredIds) {
        var candidates = pool.filter(function(item) {
            return administeredIds.indexOf(item.id) === -1;
        });
        if (candidates.length === 0) return null;
        var bestItem = candidates[0];
        var maxInfo = -1;
        for (var i = 0; i < candidates.length; i++) {
            var info = fisherInformation(currentTheta, candidates[i].a, candidates[i].b, candidates[i].c);
            if (info > maxInfo) {
                maxInfo = info;
                bestItem = candidates[i];
            }
        }
        return bestItem;
    }

    return {
        probability3PL: probability3PL,
        fisherInformation: fisherInformation,
        estimateAbility: estimateAbility,
        evaluateStoppingRule: evaluateStoppingRule,
        selectNextItem: selectNextItem
    };
})();
