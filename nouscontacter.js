var nom = '';
var prenom = '';
var email = '';
var objet = '';
var message = '';
var mail_redige = 'Nom / Prénom: ';

function getMessage() {
    nom = $('#nom').val();
    prenom = $('#prenom').val();
    email = $('#mail').val();
    objet = $('#objet').val();
    message = $('#demande').val();

    mail_redige += nom + ' / ' + prenom + ' | ' + message;

    var xhr = getXMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
        var response_xml = xhr.responseText;
    
        console.log(response_xml);
    }}
    
    xhr.open('GET', 'serveur/sendmail.php?email=' + email + '&subject=' + objet + '&message=' + mail_redige, true);
    xhr.send(null);
}