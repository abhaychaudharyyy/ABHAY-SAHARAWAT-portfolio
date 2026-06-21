const typingMessages = [
  'BCA Graduate | AI & Data Science',
  'Machine Learning Enthusiast',
  'Computer Vision Developer',
  'Designing secure and smart software',
];

const typingElement = document.querySelector('.eyebrow');
let typingIndex = 0;
let charIndex = 0;

function updateTyping() {
  if (!typingElement) return;
  const message = typingMessages[typingIndex];
  if (charIndex <= message.length) {
    typingElement.textContent = message.slice(0, charIndex);
    charIndex += 1;
    setTimeout(updateTyping, 60);
  } else {
    setTimeout(() => {
      charIndex = 0;
      typingIndex = (typingIndex + 1) % typingMessages.length;
      updateTyping();
    }, 1400);
  }
}

function revealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
}

function highlightNav() {
  const sections = document.querySelectorAll('main section[id]');
  const scrollPosition = window.scrollY + 120;
  let currentId = '';

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      currentId = section.id;
    }
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks?.classList.toggle('open');
}

function closeMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks?.classList.remove('open');
}

function openProjectModal(card) {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const title = card.dataset.title || '';
  const description = card.dataset.desc || '';
  const tech = (card.dataset.tech || '').split(',').map((item) => item.trim()).filter(Boolean);
  const demoLink = card.dataset.demo || '#';
  const githubLink = card.dataset.github || '#';

  modal.querySelector('.modal-title').textContent = title;
  modal.querySelector('.modal-desc').textContent = description;
  modal.querySelector('.modal-tech').innerHTML = tech.map((item) => `<span>${item}</span>`).join('');
  modal.querySelector('.modal-btn.primary').href = demoLink;
  modal.querySelectorAll('.modal-btn')[1].href = githubLink;
  modal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal?.setAttribute('aria-hidden', 'true');
}

window.addEventListener('DOMContentLoaded', () => {
  updateTyping();
  revealOnScroll();
  highlightNav();

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', (event) => {
      closeMenu();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelector('.nav-toggle')?.addEventListener('click', toggleMenu);

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => openProjectModal(card));
  });

  document.querySelector('.modal-close')?.addEventListener('click', closeProjectModal);
  document.querySelector('.modal-backdrop')?.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeProjectModal();
      closeMenu();
    }
  });
});

window.addEventListener('scroll', () => {
  revealOnScroll();
  highlightNav();
});
