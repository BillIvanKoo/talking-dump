const User = require('../models/user.js');
const userControl = require('../controllers/userController.js');
const passport = require('passport');
const bcrypt = require('bcrypt');

// let isPasswordValid = (user, password) => {
//   return bcrypt.compareSync(password, user.password);
// }

let passportAuth = (username, password, next) => {
  let findUser = User.findOne({username: username}, (err, user) => {
    if (err || user === null) {
      next(null, {message: 'username is not found'});
    } else {
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          next(err);
        } else {
          if (res) {
            next(null, user);
          } else {
            next(null, {message: 'password is incorrect'});
          }
        }
      });
    }
  });
}


module.exports = passportAuth;
