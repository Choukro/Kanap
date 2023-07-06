# Kanap 🛋 : Site e-commerce en JavaScript 

> 🖥️ **Développer une nouvelle plateforme de e-commerce pour la vente en ligne des canapés de la société Kanap !**

![screenshot du site](./back/images/screenshot/85765683.png)

## La mission :

_Implémenter le nouveau site e-commerce de manière dynamique avec Javascript et rédiger le plan de tests unitaires de l'application._

### Les technologies :
[![forthebadge](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5Mi4xOCIgaGVpZ2h0PSIzNSIgdmlld0JveD0iMCAwIDkyLjE4IDM1Ij48cmVjdCBjbGFzcz0ic3ZnX19yZWN0IiB4PSIwIiB5PSIwIiB3aWR0aD0iNTAuMjYiIGhlaWdodD0iMzUiIGZpbGw9IiMwMDAwMDAiLz48cmVjdCBjbGFzcz0ic3ZnX19yZWN0IiB4PSI0OC4yNiIgeT0iMCIgd2lkdGg9IjQzLjkyMDAwMDAwMDAwMDAxIiBoZWlnaHQ9IjM1IiBmaWxsPSIjRkZGQjAwIi8+PHBhdGggY2xhc3M9InN2Z19fdGV4dCIgZD0iTTE4LjYyIDIxLjA0TDEzLjcyIDE4Ljg1TDEzLjcyIDE3LjcyTDE4LjYyIDE1LjU0TDE4LjYyIDE2Ljk3TDE1LjE3IDE4LjMwTDE4LjYyIDE5LjYyTDE4LjYyIDIxLjA0Wk0yMy41NyAyMi43M0wyMi40NSAyMi43M0wyNS44MSAxMy40N0wyNi45MyAxMy40N0wyMy41NyAyMi43M1pNMzUuOTggMTguODVMMzAuOTIgMjEuMDNMMzAuOTIgMTkuNjNMMzQuNTQgMTguMjdMMzAuOTIgMTYuOTRMMzAuOTIgMTUuNTRMMzUuOTggMTcuNzJMMzUuOTggMTguODVaIiBmaWxsPSIjRTdGRjAwIi8+PHBhdGggY2xhc3M9InN2Z19fdGV4dCIgZD0iTTYxLjM3IDIwLjkzTDYxLjM3IDIwLjkzTDYyLjY2IDE5LjQwUTYzLjMzIDIwLjI3IDY0LjExIDIwLjI3TDY0LjExIDIwLjI3UTY0LjExIDIwLjI3IDY0LjEyIDIwLjI3TDY0LjEyIDIwLjI3UTY0LjYzIDIwLjI3IDY0LjkwIDE5Ljk2UTY1LjE3IDE5LjY1IDY1LjE3IDE5LjA1TDY1LjE3IDE5LjA1TDY1LjE3IDE1LjQ0TDYyLjI3IDE1LjQ0TDYyLjI3IDEzLjYwTDY3LjUzIDEzLjYwTDY3LjUzIDE4LjkxUTY3LjUzIDIwLjU0IDY2LjcwIDIxLjM2UTY1Ljg4IDIyLjE3IDY0LjI5IDIyLjE3TDY0LjI5IDIyLjE3UTYzLjM2IDIyLjE3IDYyLjYxIDIxLjg1UTYxLjg1IDIxLjUzIDYxLjM3IDIwLjkzWk03Mi4wMyAyMS4yNEw3Mi4wMyAyMS4yNEw3Mi44MSAxOS40OVE3My4zNyAxOS44NiA3NC4xMSAyMC4wOVE3NC44NiAyMC4zMiA3NS41OCAyMC4zMkw3NS41OCAyMC4zMlE3Ni45NCAyMC4zMiA3Ni45NSAxOS42NEw3Ni45NSAxOS42NFE3Ni45NSAxOS4yOCA3Ni41NiAxOS4xMVE3Ni4xNyAxOC45MyA3NS4zMCAxOC43NEw3NS4zMCAxOC43NFE3NC4zNSAxOC41MyA3My43MiAxOC4zMFE3My4wOCAxOC4wNiA3Mi42MyAxNy41NVE3Mi4xNyAxNy4wMyA3Mi4xNyAxNi4xNkw3Mi4xNyAxNi4xNlE3Mi4xNyAxNS4zOSA3Mi41OSAxNC43N1E3My4wMSAxNC4xNSA3My44NSAxMy43OVE3NC42OCAxMy40MyA3NS44OSAxMy40M0w3NS44OSAxMy40M1E3Ni43MiAxMy40MyA3Ny41MiAxMy42MlE3OC4zMyAxMy44MCA3OC45NCAxNC4xN0w3OC45NCAxNC4xN0w3OC4yMSAxNS45M1E3Ny4wMSAxNS4yOCA3NS44OCAxNS4yOEw3NS44OCAxNS4yOFE3NS4xNyAxNS4yOCA3NC44NSAxNS40OVE3NC41MiAxNS43MCA3NC41MiAxNi4wNEw3NC41MiAxNi4wNFE3NC41MiAxNi4zNyA3NC45MSAxNi41NFE3NS4yOSAxNi43MSA3Ni4xNCAxNi44OUw3Ni4xNCAxNi44OVE3Ny4xMCAxNy4xMCA3Ny43MyAxNy4zM1E3OC4zNiAxNy41NiA3OC44MiAxOC4wN1E3OS4yOSAxOC41OCA3OS4yOSAxOS40Nkw3OS4yOSAxOS40NlE3OS4yOSAyMC4yMSA3OC44NyAyMC44M1E3OC40NSAyMS40NCA3Ny42MSAyMS44MFE3Ni43NyAyMi4xNyA3NS41NyAyMi4xN0w3NS41NyAyMi4xN1E3NC41NSAyMi4xNyA3My41OSAyMS45MlE3Mi42MyAyMS42NyA3Mi4wMyAyMS4yNFoiIGZpbGw9IiMwMDAwMDAiIHg9IjYxLjI2Ii8+PC9zdmc+)](https://forthebadge.com)

### Les compétences :

- **Interagir avec un web service avec JavaScript**
- **Gérer des événements JavaScript**
- **Valider des données issues de sources externes**
- **Créer un plan de test pour une application**

## 🧞 Commandes

Toutes les commandes sont exécutées depuis la racine du projet, à partir d'un terminal :

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installe les dépendances                         |
| `node server`             | Démarre le serveur local sur `localhost:3000`.   |


