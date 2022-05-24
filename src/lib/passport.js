const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.signup', new LocalStrategy({
    usernameField: 'usernam',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, donde) => {

    console.log(req.body);
    
}));

// passport.deserializeUser((usr, done) =>{

// });
