var jwt = require('jwt-simple');
var nconf = require('../config');

var validate = function(req, res, next) {

    var req_token = req.headers.auth_token;
    var req_userId = req.headers.user_id;
    var req_username = req.headers.username;

    var req_query_userId = (req.body.user_id || req._parsedUrl.query || req.params.id);

    if(req_query_userId && (req_query_userId.indexOf("x") > -1)) {

        // extracts the user id if it's combined with other ids
        req_query_userId = req_query_userId.split('x')[1];
    }

    if(req_token && req_userId && req_username) {

        try {

            var decoded = jwt.decode(req_token, (process.env.SECRET || nconf.get('auth:secret')));

            if(req_query_userId && (req_query_userId !== decoded.user_id)) {

                console.log("here");

                res.status(401)
                    .send({
                        access: "denied",
                        message: "This information is private yeah."
                    });
                return;

            } else if (decoded.exp <= Date.now()) { // checks that the access token is still in date

                res.status(400)
                    .send({
                        access: "denied",
                        message: "Access token has expired."
                    });
                return;

            } else if(decoded.username !== req_username) {

                res.status(401)
                    .send({
                        access: "denied",
                        message: "You've been fiddling with the username cookie haven't you?"
                    });
                return;

            } else if(decoded.user_id !== req_userId) {

                res.status(401)
                    .send({
                        access: "denied",
                        message: "You've been fiddling with the user_id cookie haven't you?"
                    });
                return;

            } else { // passes all the tests

                next(); // callback to indicate the next server function can be called (validated)
            }

        } catch(err) {

            res.status(401)
                .send({
                    access: "denied",
                    message: "Something went wrong... you've probably messed with access token. Try harder."
                });
        }
    } else {

        res.status(401)
            .send({
                access: "denied",
                message: "Missing authentication token, userId or username."
            });
    }
}

var admin = function(req, res, next) {

    var req_token = req.headers.auth_token;

    if(req_token) {

        try {

            var decoded = jwt.decode(req_token, (process.env.SECRET || nconf.get('auth:secret')));

            if(decoded.admin !== true) {

                res.status(401)
                    .send({
                        access: "denied",
                        message: "Does not have admin privileges."
                    });
                return;

            } else { // passes the test

                next();
            }

        } catch(err) {

            res.status(401)
                .send({
                    access: "denied",
                    message: "Something went wrong..."
                });
        }

    } else {

        res.status(401)
            .send({
                access: "denied",
                message: "Missing authentication token."
            });
    }

}

module.exports.validate = validate;
module.exports.admin = admin;
