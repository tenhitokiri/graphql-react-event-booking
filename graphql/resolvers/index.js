const {
    buildSchema
} = require('graphql');
const bcrypt = require('bcryptjs');
const emailValidator = require('email-validator')
const Event = require('../../models/event');
const User = require('../../models/users');

//Funciones de mongoose
const events = async eventIds => {
    try {
        const events = await Event.find({
            _id: {
                $in: eventIds
            }
        })
        return events.map(event => {
            return {
                ...event._doc,
                _id: event.id,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            };
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
        //            }
    } catch (err) {
        throw err;
    }
}


module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map((event) => {
                return {
                    ...event._doc,
                    _id: event.id,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)
                };
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
        let createdEvent;
        try {
            const result = await event.save()
            createdEvent = {
                ...result._doc,
                _id: result.id,
                creator: user.bind(this, result._doc.creator)
            };
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
    },
    createUser: async (args) => {
        const {
            name,
            email,
            password,
            date
        } = args.userInput;

        //Validar datos ingresados
        //Check valid email
        if (!emailValidator.validate(email)) {
            throw new Error('Por favor Colocar un correo valido')
        }

        // Verificar largo de contraseña
        if (password.length < 8) {
            throw new Error('La contraseña debe ser de mas de 8 caracteres')
        }

        try {
            const userFound = User.findOne({
                email: email
            });
            //verificar datos duplicados
            if (userFound) {
                throw new Error('Usuario ya existe!!')
            }
            const hashedPassword = bcrypt.hash(password, 12);
            const user = new User({
                name,
                email,
                password: hashedPassword,
                date: new Date(date)
            });
            const result = await user.save()
            return {
                ...result._doc,
                password: null,
                _id: result.id
            };
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}