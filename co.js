var mail = '';
var mdp = '';
var statut_co = false;
var cle = 'PROJETINFO';
var array = genererVigenere();

function connexion() {
    // Récupération des informations de l'utilisateur
    mail = $('#mail').val();
    mdp = $('#mdp').val();

    if (mail != '' && mdp != '') {
        // Cryptage du mot de passe
        mdpCrypte();
        // Remarque: Ici le cryptage n'a aucun intérêt puisque la clé est cachée dans le code....
        // Il s'agit plutôt d'inclure une petite partie de cybersécurité que nous avons vu en cours.

        // Création du cookie
        updateCookie(mail, mdp);

        connexionCompteUtil();
    } else {
        alert('Veuillez entrer un login et un mot de passe correct!');
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

function mdpCrypte() {
    // Crypter un mot de passe par la méthode de Vigenère
    var mdp_crypte = '';
    var j = 0;
    var a = 0;
    var o = 0;

    for (var i=0; i<mdp.length; i++) {
        if (j == cle.lenght) { j = 0; }                                                     // Parcourt de la clé

        if (charToAscii(mdp.charAt(i)) == 32) {                                             // Ajout d'un espace
            mdp_crypte += '';
        } else if (charToAscii(mdp.charAt(i)) >= 97 && charToAscii(mdp.charAt(i)) <= 132) { // Minuscules
            a = charToAscii(cle.charAt(j)) - 65;
            o = charToAscii(mdp.charAt(i)) - 32 - 65;
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

    mdp = mdp_crypte;
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