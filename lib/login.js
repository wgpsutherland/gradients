var nconf = require('../config');
var passwordHash = require('password-hash');

if(process.env.USER != "Will") { // production
    var knex = require('knex')({
        client: 'pg',
        connection: process.env.DATABASE_URL,
        ssl: true
    });
} else {
    var knex = require('knex')({ // development
        client: 'pg',
        connection: {
            host     : nconf.get('db:host'),
            user     : nconf.get('db:user'),
            password : nconf.get('db:password'),
            database : nconf.get('db:database'),
            ssl: true
        }
    });
}

var loginUser = function(req, res) {

    console.log(process.env);

    knex('users')
        .where({
            username: req.body.username
        })
        .then(function(stuff) {
            if(stuff.length) { // it is a valid user

                // compare passwords
                if(passwordHash.verify(req.body.password, stuff[0].password)) {

                    res.status(200)
                        .send({
                            login: "success",
                            id: stuff[0].id
                        });
                } else { // invalid password
                    res.status(400)
                        .send({
                            login: "fail"
                        });
                }
            } else { // invalid user
                res.status(400)
                    .send({
                        login: "fail"
                    });
            }
        });
};

module.exports.loginUser = loginUser;