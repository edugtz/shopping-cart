var Sequelize = require('sequelize');

// Global configuration variables for sequelize connection to PostgreSQL
module.exports =
{
    "development": {
        "username": "postgres",
        "password": "admin",
        "database": "shopping-cart",
        "host": "127.0.0.1",
        "dialect": "postgres",
        "operatorsAliases": Sequelize.Op,
        logging: false
    },
    "test": {
        "username": "",
        "password": null,
        "database": "",
        "host": "",
        "dialect": "postgres"
    },
    "production": {
        "username": "",
        "password": null,
        "database": "",
        "host": "127.0.0.1",
        "dialect": "postgres"
    }
}