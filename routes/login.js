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

module.exports = router;