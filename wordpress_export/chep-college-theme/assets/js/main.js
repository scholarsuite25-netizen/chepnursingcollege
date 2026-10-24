/**
 * CHEP College of Nursing Sciences - Core Theme JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('chep-mobile-toggle');
  const mobileMenu = document.getElementById('chep-mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      const isHidden = mobileMenu.style.display === 'none' || mobileMenu.style.display === '';
      mobileMenu.style.display = isHidden ? 'block' : 'none';
      const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = isHidden ? 'close' : 'menu';
      }
    });
  }

  // 2. Interactive Landscape Photo Slider
  const sliderContainer = document.getElementById('chep-landscape-slider');
  if (sliderContainer) {
    const slides = sliderContainer.querySelectorAll('.chep-slider-slide');
    const dots = sliderContainer.querySelectorAll('.chep-slider-dot');
    const prevBtn = document.getElementById('chep-slider-prev');
    const nextBtn = document.getElementById('chep-slider-next');
    const counterEl = document.getElementById('chep-slider-counter');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoInterval = null;
    let isPaused = false;

    function showSlide(index) {
      if (index >= totalSlides) currentSlide = 0;
      else if (index < 0) currentSlide = totalSlides - 1;
      else currentSlide = index;

      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });

      if (counterEl) {
        counterEl.textContent = `0${currentSlide + 1} / 0${totalSlides}`;
      }
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => showSlide(idx));
    });

    // Auto Advance
    function startAutoSlide() {
      autoInterval = setInterval(() => {
        if (!isPaused) nextSlide();
      }, 6000);
    }

    sliderContainer.addEventListener('mouseenter', () => { isPaused = true; });
    sliderContainer.addEventListener('mouseleave', () => { isPaused = false; });

    startAutoSlide();
  }

  // 3. Gallery Filtering and Lightbox
  const galleryFilterBtns = document.querySelectorAll('.chep-gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.chep-gallery-card');
  const lightbox = document.getElementById('chep-gallery-lightbox');
  const lightboxImg = document.getElementById('chep-lightbox-img');
  const lightboxTitle = document.getElementById('chep-lightbox-title');
  const lightboxDesc = document.getElementById('chep-lightbox-desc');
  const lightboxBadge = document.getElementById('chep-lightbox-badge');
  const lightboxLocation = document.getElementById('chep-lightbox-location');
  const lightboxClose = document.getElementById('chep-lightbox-close');

  if (galleryFilterBtns.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        galleryFilterBtns.forEach(b => {
          b.classList.remove('bg-forest-base', 'text-white', 'shadow-md');
          b.classList.add('bg-white', 'text-gray-700');
        });
        this.classList.remove('bg-white', 'text-gray-700');
        this.classList.add('bg-forest-base', 'text-white', 'shadow-md');

        galleryCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox click handlers
  galleryCards.forEach(card => {
    card.addEventListener('click', function () {
      if (!lightbox) return;
      const img = this.querySelector('img');
      const title = this.getAttribute('data-title') || (img ? img.alt : '');
      const desc = this.getAttribute('data-desc') || '';
      const badge = this.getAttribute('data-badge') || 'Campus Exhibit';
      const loc = this.getAttribute('data-location') || 'Ota Campus';

      if (lightboxImg && img) lightboxImg.src = img.src;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxDesc) lightboxDesc.textContent = desc;
      if (lightboxBadge) lightboxBadge.textContent = badge;
      if (lightboxLocation) lightboxLocation.textContent = loc;

      lightbox.classList.add('open');
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  // 4. Verification Engine Form Handler
  const verifyForm = document.getElementById('chep-verify-form');
  const verifyResult = document.getElementById('chep-verify-result');
  const verifyNotFound = document.getElementById('chep-verify-not-found');

  if (verifyForm) {
    verifyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = document.getElementById('chep-verify-input');
      const query = input ? input.value.trim().toUpperCase() : '';
      if (!query) return;

      const submitBtn = verifyForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Verify';
      if (submitBtn) submitBtn.innerHTML = '<span class="material-symbols-outlined text-[16px] animate-spin">sync</span> Verifying...';

      // Check if WordPress AJAX URL exists
      const ajaxUrl = (window.chep_ajax_object && window.chep_ajax_object.ajax_url) ? window.chep_ajax_object.ajax_url : null;

      if (ajaxUrl) {
        const formData = new FormData();
        formData.append('action', 'chep_verify_student');
        formData.append('query', query);

        fetch(ajaxUrl, {
          method: 'POST',
          body: formData
        })
          .then(res => res.json())
          .then(data => {
            if (submitBtn) submitBtn.innerHTML = originalText;
            if (data.success && data.data) {
              renderVerifiedRecord(data.data);
            } else {
              renderNotFound();
            }
          })
          .catch(() => {
            if (submitBtn) submitBtn.innerHTML = originalText;
            // Fallback to local verified registry check
            checkLocalVerification(query);
          });
      } else {
        // Fallback for standalone demo
        setTimeout(() => {
          if (submitBtn) submitBtn.innerHTML = originalText;
          checkLocalVerification(query);
        }, 500);
      }
    });
  }

  function renderVerifiedRecord(rec) {
    if (verifyNotFound) verifyNotFound.style.display = 'none';
    if (!verifyResult) return;

    verifyResult.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-emerald-500 relative overflow-hidden">
        <div class="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <div class="flex items-center gap-3">
            <span class="w-12 h-12 rounded-full bg-emerald-light text-emerald-accent flex items-center justify-center">
              <span class="material-symbols-outlined text-[28px]">verified</span>
            </span>
            <div>
              <span class="text-xs uppercase tracking-wider font-bold text-forest-base">Verified Academic Credential</span>
              <h3 class="text-xl sm:text-2xl font-extrabold text-forest-dark">${rec.full_name}</h3>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full bg-emerald-light text-emerald-accent text-xs font-bold uppercase">
            ${rec.license_status || 'Active & Valid'}
          </span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div class="p-3 bg-surface-canvas rounded-xl"><span class="text-text-muted block">Matriculation Number:</span><strong class="text-sm text-forest-dark">${rec.matric_number}</strong></div>
          <div class="p-3 bg-surface-canvas rounded-xl"><span class="text-text-muted block">NMCN Index Number:</span><strong class="text-sm text-forest-dark">${rec.nmcn_index || 'NMCN/RN/2024/04881'}</strong></div>
          <div class="p-3 bg-surface-canvas rounded-xl"><span class="text-text-muted block">Academic Programme:</span><strong class="text-sm text-forest-dark">${rec.program}</strong></div>
          <div class="p-3 bg-surface-canvas rounded-xl"><span class="text-text-muted block">Certification Award:</span><strong class="text-sm text-forest-dark">${rec.award || 'Registered Nurse (RN)'}</strong></div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-100 text-[11px] text-text-muted flex items-center justify-between">
          <span>Digital Seal: ${rec.verified_hash || '0x89f2a71d4b68e90c2134aa89e4729104b901fc4e'}</span>
          <button onclick="window.print()" class="text-forest-base font-bold flex items-center gap-1 hover:underline">
            <span class="material-symbols-outlined text-[14px]">print</span> Print Verification
          </button>
        </div>
      </div>
    `;
    verifyResult.style.display = 'block';
  }

  function renderNotFound() {
    if (verifyResult) verifyResult.style.display = 'none';
    if (verifyNotFound) verifyNotFound.style.display = 'block';
  }

  function checkLocalVerification(query) {
    const localRegistry = {
      'CHEP/NUR/2024/0119': {
        matric_number: 'CHEP/NUR/2024/0119',
        nmcn_index: 'NMCN/RN/2024/04881',
        full_name: 'Blessing Folashade ADEDIRAN',
        program: 'Basic Nursing (3 Years General Nursing)',
        award: 'Registered Nurse (RN) Certificate',
        license_status: 'Active & Valid',
        verified_hash: '0x89f2a71d4b68e90c2134aa89e4729104b901fc4e'
      },
      'CHEP/NUR/2025/0842': {
        matric_number: 'CHEP/NUR/2025/0842',
        nmcn_index: 'NMCN/STU/2025/09210',
        full_name: 'Ifeoluwa Ayomide OSENI',
        program: 'Basic Nursing (ND/HND Track)',
        award: 'In-Course Student Nurse Candidate',
        license_status: 'Provisional Indexing',
        verified_hash: '0x12c49a0b8923de11f00a2938475bb910472eec99'
      }
    };

    const found = localRegistry[query] || Object.values(localRegistry).find(r => r.nmcn_index === query);
    if (found) renderVerifiedRecord(found);
    else renderNotFound();
  }

  // 5. Admission Form Submission & RRR Slip Generator
  const admissionForm = document.getElementById('chep-admission-form');
  const slipContainer = document.getElementById('chep-admission-slip');

  if (admissionForm) {
    admissionForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = admissionForm.querySelector('button[type="submit"]');
      const origText = btn ? btn.innerHTML : 'Submit';
      if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-[16px] animate-spin">sync</span> Submitting...';

      const formData = new FormData(admissionForm);
      const rrr = 'RRR-' + Math.floor(1000000000 + Math.random() * 9000000000);
      const now = new Date().toLocaleDateString('en-GB');

      const fullName = formData.get('full_name') || 'Prospective Candidate';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const program = formData.get('program') || 'Basic Nursing (General)';
      const jambScore = formData.get('jamb_score') || 'N/A';
      const olevelExam = formData.get('olevel_exam') || 'WAEC';
      const examYear = formData.get('exam_year') || '2024';
      const creditsCount = formData.get('credits_count') || '5';

      // Send to WordPress AJAX if available
      const ajaxUrl = (window.chep_ajax_object && window.chep_ajax_object.ajax_url) ? window.chep_ajax_object.ajax_url : null;
      if (ajaxUrl) {
        formData.append('action', 'chep_submit_application');
        formData.append('rrr_number', rrr);
        fetch(ajaxUrl, { method: 'POST', body: formData }).catch(() => {});
      }

      setTimeout(() => {
        if (btn) btn.innerHTML = origText;
        admissionForm.style.display = 'none';

        if (slipContainer) {
          slipContainer.innerHTML = `
            <div class="print-slip-container bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-forest-base">
              <div class="flex items-start justify-between border-b-2 border-forest-base pb-6 mb-6">
                <div>
                  <span class="text-xs font-bold uppercase tracking-widest text-forest-base">Nursing and Midwifery Council of Nigeria Approved</span>
                  <h2 class="text-2xl font-extrabold text-forest-dark">CHEP COLLEGE OF NURSING SCIENCES</h2>
                  <p class="text-xs text-text-muted mt-1">No. 18, Agbebi Estate Road, Honda Bus-Stop, Ota, Ogun State</p>
                  <p class="text-xs font-bold text-emerald-accent mt-0.5">2026/2027 ENTRANCE EXAMINATION & SCREENING SLIP</p>
                </div>
                <div class="text-right">
                  <span class="inline-block px-3 py-1 bg-emerald-light text-emerald-accent rounded-full text-xs font-bold uppercase mb-1">Application Submitted</span>
                  <span class="block text-sm font-mono font-extrabold text-forest-dark">${rrr}</span>
                  <span class="text-[11px] text-text-muted">Date: ${now}</span>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                <div class="p-3 bg-surface-canvas rounded-xl"><span class="text-text-muted block">Full Name:</span><strong class="text-sm text-forest-dark">${fullName}</strong></div>
                <div class="p-3 bg-surface-canvas rounded-xl"><span class="text-text-muted block">Applied Programme:</span><strong class="text-sm text-forest-dark">${program}</strong></div>
                <div class="p-3 bg-surface-canvas rounded-xl"><span class="text-text-muted block">Email Address:</span><strong class="text-sm text-forest-dark">${email}</strong></div>
                <div class="p-3 bg-surface-canvas rounded-xl"><span class="text-text-muted block">Phone Number:</span><strong class="text-sm text-forest-dark">${phone}</strong></div>
                <div class="p-3 bg-surface-canvas rounded-xl"><span class="text-text-muted block">O'Level Exam & Year:</span><strong class="text-sm text-forest-dark">${olevelExam} (${examYear}) - ${creditsCount} Credits</strong></div>
                <div class="p-3 bg-surface-canvas rounded-xl"><span class="text-text-muted block">UTME JAMB Score:</span><strong class="text-sm text-forest-dark">${jambScore}</strong></div>
              </div>

              <div class="p-4 rounded-2xl bg-surface-tint border border-emerald-100 text-xs text-gray-800 space-y-1 mb-6">
                <strong class="text-forest-dark block">Screening Instructions:</strong>
                <p>1. Please bring this printed slip along with your original WAEC/NECO scratch card to the screening hall.</p>
                <p>2. Screening Venue: CBT Center, CHEP Academic Quadrangle, Agbebi Estate Road, Ota.</p>
                <p>3. Examination Batch: Batch A-01 • Scheduled reporting time: 08:30 AM WAT.</p>
              </div>

              <div class="flex items-center justify-between pt-4 border-t border-gray-100 no-print">
                <button onclick="window.print()" class="chep-btn-primary">
                  <span class="material-symbols-outlined text-[18px]">print</span>
                  Print Screening Slip (PDF)
                </button>
                <button onclick="location.reload()" class="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-100">
                  Submit Another Application
                </button>
              </div>
            </div>
          `;
          slipContainer.style.display = 'block';
        }
      }, 600);
    });
  }
});
