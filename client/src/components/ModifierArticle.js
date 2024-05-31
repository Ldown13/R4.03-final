import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const ModifierArticle = () => {
  const { reference } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    marque: '',
    prix: '',
    categorie: '',
    tailles: '',
    fournisseurNom: '',
    fournisseurVille: '',
    quantite: '',
    rayon: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/articles/${reference}`)
      .then(response => {
        const article = response.data;
        setFormData({
          nom: article.nom,
          marque: article.marque,
          prix: article.prix,
          categorie: article.categorie,
          tailles: article.tailles,
          fournisseurNom: article.fournisseur.nom,
          fournisseurVille: article.fournisseur.ville,
          quantite: article.quantite,
          rayon: article.rayon
        });
      })
      .catch(error => {
        setError(error);
      });
  }, [reference]);

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
      const updatedArticle = {
        ...formData,
        fournisseur: {
          nom: formData.fournisseurNom,
          ville: formData.fournisseurVille
        }
      };
      await axios.put(`http://localhost:5000/articles/${reference}`, updatedArticle);
      alert('Article modifié avec succès!');
      navigate(`/articles/${reference}`);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Container>
      <h1>Modifier un Article</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="nom" value={formData.nom} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="marque">
              <Form.Label>Marque</Form.Label>
              <Form.Control type="text" name="marque" value={formData.marque} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="prix">
              <Form.Label>Prix</Form.Label>
              <Form.Control type="number" name="prix" value={formData.prix} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="categorie">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control as="select" name="categorie" value={formData.categorie} onChange={handleChange} required>
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
              <Form.Control type="text" name="tailles" value={formData.tailles} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="fournisseurNom">
              <Form.Label>Nom du Fournisseur</Form.Label>
              <Form.Control type="text" name="fournisseurNom" value={formData.fournisseurNom} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="fournisseurVille">
              <Form.Label>Ville du Fournisseur</Form.Label>
              <Form.Control type="text" name="fournisseurVille" value={formData.fournisseurVille} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="quantite">
              <Form.Label>Quantité</Form.Label>
              <Form.Control type="number" name="quantite" value={formData.quantite} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="rayon">
              <Form.Label>Rayon</Form.Label>
              <Form.Control type="text" name="rayon" value={formData.rayon} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">Modifier</Button>
        {error && <Alert variant="danger" className="mt-3">Il y a eu une erreur! {error.response ? error.response.data.error : error.message}</Alert>}
      </Form>
    </Container>
  );
};

export default ModifierArticle;
