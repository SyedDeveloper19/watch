function showToast(msg) {
  $('#toastMsg').text(msg);
  var toast = new bootstrap.Toast(document.getElementById('appToast'), { delay: 2500 });
  toast.show();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function initVisitorCounter() {
  var count = parseInt(localStorage.getItem('albertoVisits') || '0', 10);
  count += 1;
  localStorage.setItem('albertoVisits', count);
  $('#visitorCount').text(count.toLocaleString());
}

function renderTechnologies() {
  var techs = [
    { icon: 'bi-stopwatch', title: 'Quartz Movement', desc: 'Battery-powered precision with exceptional accuracy and minimal maintenance.' },
    { icon: 'bi-gear', title: 'Automatic Movement', desc: 'Self-winding mechanism powered by the natural motion of your wrist.' },
    { icon: 'bi-tools', title: 'Mechanical Movement', desc: 'Hand-crafted gears and springs delivering timeless horological artistry.' },
    { icon: 'bi-sun', title: 'Solar Powered', desc: 'Eco-friendly technology that converts light into lasting energy.' },
    { icon: 'bi-smartwatch', title: 'Smart Watch Tech', desc: 'Advanced sensors, health tracking and seamless smartphone connectivity.' },
    { icon: 'bi-droplet', title: 'Water Resistance', desc: 'Engineered seals protecting your timepiece up to 300 meters deep.' },
    { icon: 'bi-bullseye', title: 'Precision Engineering', desc: 'Swiss-grade tolerances measured in fractions of a second.' },
    { icon: 'bi-shield-check', title: 'Shock Resistance', desc: 'Reinforced movements built to withstand daily impact and vibration.' }
  ];

  var html = '';
  techs.forEach(function (t) {
    html += '<div class="col-lg-3 col-md-6">' +
      '<div class="tech-card reveal">' +
      '<i class="bi ' + t.icon + '"></i>' +
      '<h5>' + t.title + '</h5>' +
      '<p>' + t.desc + '</p>' +
      '</div>' +
      '</div>';
  });
  $('#techGrid').html(html);
}

function initRevealAnimations() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}

function validateForm(fields) {
  var valid = true;
  fields.forEach(function (f) {
    var el = $(f.id);
    var val = el.val().trim();
    if (!val) {
      el.addClass('is-invalid');
      valid = false;
    } else if (f.email && !isValidEmail(val)) {
      el.addClass('is-invalid');
      valid = false;
    } else {
      el.removeClass('is-invalid');
    }
  });
  return valid;
}

$(document).ready(function () {
  initVisitorCounter();
  renderTechnologies();
  setTimeout(initRevealAnimations, 100);

  $('#supportForm').on('submit', function (e) {
    e.preventDefault();
    var ok = validateForm([
      { id: '#sName' },
      { id: '#sEmail', email: true },
      { id: '#sPhone' },
      { id: '#sSubject' },
      { id: '#sMessage' }
    ]);

    if (!ok) {
      $('#supportFeedback').html('<div class="alert alert-danger bg-dark border-danger text-danger">Please fill all fields correctly.</div>');
      return;
    }

    $('#supportFeedback').html('<div class="alert alert-success bg-dark border-success text-success">Support request submitted successfully! (Demo only — no data sent.)</div>');
    this.reset();
    showToast('Support request received.');
  });

  $('#clearSupport').on('click', function () {
    $('#supportForm')[0].reset();
    $('#supportForm .is-invalid').removeClass('is-invalid');
    $('#supportFeedback').html('');
  });

  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    var ok = validateForm([
      { id: '#cName' },
      { id: '#cEmail', email: true },
      { id: '#cSubject' },
      { id: '#cMessage' }
    ]);

    if (!ok) {
      $('#contactFeedback').html('<div class="alert alert-danger bg-dark border-danger text-danger">Please fill all fields correctly.</div>');
      return;
    }

    $('#contactFeedback').html('<div class="alert alert-success bg-dark border-success text-success">Message sent successfully! (Demo only — no data sent.)</div>');
    this.reset();
    showToast('Message sent. Thank you!');
  });

  $('#clearContact').on('click', function () {
    $('#contactForm')[0].reset();
    $('#contactForm .is-invalid').removeClass('is-invalid');
    $('#contactFeedback').html('');
  });

  $(document).on('input', '.is-invalid', function () {
    $(this).removeClass('is-invalid');
  });
});