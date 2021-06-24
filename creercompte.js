var nom = '';
var prenom = '';
var mail = '';
var mdp = '';
var qsecrete = '';

function recupInfoCompte() {
    nom = $('#nom').val();
    prenom = $('#prenom').val();
    mail = $('#mail').val();
    mdp1 = $('#mdp1').val();
    mdp2 = $('#mdp2').val();
    qsecrete = $('#qsecrete').val();

    if (nom != '' && prenom != '' && verifMailValide(mail) && mdp1 == mdp2 && mdp1 != '' && mdp1.length <= 50 && qsecrete != '') {
        mdp = mdpCrypte(mdp1);
        verifierExistanceUtil(mail);
    } else if (mdp1 != mdp2) {
        $('#erreur').css('visibility', 'visible').html('Les mots de passe doivent-être identiques!');
    } else if (mdp1.length > 50) {
        $('#erreur').css('visibility', 'visible').html('Mot de passe trop long!');
    } else if (!verifMailValide(mail)) {
        $('#erreur').css('visibility', 'visible').html('Vous devez renseigner une adresse mail valide!');
    }else {
        $('#erreur').css('visibility', 'visible');
    }
}