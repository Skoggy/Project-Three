const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const { sequelize } = require("./models");
const session = require("express-session");


// Sets up the Express App
// =============================================================
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
app.use(cors());
// // Requiring our models for syncing
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// // Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Requiring passport as we've configured it
const passport = require("./config/passport");



// // Static directory
// app.use(express.static("public"));


app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/api-routes'));


app.listen(PORT, async () => {
    console.log(`Server up on PORT ${PORT}`);
    await sequelize.authenticate();
    console.log('Database Connected');
})




// db.sequelize.sync({ force: true }).then(function () {
//     app.listen(PORT, function () {
//         console.log("App listening on PORT " + PORT);
//     });
// });

