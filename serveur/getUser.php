<?php
define("LOGIN", "root");
define("PASSWORD", "AHhook1@@86160");
define("SERVER", "localhost");
define("BASE", "Projet2A_Utilisateurs");

$dsn = "mysql:dbname=".BASE.";host=".SERVER;
$mail = $_GET['mail'];

try{
    $connexion = new PDO($dsn, LOGIN, PASSWORD);

    if ($connexion){
        $response = $connexion->query('SELECT prenom FROM Personne WHERE mail="'.$mail.'";');
        $prenom = $response->fetch()['prenom'];

        $response = $connexion->query('SELECT nom FROM Personne WHERE mail="'.$mail.'";');
        $nom = $response->fetch()['nom'];

        echo $prenom.";".$nom;

        $response->closeCursor();
    }
}
catch (PDOException $e) {
    echo "failed";
    exit();
}
?>