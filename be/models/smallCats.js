const mongoose = require('mongoose');
const cfg = require('../../config');

mongoose.set('useCreateIndex', true);
const smallCatSchema = new mongoose.Schema({
  name: { type: String, default: 'smallCategory', index: true },
  summary: { type: String, default: '' },
  img: { type: String, default: ''},
  _largeCat: { type: mongoose.Schema.Types.ObjectId, ref: 'LargeCat', index: true }
});

module.exports = mongoose.model('SmallCat', smallCatSchema);