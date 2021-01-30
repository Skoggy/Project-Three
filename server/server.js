const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const { sequelize } = require("./models");
const session = require("express-session");

const PORT = process.env.PORT || 3001;
// Sets up the Express App
// =============================================================
const app = express();
app.use(express.json());

app.use(cors());
// // Requiring our models for syncing


// // Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Requiring passport as we've configured it
const passport = require("./config/passport");

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

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

