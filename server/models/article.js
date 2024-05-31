// server/models/article.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fournisseurSchema = new Schema({
  nom: { type: String, required: true },
  ville: { type: String, required: true }
});

const articleSchema = new Schema({
  nom: { type: String, required: true },
  marque: { type: String, required: true },
  prix: { type: Number, required: true, min: 0 },
  reference: { type: String, required: true },
  categorie: { type: String, enum: ['enfant', 'junior', 'senior'], required: true },
  tailles: { type: String, required: true },
  fournisseur: { type: fournisseurSchema, required: true },
  quantite: { type: Number, required: true, min: 0 },
  rayon: { type: String, required: true } 
});

module.exports = mongoose.model('Article', articleSchema);
