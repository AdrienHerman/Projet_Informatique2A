<?php
define("LOGIN", "root");
define("PASSWORD", "AHhook1@@86160");
define("SERVER", "localhost");
define("BASE", "Projet2A_Utilisateurs");

$dsn = "mysql:dbname=".BASE.";host=".SERVER;
$nmail = $_GET['nouveaumail'];
$amail = $_GET['ancienmail'];

try{
    $connexion = new PDO($dsn, LOGIN, PASSWORD);

    if ($connexion){
        $response = $connexion->query('UPDATE Personne SET mail="'.$nmail.'" WHERE mail="'.$amail.'";');
        $response->closeCursor();
        
        echo "success";
    }
}
catch (PDOException $e) {
    echo "failed";
    exit();
}
?>