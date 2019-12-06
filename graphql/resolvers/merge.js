const Event = require('../../models/event');
const User = require('../../models/users');

const {
    dateToString
} = require('../../helpers/date');

const transformEvent = (args) => {
    let event = {
        ...args._doc,
        _id: args.id,
        date: dateToString(args._doc.date),
        creator: user.bind(this, args.creator)
    };
    return event;
}

const transformBooking = (booking) => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
}

const events = async eventIds => {
    try {
        const events = await Event.find({
            _id: {
                $in: eventIds
            }
        })
        return events.map(event => {
            return transformEvent(event);
        });

    } catch (err) {
        throw err;
    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            password: null,
            _id: user.id,
            createdEvents: events.bind(this, user._doc.createdEvents)
        };
    } catch (err) {
        throw err;
    }
}

const singleEvent = async eventId => {
    try {
        const fetchedEvent = await Event.findById(eventId);
        return transformEvent(fetchedEvent);
    } catch (err) {
        console.log(err);
        throw err;
    };
}

exports.user = user;
exports.singleEvent = singleEvent;
exports.events = events;
exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;