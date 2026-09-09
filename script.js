/* ============================================================
   GURU JI REAL ESTATE & DEVELOPERS OFFICE — Glassmorphism & Mobile JS
   ============================================================ */

(function () {
  'use strict';

  // 1. Mobile Drawer Navigation Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburger && mobileDrawer) {
    hamburger.addEventListener('click', function () {
      mobileDrawer.classList.toggle('active');
      document.body.style.overflow = mobileDrawer.classList.contains('active') ? 'hidden' : 'auto';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', function () {
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // 2. Property Tabs Filtering
  const tabBtns = document.querySelectorAll('.tab-btn-glass');
  const propertyCards = document.querySelectorAll('.prop-card-glass');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      propertyCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. EMI Calculator Logic
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

    loanVal.textContent = `₹ ${loanInput.value} Lakhs`;
    interestVal.textContent = `${interestInput.value} %`;
    tenureVal.textContent = `${tenureInput.value} Years`;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    emiDisplay.textContent = `₹ ${Math.round(emi).toLocaleString('en-IN')}`;
  }

  if (loanInput && interestInput && tenureInput) {
    loanInput.addEventListener('input', calculateEMI);
    interestInput.addEventListener('input', calculateEMI);
    tenureInput.addEventListener('input', calculateEMI);
    calculateEMI();
  }

  // 4. Contact Form Handler (dual lead capture via WhatsApp)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const property = document.getElementById('formProperty').value;

      if (!name || !phone) {
        alert('Please provide your name and phone number.');
        return;
      }

      const waText = `Hi Guru Ji Real Estate team, I am interested in property details.\n\nName: ${name}\nPhone: ${phone}\nRequirement: ${property}`;
      const waUrl = `https://wa.me/919811000000?text=${encodeURIComponent(waText)}`;

      alert('Thank you! Your VIP inquiry has been registered. Opening WhatsApp to connect directly with Principal Developers...');
      window.open(waUrl, '_blank');
      contactForm.reset();
    });
  }
})();
