<!DOCTYPE html>

<html lang="fr">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="style.css">
        <script src="nouscontacter.js"></script>
        <script src="xmlhttprequest.js"></script>
        <script src="updatePage.js"></script>
        <script src="cookie.js"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
        <title>Nous contacter</title>
        <link rel="icon" type="image/png" href="favicon.png">
    </head>

    <body onload="update();">
        <header>
            <table>
                <tr>
                    <td><h1>Projet informatique 2A</h1></td>
                    <td id="nompage"><h1>Nous contacter</h1></td>
                </tr>
                <tr>
                    <td></td>
                    <td id="nompage">
                        <div class="coteacote">
                            <h4>Connecté en tant que :</h4>
                            <h4 id="iduser">Déconnecté</h4>
                        </div>
                    </td>
                </tr>
            </table>
            <div id="menu">
                <table>
                    <tr>
                        <td><a href="main.html"><h4>Accueil</h4></a></td>
                        <td><a href="affpark.html"><h4>Afficher tous les parkings</h4></a></td>
                        <td><a href="nous_contacter.php"><h4>Nous contacter</h4></a></td>
                        <td><a href="apropos.html"><h4>À Propos</h4></a></td>
                        <td><a href="creer_compte.html"><h4>Créer un compte</h4></a></td>
                        <td><a href="moncompte.html"><h4>Mon compte</h4></a></td>
                        <td><a href="connexion.html"><h4>Se connecter</h4></a></td>
                        <td><a href=""><h4 onclick="updateCookie();">Se déconnecter</h4></a></td>
                    </tr>
                </table>
            </div>
        </header>

        <div class="page">
            <div class="center">
                <form method="post">
                    <h1>Nous contacter</h1>
                    <table id="nouscontacter" style="margin-left: auto; margin-right:auto;">
                        <tr>
                            <td><h4>Nom de famille :</h4></td>
                            <td><input type="text" id="nom"></td>
                        </tr>
                        <tr>
                            <td><h4>Prénom :</label></h4></td>
                            <td><input type="text" id="prenom"></td>
                        </tr>
                        <tr>
                            <td><h4>E-Mail :</h4></td>
                            <td><input type="email" id="mail"></td>
                        </tr>
                        <tr>
                            <td><h4>Objet:</h4></td>
                            <td><input type="text" id="objet"></td>
                        </tr>
                        <tr>
                            <td><h4>Votre demande:</h4></td>
                            <td><textarea type="text" id="message" placeholder="Exprimez votre demande"></textarea></td>
                        </tr>
                    </table>

                    <input id="envoyer" type="submit" value="Envoyer">
                </form>

                <div style="height: 150px;"></div>
            </div>
        </div>

        <?php
        if (isset($_POST['message'])) {
            $position_arobase = strpos($_POST['email'], '@');
            if ($position_arobase === false)
                echo '<p>Votre email doit comporter un arobase.</p>';
            else {
                $retour = mail('projet2a.informatique@gmail.com', 'Envoi depuis la page Contact: ' . $_POST['objet'], $_POST['message'], 'From: ' . $_POST['email']);
                if($retour)
                    echo '<p>Votre message a été envoyé.</p>';
                else
                    echo '<p>Erreur.</p>';
            }
        }
        ?>
    </body>
</html>