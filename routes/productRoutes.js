const router = require('express').Router()
const con = require('../db')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage })

router.get('/', (req, res) => {

    let condition = ''

    condition += req.query.id != undefined && req.query.id != '' ? ` and id='${req.query.id}'` : ``

    condition += req.query.rating != undefined && req.query.rating != '' ? ` and rating='${req.query.rating}'` : ``


    con.query(`select * from products where 1=1 ${condition}`, function (err, results) {
        if (err) throw err;
        res.status(201).json(results)
    })
})



router.post('/add', upload.single('image'), (req, res) => {
    const { name, price, rating, description } = req.body

    let image_url = '';

    if (req.file) {
        image_url = 'http://68.178.163.174:5501/' + req.file.filename

    }

    con.query(`insert into products (name, price, rating, description, image_url) values ('${name}', '${price}', '${rating}', '${description}', '${image_url}')`, function (err, results) {
        if (err) throw err;
        res.status(201).json(results)
    })
})

router.put('/edit', (req, res) => {
    const { name, price, rating, description } = req.body

    con.query(`update products set name='${name}',
            price='${price}', rating='${rating}',
            description='${description}' where id='${req.query.id}'`, function (err, results) {
        if (err) throw err;
        res.status(201).json(results)
    })
})

router.delete('/delete', (req, res) => {
    con.query(`delete from products where id='${req.query.id}'`, function (err, results) {
        if (err) throw err;
        res.status(201).json(results)
    })
})

router.get('/top_rated', (req, res) => {
    con.query(`select * from products order by rating desc`, function(err, result) {
        if(err) throw err;
        res.status(201).json(result)
    })
})

module.exports = router