import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ArticleDetail = () => {
  const { reference } = useParams();
  const [article, setArticle] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/articles/${reference}`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, [reference]);

  const handlePurchase = async () => {
    const achat = {
      articleReference: article.reference,
      quantity: parseInt(quantity, 10)
    };

    try {
      await axios.post('http://localhost:5000/achats', achat);
      alert('Achat effectué avec succès!');
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <div>Il y a eu une erreur! {error.message}</div>;
  }

  if (!article) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>{article.nom}</h1>
      <p>Marque: {article.marque}</p>
      <p>Prix: {article.prix}€</p>
      <p>Catégorie: {article.categorie}</p>
      <p>Référence: {article.reference}</p>
      <p>Taille: {article.tailles}</p>
      <p>Fournisseur: {article.fournisseur.nom} - {article.fournisseur.ville}</p>
      <p>Quantité en stock: {article.quantite}</p>
      <input 
        type="number" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
        min="1"
        max={article.quantite}
      />
      <button onClick={handlePurchase}>Acheter</button>
      <br />
      <Link to={`/modifier-article/${article.reference}`}>Modifier l'article</Link>
    </div>
  );
};

export default ArticleDetail;

