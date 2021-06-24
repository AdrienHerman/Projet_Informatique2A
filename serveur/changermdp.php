<?php
define("LOGIN", "VotreLogin");
define("PASSWORD", "VotreMotDePasse");
define("SERVER", "localhost");
define("BASE", "Projet2A_Utilisateurs");

$dsn = "mysql:dbname=".BASE.";host=".SERVER;
$mdp = $_GET['mdp'];
$mail = $_GET['mail'];

try{
    $connexion = new PDO($dsn, LOGIN, PASSWORD);

    if ($connexion){
        $response = $connexion->query('UPDATE Personne SET mdp="'.$mdp.'" WHERE mail="'.$mail.'";');
        $response->closeCursor();
        
        echo "success";
    }
}
catch (PDOException $e) {
    echo "failed";
    exit();
}
?>