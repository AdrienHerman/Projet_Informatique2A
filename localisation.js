var maLatitude = .0;
var maLongitude = .0;
var pointer = false;

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
  
function success(pos) {
    maLatitude = pos.coords.latitude;
    maLongitude = pos.coords.longitude;

    if (pointer) {
        var lonLat = new OpenLayers.LonLat(maLongitude, maLatitude).transform(
        new OpenLayers.Projection("EPSG:4326"),
        map.getProjectionObject()
        );

        var size = new OpenLayers.Size(21, 40);
        var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
        var icon = new OpenLayers.Icon('http://localhost/img/marker2.png', size, offset);

        var markers = new OpenLayers.Layer.Markers("Markers");
        map.addLayer(markers);
        
        markers.addMarker(new OpenLayers.Marker(lonLat, icon));
        pointer = false;
    }
}
  
function error(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
}

function meLocaliser() {
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function convertRad(input) {
    return (input * 2 * Math.PI) / 360;
}

function distance(lat1, lon1, lat2=maLatitude, lon2=maLongitude, unit='K') {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = convertRad(lat1);
        var radlat2 = convertRad(lat2);
        var theta = lon1-lon2;
        var radtheta = convertRad(theta);
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=='K') { dist = dist * 1.609344 }
        if (unit=='N') { dist = dist * 0.8684 }
        return dist;
    }
}

function affParkPlusProche() {
    var dist = [];
    var command = '<tr><td class="entetetable">État du parking</td><td class="entetetable">Ville</td><td class="entetetable">Places disponibles</td><td class="entetetable">Adresse</td><td class="entetetable">Distance à vol d\'oiseau</td></tr>';

    meLocaliser();

    for (var i=0; i<coordinates.length; i++) {
        dist.push( distance(coordinates[i][1], coordinates[i][0]));
    }

    for (var j=0; j<3; j++) {
        var min = 40075;    // Circonférence de la Terre en km
        var min_i = 0;
        for (var i=0; i<etat.length; i++) {
            if (dist[i] != 0 && dist[i] < min && etat[i] != 'COMPLET' && etat[i] != '.' && etat[i] != 'FERME') {
                min = dist[i];
                min_i = i;
            }
        }
        command += '<tr><td class="vert">' + etat[min_i] + '</td><td>' + ville[min_i] + '</td><td>' + dispo[min_i] + ' / ' + max[min_i] + '</td><td>' + adresse[min_i] + '</td><td>' + Math.round(min*100)/100 + ' km</td></tr>';
        dist[min_i] = 0;
    }

    $('#parkplusproche').html(command);
}

function addMarkerLonLat(lon=.0, lat=.0, currentpos=false) {
    if (currentpos) {
        meLocaliser();
        pointer = true;
    } else {
        var lonLat = new OpenLayers.LonLat(lon, lat).transform(
        new OpenLayers.Projection("EPSG:4326"),
        map.getProjectionObject()
        );

        var size = new OpenLayers.Size(21, 40);
        var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
        var icon = new OpenLayers.Icon('http://localhost/img/marker1.png', size, offset);

        var markers = new OpenLayers.Layer.Markers("Markers");
        map.addLayer(markers);
    
        markers.addMarker(new OpenLayers.Marker(lonLat, icon));
    }
}