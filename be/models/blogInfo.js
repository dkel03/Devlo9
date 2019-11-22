const mongoose = require('mongoose');
const cfg = require('../../config');

mongoose.set('useCreateIndex', true);
const blogInfoSchema = new mongoose.Schema({
  title: { type: String, default: 'Title' },
  subtitle: { type: String, default: 'SubTitle' },
  author: {
    name: { type: String, default: 'Name' },
    job: { type: String, default: 'Job' }
  },
  cnt: {
    visit: { type: Number, default: 0 },
    post: { type: Number, default: 0 }
  },
  about: { type: String, default: 'About' }
});

const BlogInfo = mongoose.model('BlogInfo', blogInfoSchema);

BlogInfo.find()
  .then(r => {
    if(!r[0]) {
      return BlogInfo.create({ title: 'Title' })
    }
    return Promise.resolve(null);
  })
  .then(r => {
    if (r) console.log('BlogInfo Created!');
  })
  .catch(e => {
    console.error(e.message);
  });


module.exports = BlogInfo;