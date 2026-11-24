// Navigation Toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
}

// Home Gallery Category Filter
const filterBtns = document.querySelectorAll('.gallery-filter-btn');
const projectCards = document.querySelectorAll('.home-project-card');

if (filterBtns.length && projectCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

// Lightbox Modal
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxSubtitle = document.getElementById('lightbox-subtitle');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, title, subtitle) {
  if (!lightboxModal || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = title;
  if (lightboxTitle) lightboxTitle.textContent = title;
  if (lightboxSubtitle) lightboxSubtitle.textContent = subtitle || '';
  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightboxModal) return;
  lightboxModal.classList.remove('active');
  document.body.style.overflow = '';
}

if (lightboxModal) {
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Attach card click handlers for quick preview
  document.querySelectorAll('.home-project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a:not(.home-project-card)')) return;
      const img = card.querySelector('img');
      if (!img) return;
      const title = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Walter Plumbers Project';
      const loc = card.querySelector('.card-location') ? card.querySelector('.card-location').textContent.trim() : '';
      openLightbox(img.src, title, loc);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const img = card.querySelector('img');
        if (!img) return;
        const title = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Walter Plumbers Project';
        const loc = card.querySelector('.card-location') ? card.querySelector('.card-location').textContent.trim() : '';
        openLightbox(img.src, title, loc);
      }
    });
  });
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// FAQ Accordion - Close other questions when one is opened
const faqDetails = document.querySelectorAll('.faq-accordion details');
if (faqDetails.length) {
  faqDetails.forEach(targetDetail => {
    targetDetail.addEventListener('toggle', () => {
      if (targetDetail.open) {
        faqDetails.forEach(detail => {
          if (detail !== targetDetail && detail.open) {
            detail.removeAttribute('open');
          }
        });
      }
    });
  });
}
