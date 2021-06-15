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

function verifierQSecrete() {
    var mail = $('#mail').val();
    var qsecrete = $('#qsecrete').val();

    if (mail != '' && qsecrete != '') {
        var xhr = getXMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                var response_xml = xhr.responseText;
    
                switch (response_xml) {
                    case 'true':                        
                        $('#changermdpform').css('visibility', 'visible');
                        $('#changermdpbutton').css('visibility', 'visible');
                        $('#qsecretefausse').html('');
                        break;
                    
                    case 'false':
                        $('.qsecrete').css('border', '1px solid rgb(253, 114, 114)');
                        $('.mail').css('border', '1px solid rgb(253, 114, 114)');
                        $('#qsecretefausse').html('Question secrète ou e-mail incorrecte!').css('color', 'rgb(253, 114, 114)');
                        break;
                    
                    case 'failed':
                        alert('Impossible de se connecter à la base de données!');
                        break;
                }
            }
        }
    
        xhr.open('GET', 'serveur/cobd_mdpoublie.php?mail=' + mail + '&qsecrete=' + qsecrete, true);
        xhr.send(null);
    } else {
        alert('Veuillez renseigner votre adresse mail et la question secrète associée!');
    }
}

function changerMdp() {
    var mdp1 = $('#mdp1').val();
    var mdp2 = $('#mdp2').val();
    var mail = $('#mail').val();

    if (mdp1 == mdp2) {
        $('#mdpincorrect').html('');
        
        mdp2 = mdpCrypte(mdp1);

        var xhr = getXMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                var response_xml = xhr.responseText;
    
                switch (response_xml) {
                    case 'success':
                        window.location.href = 'connexion.html';
                        break;
                                       
                    case 'failed':
                        alert('Impossible de se connecter à la base de données!');
                        break;
                }
            }
        }
    
        xhr.open('GET', 'serveur/changermdp.php?mdp=' + mdp2 + '&mail=' + mail, true);
        xhr.send(null);
    } else {
        $('#mdpincorrect').html('Mot de passe incorrect!').css('color', 'rgb(253, 114, 114)');
    }
}

function verifierExistanceUtil(mail) {
    var xhr = getXMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            var response_xml = xhr.responseText;
    
            switch (response_xml) {
                case 'true':                        
                    $('#erreur').html('L\'utilisateur existe d\'éjà!').css('visibility', 'visible');
                    break;
                    
                case 'false':
                    var xhr_creation = getXMLHttpRequest();

                    xhr_creation.onreadystatechange = function() {
                        if (xhr_creation.readyState == 4 && (xhr_creation.status == 200 || xhr_creation.status == 0)) {
                            var response_xml = xhr_creation.responseText;

                            if (response_xml != 'failed') {
                                window.location.href = 'connexion.html';
                            } else {
                                alert('Impossible de se connecter à la base de données!');
                            }
                        }
                    }

                    xhr_creation.open('GET', 'serveur/creationUtil.php?mail=' + mail + '&mdp=' + mdp + '&nom=' + nom + '&prenom=' + prenom + '&qsecrete=' + qsecrete, true);
                    xhr_creation.send(null);
                    break;
                    
                case 'failed':
                    alert('Impossible de se connecter à la base de données!');
                    break;
            }
        }
    }
    
    xhr.open('GET', 'serveur/verifExistUtil.php?mail=' + mail, true);
    xhr.send(null);
}