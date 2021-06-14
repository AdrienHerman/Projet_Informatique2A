function update(mdpOublie=false) {
    var nomprenom = getCookie('nomprenom');

    if (nomprenom != 'Déconnecté' && nomprenom != '') {
        $('#iduser').html(nomprenom).css('color', 'rgb(125, 199, 107)');
    } else {
        $('#iduser').html('Déconnecté').css('color', 'rgb(253, 114, 114)');
    }

    if (mdpOublie) {
        $('#mail').val(getCookie('mail'));
    }
}

function updateCookie(mail='', mdp='', statutco=false, nomprenom='Déconnecté', moncompte=false){
    setCookie('mail', mail);
    setCookie('mdp', mdp);
    setCookie('statutco', statutco);
    setCookie('nomprenom', nomprenom);
    setCookie('moncompte', moncompte);
}