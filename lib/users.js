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

var createUser = function(req, res) {

    var date = new Date();
    var hashedPassword = passwordHash.generate(req.body.password);

    knex('users')
        .returning('id')
        .insert({
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            email: req.body.email.toLowerCase().trim(),
            date_added: date
        })
        .then(function(stuff) {

            res.status(200).send({
                create: "success",
                id: stuff[0]
            });
        })
        .catch(function(error) {
            res.status(400).send({
                create: "fail"
            });
        });
};

var loginUser = function(req, res) {

    var username = req.body.username.toLowerCase().trim();

    knex('users')
        .where({
            username: username
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

var getUsers = function(req, res) {

    knex.select('username', 'email', 'id')
        .from('users')
        .then(function(rows) {
            res.status(200)
                .send(rows);
        })
        .catch(function(error) {
            res.status(400).send({
                get: "fail"
            });
        });
}

var getUser = function(req, res) {

    knex.select('username', 'email', 'id')
        .from('users')
        .where({
            id: req.params.id
        })
        .then(function(rows) {
            res.status(200)
                .send(rows)
        })
        .catch(function(error) {
            res.status(400).send({
                get: "fail"
            });
        });
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;