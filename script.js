// Elements
const toggleBtn = document.getElementById('mode-toggle');
const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const connectAnchor = document.getElementById('connect-anchor');
const preloader = document.getElementById('preloader');
const backTop = document.getElementById('backTop');

// 1) Preloader
window.addEventListener('load', () => {
  if (preloader) preloader.style.display = 'none';
});

// 2) Theme (dark/light)
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-mode');
  toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  if (body.classList.contains('light-mode')) {
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'light');
  } else {
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'dark');
  }
});

// 3) Mobile menu
menuToggle && menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('show')));

// 4) Smooth scroll (nav links + connect)
document.querySelectorAll('[data-link]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
connectAnchor && connectAnchor.addEventListener('click', e => {
  // let the normal anchor behavior handle (or smooth scroll)
  // smooth scroll fallback:
  e.preventDefault();
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// 5) Reveal animations & progress bars
const reveals = document.querySelectorAll('.animate');
const skillBars = document.querySelectorAll('.service-card .skill-bar div');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      // fill progress bars when services container shows
      if (entry.target.closest && entry.target.closest('#services')) {
        skillBars.forEach(bar => {
          const pct = bar.getAttribute('data-percent') || bar.style.width;
          bar.style.width = pct + '%';
        });
      }
    }
  });
}, { threshold: 0.18 });

reveals.forEach(r => io.observe(r));

// 6) Tilt effect for cards (simple vanilla)
const tiltElements = document.querySelectorAll('[data-tilt]');
tiltElements.forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * 12; // left-right
    const rotX = (0.5 - y) * 12; // top-bottom
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// 7) Lightbox for images
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

document.querySelectorAll('.lightbox-target').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    if (!lightbox) return;
    lightboxImg.src = img.src;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
lightboxClose && lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
});
lightbox && lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});

// 8) Back to top button
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backTop.style.display = 'block';
  else backTop.style.display = 'none';
});
backTop && backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 9) small accessibility: close mobile menu on outside click (mobile)
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('show');
    }
  }
});

// 10) ensure progress bars data-percent numeric (normalize)
document.querySelectorAll('.service-card .skill-bar div').forEach(d => {
  const raw = d.getAttribute('data-percent') || '';
  if (raw && !raw.endsWith('%')) d.setAttribute('data-percent', raw);
});
