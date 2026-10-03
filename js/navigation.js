$(document).ready(function () {
  function updateNavbar() {
    if ($(window).scrollTop() > 60) {
      $('#mainNavbar').addClass('scrolled');
    } else {
      $('#mainNavbar').removeClass('scrolled');
    }
  }
  updateNavbar();
  $(window).on('scroll', updateNavbar);

  $('.nav-link, a[href^="#"]').on('click', function (e) {
    var target = $(this).attr('href');
    if (target && target.length > 1 && $(target).length) {
      e.preventDefault();
      var offset = $(target).offset().top - 80;
      $('html, body').animate({ scrollTop: offset }, 600);
      $('.navbar-collapse').collapse('hide');
    }
  });

  $(window).on('scroll', function () {
    var scrollPos = $(window).scrollTop() + 120;
    $('section').each(function () {
      var id = $(this).attr('id');
      if (!id) return;
      if ($(this).offset().top <= scrollPos && $(this).offset().top + $(this).outerHeight() > scrollPos) {
        $('.nav-link').removeClass('active');
        $('.nav-link[href="#' + id + '"]').addClass('active');
      }
    });
  });

  $('#searchToggle').on('click', function () {
    $('#searchOverlay').fadeIn(250);
    setTimeout(function () { $('#globalSearch').focus(); }, 260);
  });

  $('#searchClose').on('click', function () {
    $('#searchOverlay').fadeOut(200);
  });

  $('#globalSearch').on('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var val = $(this).val().trim();
      $('#searchOverlay').fadeOut(200);
      var target = $('#products');
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 600);
      $('#productSearch').val(val).trigger('input');
      $(this).val('');
    }
  });

  $('#backToTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  $('#privacyLink').on('click', function (e) {
    e.preventDefault();
    showToast('This is a demo. No privacy policy document is included.');
  });

  $('#year').text(new Date().getFullYear());
});