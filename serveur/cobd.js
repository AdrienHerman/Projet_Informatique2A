function connexionCompteUtil() {
    var mail = getCookie('mail');
    var mdp = getCookie('mdp');
    var moncompte = getCookie('moncompte');

    if (mail != '' && mdp != '') {
        var xhr = getXMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                var response_xml = xhr.responseText;
    
                switch (response_xml) {
                    case 'true':                        
                        var xhr_getUser = getXMLHttpRequest();
                        xhr_getUser.onreadystatechange = function() {
                            if (xhr_getUser.readyState == 4 && (xhr_getUser.status == 200 || xhr_getUser.status == 0)) {
                                var response_xml = xhr_getUser.responseText.split(';');
                                
                                var nomprenom = '' + response_xml[1] + ' ' + response_xml[0];
                                updateCookie(mail, mdp, true, nomprenom, moncompte);

                                if (moncompte == 'true') {
                                    window.location.href = 'moncompte.html';
                                } else {
                                    window.location.href = 'main.html';
                                }
                            }
                        }

                        xhr_getUser.open('GET', 'serveur/getUser.php?mail=' + mail, true);
                        xhr_getUser.send(null);

                        break;
                    
                    case 'false':
                        $('#mail').css('border', '1px solid rgb(253, 114, 114)');
                        $('#mdp').css('border', '1px solid rgb(253, 114, 114)');
                        $('#erreurmdp').html('Mot de passe ou e-mail incorrect !');

                        break;
                    
                    case 'failed':
                        alert('Impossible de se connecter à la base de données!');
                        break;
                }
            }
        }
    
        xhr.open('GET', 'serveur/cobd.php?mail=' + mail + '&password=' + mdp, true);
        xhr.send(null);
    }
}