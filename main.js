/**
* Template Name: Blogy - Optimized
* Updated: Dec 2025
*/

(function() {
  "use strict";

  const body = document.body;
  const header = document.querySelector('#header');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const preloader = document.querySelector('#preloader');

  /**
   * Combined scroll handler for SEO/performance
   */
  function onScroll() {
    const scrolled = window.scrollY > 100;

    // Body scrolled class
    if (header && (header.classList.contains('sticky-top') || header.classList.contains('fixed-top') || header.classList.contains('scroll-up-sticky'))) {
      body.classList.toggle('scrolled', scrolled);
    }

    // Scroll top button
    if (scrollTopBtn) scrollTopBtn.classList.toggle('active', scrolled);
  }

  document.addEventListener('scroll', onScroll);
  window.addEventListener('load', onScroll);

  /**
   * Mobile nav toggle with ARIA
   */
  function toggleMobileNav() {
    const active = body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list', !active);
    mobileNavToggleBtn.classList.toggle('bi-x', active);
    mobileNavToggleBtn.setAttribute('aria-expanded', active);
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', toggleMobileNav);
  }

  // Close mobile nav on same-page links
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (body.classList.contains('mobile-nav-active')) toggleMobileNav();
    });
  });

  // Toggle mobile dropdowns
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', e => {
      e.preventDefault();
      const parent = toggle.parentNode;
      parent.classList.toggle('active');
      const dropdown = parent.nextElementSibling;
      if (dropdown) dropdown.classList.toggle('dropdown-active');
    });
  });

  /**
   * Preloader
   */
  if (preloader) window.addEventListener('load', () => preloader.remove());

  /**
   * Scroll to top
   */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    }
  });

  /**
   * Swiper initialization
   */
  window.addEventListener('load', () => {
    document.querySelectorAll(".init-swiper").forEach(swiperEl => {
      const configEl = swiperEl.querySelector(".swiper-config");
      if (!configEl) return;
      let config;
      try { config = JSON.parse(configEl.textContent.trim()); } catch(e) { return; }

      if (swiperEl.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperEl, config);
      } else {
        new Swiper(swiperEl, config);
      }
    });
  });

  /**
   * PureCounter
   */
  if (typeof PureCounter !== 'undefined') new PureCounter();

  /**
   * GLightbox
   */
  if (typeof GLightbox !== 'undefined') GLightbox({ selector: '.glightbox' });

})();
