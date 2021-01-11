// const express = require("express");
// const routes = require("./routes");

// // Sets up the Express App
// // =============================================================
// const app = express();
// const PORT = process.env.PORT || 8080;

// // Requiring our models for syncing
// const db = require("./models");

// app.use(routes);
// // Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Static directory
// app.use(express.static("public"));


// db.sequelize.sync({ force: true }).then(function () {
//     app.listen(PORT, function () {
//         console.log("App listening on PORT " + PORT);
//     });
// });



const path = require("path");
const express = require("express");
const app = express(); // create express app


app.use(express.static(path.join(__dirname, 'build')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// start express server on port 5000
app.listen(7500, () => {
    console.log("server started on port 7500");
});