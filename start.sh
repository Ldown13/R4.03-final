#!/bin/bash

# Démarrer le serveur MongoDB
echo "Démarrage de MongoDB..."
mongod --dbpath=/home/ldown/R403MONGO/new_mongodata &

# Attendre que MongoDB démarre
sleep 5

# Démarrer le serveur Node.js
echo "Démarrage du serveur Node.js..."
node server/server.js &

# Attendre que le serveur Node.js démarre
sleep 5

# Démarrer l'application React
echo "Démarrage de l'application React..."
cd client
npm start