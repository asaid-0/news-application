const mongoose = require('mongoose');
// set default database if not defined in /.env file
const dbURI = process.env.NODE_MONGO_URI || 'mongodb://localhost:27017/newsapi';
// autoIndex will be enabled for development only, it's not recommended to be enabled in production
const autoIndex = process.env.NODE_ENV !== 'production';
const options = {
    useNewUrlParser: true, // fall back to the old parser to support URI strings with port and avoid bugs in new parser
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex
}

const handleError = (error) => {
    console.error("Database Error: ", error.stack);
    process.exit(1);
}

const startConnection = () => {
    mongoose.connect(dbURI, options)
        .catch(error => handleError(error));  // Handle initial connection errors
}

startConnection();

// Handle errors after initial connection has been established
mongoose.connection.on('error', error => {
    handleError(error);
});

// Reconnect to database if disconnected
mongoose.connection.on('disconnected', () => {
    console.debug(`Mongoose connection disconnected`);
    startConnection(); // trying to reconnect
});