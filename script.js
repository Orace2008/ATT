document.addEventListener('DOMContentLoaded', function() {
  // ===== INITIALISATION =====
  console.log('Site chargé avec succès');
  
  // ===== ANNÉE COURANTE DANS LE FOOTER =====
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // ===== MENU MOBILE =====
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function() {
      // Toggle menu
      mobileNav.classList.toggle('show');
      this.classList.toggle('open');
      
      // Update aria-expanded
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = mobileNav.classList.contains('show') ? 'hidden' : '';
    });
    
    // Fermer le menu en cliquant sur un lien
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('show');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', (event) => {
      if (!mobileNav.contains(event.target) && 
          !navToggle.contains(event.target) && 
          mobileNav.classList.contains('show')) {
        mobileNav.classList.remove('show');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
  
  // ===== SMOOTH SCROLL POUR LES ANCRES =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Ignorer les liens sans href ou href="#"
      if (this.getAttribute('href') === '#' || !this.getAttribute('href').startsWith('#')) {
        return;
      }
      
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculer la position avec offset pour le header fixe
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        // Scroll smooth
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===== ANIMATIONS AU SCROLL =====
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
  
  // ===== VALIDATION DU FORMULAIRE =====
  const contactForm = document.querySelector('.devis-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Validation basique
      const name = this.querySelector('#name');
      const email = this.querySelector('#email');
      const project = this.querySelector('#project');
      let isValid = true;
      
      // Réinitialiser les erreurs
      this.querySelectorAll('.error').forEach(el => el.remove());
      this.querySelectorAll('input, textarea').forEach(el => {
        el.style.borderColor = '';
      });
      
      // Validation nom
      if (!name.value.trim()) {
        showError(name, 'Veuillez entrer votre nom');
        isValid = false;
      }
      
      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        showError(email, 'Veuillez entrer un email valide');
        isValid = false;
      }
      
      // Validation projet
      if (!project.value.trim() || project.value.trim().length < 10) {
        showError(project, 'Veuillez décrire votre projet (au moins 10 caractères)');
        isValid = false;
      }
      
      if (!isValid) {
        e.preventDefault();
        
        // Scroll vers la première erreur
        const firstError = this.querySelector('.error');
        if (firstError) {
          const input = firstError.previousElementSibling;
          input.focus();
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        // Animation de succès
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simuler l'envoi (à remplacer par la vraie logique d'envoi)
        setTimeout(() => {
          submitBtn.textContent = 'Message envoyé !';
          submitBtn.style.background = '#10B981';
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }, 3000);
        }, 1500);
      }
    });
    
    function showError(input, message) {
      input.style.borderColor = '#EF4444';
      const error = document.createElement('div');
      error.className = 'error';
      error.textContent = message;
      error.style.color = '#EF4444';
      error.style.fontSize = '14px';
      error.style.marginTop = '5px';
      input.parentNode.appendChild(error);
    }
  }
  
  // ===== OBSERVATEUR POUR CHANGEMENT DE COULEUR DU HEADER =====
  const header = document.querySelector('header');
  const heroSection = document.querySelector('.hero');
  
  if (header && heroSection) {
    const heroHeight = heroSection.offsetHeight;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > heroHeight * 0.8) {
        header.style.backgroundColor = 'var(--bg-header)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.backgroundColor = 'transparent';
        header.style.boxShadow = 'none';
      }
    });
  }
  
  // ===== LAZY LOADING DES IMAGES =====
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // ===== EFFET DE TYPING POUR LE TITRE (OPTIONNEL) =====
  const heroTitle = document.querySelector('.hero-text h2');
  if (heroTitle && window.innerWidth > 768) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    }
    
    // Démarrer l'animation après un délai
    setTimeout(typeWriter, 500);
  }
  
  // ===== ANALYTIQUES SIMPLES (OPTIONNEL) =====
  function trackEvent(eventName) {
    console.log(`Événement suivi: ${eventName}`);
    // Ici vous pourriez ajouter Google Analytics, etc.
  }
  
  // Suivre les clics sur les CTA
  document.querySelectorAll('.btn-primary, .contact-item').forEach(button => {
    button.addEventListener('click', function() {
      const action = this.textContent || this.getAttribute('aria-label');
      trackEvent(`Clic: ${action}`);
    });
  });
});