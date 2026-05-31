/* Turtle Traveling Massage — main.js */
(function () {
  'use strict';

  /* ─── Mobile menu ─── */
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      mobileNav.classList.toggle('is-open', !expanded);
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── Intersection Observer — scroll reveal ─── */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    const revealEls = document.querySelectorAll(
      '.reveal, .atout-card, .service-card, .temoignage-card'
    );

    if ('IntersectionObserver' in window && revealEls.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      revealEls.forEach((el, i) => {
        if (el.classList.contains('atout-card') || el.classList.contains('service-card')) {
          el.style.transitionDelay = `${(i % 3) * 0.1}s`;
        }
        observer.observe(el);
      });
    } else {
      revealEls.forEach(el => el.classList.add('is-visible'));
    }
  }

  /* ─── GSAP Hero Parallax ─── */
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    /* Hero visual parallax */
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
      gsap.to(heroVisual, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    /* Hero content fade-in */
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.from(heroContent, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power2.out',
      });
    }

    /* CTA band badge reveal */
    const ctaBand = document.querySelector('.cta-band');
    if (ctaBand) {
      gsap.from(ctaBand.querySelectorAll('h2, p, .cta-phone, .btn'), {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaBand,
          start: 'top 80%',
          once: true,
        },
      });
    }

    /* Micro-interaction: nav CTA button */
    const headerCta = document.querySelector('.header-cta a');
    if (headerCta) {
      headerCta.addEventListener('mouseenter', () => {
        gsap.to(headerCta, { scale: 1.04, duration: 0.2, ease: 'power1.out' });
      });
      headerCta.addEventListener('mouseleave', () => {
        gsap.to(headerCta, { scale: 1, duration: 0.2, ease: 'power1.in' });
      });
    }

    /* Stagger service cards */
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length) {
      gsap.from(serviceCards, {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
          once: true,
        },
      });
    }
  }

  /* Load GSAP + ScrollTrigger from CDN then init */
  if (!prefersReduced) {
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    gsapScript.defer = true;
    gsapScript.onload = () => {
      const stScript = document.createElement('script');
      stScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
      stScript.defer = true;
      stScript.onload = initGSAP;
      document.head.appendChild(stScript);
    };
    document.head.appendChild(gsapScript);
  }

})();
