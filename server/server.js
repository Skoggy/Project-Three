const express = require("express");
const cors = require('cors');
const { sequelize, Stocktype } = require("./models");


// Sets up the Express App
// =============================================================
const app = express();
app.use(express.json())
// const PORT = process.env.PORT || 3001;
app.use(cors());
// // Requiring our models for syncing


// // Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));


// // Static directory
// app.use(express.static("public"));
app.use('/api', require('./routes/api-routes'));





app.listen({ port: 3001 }, async () => {
    console.log('Server up on port 3001')
    await sequelize.authenticate()
    console.log('Database Connected')
})




// db.sequelize.sync({ force: true }).then(function () {
//     app.listen(PORT, function () {
//         console.log("App listening on PORT " + PORT);
//     });
// });

