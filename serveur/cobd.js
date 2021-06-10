function connexionCompteUtil() {
    var mail = getCookie('mail');
    var mdp = getCookie('mdp');

    if (mail != '' && mdp != '') {
        var xhr = getXMLHttpRequest();

        xhr.onreadystatechange = function(statut_co) {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                var response_xml = xhr.responseText;
    
                if (response_xml == 'true') {
                    update(true);
                } else {
                    alert('Impossible de se connecter à la base de données!');
                    update(false);
                }
            }
        }
    
        xhr.open('GET', 'serveur/cobd.php?mail=' + mail + '&password=' + mdp, true);
        xhr.send(null);
    }
}