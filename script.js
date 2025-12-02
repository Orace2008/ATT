document.addEventListener('DOMContentLoaded', () => {
  // --- Affiche l'année actuelle ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Menu mobile toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  navToggle?.addEventListener('click', () => {
    navList?.classList.toggle('show');
    navToggle.classList.toggle('open'); // animation hamburger
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });

  // --- Scroll reveal avec IntersectionObserver ---
  const reveals = document.querySelectorAll('.section, .service, .testi, .hero-text, .card-visual');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => observer.observe(r));

  // --- CTA protocol fallback (optionnel, exemple) ---
  // document.querySelectorAll('.cta-protocol').forEach(btn => {
  //   btn.addEventListener('click', e => {
  //     // Exemple : ouvrir mailto ou tel si nécessaire
  //     // e.preventDefault();
  //     // window.location.href = btn.dataset.href;
  //   });
  // });
});
