const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require('bcrypt');
const { default: User } = require('../../client/src/components/User');
const saltRounds = 10;


router.get("/users", function (req, res) {
    db.User.findAll({}).then(function (results) {
        res.json(results)
        console.log(results)
    })
})

router.get('/user:id', function (req, res) {
    db.User.fin
})



router.get('/select', (req, res) => {
    res.send('select')
})



router.post('/insert', (req, res) => {
    const user = await User.create({ name: req.body.name, password: req.body.password }).catch(err => {
        if (err) {
            console.log(err)
        }
        console.log(`New User ${user} has been created`)
    })

    // const name = req.body.name
    // const password = req.body.password

    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //     db.User.create({
    //         name: name,
    //         password: hash
    //     }).catch(err => {
    //         if (err) {
    //             console.log(err)
    //         }
    //     })
    // })

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