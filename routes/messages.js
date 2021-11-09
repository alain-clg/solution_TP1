const express = require('express');
const router = express.Router();
const Messages = require('../modeles/messages');

router.use(express.json());

router.get('/', (requete, reponse) => {
    // requete a MongoDB pour lire tous les messages/discussions...
    Messages.getMessages((err, messages)=>{
        if (err) throw err;
        reponse.json(messages);
    }, 500);    
});

router.get('/:idMessage', (requete, reponse) => {
    // requete a MongoDB pour lire un seul message/discussion...
    Messages.getMessageById(requete.params.idMessage, (err, message)=>{
        if (err) throw err;
        reponse.json(message);
    });
});

router.post('/', (requete, reponse)=>{
    // requete a MongoDB pour ajouter un message...
    let message = requete.body;
    console.log('dans post... body vaut:', message);
    Messages.ajoutMessage(message, (err, message)=> {
        if (err) throw err;
        reponse.json(message);
    });
});

router.delete('/:idMessage', (requete, reponse) => {
    // requete a MongoDB pour supprimer une discussion/message...
    Messages.supprimeMessage(requete.params.idMessage, (err, msg)=>{
        if (err) throw err;
        reponse.json(msg);
    });
});

router.put('/:idMessage', (requete, reponse) => {
    // requete a MongoDB pour modifier un seul message/discussion...
    let modifMsg = requete.body;
    Messages.modifMessage(requete.params.idMessage, modifMsg, (err, msg)=>{
        if (err) throw err;
        reponse.json(msg);
    });
});

module.exports = router;