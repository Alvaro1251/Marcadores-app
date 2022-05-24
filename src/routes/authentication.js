const express = require('express');
const req = require('express/lib/request');
const router = express.Router();

const passport = require('../lib/passport');

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', (req, res) =>{
    passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });

    res.send('received');
});

router.get('/profile', (req, res) =>{
    res.send('Profile');
})

module.exports = router;
