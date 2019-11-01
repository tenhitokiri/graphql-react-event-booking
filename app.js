const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();

const Event = require('./models/event');

//variables globales

//Middleware
app.use(bodyParser.json());

//Configuración de la Base de Datos
const db = require('./config/keys').MongoURI;

//Conectar a Mongo db
mongoose
	.connect(db, {
		useUnifiedTopology : true,
		useNewUrlParser    : true
	})
	.then(() => console.log('MongoDB Conectada... xD'))
	.catch((err) => console.log(err));

//Routes
app.use(
	'/graphql',
	graphqlHttp({
		schema    : buildSchema(`
            type Event {
                _id: ID!
                title: String!
                description: String!
                price: Float!
                date: String!
            }

            input EventInput {
                title: String!
                description: String!
                price: Float!
                date: String!                
            }

            type RootQuery {
                events: [Event!]!
            }

            type RootMutation {
                createEvent(eventInput: EventInput): Event
            }
            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
		rootValue : {
			events      : () => {
				return Event.find()
					.then((events) => {
						return events.map((event) => {
							return { ...event._doc };
						});
					})
					.catch((err) => {
						throw err;
					});
			},
			createEvent : (args) => {
				const { title, description, price, date } = args.eventInput;

				const event = new Event({
					title,
					description,
					price       : +price,
					date        : new Date(date)
				});
				return event
					.save()
					.then((result) => {
						console.log(result);
						return { ...result._doc };
					})
					.catch((err) => {
						console.log(err);
						throw err;
					});
				return event;
			}
		},
		graphiql  : true
	})
);
app.get('/', (req, res, next) => {
	res.send('hola');
});

app.listen(3000);
