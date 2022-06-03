const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Article', articleSchema);