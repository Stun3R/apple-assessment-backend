# Apple Back End assessment

> This website is my Back End technical assessment in order to join Apple

## 🚀 Features

- RESTful API
- CRUD operations for `projects` & `assignees`
- Dynamic config loader
- Made for scale thanks dynamic config & api routes loaders

## 📦 Technical stack

- Koa
- Bookshelf with knex
- PostgreSQL
- Jest
- Hosted on Heroku with `staging` & `production`

## 📚 Project structure

Here is the current project structure. We will take a look closer to [Config loader](#config-loader) which is the most important part of this server.

```bash
. # root of the application
├── node_modules # npm packages used by the project
├── __tests__ # location of unit tests
├── config # server configurations
│  ├ functions
│  ├ modules
│  └ index.js # dynamically import everything inside `functions` & `modules` folders
├── database # knex configuration for database migrations & models
│  ├ migrations
│  └ models
├── api
│  └─ ** # each folder is a routes with CRUD operations
│     ├ controllers.js
│     ├ schema.js # fields validation thanks Joi schema
│     └ index.js # routes definition
├── helpers # a set of utils functions to do some validations, loaders etc...
├── index.js # koa server start & bootstrap functions (database seeding)
├── server.js # koa server instance & middleware application
├ .env
└ package.json
```

## ⚙️ Configuration loader

I wanted to designed as scalable as it could be in order to have the best DX possible.

### Modules

I thought usefull to cut the configuration of each package & project part into modules so we could load them on the fly.
Those configurations are stored into the `modules` folder and are dynamically load at bootstrap. Each file are imported into the configuration and you can access them by `require` the `config` folder.
It follows the template bellow:

```js
// ./config/modules/your-module.js
module.exports = {}
```

### Functions

It was the same goal for `function`. What I call a function is a global logic that we want to apply easily in many parts of the project. They are all exposed thanks `config.functions['fileName']()`. It can be usefull for seeding the database at bootstrap or implements any kind of logic during the boostrap of the server.

Every files into this folder has to follow the following template:

```js
// ./config/functions/your-function.js
module.exports = (config) => () => {}

// It can be async too
module.exports = (config) => async () => {}
```

**You want to know how I organized my project? See [here](https://frosted-stocking-9e4.notion.site/Apple-Technical-assessment-446067025e5c466cbaea7cc28bb0763d)**
