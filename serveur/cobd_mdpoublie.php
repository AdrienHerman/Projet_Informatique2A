<?php
define("LOGIN", "root");
define("PASSWORD", "AHhook1@@86160");
define("SERVER", "localhost");
define("BASE", "Projet2A_Utilisateurs");

$dsn = "mysql:dbname=".BASE.";host=".SERVER;
$mail = $_GET['mail'];
$qsecrete = $_GET['qsecrete'];

try{
    $connexion = new PDO($dsn, LOGIN, PASSWORD);

    if ($connexion){
        $response = $connexion->query('SELECT qsecrete FROM Personne WHERE mail="'.$mail.'";');
        $donne = $response->fetch();

        if ($donne['qsecrete'] == $qsecrete) {
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