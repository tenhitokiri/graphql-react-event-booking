const {
    buildSchema
} = require('graphql');

module.exports = buildSchema(`
            type Event {
                _id: ID!
                title: String!
                description: String!
                price: Float!
				date: String!
				creator: User!
			}
			
			type User {
				_id: ID!
				name: String!
				email: String!
				password: String
				date: String!
				createdEvents: [Event!]
			}

            input EventInput {
                title: String!
                description: String!
                price: Float!
                date: String!                
			}
			
			input UserInput {
				name: String!
				email: String!
				password: String!
				date : String!
			}

            type RootQuery {
				events: [Event!]!
				users: [User!]!
            }

            type RootMutation {
				createEvent(eventInput: EventInput): Event
				createUser(userInput: UserInput): User
            }
            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `);