# tp06_ludwig_theo

## À propos

Code réalisé par [Théo LUDWIG](https://theoludwig.fr) dans le cadre de la formation [Ingénieur en Informatique et Systèmes d'Information (SI), CNAM](https://www.itii-alsace.fr/formations/informatique-et-systemes-dinformation-le-cnam/), pour le module Web.

[SUJET](./SUJET.md)

## Prérequis

- [Node.js](https://nodejs.org/) >= 22.0.0
- [npm](https://www.npmjs.com/) >= 10.0.0
- [Docker](https://www.docker.com/)

## Installation

```sh
# Cloner le dépôt
git clone git@github.com:cnam-theoludwig/tp06_ludwig_theo.git

# Se déplacer dans le dossier
cd tp06_ludwig_theo

# Configurer les variables d'environnement
cp .env.example .env
cp backend/.env.example backend/.env

# Installer les dépendances
npm clean-install
```

## Démarrer l'application

```sh
# Lancer les serveurs de développement
node --run dev

# Lancer les services Docker de développement (e.g: base de données)
docker compose --file compose.dev.yaml up
```

### Services démarrés (avec `.env.example` par défaut)

- [`backend`](./backend): <http://localhost:4500>
- [`frontend`](./frontend): <http://localhost:4200> (application principale)
- [PostgreSQL](https://www.postgresql.org/) base de données, port: `5432`

## Base de données

```sh
# Migrations
node --run database:migrate

# Créer une migration
node --run database:migrate:make -- migration_name
# Modifier le fichier de migration, et une fois terminé, éxecutez la migration:
node --run database:codegen

# Seeds
node --run database:seed

# Créer un seed
node --run database:seed:make -- seed_name
```

## Linting/Formatting/Tests

```sh
# Lint
node --run lint:typescript
node --run lint:eslint
node --run lint:prettier

# Build
node --run build

# Tests
node --run test
```
