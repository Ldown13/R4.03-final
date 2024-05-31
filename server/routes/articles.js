const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// GET /articles/recherche - Recherche des articles
router.get('/recherche', async (req, res) => {
  const { nom, marque, prix, categorie, tailles, rayon } = req.query;
  let query = {};

  if (nom) query.nom = { $regex: nom, $options: 'i' };
  if (marque) query.marque = { $regex: marque, $options: 'i' };
  if (prix) query.prix = { $lte: parseFloat(prix) };
  if (categorie) query.categorie = categorie;
  if (tailles) query.tailles = { $regex: tailles, $options: 'i' };
  if (rayon) query.rayon = { $regex: rayon, $options: 'i' };

  try {
    const articles = await Article.find(query);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /articles - Ajouter un nouvel article
router.post('/', async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).send(article);
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    res.status(400).send({ error: error.message });
  }
});

// GET /articles - Obtenir la liste de tous les articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).send(articles);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).send({ error: error.message });
  }
});

// GET /articles/:reference - Obtenir un article par sa référence
router.get('/:reference', async (req, res) => {
  try {
    console.log('Référence demandée:', req.params.reference); // Log de la référence demandée
    const article = await Article.findOne({ reference: req.params.reference }); // Utilisez findOne pour obtenir un seul article
    if (!article) {
      return res.status(404).send({ error: 'Article non trouvé' });
    }
    res.status(200).send(article);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article par référence:', error); // Log l'erreur complète côté serveur
    res.status(500).send({ error: error.message });
  }
});

// PUT /articles/:reference - Mettre à jour un article par sa référence
router.put('/:reference', async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate({ reference: req.params.reference }, req.body, { new: true });
    if (!article) {
      return res.status(404).send({ error: 'Article non trouvé' });
    }
    res.status(200).send(article);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
