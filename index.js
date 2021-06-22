// index.js
'use strict'

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require ('body-parser');
let methodOverride = require('method-override');
require('dotenv').config();
let app = express();

// DB Setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);

let db = mongoose.connection;
db.once('open', () =>{
    console.log('DB connected');
});

db.on('error', (err) =>{
    console.log('DB ERROR : ', err);
});

// Other Setting
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//Routes
app.use('/',require('./routes/home'));
app.use('/posts',require('./routes/posts'));
app.use('/login',require('./routes/login'));

//Port setting
let port = process.env.local_port;
app.listen(port, () => {
    console.log(`server on! http://localhost:${port}`);
});

