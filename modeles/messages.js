const mongoose = require('mongoose');

// schema de donnees pour les Messages
// _id, titre, auteur, description, date, commentaires

let schemaMessage = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    titre: {
        type: String,
        required: true
    },
    auteur: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    langue: {
        type: String,
        required: true
    },
    commentaires: {
        type: Object,
        required: false
    }
});

let Messages = module.exports = mongoose.model('Messages', schemaMessage);

// obtenir les Messages de la BD...
module.exports.getMessages = (callback, limit) => {
    Messages.find(callback).sort({date: -1}).limit(limit);
};
// obtenir un message par son _id de la BD...
module.exports.getMessageById = (idMessage, callback) => {
    let query = { "_id": idMessage };
    Messages.findById(idMessage, callback);
    // Messages.find(query, callback);
};
// obtenir un message par son _id de la BD...
module.exports.getMessageParTitre = (titre, callback) => {
    let query = { "titre": {$regex: titre, $options: 'i'}};
    let tri = { "date": 1};
    console.log('query:', query);
    Messages.find(query).sort(tri).exec(callback);
};

// ajout d'un message dans la BD
module.exports.ajoutMessage = (message, callback) => {
    if (!message._id) {
        message._id = new mongoose.Types.ObjectId().toString();
    }
    Messages.create(message, callback);
};
// supprimer un message de la BD
module.exports.supprimeMessage = (idMessage, callback) => {
    var query = { "_id": idMessage};
    Messages.deleteOne(query, callback);
};
// modifier un message de la BD
module.exports.modifMessage = (idMessage, message, callback) => {
    var query = { "_id": idMessage };
    var options = { };
    var nouveaumessage = {
        _id: message._id,
        titre: message.titre,
        auteur: message.auteur,
        description: message.description,
        date: message.date,
        langue: message.langue,
        commentaires: message.commentaires
    };
    Messages.findOneAndUpdate(query, nouveaumessage, options, callback);
};