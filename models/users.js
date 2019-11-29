const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    createdEvents: [{
        type: ObjectId,
        ref: 'Event'
    }]
});

module.exports = mongoose.model('User', UserSchema);