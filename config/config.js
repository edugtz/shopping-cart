var Sequelize = require('sequelize');

module.exports =
{
    "development": {
        "username": "postgres",
        "password": "admin",
        "database": "shopping-cart",
        "host": "127.0.0.1",
        "dialect": "postgres",
        "operatorsAliases": Sequelize.Op
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