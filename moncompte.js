function verifLoad() {
    var statut_co = getCookie('statutco');

    if (statut_co == 'true') {
        console.log("oui");
    } else {
        setCookie('moncompte', true);
        window.location.href = 'connexion.html';
    }
}