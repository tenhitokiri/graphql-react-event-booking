const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const events = [];

//Middleware
app.use(bodyParser.json());

//Routes
app.use(
	'/graphql',
	graphqlHttp({
		schema    : buildSchema(`
            type Event {
                _id: ID!
                tittle: String!
                description: String!
                price: Float!
                date: String!
            }

            input EventInput {
                tittle: String!
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
				return events;
			},
			createEvent : (args) => {
				const { tittle, description, price, date } = args.eventInput;
				const event = {
					_id         : Math.random().toString(),
					tittle,
					description,
					price       : +price,
					date        : new Date().toISOString()
				};
				events.push(event);
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
