const authResolver = require('./auth')
const bookingResolver = require('./bookings')
const eventResolver = require('./events')
const merge = require('./merge')

const rootResolver = {
    ...authResolver,
    ...bookingResolver,
    ...eventResolver
};

module.exports = rootResolver;