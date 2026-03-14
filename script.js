// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 2000);
});
// ===== 1. NAVBAR — berubah saat scroll =====
const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul a');

window.addEventListener('scroll', () => {
  // Navbar background
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(10, 10, 10, 0.98)';
    nav.style.borderBottom = '1px solid rgba(155, 28, 28, 0.5)';
  } else {
    nav.style.background = 'rgba(10, 10, 10, 0.85)';
    nav.style.borderBottom = '1px solid rgba(155, 28, 28, 0.2)';
  }

  // Active link
  let current = '';

  const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

  if (isAtBottom) {
    current = 'contact';
  } else {
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});


// ===== 2. FADE IN — elemen muncul saat di-scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});


// ===== 3. TYPING EFFECT =====
const roles = [
  "Network Engineer",
  "Fullstack Developer",
  "Computer Science Student"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.querySelector('.hero-sub');

function type() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    setTimeout(() => isDeleting = true, 1800);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(type, isDeleting ? 60 : 100);
}

type();


// ===== 4. CURSOR GLOW =====
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(155,28,28,0.12) 0%, transparent 70%);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: left 0.1s ease, top 0.1s ease;
`;
document.body.appendChild(cursor);

window.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});