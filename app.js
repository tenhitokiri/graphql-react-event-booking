const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const app = express();

const graphiqlSchema = require('./graphql/schema/index');
const graphiqlResolver = require('./graphql/resolvers/index');

//variables globales
const port = process.env.PORT || 3500;

//seguir en  video 7 00:14:20

//Middleware
app.use(bodyParser.json());

//Configuración de la Base de Datos
const db = require('./config/keys').MongoURI;

//Conectar a Mongo db
mongoose
	.connect(db, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(() => {
		console.log('MongoDB Conectada... xD')
		app.listen(port, () => {
			console.log(`Servidor corriendo en puerto ${port}`)
		});

	})
	.catch((err) => console.log(err));

//Routes
app.use(
	'/graphql',
	graphqlHttp({
		schema: graphiqlSchema,
		rootValue: graphiqlResolver,
		graphiql: true
	})
);
app.get('/', (req, res, next) => {
	res.send('hola');
});