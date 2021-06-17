<?php
    ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    $from = $_GET['email'];
    $to = "projet2a.informatique@gmail.com";
    $subject = $_GET['subject'];
    $message = $_GET['message'];
    $headers = "De :" . $from;
    mail($to, $subject, $message, $headers);
    echo "L'email a été envoyé.";
?>
