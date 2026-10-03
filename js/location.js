$(document).ready(function () {
  var defaultCity = 'Karachi';
  var userLocation = defaultCity;

  function updateTicker() {
    var now = new Date();
    var dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    var timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    var msg = 'Welcome to Alberto Watch Company  |  Date: ' + dateStr + '  |  Time: ' + timeStr + '  |  Location: ' + userLocation + '  |  Luxury Watches • Clocks • Repair • Appraisal  |  ';
    $('#tickerContent').text(msg + msg);
  }

  updateTicker();
  setInterval(updateTicker, 1000);

  $('#detectLocation').on('click', function () {
    var statusEl = $('#locationStatus');
    var coordsEl = $('#userCoords');
    var mapLink = $('#mapLink');

    if (!navigator.geolocation) {
      statusEl.text('Geolocation is not supported by your browser.');
      return;
    }

    statusEl.text('Detecting your location...');
    coordsEl.text('');
    mapLink.hide();

    navigator.geolocation.getCurrentPosition(
      function (position) {
        var lat = position.coords.latitude.toFixed(6);
        var lon = position.coords.longitude.toFixed(6);
        statusEl.text('Location detected successfully:');
        coordsEl.text('Latitude: ' + lat + '  |  Longitude: ' + lon);
        userLocation = lat + ', ' + lon;
        mapLink.attr('href', 'https://www.google.com/maps?q=' + lat + ',' + lon).show();
        showToast('Location detected. Opening map option is now available.');
        updateTicker();
      },
      function (error) {
        var msg = 'Location permission denied.';
        if (error.code === error.POSITION_UNAVAILABLE) msg = 'Location information unavailable.';
        if (error.code === error.TIMEOUT) msg = 'Location request timed out.';
        statusEl.text(msg + ' Using default location.');
        coordsEl.text('');
        userLocation = defaultCity;
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
});