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

    console.log(req.body);

    var date = new Date();
    var hashedPassword = passwordHash.generate(req.body.password);

    knex('users')
        .returning('id')
        .insert({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            date_added: date
        })
        .then(function(stuff) {

            console.log(stuff[0]);

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

module.exports.createUser = createUser;