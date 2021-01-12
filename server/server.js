const express = require("express");
const routes = require("./routes");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Requiring our models for syncing
const db = require("./models");

// app.use(routes);
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));


db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});

app.get('/', (req, res) => {
    res.send("hello world")
})
