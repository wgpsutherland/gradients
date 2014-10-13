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

    knex.transaction(function(trx) {

        console.log(req.body);

        knex('users')
            .transacting(trx)
            .returning('id')
            .insert({
                username: req.body.username.toLowerCase().trim(),
                password: hashedPassword,
                email: req.body.email.toLowerCase().trim(),
                date_added: date,
                current_year: parseInt(req.body.year)
            })
            .then(function(userStuff) {

                console.log(userStuff[0]);

                return knex('user_institution_join')
                    .transacting(trx)
                    .insert({
                        user_id: userStuff[0],
                        institution_id: parseInt(req.body.uni_choice)
                    })
                    .then(function(iuStuff) {

                        return knex('course_user_join')
                            .transacting(trx)
                            .insert({
                                user_id: userStuff[0],
                                course_id: parseInt(req.body.course_choice),
                                current: 1
                            })
                            .then(function(ciStuff) {

                                res.status(200).send({
                                    create: "success",
                                    id: userStuff[0]
                                });
                                trx.commit();
                            });
                    })
            })
            .catch(function(error) {
                res.status(400).send({
                    create: "fail"
                });
                trx.rollback();
            });
    })
    .then(function(inserts) {

    })
    .catch(function(error) {

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

var getUserModules = function(req, res) {

    knex.select('m.module_name', 'm.module_code', 'm.credits', 'mu.current_module', 'm.id', 'mu.user_id')
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

var getGradesForUserFromModule = function(req, res) {

    knex.transaction(function(trx) {

        var sentInfo = req._parsedUrl.query.split('x');

        knex.select('g.id', 'g.score', 'at.assignment_type', 'a.assignment_name', 'm.module_code', 'a.max_mark', 'a.semester', 'a.weight')
            .transacting(trx)
            .from('grades as g')
            .innerJoin('assignments as a', 'g.assignment_id', 'a.id')
            .innerJoin('assignment_type as at', 'a.assignment_type_id', 'at.id')
            .innerJoin('modules as m', 'a.module_id', 'm.id')
            .where({
                "g.user_id": sentInfo[1],
                "a.module_id": sentInfo[0]
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

var getModules = function(req, res) {

    knex.transaction(function(trx) {

        knex('modules')
            .transacting(trx)
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

var addUserModule = function(req, res) {

    var current;
    if(req.body.current) {
        current = 1;
    } else {
        current = 0;
    }

    knex('module_user_join')
        .returning('id')
        .insert({
            "current_module": current,
            "module_id": req.body.module_choice,
            "user_id": req.body.user_id
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
}

var getInstitutions = function(req, res) {

    knex.transaction(function(trx) {

        knex('institutions')
            .transacting(trx)
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

var getCourses = function(req, res) {

    knex.transaction(function(trx) {

        knex('courses')
            .transacting(trx)
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

var getAssignments = function(req,res) {

    var moduleId = req._parsedUrl.query;
    knex.select('a.assignment_name', 'a.max_mark', 'a.id')
        .from('assignments as a')
        .where({
            'a.module_id': moduleId
        })
        .then(function(rows) {
            res.status(200).send(rows);
        })
        .catch(function(error) {
            res.status(400).send({
                create:"fail"
            });
        });
}

var addGrade = function(req, res) {
    console.log(req.body);

    knex('grades')
        .returning('id')
        .insert({
            "assignment_id": req.body.assignment_choice,
            "score": req.body.score,
            "user_id": req.body.user_id
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
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.getUserModules = getUserModules;
module.exports.getGradesForUserFromModule = getGradesForUserFromModule;
module.exports.getModules = getModules;
module.exports.addUserModule = addUserModule;
module.exports.getInstitutions = getInstitutions;
module.exports.getCourses = getCourses;
module.exports.getAssignments = getAssignments;
module.exports.addGrade = addGrade;