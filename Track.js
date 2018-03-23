const knex = require('knex');
const {
  connect
} = require('./database');
let bookshelf = require('bookshelf')(connect());

const Track = bookshelf.Model.extend({
  tableName: 'tracks',
  idAttribute: 'TrackId'
});

module.exports = Track;