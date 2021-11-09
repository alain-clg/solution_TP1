const express = require('express');
const mongoose = require('mongoose');
const app = express();
const messageRouter = require('./routes/messages');
app.use('/api/messages', messageRouter);

app.use(express.json());

mongoose.connect('mongodb://localhost/TP1');
// mongoose.connect('mongodb+srv://test:password@cluster0.yml6m.mongodb.net/SERVICES_TP1?retryWrites=true&w=majority');

let db = mongoose.connection;
db.on('error', (err) => { console.error('erreur de BD:', err)});
db.once('open', () => {console.log('connexion a la BD OK!!')});

app.get('/', (requete, reponse) => {
    getTest('index.html', reponse);
});

app.get('/test.html', (requete, reponse) => {
    getTest('test.html', reponse);
});

app.listen(8000, () => { console.log('Service Web fonctionnel sur 8000')});

function getTest(fileName, reponse) {
    const fs = require('fs');
    const path = require('path');
    fileName = path.join(__dirname, fileName);
    fs.readFile( fileName, (err, contenu) => {
        if (err) {
            reponse.status(500).send(`Erreur serveur: ${err.code}`);
        } else {
            reponse.status(200).set( { 'Content-type': 'text/html'} ).send(contenu);
        }
    })
};