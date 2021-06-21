// routes/posts.js
'use strict'

const { render } = require('ejs');
let express = require('express');
const { restart } = require('nodemon');
let router = express.Router();
let Post = require('../models/Post');
let util = require('../util');

// Index
router.get('/', (req, res) => {
    let categoryNameQuery = req.query.category_name ? req.query.category_name : null;
    let categoriesName = [];
    Post.find({}).sort('-createdAt').exec((err, posts) => {
        if (err) return res.json(err);
        //Get uniq categories name from all
        posts.forEach(post => {
            categoriesName.push(post.category);

            post.body = post.body.substring(0, 100);
        });
        categoriesName = util.uniq(categoriesName).sort();
        //List
        if (categoryNameQuery) {
            posts = posts.filter(elem => categoryNameQuery === elem.category);
        }
        res.render('posts/index', { posts: posts, categoriesName: categoriesName });
    });
});

//New
router.get('/new', (req, res) => {
    Post.distinct('category', (err, categories) => {
        if (err) return res.json(err);
        res.render('posts/new', { categories: categories });
    });
});

//Create
router.post('/', (req, res) => {
    if (req.body.category === "other") req.body.category = req.body.txt_other_category;
    Post.create(req.body, (err, post) => {
        if (err) return res.json(err);
        res.redirect('/posts');
    });
});

//Show
router.get('/:id', (req, res) => {
    let categoriesName = req.query.categories;
    Post.findOne({ _id: req.params.id }, (err, post) => {
        if (err) return res.json(err);
        res.render('posts/show', { post: post , categoriesName:categoriesName});
    });
});

//Edit
router.get('/:id/edit', (req, res) => {
    let categories = util.commaSplit(req.query.categories);
    Post.findOne({ _id: req.params.id }, (err, post) => {
        if (err) return res.json(err);
        res.render('posts/edit', { post: post, categories:categories});
    });
});

//Update
router.put('/:id', (req, res) => {
    req.body.updatedAt = Date.now();
    Post.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true }, (err, post) => {
        if (err) return res.json(err);
        res.redirect(`/posts/${req.params.id}`);
    });
});

//Delete
router.delete('/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id }, (err, post) => {
        if (err) return res.json(err);
        res.redirect('/posts');
    });
});

//Search
router.search('/',(req, res) =>{
    let categoriesName = util.commaSplit(req.body.hid_categories);
    let searchValue = req.body.search_value;
    let searchType = req.body.search_type;
    Post.find({$or:util.getQueryFromSearchType(searchType,searchValue)}).sort('-createdAt').exec((err,posts) =>{
        if(err) return res.json(err);
        res.render('posts/index', { posts: posts, categoriesName: categoriesName });    
    
    });
});

module.exports = router;
