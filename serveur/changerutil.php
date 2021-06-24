<?php
define("LOGIN", "VotreLogin");
define("PASSWORD", "VotreMotDePasse");
define("SERVER", "localhost");
define("BASE", "Projet2A_Utilisateurs");

$dsn = "mysql:dbname=".BASE.";host=".SERVER;
$prenom = $_GET['prenom'];
$nom = $_GET['nom'];
$mail = $_GET['mail'];

try{
    $connexion = new PDO($dsn, LOGIN, PASSWORD);

    if ($connexion){
        $response = $connexion->query('UPDATE Personne SET nom="'.$nom.'" WHERE mail="'.$mail.'";');
        $response->closeCursor();
        $response = $connexion->query('UPDATE Personne SET prenom="'.$prenom.'" WHERE mail="'.$mail.'";');
        $response->closeCursor();
        
        echo "success";
    }
}
catch (PDOException $e) {
    echo "failed";
    exit();
}
?>