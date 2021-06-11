function update() {
    var nomprenom = getCookie('nomprenom');

    if (nomprenom != 'Déconnecté') {
        $('#iduser').html(nomprenom).css('color', 'rgb(125, 199, 107)');
    } else {
        $('#iduser').html('Déconnecté').css('color', 'rgb(253, 114, 114)');
    }
}

function updateCookie(mail='', mdp='', statutco=false, nomprenom='Déconnecté'){
    setCookie('mail', mail);
    setCookie('mdp', mdp);
    setCookie('statutco', statutco);
    setCookie('nomprenom', nomprenom);
}