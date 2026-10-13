const fs = require('fs');
const https = require('https');
const path = require('path');

const targetDir = path.join(__dirname, '../public/images/chep');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Key original full-res images from chepnursingcollege.org
const keyImages = [
  { name: 'chep_logo.png', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/chep_logo.png' },
  { name: 'provost.png', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/05/Provost_Photo-removebg-preview.png' },
  { name: 'building.png', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/CHEP-BUILDING-new.png' },
  { name: 'hero_banner.png', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/06/Frront-End-Banner-Cropped-resize.png' },
  { name: 'safety_exercise.png', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/06/Safety-Precaution-Exercise-Cropped2-resize-2.png' },
  { name: 'students_green_scrubs.jpg', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/Nigerian-Nursing-Students-Campus-life-in-green-scrub.jpg' },
  { name: 'students_chep.jpeg', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/06/students-chep.jpeg' },
  { name: 'pediatric_nursing.jpg', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/Pediatric-Nursing.jpg' },
  { name: 'library_banner.png', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/banner-library2.png' },
  { name: 'ict_center.jpg', url: 'https://chepnursingcollege.org/wp-content/uploads/elementor/thumbs/CHEP-Nursing-College-ICT-facilities-with-Nigerian-students-r466tnm1tvrsmjf3lql6tsepfqp2fli7yfsmngwurc.jpg' },
  { name: 'laboratory.jpg', url: 'https://chepnursingcollege.org/wp-content/uploads/elementor/thumbs/Nursing-College-Laboratory-r466tnm1tvrsmjf3lql6tsepfqp2fli7yfsmngwurc.jpg' },
  { name: 'dormitory.jpg', url: 'https://chepnursingcollege.org/wp-content/uploads/elementor/thumbs/dormitory-with-Nigerian-students-on-their-beds-in-their-rooms-r466tnm1tvrsmjf3lql6tsepfqp2fli7yfsmngwurc.jpg' },
  { name: 'campus_event_chep6.jpeg', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/05/Chep-6.jpeg' },
  { name: 'campus_event_chep14.jpeg', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/05/Chep-14.jpeg' },
  { name: 'lecturer_jojolade.png', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/JOJOLADE_Adeboye_Ismail-removebg-preview-1.png' },
  { name: 'lecturer_akinkuebi.png', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/Lecturer-AKINKUEBI_Olawunmi_Esther-removebg-preview.png' },
  { name: 'lecturer_chika.png', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/Lecturer_Chika_Maryjane_-removebg-preview-1.png' },
  { name: 'lecturer_urom.png', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/Lecturer_UROM_Elisha_Samuel-removebg-preview.png' },
  { name: 'lecturer_isikwei.png', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/Lecturer__ISIKWEI__Success_Isioma-removebg-preview.png' },
  { name: 'lecturer_ogunmuyiwa.png', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/OGUNMUYIWA_Ayodeji-removebg-preview.png' },
  { name: 'blog_community_health.jpg', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/Community-Health-Nursing_-Bridging-the-Gap-Between-Healthcare-and-Society.jpg' },
  { name: 'blog_fundamentals.jpg', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/Foundation-vs.-Fundamentals-of-Nursing_-Understanding-the-Key-Differences.jpg' },
  { name: 'blog_geriatric.jpg', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/Geriatric-Nursing_-Providing-Compassionate-Care-for-the-Aging-Population.-Images-of-Nigerian-Nurses.jpg' },
  { name: 'blog_maternal.jpg', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/Maternal-and-Child-Nursing_-A-Lifelong-Bond-of-Care-and-Support.jpg' },
  { name: 'blog_total_care.jpg', url: 'https://chepnursingcollege.org/wp-content/uploads/2025/04/Total-Nursing-Care_-A-Holistic-Approach-to-Patient-Well-being.jpg' }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(true));
        });
      } else {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`Status ${response.statusCode} for ${url}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log(`Starting download of ${keyImages.length} real CHEP images...`);
  let successCount = 0;
  for (const item of keyImages) {
    const dest = path.join(targetDir, item.name);
    try {
      await downloadFile(item.url, dest);
      const stats = fs.statSync(dest);
      console.log(`✓ Downloaded ${item.name} (${Math.round(stats.size / 1024)} KB)`);
      successCount++;
    } catch (err) {
      console.error(`✗ Failed to download ${item.name}: ${err.message}`);
    }
  }
  console.log(`\nCompleted! Downloaded ${successCount}/${keyImages.length} real images into public/images/chep/`);
}

downloadAll();
