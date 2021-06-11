<?php
define("LOGIN", "root");
define("PASSWORD", "AHhook1@@86160");
define("SERVER", "localhost");
define("BASE", "Projet2A_Utilisateurs");

$dsn = "mysql:dbname=".BASE.";host=".SERVER;
$mail = $_GET['mail'];
$mdp = $_GET['password'];
$bon_login = false;
$bon_mdp = false;

try{
    $connexion = new PDO($dsn, LOGIN, PASSWORD);

    if ($connexion){
        $response = $connexion->query('SELECT COUNT(mail) FROM Personne WHERE mail="'.$mail.'";');
        $donne = $response->fetch();

        if ($donne['COUNT(mail)'] == 1) {
            $bon_login = true;
        }

        if ($bon_login) {
            $response = $connexion->query('SELECT COUNT(mdp) FROM Personne WHERE mdp="'.$mdp.'";');
            $donne = $response->fetch();

            if ($donne['COUNT(mdp)'] == 1) {
                $bon_mdp = true;
            }

            if ($bon_mdp) {
                echo "true";
            } else {
                echo "false";
            }
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