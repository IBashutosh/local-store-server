const dbConfig = require("../config/db.config")
const db = require("./models");
const Role = db.role;
function connect() {
    return new Promise((resolve, reject) => {
        db.mongoose
            .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                initial();
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    })
}

function close() {
    return db.mongoose.disconnect();
}

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

module.exports = { connect, close };