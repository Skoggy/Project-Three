require("dotenv").config();
module.exports =
{
    "development": {
        "username": "root",
        "password": "christopher",
        "database": "stockDB",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "use_env_variable": "JAWSDB_URL",
        "dialect": "mysql"
    }
};