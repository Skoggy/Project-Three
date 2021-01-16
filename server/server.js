const express = require("express");
const cors = require('cors');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
// Requiring our models for syncing
const db = require("./models");



// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));
app.use('/api', require('./routes/api-routes'));





db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});

