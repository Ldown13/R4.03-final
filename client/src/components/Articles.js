// src/components/Articles.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, ListGroup, Alert } from 'react-bootstrap'; // Assurez-vous que Container est importé

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/articles')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        setError(error);
        console.error('Il y a eu une erreur!', error);
      });
  }, []);

  if (error) {
    return <Container><Alert variant="danger">Il y a eu une erreur! {error.message}</Alert></Container>;
  }

  return (
    <Container>
      <h1>Articles</h1>
      <ListGroup>
        {articles.map((article, index) => (
          <ListGroup.Item key={index}>
            <Link to={`/articles/${article.reference}`}>
              {article.nom} - {article.prix}€ - Quantité: {article.quantite} - Taille: {article.tailles}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Articles;


