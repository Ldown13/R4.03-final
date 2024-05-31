import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Recherche = () => {
  const [formData, setFormData] = useState({
    nom: '',
    marque: '',
    prix: '',
    categorie: '',
    tailles: '',
    rayon: ''
  });
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/articles/recherche', {
        params: formData
      });
      setArticles(response.data);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Container>
      <h1>Recherche d'Articles</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="nom" value={formData.nom} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="marque">
              <Form.Label>Marque</Form.Label>
              <Form.Control type="text" name="marque" value={formData.marque} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="prix">
              <Form.Label>Prix (max)</Form.Label>
              <Form.Control type="number" name="prix" value={formData.prix} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="categorie">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control as="select" name="categorie" value={formData.categorie} onChange={handleChange}>
                <option value="">Sélectionnez une catégorie</option>
                <option value="enfant">Enfant</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="tailles">
              <Form.Label>Tailles</Form.Label>
              <Form.Control type="text" name="tailles" value={formData.tailles} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="rayon">
              <Form.Label>Rayon</Form.Label>
              <Form.Control type="text" name="rayon" value={formData.rayon} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">Rechercher</Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">Il y a eu une erreur! {error.message}</Alert>}

      <h2 className="mt-4">Résultats de la recherche</h2>
      <ListGroup>
        {articles.map((article, index) => (
          <ListGroup.Item key={index}>
            <Link to={`/articles/${article.reference}`}>
              {article.nom} - {article.marque} - {article.prix}€ - {article.categorie} - {article.tailles} - {article.rayon}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Recherche;


