const mongoose = require('mongoose');
const cfg = require('../../config');

mongoose.set('useCreateIndex', true);
const postSchema = new mongoose.Schema({
  title: { type: String, default: '', index: true },
  subtitle: { type: String, default: '' },
  content: { type: String, default: ''},
  cnt: {
    view: { type: Number, default: 0},
    share: { type: Number, default: 0},
    comment: { type: Number, default: 0},
    like: { type: Number, default: 0}
  },
  _largeCat: { type: mongoose.Schema.Types.ObjectId, ref: 'LargeCat', index: true },
  _smallCat: { type: mongoose.Schema.Types.ObjectId, ref: 'SmallCat', index: true }
});

module.exports = mongoose.model('Post', postSchema);