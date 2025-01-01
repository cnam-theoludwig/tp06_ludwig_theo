# tp06_ludwig_theo

## À propos

Code réalisé par [Théo LUDWIG](https://theoludwig.fr) dans le cadre de la formation [Ingénieur en Informatique et Systèmes d'Information (SI), CNAM](https://www.itii-alsace.fr/formations/informatique-et-systemes-dinformation-le-cnam/), pour le module Web.

[SUJET](./SUJET.md)

## Prérequis

- [Node.js](https://nodejs.org/) >= 22.0.0
- [npm](https://www.npmjs.com/) >= 10.0.0

## Utilisation

```sh
# Installer les dépendances
npm clean-install

# Configurer les variables d'environnement
cp backend/.env.example backend/.env

# Lancer les serveurs de développement
npm run dev

# Lint
npm run lint:typescript
npm run lint:eslint
npm run lint:prettier

# Build
npm run build

# Tests
npm run test
```
