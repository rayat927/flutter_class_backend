const router = require('express').Router()
const con = require('../db')

router.get('/', (req, res) => {
    con.query(`select * from products`, function(err, results) {
        if(err) throw err;
        res.status(201).json(results)
    })
})

router.post('/add', (req, res) => {
    const {name, price, rating, description} = req.body

    con.query(`insert into products (name, price, rating, description) values ('${name}', '${price}', '${rating}', '${description}')`, function(err, results) {
        if(err) throw err;
        res.status(201).json(results)
    })
})  

module.exports = router