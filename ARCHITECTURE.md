# Organisation

L’application se compose d’un dossier app, qui contient les dossiers suivants :

- component

- header 

- models

- pages

- services

## Dossier app :

Ce dossier contient les éléments nécessaires à l’initialisation de l’application. 

Il contient le composant app.component, qui contient le selector app-root.

app-root est la balise matérialise l’ensemble de l’application.

Le templateUrl, est défini par ./app.component.html, qui est le fichier html, qui contient la balise app-root.

Les feuilles de style ne sont utilisées par ce composent.

## Dossier component :

Le dossier component contient deux composants :

SingleCountryComponent et OlympicGameComponent.

SingleCountryComponent contient les éléments permettant l’affichage de la page Pays, qui affiche le graphique et les performances du pays sélectionné dans le pie-chart du composant OlympicGameComponent lorsqu’on clique dessus.

OlympicGameComponent contient les éléments de la page d’accueil, c’est-à-dire le nombre de jeux, le titre, le nombre de pays, ainsi que le diagramme de l’ensemble des pays.

Ces deux composants injectent les services OlympicService et ChartService.

OlympicService est un service utilisé pour récupérer les informations utilisées dans les pages web.

ChartService est un service utilisé pour la mise en place des diagrammes.

OlympicService utilise CountryInterface pour typer les éléments en provenance du ficher olympic.json.

## Dossier header :

Le dossier header contient un composant réutilisable. Ce composant est utilisé par les pages olympic-game et single-country.

Il permet d’afficher l’entête de ces deux pages de façon homogène, et de réutiliser le code pour la disposition des éléments graphiques et du style pour ces deux composants.

## Dossier models :

Ce dossier contient toutes les classes relatives au modèle de données.

Il contient entre autres les classes suivantes :

Indicator : Est utilisé comme générique des éléments à afficher par la classe Header. Chaque élément se compose d’un libellé (label) et d’une valeur (value).

Country : Contient tous les informations relatives à un pays.

CountryInterface : Permet de typer les informations en provenance du mock (bouchon) matérialisé par le fichier olympic.json. 

ChartFactory : Implémente un pattern factory, qui renvoie un instance de la classe Chart qui, en fonction du paramètre chartType renvoie un Pie Chart ou un Line Chart.

Participation : représente une participation d’un pays à des jeux olympiques.

## Dossier pages :

Contient le composant NotFoundComponent, qui renvoie une vers une page not-found, lorsqu’une page ne peux pas être affichée.

## Dossier services :

OlympicService fournit les données nécessaires à l’affichage des deux pages du site.

ChartService fournit les diagrammes à afficher, en fonction des données et du type de diagramme. Cette classe fait appel à la classe ChartFactory, qui génère les objets charts, Line chart ou Pie chart, en fonction des paramètres qui lui sont transmis.

# Choix d’architecture :

Les pages du site sont représentées par les composants SingleCountryComponent et OlympicGameComponent, les services OlympicService et ChartService sont injectés dans ses composants, les données sont contenues pas les classes situées dans le répertoire models.

Les design pattern implémentés sont les suivants :

Factory : ChartFactory implémente le design pattern factory.

Injection de dépendances : OlympicService et ChartService utilisent l’injection de dépendance d’Angular.

Observateur : OlympicService renvoie un observable auquel souscrivent les composants OlympicGameComponent et SingleCountryComponent.
