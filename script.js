/* ============================================================
   Portfolio — script.js
   Handles: navbar, mobile menu, scroll animations, cursor glow,
   stat counter, staggered reveals, smooth anchors
   ============================================================ */

(function () {
  'use strict';

  // ── Cursor glow ───────────────────────────────────────
  const glow = document.createElement('div');
  glow.classList.add('cursor-glow');
  document.body.appendChild(glow);

  let mouseX = -400, mouseY = -400;
  let glowX = -400, glowY = -400;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!glow.classList.contains('active')) glow.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    glow.classList.remove('active');
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();


  // ── Navbar scroll effect ──────────────────────────────
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });


  // ── Mobile menu toggle ────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }


  // ── Active nav link highlight ─────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

  function highlightNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });


  // ── Stat counter animation ────────────────────────────
  function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[id]');
    statNumbers.forEach(el => {
      const target = parseInt(el.textContent, 10);
      if (isNaN(target)) return;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 30));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current;
      }, 40);
    });
  }


  // ── Scroll reveal with stagger ────────────────────────
  function initScrollReveal() {
    const groups = [
      { selector: '.section-header', stagger: false },
      { selector: '.about-text', stagger: false },
      { selector: '.highlight-card', stagger: true },
      { selector: '.skill-category', stagger: true },
      { selector: '.project-card', stagger: true },
      { selector: '.contact-card', stagger: true },
    ];

    const allElements = [];

    groups.forEach(group => {
      const elements = document.querySelectorAll(group.selector);
      let index = 0;
      elements.forEach(el => {
        el.classList.add('fade-in');
        if (group.stagger) {
          index++;
          el.classList.add('stagger-' + Math.min(index, 6));
        }
        allElements.push(el);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);

            // Trigger stat counters when hero stats become visible
            if (entry.target.closest && entry.target.closest('.hero')) {
              animateCounters();
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    allElements.forEach(el => observer.observe(el));

    // Also trigger counters on load since hero is immediately visible
    setTimeout(animateCounters, 800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }


  // ── Tilt effect on project cards ──────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -2;
      const rotateY = ((x - centerX) / centerX) * 2;
      card.style.transform = `translateY(-5px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // ── Smooth anchor scrolling ───────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
