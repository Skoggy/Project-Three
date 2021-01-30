const express = require('express');
const router = express.Router();

const { Stocktype, Stock, User } = require('../models');
const passport = require('../config/passport');
const pdf = require('html-pdf');
const pdfTemplate = require('../documents/index')



router.post("/login", passport.authenticate("local"),
    (req, res) => {
        res.json(req.user);
    });

// Route for signing up a user.The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model.If the user is created successfully, proceed to log the user in,
//     otherwise send back an error
router.post("/signup", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.create({
            email, password
        })
        const data = {
            id: user.id,
            email: user.email
        }
        return res.json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})


// Route for logging user out
router.get("/logout", function (req, res) {
    console.log('hey')
    req.logout();

});



// POST PDF generation and fetching of data
router.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
})


// GET send PDF to client
router.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}`)
})

// CREATE new Stocktype / provider
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

// GET all stockstypes including all of their stocks
router.get('/stocktypes', async (req, res) => {
    try {
        const stocktypes = await Stocktype.findAll(({ include: 'stocks' }))
        return res.json(stocktypes)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: 'Something went wrong' })
    }
})

// DELETE stocktype / stock provider
router.delete('/stocktypes/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        const stocktype = await Stocktype.findOne({
            where: { uuid }
        })

        await stocktype.destroy()

        return res.json({ message: "Stock provider removed." })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: 'Something went wrong' })
    }
})



router.put('/stocktypes/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { name } = req.body;
    try {
        const stocktype = await Stocktype.findOne({
            where: { uuid }
        })

        stocktype.name = name;

        await stocktype.save()

        return res.json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: 'Something went wrong' })

    }
})

router.post('/stocks', async (req, res) => {
    const { stocktypeUuid, name, value, amount, minAmount, note } = req.body

    try {
        const stocktype = await Stocktype.findOne({ where: { uuid: stocktypeUuid } })

        const stock = await Stock.create({ name, amount, value, minAmount, note, stocktypeId: stocktype.id })

        return res.json(stock)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

router.put('/stocknote/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { note } = req.body;
    try {
        const stock = await Stock.findOne({
            where: { uuid }
        })

        stock.note = note;

        await stock.save()

        return res.json()

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

router.put('/stocks/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { amount } = req.body;
    try {
        const stock = await Stock.findOne({
            where: { uuid }
        })

        stock.amount = amount;

        await stock.save()

        return res.json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: 'Something went wrong' })

    }
})

module.exports = router