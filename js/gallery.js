var galleryImages = [];
var currentGalleryIndex = 0;
var filteredGallery = [];

var galleryData = [
  { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', cat: 'luxury', title: 'Luxury Chronograph' },
  { src: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80', cat: 'luxury', title: 'Gold Classic' },
  { src: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&w=800&q=80', cat: 'luxury', title: 'Diamond Elite' },
  { src: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80', cat: 'luxury', title: 'Platinum Series' },
  { src: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80', cat: 'vintage', title: 'Vintage 1950s' },
  { src: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=800&q=80', cat: 'vintage', title: 'Antique Pocket' },
  { src: 'https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&w=800&q=80', cat: 'vintage', title: 'Heritage Gold' },
  { src: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80', cat: 'smart', title: 'Smart Pro' },
  { src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80', cat: 'smart', title: 'Digital Elite' },
  { src: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80', cat: 'smart', title: 'Fitness Watch' },
  { src: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80', cat: 'mens', title: 'Executive Men' },
  { src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80', cat: 'mens', title: 'Sport Men' },
  { src: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80', cat: 'mens', title: 'Diver Pro' },
  { src: 'https://images.unsplash.com/photo-1609587312208-cea54be969e7?auto=format&fit=crop&w=800&q=80', cat: 'womens', title: 'Elegance Women' },
  { src: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=800&q=80', cat: 'womens', title: 'Rose Gold Ladies' },
  { src: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80', cat: 'womens', title: 'Pearl Collection' },
  { src: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80', cat: 'clocks', title: 'Grandfather Clock' },
  { src: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=800&q=80', cat: 'clocks', title: 'Wall Clock Classic' },
  { src: 'https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=800&q=80', cat: 'clocks', title: 'Modern Desk Clock' }
];

function renderGallery(filter) {
  filter = filter || 'all';
  filteredGallery = filter === 'all' ? galleryData.slice() : galleryData.filter(function (g) { return g.cat === filter; });

  var html = '';
  filteredGallery.forEach(function (g, i) {
    html += '<div class="gallery-item" data-index="' + i + '">' +
      '<img src="' + g.src + '" alt="' + g.title + '" loading="lazy">' +
      '</div>';
  });
  $('#galleryGrid').html(html);
}

function renderGalleryFilters() {
  var filters = [
    { key: 'all', label: 'All' },
    { key: 'luxury', label: 'Luxury' },
    { key: 'vintage', label: 'Vintage' },
    { key: 'smart', label: 'Smart' },
    { key: 'mens', label: 'Men' },
    { key: 'womens', label: 'Women' },
    { key: 'clocks', label: 'Clocks' }
  ];
  var html = '';
  filters.forEach(function (f, i) {
    html += '<button class="' + (i === 0 ? 'active' : '') + '" data-filter="' + f.key + '">' + f.label + '</button>';
  });
  $('#galleryFilters').html(html);
}

function openLightbox(index) {
  currentGalleryIndex = index;
  $('#lbImage').attr('src', filteredGallery[index].src);
  $('#lightbox').css('display', 'flex').hide().fadeIn(250);
}

function closeLightbox() {
  $('#lightbox').fadeOut(200);
}

function nextImage() {
  currentGalleryIndex = (currentGalleryIndex + 1) % filteredGallery.length;
  $('#lbImage').fadeOut(150, function () {
    $(this).attr('src', filteredGallery[currentGalleryIndex].src).fadeIn(150);
  });
}

function prevImage() {
  currentGalleryIndex = (currentGalleryIndex - 1 + filteredGallery.length) % filteredGallery.length;
  $('#lbImage').fadeOut(150, function () {
    $(this).attr('src', filteredGallery[currentGalleryIndex].src).fadeIn(150);
  });
}

$(document).ready(function () {
  renderGalleryFilters();
  renderGallery('all');

  $('#galleryFilters').on('click', 'button', function () {
    $('#galleryFilters button').removeClass('active');
    $(this).addClass('active');
    renderGallery($(this).data('filter'));
  });

  $('#galleryGrid').on('click', '.gallery-item', function () {
    openLightbox($(this).data('index'));
  });

  $('#lbClose').on('click', closeLightbox);
  $('#lbNext').on('click', nextImage);
  $('#lbPrev').on('click', prevImage);

  $(document).on('keydown', function (e) {
    if ($('#lightbox').is(':visible')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  });
});