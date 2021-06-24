<?php
define("LOGIN", "VotreLogin");
define("PASSWORD", "VotreMotDePasse");
define("SERVER", "localhost");
define("BASE", "Projet2A_Utilisateurs");

$dsn = "mysql:dbname=".BASE.";host=".SERVER;
$mail = $_GET['mail'];
$exist = false;

try{
    $connexion = new PDO($dsn, LOGIN, PASSWORD);

    if ($connexion){
        $response = $connexion->query('SELECT COUNT(mail) FROM Personne WHERE mail="'.$mail.'";');
        $donne = $response->fetch();

        if ($donne['COUNT(mail)'] == 1) {
            $exist = true;
        }

        if ($exist) {
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