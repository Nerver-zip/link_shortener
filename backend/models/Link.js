const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortenedUrl: {
    type: String,
    required: true,
    unique: true,
  }
});

linkSchema.index({ shortenedUrl: 1 }, { unique: true });

module.exports = mongoose.model('Link', linkSchema);
