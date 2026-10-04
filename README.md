# Installation

Créer un répertoire dédié.

Faire git clone https://github.com/laurentmariko-hub/openclassroom-projet-2.git

Aller dans le répertoire openclassroom-projet-2

Faire npm -version pour vérifier si l’utilitare npm est installé.

Sinon, l’installer.

Puis faire npm install.

Faire ng serve.

Puis ouvrir la page : http://localhost:4200/ dans un navigateur.

# Structure :
Diagramme généré avec l’IA Claude Sonnet 5 à partir du code:
![](structure.png)

# Fonctionnalités

Le site fait appel à une source de données bouchonnée sous la forme d’un ficher.

Il affiche les données suivantes :

## Concernant la page Medals per country :

Le titre Medals per country est affiché.

Les titres Number of countries et Number of JOs sont affichés en haut de la page, accompagnés de leur valeur.

Chaque pays est représenté par sa couleur.

Une légende des coude couleur par pays est affichée en dessous de ce header.

Puis sous la légende, un diagramme de type Pie chart est affiché.

Chaque partie du diagramme représente un pays.

Lorsqu’on clique sur une partie du diagramme, la page du pays correspondant s’affiche.

## Concernant la page pays :

Le titre est affiché, ainsi que les titres number of entries, Total Number of medals et Total Number of athletes sont affiché, avec les chiffres correspondants.

En dessous, un diagramme est affiché, avec en abscisse les dates de participation, et en ordonnée, le nombre de médailles.

D’autre part, sous le diagramme, il y a un bouton Go back, qui renvoie vers la page d’accueil, c’est-à-dire la page précédente.
