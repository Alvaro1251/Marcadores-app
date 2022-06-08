
require('dotenv').config();

module.exports = {

    "database":{
        "host": "localhost",
        "user": "root",
        "password": '',
        "database": "datebase_links"
    },
    "production":{
        "host": process.env.DB_HOST,
        "user": process.env.DB_USER,
        "password": '',
        "database": process.env.DB_NAME,
        "dialect": "mysql",
        "operatorsAliases": 0
    }

};