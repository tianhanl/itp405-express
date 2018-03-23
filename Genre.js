const knex = require('knex');
function connect() {
    const connection = knex({
        client: 'sqlite3',
        connection: {
            filename: './database.sqlite'
        }
    });

    return connection;
}
let bookshelf = require('bookshelf')(connect());

const Genre = bookshelf.Model.extend({
    tableName: 'genres',
    idAttribute: 'GenreId'
});

module.exports = Genre;