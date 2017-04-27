var express = require('express');
var router = express.Router();
var controller = require('../controllers/userController');
const passport = require('passport');

router.get('/signup', function(req, res, next) {
	res.render('signup')
});

router.post('/signup',controller.signup);

router.post('/login', passport.authenticate('local', { session: false }),controller.createToken);

module.exports = router;
