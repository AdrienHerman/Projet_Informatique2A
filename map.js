var map;
var popup;
/*
function init() {
  map = new OpenLayers.Map("map");
  var mapnik = new OpenLayers.Layer.OSM();
  map.addLayer(mapnik);
  map.setCenter(new OpenLayers.LonLat(2.9771, 50.6311554)
    .transform(
      new OpenLayers.Projection("EPSG:4326"),
      new OpenLayers.Projection("EPSG:900913")
    ), 10
  );

  OpenLayers.Layer.control.scale().addTo(map);
  map.scrollWheelZoom.disable();
}

function addMarker(lon=.0, lat=.0, text='') {
    L.marker([lon, lat]).addTo(map)
        .bindPopup(text).openPopup();
}

function init() {
    var map = L.map('map').setView([50.6311554, 2.9771], 10);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(map);

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("Vous avez clické à:  " + e.latlng.toString())
			.openOn(map);
	}

	map.on('click', onMapClick);

    addMarkerLonLat(.0, .0, true);
}*/