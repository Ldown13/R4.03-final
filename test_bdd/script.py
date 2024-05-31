import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
import time

# Configuration de la connexion à MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['mon-magasin']
articles_collection = db['articles']

# Définir l'article à insérer
article_template = {
    "nom": "Test Article",
    "marque": "Test Brand",
    "prix": 50,
    "reference": "TEST_REF",
    "categorie": "senior",
    "tailles": "L",
    "fournisseur": {
        "nom": "Test Supplier",
        "ville": "Test City"
    },
    "quantite": 100,
    "rayon": "Test Rayon"
}

# Nombre d'insertion
n = 50000  # Vous pouvez ajuster ce nombre selon vos besoins

# Mesurer le temps d'insertion
start_time = time.time()

# Insérer l'article n fois avec un nouvel identifiant pour chaque insertion
for i in range(n):
    article = article_template.copy()
    article['_id'] = ObjectId()  # Générer un nouvel ObjectId
    articles_collection.insert_one(article)

end_time = time.time()

# Afficher le nombre d'insertion et le temps total de l'opération
print(f"Nombre d'insertion: {n}")
print(f"Temps total de l'opération: {end_time - start_time:.2f} secondes")
