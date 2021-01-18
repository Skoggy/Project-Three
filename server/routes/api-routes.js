const express = require('express');
const router = express.Router();
const { sequelize, Stocktype, Stock } = require('../models');
const bcrypt = require('bcrypt');

const saltRounds = 10;


// router.get("/users", function (req, res) {
//     db.User.findAll({}).then(function (results) {
//         res.json(results)
//         console.log(results)
//     })
// })

// router.get('/login', function (req, res) {
//     res.json({ name: "chris" })
// })


// router.post('/insert', async (req, res) => {
//     const user = await User.create({ name: req.body.name, password: req.body.password }).catch(err => {
//         if (err) {
//             console.log(err)
//         }
//         console.log(`New User ${user} has been created`)
//     })

//     // const name = req.body.name
//     // const password = req.body.password

//     // bcrypt.hash(password, saltRounds, (err, hash) => {
//     //     db.User.create({
//     //         name: name,
//     //         password: hash
//     //     }).catch(err => {
//     //         if (err) {
//     //             console.log(err)
//     //         }
//     //     })
//     // })

// })
// router.delete('/delete', (req, res) => {
//     res.send('delete')
// })

// router.post("/register", function (req, res) {
//     console.log(req.body);
//     db.User.create({
//         name: req.body.name,
//         password: req.body.password
//     }).then(function (results) {
//         res.json(results)
//         res.end()
//     })
// })

// router.get("/stock", function (req, res) {
//     db.Stock.findAll({}).then(function (results) {
//         res.json(results)
//     })
// })

// router.post("/stock", function (req, res) {
//     console.log(req.body);
//     db.StockType.create({
//         name: req.body.name,
//         // value: req.body.value
//     }).then(function (results) {
//         res.json(results)
//         res.end()
//     })
// })

// router.post("/stocktype", function (req, res) {
//     console.log(req.body);
//     db.StockType.create({
//         name: req.body.name
//     }).then(function (results) {
//         res.json(results)
//         res.end()
//     })
// })


// router.get("/stocktype", function (req, res) {
//     db.StockType.findAll({}).then(function (results) {
//         res.json(results)
//         res.end()
//     })
// })






router.post('/stocktypes', async (req, res) => {
    const { name } = req.body
    try {
        const stocktype = await Stocktype.create({ name })
        return res.json(stocktype)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

router.get('/stocktypes', async (req, res) => {
    try {
        const stocktypes = await Stocktype.findAll()
        return res.json(stocktypes)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: 'Something went wrong' })
    }
})

router.get('/stocktypes/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        const stocktype = await Stocktype.findOne({
            where: { uuid },
            include: 'stocks'
        })
        return res.json(stocktype)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: 'Something went wrong' })
    }
})

router.post('/stocks', async (req, res) => {
    const { stocktypeUuid, name, value } = req.body

    try {
        const stocktype = await Stocktype.findOne({ where: { uuid: stocktypeUuid } })

        const stock = await Stock.create({ name, value, stocktypeId: stocktype.id })

        return res.json(stock)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

router.get('/stocks', async (req, res) => {
    try {
        const stocks = await Stock.findAll({ include: 'stocktype' })
        return res.json(stocks)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})



module.exports = router