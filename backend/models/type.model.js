var mongoose = require('mongoose');

var typeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

var typeModel = mongoose.model('Type', typeSchema);

module.exports = typeModel;