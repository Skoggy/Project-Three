const express = require('express');
const router = express.Router();
const db = require("../models")


router.get("/users", function (req, res) {
    db.User.findAll({}).then(function (results) {
        res.json(results)
        console.log(results)
    })
})



router.get('/select', (req, res) => {
    res.send('select')
})

router.get('/insert', (req, res) => {
    db.User.create({
        name: "chris",
        password: "chris"
    }).catch(err => {
        if (err) {
            console.log(err)
        }
    })
})
router.delete('/delete', (req, res) => {
    res.send('delete')
})

// app.post("/users", function (req, res) {
//     console.log(req.body);
//     db.User.create({
//         name: req.body.name,
//         password: req.body.password
//     }).then(function (results) {
//         res.json(results)
//         res.end()
//     })

module.exports = router;