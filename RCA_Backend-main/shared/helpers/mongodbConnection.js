const mongoose = require('mongoose');

exports.getMongoConnection = (config) => {
    const dbUrl = 'mongodb+srv://'+ config.MONGO_USERNAME +':'+ config.MONGO_PASSWORD +'@' + config.MONGO_HOST + '/' + config.MONGO_DBNAME;
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    var conn = mongoose.connection;
    // mongoose.set('debug', process.env.DEBUG);
    conn.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
    conn.once("open", function() {
        console.log("Database connection has been established successfully.");
        logger.info('Database connection has been established successfully.');
    });
    return conn;
}