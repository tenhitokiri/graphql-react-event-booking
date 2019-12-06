const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const BookingSchema = new mongoose.Schema({
    event: {
        type: ObjectId,
        ref: 'Event'
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);