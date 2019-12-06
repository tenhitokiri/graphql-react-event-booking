const Event = require('../../models/event');

const {
    transformEvent
} = require('./merge');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map((event) => {
                return transformEvent(event);
            })
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args) => {
        const {
            title,
            description,
            price,
            date,
            creator
        } = args.eventInput;
        const event = new Event({
            title,
            description,
            price: +price,
            date: new Date(date),
            creator: '5de003c61a71c6400123a6e6'
        });

        try {
            const result = await event.save()
            let createdEvent = transformEvent(result);
            const creatorUser = await User.findById('5de003c61a71c6400123a6e6')
            if (!creatorUser) {
                throw new Error('Usuario NO existe!!')
            }
            creatorUser.createdEvents.push(event);
            await creatorUser.save();
            return createdEvent;
        } catch (err) {
            console.log(err);
            throw err;
        };
    }

}