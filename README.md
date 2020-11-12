# Nutrium Challenge

## Install

### Clone the repository

```shell
git clone https://github.com/Noivo/Nutrium-meal-widget.git
cd Nutrium-meal-widget
```

### Check your Ruby version

```shell
ruby -v
ruby 2.7.2
```

### Install dependencies

Using [Bundler](https://github.com/bundler/bundler) and [Yarn](https://github.com/yarnpkg/yarn):

```shell
bundle && yarn
```

### Initialize the database

```shell
rails db:create db:migrate db:seed
```

### Database

```shell
PostgreSQL 13
```

### Install PostgreSQL Server

Using [Homebrew](https://dataschool.com/learn-sql/how-to-start-a-postgresql-server-on-mac-os-x/#using-homebrew) or [PostgreSQL App](https://dataschool.com/learn-sql/how-to-start-a-postgresql-server-on-mac-os-x/#using-postgresql-app)

## Serve

```shell
rails s
```
