const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achatSchema = new Schema({
  articleId: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Achat', achatSchema);
