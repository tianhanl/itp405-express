const express = require('express');
const app = express();
const {
  connect
} = require('./database');
const Genre = require('./Genre');
const Track = require('./Track');




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

app.get('/v2/genres', (request, response) => {
  Genre.fetchAll().then(genres => response.json(genres));
});

app.get('/v2/genres/:id', (request, response) => {
  let id = request.params.id;
  let genre = new Genre({
    GenreId: id
  });
  genre
    .fetch()
    .then(genre => {
      if (!genre) {
        response
          .status('404')
          .send('Error');
      }
      response.json(genre);
    }, err => {
      response
        .status('404')
        .send('Error');
    });
});

app.get('/v2/tracks/:id', (request, response) => {
  let id = request.params.id;
  let track = new Track({
    TrackId: id
  });
  track
    .fetch()
    .then(result => {
      if (!result) {
        response
          .status('404')
          .send('Error');
      } else {
        response.json(result);
      }
    })
    .catch(err => {
      response
        .status('404')
        .send('Error');
    })
})

app.get('/v2/tracks', (request, response) => {
  Track.fetchAll().then(tracks => response.json(tracks));
});



app.delete('/v2/tracks/:id', (request, response) => {
  let id = request.params.id;
  new Track({
      TrackId: id
    })
    .destroy()
    .then(model => {
      response.status('204');
      response.send();
    })
    .catch(err => {
      response.status('404');
      response.json({
        error: err
      });
    })
})



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