// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconMenu = mobileMenuBtn.querySelector('.icon-menu');
const iconClose = mobileMenuBtn.querySelector('.icon-close');

// Scroll effect for navbar
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('active');
  
  if (isOpen) {
    mobileMenu.classList.remove('active');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
    document.body.style.overflow = '';
  } else {
    mobileMenu.classList.add('active');
    iconMenu.classList.add('hidden');
    iconClose.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
});

// Close mobile menu when clicking a link
const mobileNavLinks = mobileMenu.querySelectorAll('a');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
    document.body.style.overflow = '';
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message')
  };
  
  // Aqui puedes agregar la logica para enviar el formulario
  // Por ejemplo, usando fetch para enviar a un servidor
  console.log('Formulario enviado:', data);
  
  // Mostrar mensaje de exito
  alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
  
  // Limpiar formulario
  contactForm.reset();
});

// ===== SCROLL ANIMATIONS =====
// Intersection Observer for fade-in animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Add animation classes to sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add active link styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
  .nav-links a.active,
  .mobile-nav-links a.active {
    color: var(--color-primary) !important;
    opacity: 1 !important;
  }
`;
document.head.appendChild(activeStyle);

// ===== YEAR IN FOOTER =====
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
}
