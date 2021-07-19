const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userid: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    hobby: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('users', userSchema);