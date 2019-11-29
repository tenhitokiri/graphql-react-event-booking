const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const EventSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	creator: {
		type: ObjectId,
		ref: 'User'
	}

});

module.exports = mongoose.model('Event', EventSchema);