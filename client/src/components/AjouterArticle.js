import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'; // Assurez-vous que Container est importé

const AjouterArticle = () => {
  const [formData, setFormData] = useState({
    nom: '',
    marque: '',
    prix: '',
    reference: '',
    categorie: '',
    tailles: '',
    fournisseurNom: '',
    fournisseurVille: '',
    quantite: '',
    rayon: ''
  });

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

    const articleData = {
      nom: formData.nom,
      marque: formData.marque,
      prix: formData.prix,
      reference: formData.reference,
      categorie: formData.categorie,
      tailles: formData.tailles,
      fournisseur: {
        nom: formData.fournisseurNom,
        ville: formData.fournisseurVille
      },
      quantite: formData.quantite,
      rayon: formData.rayon
    };

    try {
      await axios.post('http://localhost:5000/articles', articleData);
      setError(null);
      alert('Article ajouté avec succès!');
    } catch (error) {
      setError(error);
      console.error('Erreur lors de l\'ajout de l\'article:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container>
      <h1>Ajouter un Article</h1>
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
            <Form.Group controlId="reference">
              <Form.Label>Référence</Form.Label>
              <Form.Control type="text" name="reference" value={formData.reference} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
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
          <Col md={6}>
            <Form.Group controlId="tailles">
              <Form.Label>Tailles</Form.Label>
              <Form.Control type="text" name="tailles" value={formData.tailles} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="fournisseurNom">
              <Form.Label>Nom du Fournisseur</Form.Label>
              <Form.Control type="text" name="fournisseurNom" value={formData.fournisseurNom} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="fournisseurVille">
              <Form.Label>Ville du Fournisseur</Form.Label>
              <Form.Control type="text" name="fournisseurVille" value={formData.fournisseurVille} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
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
        <Button variant="primary" type="submit" className="mt-3">Ajouter</Button>
        {error && <Alert variant="danger" className="mt-3">Il y a eu une erreur! {error.response ? error.response.data.error : error.message}</Alert>}
      </Form>
    </Container>
  );
};

export default AjouterArticle;

