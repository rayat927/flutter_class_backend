const router = require('express').Router()
const bcrypt = require('bcrypt')
const con = require('../db')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
    const { name, email, password, role } = req.body

    con.query(`select * from users where email='${email}'`, function (err, results) {
        if (err) throw err;
        if (results.length > 0) {
            res.status(403).json({ msg: 'User already exists' })
        } else {
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) throw err;
                const token = jwt.sign({
                    email,
                    role
                }, '12345', {
                    expiresIn: '24h'
                })

                con.query(`insert into users (name, email, password, role)
                values ('${name}', '${email}',  '${hash}', '${role}')`, function (err, results) {
                    if (err) throw err;
                    con.query(`select id from users where email='${email}'`, function (err, results) {
                        console.log(results);
                        res.status(201).json({ msg: 'Registered Successfully', token, user_id: results[0].id })
                    })
                })
            })
        }
    })


})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    // console.log('hello');


    con.query(`select * from users where email='${email}'`, function (err, results) {
        console.log(email);
        if (err) throw err;
        if (results.length == 0) {
            res.status(404).json({ msg: "User doesn't exist" })
        } else {
            bcrypt.compare(password, results[0].password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        email: results[0].email,

                    }, '12345', {
                        expiresIn: '24h'
                    })

                    res.status(201).json({
                        msg: 'Login Successful',
                        token,
                        user_id: results[0].id,
                        role: results[0].role
                    })
                } else {
                    res.status(403).json({
                        msg: 'Wrong Password'
                    })
                }
            })
        }
    })

})

router.put('/update', (req, res) => {
    const { name, email, role } = req.body

    con.query(`update users set name='${name}',
            email='${email}',
            role='${role}',
    
            where id='${req.query.id}'
        `, function (err, results) {
        if (err) throw err;
        res.json(results)
    })
})

router.delete('/delete', (req, res) => {
    con.query(`delete from users where id='${req.query.id}'`)
})

router.get('/', (req, res) => {
    let conditions = ''

    conditions = req.query.id != undefined && req.query.id != '' ? ` and id=${req.query.id}` : ``

    con.query(`select * from users where 1=1 ${conditions}`, function (err, results) {
        if (err) throw err;
        res.status(201).json(results)
    })
})


module.exports = router