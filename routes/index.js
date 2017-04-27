var express = require('express');
var router = express.Router();
var controller = require('../controllers/userController');
const passport = require('passport');
var Strategy = require('passport-local').Strategy;


passport.use(new Strategy(controller.login))

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index')
});

router.get('/signup', function(req, res, next) {
	res.render('register')
});

router.post('/register',controller.signup);

router.post('/login', passport.authenticate('local', { session: false }),
	(req, res)=>{
	var user = req.user
	res.send(user)
} );

module.exports = router;
