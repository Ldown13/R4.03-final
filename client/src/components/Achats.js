// src/components/Achats.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, Alert } from 'react-bootstrap';

const Achats = () => {
  const [achats, setAchats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/achats')
      .then(response => {
        setAchats(response.data);
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
      <h1>Achats</h1>
      <ListGroup>
        {achats.map((achat, index) => (
          <ListGroup.Item key={index}>
            {achat.articleId ? (
              <>
                {achat.articleId.nom} - {achat.quantity} - {new Date(achat.date).toLocaleDateString()}
              </>
            ) : (
              <Alert variant="warning">Article supprimé ou introuvable</Alert>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Achats;


