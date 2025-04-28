const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortenedUrl: {
    type: String,
    required: true,
  },
});

const Link = mongoose.model('Link', linkSchema, 'links');  // Especificando a coleção 'links'

module.exports = Link;
