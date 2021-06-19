DROP DATABASE IF EXISTS Projet2A_Utilisateurs;
CREATE DATABASE Projet2A_Utilisateurs;
USE Projet2A_Utilisateurs; 

CREATE TABLE Personne(
    id              INT AUTO_INCREMENT,
    nom             VARCHAR(50) NOT NULL,
    prenom          VARCHAR(50) NOT NULL,
    mail            VARCHAR(50) NOT NULL,
    mdp             VARCHAR(50) NOT NULL,
    qsecrete        VARCHAR(50) NOT NULL,
    pref1           VARCHAR(300),
    pref2           VARCHAR(300),
    pref3           VARCHAR(300),
    pref4           VARCHAR(300),
    pref5           VARCHAR(300),
    PRIMARY KEY(id)
);

INSERT INTO Personne(nom, prenom, mail, mdp, qsecrete)
VALUES
("root", "root", "projet2a.informatique@gmail.com", "puarrigfxnxbcwc", "root");