<?php
define("LOGIN", "root");
define("PASSWORD", "AHhook1@@86160");
define("SERVER", "localhost");
define("BASE", "Projet2A_Utilisateurs");

$dsn = "mysql:dbname=".BASE.";host=".SERVER;
$mail = $_GET['mail'];
$mdp = $_GET['mdp'];
$nom = $_GET['nom'];
$prenom = $_GET['prenom'];
$qsecrete = $_GET['qsecrete'];

try{
    $connexion = new PDO($dsn, LOGIN, PASSWORD);

    if ($connexion){
        $response = $connexion->query('INSERT INTO Personne(nom, prenom, mail, mdp, qsecrete) VALUES ("'.$nom.'", "'.$prenom.'", "'.$mail.'", "'.$mdp.'", "'.$qsecrete.'");');
        echo $response->fetch();
        $response->closeCursor();
    }
}
catch (PDOException $e) {
    echo "failed";
    exit();
}
?>