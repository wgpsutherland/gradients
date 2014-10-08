var nconf = require('../config');
var passwordHash = require('password-hash');

var knex;

if(process.env.USER != "Will") { // production
    knex = require('knex')({
        client: 'pg',
        connection: process.env.DATABASE_URL,
        ssl: true
    });
} else {
    knex = require('knex')({ // development
        client: 'pg',
        connection: nconf.get('db:connection_string')
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

    knex.transaction(function(trx) {

        knex.select('u.id', 'u.username', 'u.email','u.current_year', 'i.institution_name', 'c.course_name')
            .transacting(trx)
            .from('users as u')
            .innerJoin('user_institution_join as ui', 'ui.user_id', 'u.id')
            .innerJoin('course_user_join as cu', 'cu.user_id', 'u.id')
            .innerJoin('institutions as i ', 'i.id', 'ui.institution_id')
            .innerJoin('courses as c', 'c.id', 'cu.course_id')
            .then(function(users) {
                res.status(200)
                    .send(users);
                trx.commit();
            })
            .catch(function(error) {
                res.status(400).send({
                    get: "fail"
                });
                trx.rollback();
            })
    })
    .then(function(inserts) {

    })
    .catch(function(error) {

    });
}

var getUser = function(req, res) {

    knex.transaction(function(trx) {

        knex.select('u.id', 'u.username', 'u.email','u.current_year', 'i.institution_name', 'c.course_name')
            .transacting(trx)
            .from('users as u')
            .innerJoin('user_institution_join as ui', 'ui.user_id', 'u.id')
            .innerJoin('course_user_join as cu', 'cu.user_id', 'u.id')
            .innerJoin('institutions as i ', 'i.id', 'ui.institution_id')
            .innerJoin('courses as c', 'c.id', 'cu.course_id')
            .where({
                "u.id": req.params.id
            })
            .then(function(users) {
                res.status(200)
                    .send(users[0]);
                trx.commit();
            })
            .catch(function(error) {
                res.status(400).send({
                    get: "fail"
                });
                trx.rollback();
            })
    })
    .then(function(inserts) {

    })
    .catch(function(error) {

    });
}

var getModules = function(req, res) {

    knex.select('m.module_name', 'm.module_code', 'm.credits', 'mu.current_module', 'm.id')
        .from('modules as m')
        .innerJoin('module_user_join as mu', 'm.id', 'mu.module_id')
        .where({
            "mu.user_id": req.params.id
        })
        .then(function(rows) {
            res.status(200).send(rows);
        })
        .catch(function(error) {
            res.status(400).send({
                create: "fail"
            });
        });
}

var getGrades = function(req, res) {

    knex.transaction(function(trx) {

        knex.select('g.id', 'g.score', 'at.assignment_type', 'a.assignment_name', 'm.module_code', 'a.max_mark', 'a.semester', 'a.weight')
            .transacting(trx)
            .from('grades as g')
            .innerJoin('assignments as a', 'g.assignment_id', 'a.id')
            .innerJoin('assignment_type as at', 'a.assignment_type_id', 'at.id')
            .innerJoin('modules as m', 'a.module_id', 'm.id')
            .where({
                "g.user_id": req.params.id
            })
            .then(function(rows) {
                res.status(200).send(rows);
                trx.commit();
            })
            .catch(function(error) {
                res.status(400).send({
                    create:"fail"
                });
                trx.rollback();
            });
    })
    .then(function(inserts) {

    })
    .catch(function(error) {

    });
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.getModules = getModules;
module.exports.getGrades = getGrades;
