const express = require('express');
const router = express.Router();
const Achat = require('../models/achat');
const Article = require('../models/article');

// GET all achats
router.get('/', async (req, res) => {
  try {
    const achats = await Achat.find().populate('articleId'); // Assurez-vous que articleId est bien peuplé
    res.json(achats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new achat
router.post('/', async (req, res) => {
  const { articleReference, quantity } = req.body;

  try {
    const article = await Article.findOne({ reference: articleReference });
    if (!article) {
      return res.status(404).send({ error: 'Article non trouvé' });
    }

    if (article.quantite < quantity) {
      return res.status(400).send({ error: 'Quantité insuffisante en stock' });
    }

    article.quantite -= quantity;
    await article.save();

    const achat = new Achat({
      articleId: article._id,
      quantity,
      date: new Date()
    });

    const newAchat = await achat.save();
    res.status(201).json(newAchat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
