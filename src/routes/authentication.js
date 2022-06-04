const express = require('express');
const req = require('express/lib/request');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const { body, validationResult } = require('express-validator');

// Signup
router.get('/signup', isNotLoggedIn,(req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));


// Signin
router.get('/signin', isNotLoggedIn,(req, res) => {
    res.render('auth/signin')
});

router.post('/signin', isNotLoggedIn,[

    body('username', 'Username is Required').notEmpty(),
    body('password', 'Password is Required').notEmpty()],

    (req, res, next) => {
    const errors = validationResult(req);
    if (errors.length > 0) {
      req.flash('message', errors[0].msg);
      res.redirect('/signin');
      
    }
    passport.authenticate('local.signin', {
      successRedirect: '/profile',
      failureRedirect: '/signin',
      failureFlash: true
    })(req, res, next);
  });

// router.post('/signin', [
//     body('username', 'Username is Required')
//         .exists()
//         .isLength({ min: 5 }),
//     body('password', 'Password is Required')
//         .exists()
//         .isLength({ min: 5 })
// ], (req, res, next) => {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()){
//         console.log(req.body);
//         const valores = req.body;
//         const validaciones = errors.array;
//         res.render('/signin', {validaciones: validaciones, valores: valores});
//     }else{
//         res.send('Validacion exitosa');
//     }
    // const errors = validationResult(req);
    // if (!errors.isEmpty()){
    //     res.status(400).json({ errors: errors.array() });
    //     console.log(errors);
    // }
    // if (errors.length > 0) {
    //     console.log(errors)
    //     req.flash('message', errors[0].msg);
    //     res.redirect('/signin');
    // }
    // passport.authenticate('local.signin', {
    //     successRedirect: '/profile',
    //     failureRedirect: '/signin',
    //     failureFlash: true
    // })
    // (req, res, next)
    


router.get('/logout', isLoggedIn,(req, res) => {
    req.logOut();
    res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
})

module.exports = router;
