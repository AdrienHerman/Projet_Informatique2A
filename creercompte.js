var nom = '';
var prenom = '';
var mail = '';
var mdp = '';
var qsecrete = '';

function recupInfoCompte() {
    nom = $('#nom').val();
    prenom = $('#prenom').val();
    mail = $('#mail').val();
    mdp = $('#mdp').val();
    qsecrete = $('#mdp').val();

    if (nom != '' && prenom != '' && mail != '' && mdp != '' && qsecrete != '') {
        mdp = mdpCrypte(mdp);
        verifierExistanceUtil(mail);
    } else {
        $('#erreur').css('visibility', 'visible');
    }
}