<?php
define("LOGIN", "root");
define("PASSWORD", "AHhook1@@86160");
define("SERVER", "localhost");
define("BASE", "Projet2A_Utilisateurs");

$dsn = "mysql:dbname=".BASE.";host=".SERVER;
$qsecrete = $_GET['qsecrete'];
$mail = $_GET['mail'];

try{
    $connexion = new PDO($dsn, LOGIN, PASSWORD);

    if ($connexion){
        $response = $connexion->query('UPDATE Personne SET qsecrete="'.$qsecrete.'" WHERE mail="'.$mail.'";');
        $response->closeCursor();
        
        echo "success";
    }
}
catch (PDOException $e) {
    echo "failed";
    exit();
}
?>