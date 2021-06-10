<?php
define("LOGIN", "root");
define("PASSWORD", "AHhook1@@86160")
define("SERVER", "localhost");
define("BASE", "Projet2A_Utilisateurs");

$dsn = "mysql:dbname=".BASE.";host=".SERVER;
$mail = $_GET['mail'];
$mdp = $_GET['password'];

try{
    $connexion = new PDO($dsn, $LOGIN, $PASSWORD);

    if ($connexion){
        $reponse = $connexion->query('SELECT COUNT(mail) FROM Personne WHERE mail="'.$mail.'";');
        $donne = $response->fetch()
        if ($donne['COUNT(mail)'] == 1) {
            echo "oui";
        } else {
            echo "non";
        }
    }
}
catch (PDOException $e) {
    echo "Impossible de se connecter à la base de données!";
    exit();
}
?>