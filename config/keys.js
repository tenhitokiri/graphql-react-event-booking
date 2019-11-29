module.exports = {
	MongoURI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-zfj4f.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
};