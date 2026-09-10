/* ============================================================
   GURU JI REAL ESTATE & DEVELOPERS — Interactive Script
   Form to WhatsApp Redirect + Modal + EMI Calc + Scroll Reveal
   ============================================================ */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = "919540979494";

  function createWhatsAppUrl(text) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  // 1. Modal Quick Enquiry Handlers
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('closeModal');

  function openModal() {
    if (modal) {
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lock');
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lock');
    }
  }

  document.querySelectorAll("[data-open='enquiry']").forEach(btn => {
    btn.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#contact') {
        // Allow smooth scroll to contact section
      } else {
        e.preventDefault();
        openModal();
      }
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // 2. Lead Form Submission Handler (Main Lead Form)
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const type = document.getElementById('propertyType').value;
      const budget = document.getElementById('budget').value;
      const loc = document.getElementById('locationInput').value.trim();

      if (!name || !phone) {
        alert('Please fill in your name and phone number.');
        return;
      }

      const waText = `Hi Guru Ji Real Estate & Developers,

I would like to enquire about a property in South Delhi.

👤 Name: ${name}
📞 Phone: ${phone}
🏠 Property Type: ${type}
💰 Budget: ${budget}
📍 Preferred Location: ${loc || "Chirag Delhi / South Delhi"}

Please share the available floor plans and pricing details.`;

      const waUrl = createWhatsAppUrl(waText);
      alert('Thank you! Redirecting you directly to WhatsApp to connect with Guru Ji Developers...');
      window.open(waUrl, '_blank');
      leadForm.reset();
    });
  }

  // 3. Quick Form Submission Handler (Modal Quick Form)
  const quickForm = document.getElementById('quickForm');
  if (quickForm) {
    quickForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('qName').value.trim();
      const phone = document.getElementById('qPhone').value.trim();
      const type = document.getElementById('qType').value;
      const budget = document.getElementById('qBudget').value;
      const loc = document.getElementById('qLocation').value.trim();

      if (!name || !phone) {
        alert('Please fill in your name and phone number.');
        return;
      }

      const waText = `Hi Guru Ji Real Estate & Developers,

Quick Enquiry for Property:

👤 Name: ${name}
📞 Phone: ${phone}
🏠 Property Type: ${type}
💰 Budget: ${budget}
📍 Preferred Location: ${loc || "South Delhi"}

Please connect with me.`;

      const waUrl = createWhatsAppUrl(waText);
      closeModal();
      window.open(waUrl, '_blank');
      quickForm.reset();
    });
  }

  // 4. EMI Calculator Logic
  const loanInput = document.getElementById('loanAmount');
  const interestInput = document.getElementById('interestRate');
  const tenureInput = document.getElementById('tenureYears');

  const loanVal = document.getElementById('loanVal');
  const interestVal = document.getElementById('interestVal');
  const tenureVal = document.getElementById('tenureVal');
  const emiDisplay = document.getElementById('emiDisplay');

  function calculateEMI() {
    if (!loanInput || !interestInput || !tenureInput || !emiDisplay) return;

    const P = parseFloat(loanInput.value) * 100000;
    const r = parseFloat(interestInput.value) / 12 / 100;
    const n = parseFloat(tenureInput.value) * 12;

    if (loanVal) loanVal.textContent = `₹ ${loanInput.value} Lakhs`;
    if (interestVal) interestVal.textContent = `${interestInput.value} %`;
    if (tenureVal) tenureVal.textContent = `${tenureInput.value} Years`;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    emiDisplay.textContent = `₹ ${Math.round(emi).toLocaleString('en-IN')}`;
  }

  if (loanInput && interestInput && tenureInput) {
    loanInput.addEventListener('input', calculateEMI);
    interestInput.addEventListener('input', calculateEMI);
    tenureInput.addEventListener('input', calculateEMI);
    calculateEMI();
  }

  // 5. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.animate-reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('visible'));
  }

})();
