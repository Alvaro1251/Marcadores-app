require('dotenv').config();

module.exports = {

    database:{
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: '',
        database: process.env.DB_NAME
    }

};