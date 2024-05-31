const mongoose = require('mongoose');
const { Schema } = mongoose;
const { performance } = require('perf_hooks');

// Configuration de la connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mon-magasin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = new Schema({
  nom: { type: String, required: true },
  marque: { type: String, required: true },
  prix: { type: Number, required: true, min: 0 },
  reference: { type: String, required: true },
  categorie: { type: String, enum: ['enfant', 'junior', 'senior'], required: true },
  tailles: { type: String, required: true },
  fournisseur: {
    nom: { type: String, required: true },
    ville: { type: String, required: true }
  },
  quantite: { type: Number, required: true, min: 0 },
  rayon: { type: String, required: true }
});

const Article = mongoose.model('Article', articleSchema);

const articleTemplate = {
  nom: "Test Article",
  marque: "Test Brand",
  prix: 50,
  reference: "TEST_REF",
  categorie: "senior",
  tailles: "L",
  fournisseur: {
    nom: "Test Supplier",
    ville: "Test City"
  },
  quantite: 100,
  rayon: "Test Rayon"
};

// Nombre d'insertion
const n = 50000;  // Vous pouvez ajuster ce nombre selon vos besoins

(async () => {
  try {
    // Mesurer le temps d'insertion
    const startTime = performance.now();

    const insertions = [];
    for (let i = 0; i < n; i++) {
      const article = new Article(articleTemplate);
      insertions.push(article.save());
    }

    await Promise.all(insertions);

    const endTime = performance.now();

    // Afficher le nombre d'insertion et le temps total de l'opération
    console.log(`Nombre d'insertion: ${n}`);
    console.log(`Temps total de l'opération: ${(endTime - startTime).toFixed(2)} millisecondes`);
  } catch (error) {
    console.error('Erreur lors de l\'insertion:', error);
  } finally {
    mongoose.connection.close();
  }
})();
