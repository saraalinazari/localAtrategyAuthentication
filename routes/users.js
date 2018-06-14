var express = require('express');
var router  = express.Router();

var users_controller = require('../controllers/users_controller');
var passport = require("../config/passport");

router.get('/', users_controller.index);
router.post('/', passport.authenticate("local"), users_controller.loginUser);
router.get('/new',users_controller.registerUser);
router.post('/new',users_controller.signUpUser);

module.exports = router;