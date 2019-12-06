const emailValidator = require('email-validator')
const Booking = require('../../models/bookings');

const {
    dateToString
} = require('../../helpers/date');

const {
    user,
    singleEvent,
    events,
    transformBooking,
    transformEvent
} = require('./merge');

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            })
        } catch (err) {
            console.log(err);
            throw err;
        };

    },
    bookEvent: async (args) => {
        try {
            const userBooking = '5de003c61a71c6400123a6e6';
            const fetchedEvent = await Event.findOne({
                _id: args.eventId
            });
            if (!fetchedEvent) {
                throw new Error("Evento no Existe")
            }
            const booking = new Booking({
                user: userBooking,
                event: fetchedEvent
            });
            console.log(`Booking : ${booking}`);
            const result = await booking.save()
            return transformBooking(result);
        } catch (err) {
            console.log(err);
            throw err;
        };

    },
    cancelBooking: async (args) => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = transformEvent(booking.event)
            await Booking.deleteOne({
                _id: args.id
            });
            return event;
        } catch (err) {
            console.log(err);
            throw err;
        };
    }
}