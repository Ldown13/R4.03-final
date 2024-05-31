import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Articles from './components/Articles';
import Achats from './components/Achats';
import AjouterArticle from './components/AjouterArticle';
import ArticleDetail from './components/ArticleDetail';
import Recherche from './components/Recherche';
import ModifierArticle from './components/ModifierArticle'; // Importer le composant ModifierArticle
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/achats" element={<Achats />} />
          <Route path="/ajouter-article" element={<AjouterArticle />} />
          <Route path="/articles/:reference" element={<ArticleDetail />} />
          <Route path="/recherche" element={<Recherche />} />
          <Route path="/modifier-article/:reference" element={<ModifierArticle />} /> {/* Ajouter la route de modification */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;


