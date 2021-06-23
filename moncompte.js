function verifLoad() {
    var statut_co = getCookie('statutco');
    var spprcompte = getCookie('spprcompte');

    if (statut_co == 'true' && spprcompte == 'false') {
        var nomprenom = getCookie('nomprenom').split(' ');
        $('#nom').val(nomprenom[0]);
        $('#prenom').val(nomprenom[1]);
        $('#mail1').val(getCookie('mail'));
    } else if (statut_co == 'false' && spprcompte == 'false') {
        setCookie('moncompte', 'true');
        window.location.href = 'connexion.html';
    } else {
        $('#spprcompte').css('color', 'rgb(125, 199, 107)');
        $('#spprcompteconf').css('color', 'rgb(125, 199, 107)');
        $('#spprcompteincorrect').html('Compte utilisateur supprimé avec succès!').css('color', 'rgb(125, 199, 107)');
        setCookie('spprcompte', 'false');
        update();
        $('#nom').val('');
        $('#prenom').val('');
        $('#utilincorrect').html('');
        $('#mail1').val('');
        $('#mail2').val('');
        $('#mailincorrect').html('');
        $('#qsecrete1').val('');
        $('#qsecrete2').val('');
        $('#qsecreteincorrect').html('');
        $('#spprcompteconf').css('visibility', 'visible');
    }
}

function changeUtil() {
    var nom = $('#nom').val();
    var prenom = $('#prenom').val();
    var mail = getCookie('mail');

    if (nom != '' && prenom != '' && spprcompte != '') {
        changeUtilBd(nom, prenom, mail);
    } else if (mail == '') {
        $('#nom').css('border', '1px solid rgb(253, 114, 114)');
        $('#prenom').css('border', '1px solid rgb(253, 114, 114)');
        $('#utilincorrect').html('Vous venez de supprimer votre compte utilisateur!').css('color', 'rgb(253, 114, 114)');
    } else {
        $('#nom').css('border', '1px solid rgb(253, 114, 114)');
        $('#prenom').css('border', '1px solid rgb(253, 114, 114)');
        $('#utilincorrect').html('Ces champs sont obligatoires!').css('color', 'rgb(253, 114, 114)');
    }
}

function changeMail() {
    var mail = getCookie('mail');
    var mail1 = $('#mail1').val();
    var mail2 = $('#mail2').val();

    if (mail1 == mail2 && verifMailValide(mail1)) {
        changeMailBd(mail, mail1);
    } else if (mail == '') {
        $('#mail1').css('border', '1px solid rgb(253, 114, 114)');
        $('#mail2').css('border', '1px solid rgb(253, 114, 114)');
        $('#mailincorrect').html('Vous venez de supprimer votre compte utilisateur!').css('color', 'rgb(253, 114, 114)');
    } else {
        $('#mail1').css('border', '1px solid rgb(253, 114, 114)');
        $('#mail2').css('border', '1px solid rgb(253, 114, 114)');
        $('#mailincorrect').html('Les deux adresses mails sont différentes ou invalides!').css('color', 'rgb(253, 114, 114)');
    }
}

function changeQSecrete() {
    var mail = getCookie('mail');
    var qsecrete1 = $('#qsecrete1').val();
    var qsecrete2 = $('#qsecrete2').val();

    if (qsecrete1 == qsecrete2 && qsecrete1 != '' && verifMailValide(mail)) {
        changeQSecreteBd(mail, qsecrete1);
    } else if (mail == '') {
        $('#qsecrete1').css('border', '1px solid rgb(253, 114, 114)');
        $('#qsecrete2').css('border', '1px solid rgb(253, 114, 114)');
        $('#qsecreteincorrect').html('Vous venez de supprimer votre compte utilisateur!').css('color', 'rgb(253, 114, 114)');
    } else {
        $('#qsecrete1').css('border', '1px solid rgb(253, 114, 114)');
        $('#qsecrete2').css('border', '1px solid rgb(253, 114, 114)');
        $('#qsecreteincorrect').html('Les deux questions secrètes sont différentes ou invalides!').css('color', 'rgb(253, 114, 114)');
    }
}