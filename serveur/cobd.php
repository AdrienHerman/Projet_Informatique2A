<?php
define("LOGIN", "VotreLogin");
define("PASSWORD", "VotreMotDePasse");
define("SERVER", "localhost");
define("BASE", "Projet2A_Utilisateurs");

$dsn = "mysql:dbname=".BASE.";host=".SERVER;
$mail = $_GET['mail'];
$mdp = $_GET['password'];

try{
    $connexion = new PDO($dsn, LOGIN, PASSWORD);

    if ($connexion){
        $response = $connexion->query('SELECT COUNT(mail) FROM Personne WHERE mail="'.$mail.'" AND mdp="'.$mdp.'";');
        $donne = $response->fetch();

        if ($donne['COUNT(mail)'] == 1) {
            echo "true";
        } else {
            echo "false";
        }

        $response->closeCursor();
    }
}
catch (PDOException $e) {
    echo "failed";
    exit();
}
?>