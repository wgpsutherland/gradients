var jwt = require('jwt-simple');

var validate = function(req, res, next) {

    console.log(req.headers.user_id);
    console.log(req.headers.username);
    console.log(req.headers.auth_token);
    next();
}

module.exports.validate = validate;