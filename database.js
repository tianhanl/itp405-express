const knex = require('knex');

const connect = () => {
    const connection = knex({
        client: 'sqlite3',
        connection: {
            filename: './database.sqlite'
        }
    });

    return connection;
};

module.exports = {
    connect
};