// ===========================
// Intersection Observer: fade-up & benefit cards
// ===========================
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// fade-up elements
document.querySelectorAll(
  '.pain-list li, .pain-question, .crisis-stat, .crisis-pattern, .crisis-message, ' +
  '.solution-title, .solution-desc, .benefit-card, .benefits-price, ' +
  '.result-card, .results-tags, .profile-inner, .get-list li, ' +
  '.consult-detail, .scarcity-box, .faq-item, .final-quote'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// benefit cards have their own animation class logic via CSS var(--i)
document.querySelectorAll('.benefit-card').forEach(card => {
  observer.observe(card);
});

// ===========================
// Sticky CTA pulse
// ===========================
const mainBtns = document.querySelectorAll('.btn-main');

// Pulse animation on scroll stop
let scrollTimer;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    mainBtns.forEach(btn => {
      btn.style.animation = 'none';
      btn.offsetHeight; // reflow
      btn.style.animation = 'pulse 1s ease 1';
    });
  }, 800);
});

// ===========================
// Pulse keyframe via JS (since we can't add @keyframes easily to existing CSS here)
// ===========================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes pulse {
    0%   { box-shadow: 0 6px 24px rgba(56,182,232,0.45); }
    50%  { box-shadow: 0 6px 40px rgba(56,182,232,0.75), 0 0 0 8px rgba(56,182,232,0.1); }
    100% { box-shadow: 0 6px 24px rgba(56,182,232,0.45); }
  }
`;
document.head.appendChild(styleSheet);

// ===========================
// Remain counter (countdown feel)
// ===========================
const remainNums = document.querySelectorAll('.remain-num, .btn-badge');
// Just a visual tick — counts from 5 down to 3 once on page load
let count = 5;
const targetCount = 3;
remainNums.forEach(el => {
  if (el.classList.contains('remain-num')) {
    let c = 5;
    const interval = setInterval(() => {
      if (c <= targetCount) { clearInterval(interval); return; }
      c--;
      el.textContent = c + '名';
    }, 400);
  }
});

// ===========================
// Smooth section transitions
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===========================
// FAQ accordion (optional gentle effect)
// ===========================
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  // start closed
  a.style.maxHeight = a.scrollHeight + 'px';
  a.style.overflow = 'hidden';
  a.style.transition = 'max-height 0.3s ease';
});
