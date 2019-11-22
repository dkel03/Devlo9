const mongoose = require('mongoose');
const cfg = require('../../config');

mongoose.set('useCreateIndex', true);
const largeCatSchema = new mongoose.Schema({
  name: { type: String, default: 'largeCategory', index: true },
});

module.exports = mongoose.model('LargeCat', largeCatSchema);

// LargeCat.find() // admin계정이 없을 경우 생성하는 구문, 있으면 생성 X
//   .then(r => {
//     if (!r)
//       return LargeCat.create({
//         name: 'dev',
//       });
//     return Promise.resolve(null);
//   })
//   .then(r => {
//     if (r) console.log('largeCat Created');
//   })
//   .catch(e => {
//     console.error(e.message);
//   });