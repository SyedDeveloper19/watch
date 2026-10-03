var allProducts = [];
var currentProducts = [];
var currentCategory = 'all';

var categoryMap = {
  luxury: { name: 'Luxury Watches', icon: 'bi-gem' },
  vintage: { name: 'Vintage Watches', icon: 'bi-hourglass-split' },
  smart: { name: 'Smart Watches', icon: 'bi-smartwatch' },
  mens: { name: "Men's Watches", icon: 'bi-person' },
  womens: { name: "Women's Watches", icon: 'bi-person-dress' },
  clocks: { name: 'Luxury Clocks', icon: 'bi-clock-history' }
};

function formatPrice(n) {
  return 'PKR ' + n.toLocaleString('en-PK');
}

function loadProducts(callback) {
  $.getJSON('data/products.json')
    .done(function (data) {
      allProducts = data;
      currentProducts = data.slice();
      callback();
    })
    .fail(function () {
      $('#productGrid').html('<p class="text-danger text-center">Failed to load product data. Please run with Live Server.</p>');
    });
}

function renderCategoryCards() {
  var html = '';
  Object.keys(categoryMap).forEach(function (key) {
    html += '<div class="category-card" data-cat="' + key + '">' +
      '<i class="bi ' + categoryMap[key].icon + '"></i>' +
      '<h6>' + categoryMap[key].name + '</h6>' +
      '</div>';
  });
  $('#categoryGrid').html(html);

  var opts = '<option value="all">All Categories</option>';
  Object.keys(categoryMap).forEach(function (key) {
    opts += '<option value="' + key + '">' + categoryMap[key].name + '</option>';
  });
  $('#filterCategory').html(opts);
  $('#priceFilterCat').html(opts);
}

function renderProducts(list) {
  var grid = $('#productGrid');
  grid.empty();

  if (!list.length) {
    $('#noResults').show();
    $('#productCount').text('Showing 0 products');
    return;
  }
  $('#noResults').hide();

  var html = '';
  list.forEach(function (p) {
    html += '<div class="col-lg-3 col-md-4 col-sm-6">' +
      '<div class="product-card">' +
      '<div class="product-img-wrap">' +
      '<span class="product-badge">' + (categoryMap[p.category] ? categoryMap[p.category].name.split(' ')[0] : 'Watch') + '</span>' +
      '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" onerror="this.src=\'https://via.placeholder.com/400x400/202020/C9A96E?text=' + encodeURIComponent(p.brand) + '\'">' +
      '</div>' +
      '<div class="product-body">' +
      '<div class="product-brand">' + p.brand + '</div>' +
      '<h5 class="product-name">' + p.name + '</h5>' +
      '<p class="product-desc">' + p.shortDesc + '</p>' +
      '<div class="product-price">' + formatPrice(p.price) + '</div>' +
      '<button class="btn btn-outline-gold btn-sm view-details" data-id="' + p.id + '">View Details</button>' +
      '</div>' +
      '</div>' +
      '</div>';
  });
  grid.html(html);
  $('#productCount').text('Showing ' + list.length + ' products');
}

function applyFilters() {
  var search = $('#productSearch').val().toLowerCase().trim();
  var cat = $('#filterCategory').val();
  var sort = $('#sortPrice').val();

  var list = allProducts.filter(function (p) {
    var matchCat = (cat === 'all') || (p.category === cat);
    var matchSearch = !search || p.name.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  if (sort === 'low-high') list.sort(function (a, b) { return a.price - b.price; });
  else if (sort === 'high-low') list.sort(function (a, b) { return b.price - a.price; });

  currentProducts = list;
  renderProducts(list);

  var label = cat === 'all' ? 'All Products' : categoryMap[cat].name;
  $('#activeFilter').text(label);
}

function renderPriceTable() {
  var search = $('#priceSearch').val().toLowerCase().trim();
  var cat = $('#priceFilterCat').val();
  var sort = $('#priceSort').val();

  var list = allProducts.filter(function (p) {
    var matchCat = (cat === 'all') || (p.category === cat);
    var matchSearch = !search || p.name.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  if (sort === 'low-high') list.sort(function (a, b) { return a.price - b.price; });
  else if (sort === 'high-low') list.sort(function (a, b) { return b.price - a.price; });

  var html = '';
  list.forEach(function (p) {
    html += '<tr>' +
      '<td><img src="' + p.image + '" alt="' + p.name + '" onerror="this.src=\'https://via.placeholder.com/60/202020/C9A96E?text=W\'"></td>' +
      '<td>' + p.name + '</td>' +
      '<td>' + p.brand + '</td>' +
      '<td>' + (categoryMap[p.category] ? categoryMap[p.category].name : p.category) + '</td>' +
      '<td class="text-gold fw-bold">' + formatPrice(p.price) + '</td>' +
      '<td><button class="btn btn-outline-gold btn-sm view-details" data-id="' + p.id + '">View</button></td>' +
      '</tr>';
  });
  $('#priceTableBody').html(html || '<tr><td colspan="6" class="text-center text-muted">No products found.</td></tr>');
}

function openProductModal(id) {
  var p = allProducts.find(function (x) { return x.id === id; });
  if (!p) return;

  $('#pmTitle').text(p.name);
  $('#pmImage').attr('src', p.image).attr('alt', p.name);
  $('#pmBrand').text(p.brand);
  $('#pmModel').text(p.model);
  $('#pmCategory').text(categoryMap[p.category] ? categoryMap[p.category].name : p.category);
  $('#pmPrice').text(formatPrice(p.price));
  $('#pmDesc').text(p.description);
  $('#pmMaterial').text(p.material);
  $('#pmMovement').text(p.movement);
  $('#pmWater').text(p.waterResistance);
  $('#pmWarranty').text(p.warranty);
  $('#pmAvailability').text(p.availability);

  $('#addWishlist').data('id', p.id);
  new bootstrap.Modal(document.getElementById('productModal')).show();
}

function addToWishlist(id) {
  var list = JSON.parse(localStorage.getItem('albertoWishlist') || '[]');
  if (list.indexOf(id) === -1) {
    list.push(id);
    localStorage.setItem('albertoWishlist', JSON.stringify(list));
    showToast('Added to wishlist!');
  } else {
    showToast('Already in your wishlist.');
  }
}

$(document).ready(function () {
  renderCategoryCards();

  loadProducts(function () {
    renderProducts(allProducts);
    renderPriceTable();

    $('#categoryGrid').on('click', '.category-card', function () {
      var cat = $(this).data('cat');
      currentCategory = cat;
      $('#filterCategory').val(cat);
      applyFilters();
      $('html, body').animate({ scrollTop: $('#products').offset().top - 80 }, 600);
    });

    $('#productSearch, #filterCategory, #sortPrice').on('input change', applyFilters);

    $('#priceSearch, #priceFilterCat, #priceSort').on('input change', renderPriceTable);

    $('#resetFilters').on('click', function () {
      $('#productSearch').val('');
      $('#filterCategory').val('all');
      $('#sortPrice').val('default');
      applyFilters();
      showToast('Filters reset.');
    });

    $(document).on('click', '.view-details', function () {
      var id = parseInt($(this).data('id'), 10);
      openProductModal(id);
    });

    $('#addWishlist').on('click', function () {
      addToWishlist($(this).data('id'));
    });

    $('a[data-cat]').on('click', function (e) {
      e.preventDefault();
      var cat = $(this).data('cat');
      $('#filterCategory').val(cat);
      applyFilters();
      $('html, body').animate({ scrollTop: $('#products').offset().top - 80 }, 600);
    });
  });
});