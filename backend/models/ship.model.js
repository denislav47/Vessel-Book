var mongoose = require('mongoose');

var shipSchema = new mongoose.Schema({
    IMO: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    images: Array
});

var shipModel = mongoose.model('Ship', shipSchema);

module.export = shipModel;