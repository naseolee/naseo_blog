// routes/home.js
'use strict'

let express = require('express');
const { restart } = require('nodemon');
let router = express.Router();

// Home
router.get('/', (req,res) =>{
    res.render('home/welcome');
});

module.exports = router;