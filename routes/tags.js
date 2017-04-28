var express = require('express');
var router = express.Router();
var controller = require('../controllers/tagController')
var jwtHelper = require('../helpers/jwt')

router.get("/:username", jwtHelper.jwtAuthenticate, controller.getTags)


module.exports = router;