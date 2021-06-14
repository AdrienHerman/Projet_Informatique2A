var etat = [];
var ville = [];
var dispo = [];
var coordinates = [];
var max = [];
var adresse = [];
var heureactu = '';

function coOpenData(url='https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=disponibilite-parkings&q=&facet=libelle&facet=ville&facet=etat') {
    $.getJSON(url, function(data, status, xhr) {
        $.each(data.records, function(i,item) {
                                    etat.push(item.fields.etat);
                                    ville.push(item.fields.ville);
                                    dispo.push(item.fields.dispo);
                                    coordinates.push([]);
                                    $.each(item.fields.geometry.coordinates, function(j, jtem) {
                                        coordinates[i].push(jtem);
                                    });
                                    max.push(item.fields.max);
                                    adresse.push(item.fields.adresse);
                                    heureactu = (item.record_timestamp);
                                });

        heureactu = heureactu.split('T');
        heureactu = heureactu[1].substr(0, 5);
        heureactu = heureactu.split(':');
        heureactu[0] = parseInt(heureactu[0]) + 2;
        
        printData();
    });
}

function printData() {
    if (window.location.href == 'http://localhost/affpark.html') {
        var command = '<tr><td class="entetetable">État du parking</td><td class="entetetable">Ville</td><td class="entetetable">Places disponibles</td><td class="entetetable">Adresse</td></tr>';
        
        for (var i=0; i<etat.length; i++) {
            if (etat[i] == 'FERME' || etat[i] == 'COMPLET') {
                command += '<tr><td class="rouge">' + etat[i] + '</td><td>' + ville[i] + '</td><td>' + dispo[i] + ' / ' + max[i] + '</td><td>' + adresse[i] + '</td></tr>';
            } else if (etat[i] == 'OUVERT') {
                command += '<tr><td class="vert">' + etat[i] + '</td><td>' + ville[i] + '</td><td>' + dispo[i] + ' / ' + max[i] + '</td><td>' + adresse[i] + '</td></tr>';
            } else {
                command += '<tr><td>' + etat[i] + '</td><td>' + ville[i] + '</td><td>' + dispo[i] + ' / ' + max[i] + '</td><td>' + adresse[i] + '</td></tr>';
            }
        }
        
        $('#heureactuh4').html(heureactu[0] + 'h' + heureactu[1]);
        $('#parkdispo').html('');
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        $('#parkdispo').html(command);
    }
}