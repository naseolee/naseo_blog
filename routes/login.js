// routes/login.js
'use strict'

let express = require('express');
const { model } = require('mongoose');
const { restart } = require('nodemon');
let router = express.Router();

// login
router.get('/', (req,res) =>{
    res.render('login/login');
});

router.post('/', (req,res) =>{
    let email = req.body.email;
    let password = req.body.password;
    if(email === "admin@naseo.com" && password === "admin1234"){
        res.render('home/welcome');    
    }
    res.render('login/login');
});

module.exports = router;