const express = require('express');

const knex = require('knex');

const app = express();

function connect() {
    const connection = knex({
        client: 'sqlite3',
        connection: {
            filename: './database.sqlite'
        }
    });

    return connection;
}

app.get('/api', (request, response) => {

});

app.get('/api/artists', (request, response) => {
    if (request.query.filter) {
        connect()
            .from('artists')
            .where('Name', 'like', `%${request.query.filter}%`)
            .then(artists => {
                response.json(artists.map(element => ({
                    'id': element.ArtistId,
                    'name': element.Name
                })));
            })
            .catch(err => {
                response.send('Error');
                response.end();
            });
    } else {
        connect()
            .select()
            .from('artists')
            .then(artists => {
                response.json(artists.map(element => ({
                    'id': element.ArtistId,
                    'name': element.Name
                })));
            })
            .catch(err => {
                response.send('Error');
                response.end();
            });
    }
});

app.get('/genres', (request, response) => {
    connect()
        .select()
        .from('genres')
        .then(genres => response.json(genres))
        .catch(err => {
            console.log(err);
            response.send('Error happens in reading table');
            response.end();
        });
});

app.get('/genres/:id', (request, response) => {
    connect()
        .select()
        .from('genres')
        .where('GenreId', request.params.id)
        .first()
        .then(genres => response.json(genres))
        .catch(err => {
            console.log(err);
            response.send('Error happens in reading table');
            response.end();
        });
});
// catch all undefine routes with 404
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Resource Not Found');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});