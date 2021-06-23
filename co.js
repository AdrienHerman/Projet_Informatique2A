var mail = '';
var mdp = '';
var statut_co = false;
var cle = 'PROJET';
var array = genererVigenere();

function connexion() {
    // Récupération des informations de l'utilisateur
    mail = $('#mail').val();
    mdp = $('#mdp').val();

    if (verifMailValide(mail) && mdp != '') {
        // Cryptage du mot de passe
        mdp = mdpCrypte(mdp);
        // Remarque: Ici le cryptage n'a aucun intérêt puisque la clé est cachée dans le code....
        // Il s'agit plutôt d'inclure une petite partie de cybersécurité que nous avons vu en cours.

        // Création du cookie
        updateCookie(mail, mdp, false, 'Déconnecté', getCookie('moncompte'));

        connexionCompteUtil();
    } else {
        $('#erreurmdp').html('Veuillez entrer un email et un mot de passe correct!');
        $('#mdp').css('border', '1px solid rgb(253, 114, 114)');
        $('#mail').css('border', '1px solid rgb(253, 114, 114)');
    }
}

function charToAscii(char) {
    return char.charCodeAt(0);
}

function asciiToChar(ascii) {
    return String.fromCharCode(ascii);
}

function genererVigenere() {
    // Générer le tableau de Vigenère
    var array = new Array(25);

    for (var i=0; i<26; i++) {
        array[i] = new Array(25);
    }

    var increment = 65;                                 // C'est A
    for (var i=0; i<26; i++) {
        increment = 65 + i;
        for (var j=0; j<26; j++) {
            if (increment == 91) { increment = 65; }    // Si on est arrivé à Z
            array[i][j] = asciiToChar(increment);
            increment++;
        }
    }

    return array;
}

function mdpCrypte(mdp) {
    // Crypter un mot de passe par la méthode de Vigenère
    var mdp_crypte = '';
    var j = 0;
    var length_cle = cle.length;
    var a = 0;
    var o = 0;

    for (var i=0; i<mdp.length; i++) {
        if (j >= length_cle) {                                                              // Parcourt de la clé
            j = 0;
        }

        if (charToAscii(mdp.charAt(i)) == 32) {                                             // Ajout d'un espace
            mdp_crypte += '';
        } else if (charToAscii(mdp.charAt(i)) >= 97 && charToAscii(mdp.charAt(i)) <= 122) { // Minuscules
            a = charToAscii(cle.charAt(j)) - 65;
            o = charToAscii(mdp.charAt(i)) - 97;    //-32-65
            mdp_crypte += asciiToChar(charToAscii(array[a][o]) + 32);
            j++;
        } else if (charToAscii(mdp.charAt(i)) >= 65 && charToAscii(mdp.charAt(i)) <= 90) {   // Majuscules
            a = charToAscii(cle.charAt(j)) - 65;
            o = charToAscii(mdp.charAt(i)) - 65;
            mdp_crypte += array[a][o];
            j++;
        } else {                                                                             // Autres caractères
            mdp_crypte += mdp.charAt(i);
            j++;
        }
    }

    return mdp_crypte;
}

function mdpDecrypte() {
    // Décrypter un mot de passe chiffré par Vigenère (pour tester)
    var mdp_decrypte = '';
    var j = 0;
    var a = 0;
    var o = 0;

    for (var i=0; i<mdp.length; i++) {
        if (j == cle.length) { j = 0; }

        if (charToAscii(mdp.charAt(i)) == 32) {                                             // Ajout d'un espace
            mdp_decrypte += ' ';
        } else if (charToAscii(mdp.charAt(i)) >= 97 && charToAscii(mdp.charAt(i)) <= 122) { // Minuscules
            var temp = charToAscii(mdp.charAt(i)) - 32;
            o = charToAscii(cle.charAt(j)) - 65;

            for (k=0; k<26; k++) {
                if (array[o][k] == asciiToChar(temp)) { a = k; }
            }

            temp = array[0][a];
            mdp_decrypte += asciiToChar(charToAscii(temp) + 32);
            j++;
        } else if (charToAscii(mdp.charAt(i)) >= 65 && charToAscii(mdp.charAt(i)) <= 90) {  // Majuscules
            o = charToAscii(cle.charAt(j));

            for (k=0; k<26; k++) {
                if (array[o][k] == mdp.charAt(i)) { a = k; }
            }

            mdp_decrypte += array[0][a];
            j++;
        } else {                                                                            // Autres caractères
            mdp_decrypte += mdp.charAt(i);
            j++;
        }
    }

    mdp = mdp_decrypte;
}

function mdpOublie() {
    var mail = $('#mail').val();

    if (verifMailValide(mail)) {
        setCookie('mail', mail);
    }

    window.location.href = 'mdpoublie.html';
}

function verifMailValide(mail) {
    var valide = true;

    mail = mail.split('@');

    if (mail.length == 2) {
        mail = mail[1].split('.');
        if (!(mail.length == 2 && mail[0] != '' && mail[1] != '')) {
            valide = false;
        }
    } else {
        valide = false;
    }

    return valide;
}