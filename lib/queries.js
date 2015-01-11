var nconf = require('../config');
var passwordHash = require('password-hash');
var _ = require('underscore');
var jwt = require('jwt-simple');

var knex = require('knex')({
    client: 'pg',
    connection: (process.env.DATABASE_URL || nconf.get('db:connection_string')),
    ssl: true
});

var createUser = function(req, res) {

    var date = new Date();
    var hashedPassword = passwordHash.generate(req.body.password);

    knex.transaction(function(trx) {

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
        .then(function(rows) {

            if(rows.length) { // if the user exists

                var user = rows[0];

                // ensure the password matches the hashed password in the database
                if(passwordHash.verify(req.body.password, user.password)) {

                    res.status(200)
                        .send({
                            login: "success",
                            auth: genToken(user)
                        });
                } else { // invalid password

                    res.status(400)
                        .send({
                            login: "fail"
                        });
                }
            } else { // user doesn't exist

                res.status(400)
                    .send({
                        login: "fail"
                    });
            }
        });

    function genToken(user) {

        var expires = expiresIn(7); // 7 days

        var token = jwt.encode({
            exp: expires,
            username: user.username,
            user_id: user.id,
            admin: user.admin
        }, (process.env.SECRET || nconf.get('auth:secret')));

        return {
            token: token,
            expires: expires,
            user: user
        };
    }

    function expiresIn(numDays) {

        var dateObj = new Date();
        return dateObj.setDate(dateObj.getDate() + numDays);
    }
};

var getUser = function(req, res) {

    knex.transaction(function(trx) {

        knex.select('u.id', 'u.username', 'u.email','u.current_year', 'i.institution_name', 'c.course_name', 'u.admin')
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

    knex.select('m.module_name', 'm.module_code', 'm.credits', 'mu.current_module', 'm.id', 'mu.user_id', 'mu.year')
        .from('modules as m')
        .innerJoin('module_user_join as mu', 'm.id', 'mu.module_id')
        .where({
            "mu.user_id": req.params.id
        })
        .orderBy('m.module_code', 'asc')
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

        knex.select('g.id', 'g.score', 'a.assignment_name', 'm.module_code', 'm.id AS module_id', 'a.max_mark', 'a.weight', 'a.semester')
            .transacting(trx)
            .from('grades as g')
            .innerJoin('assignments as a', 'g.assignment_id', 'a.id')
            .innerJoin('assignment_type as at', 'a.assignment_type_id', 'at.id')
            .innerJoin('modules as m', 'a.module_id', 'm.id')
            .where({
                "g.user_id": sentInfo[1],
                "a.module_id": sentInfo[0]
            })
            .orderBy('a.due', 'asc')
            .orderBy('a.semester', 'asc')
            .orderBy('a.assignment_name', 'asc')
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

        knex('modules as m')
            .transacting(trx)
            .orderBy('m.module_code', 'asc')
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

    if(req.body.current) {
        var current = 1;
    } else {
        var current = 0;
    }

    knex('module_user_join')
        .returning('id')
        .insert({
            "current_module": current,
            "module_id": req.body.module_choice,
            "user_id": req.body.user_id,
            "year": req.body.year
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

        knex('institutions as i')
            .transacting(trx)
            .orderBy('i.institution_name', 'asc')
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

        knex('courses as c')
            .transacting(trx)
            .orderBy('c.course_name', 'asc')
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

    var query = req._parsedUrl.query.split("x");

    var moduleId = query[0];
    var year = query[1];

    knex.select('a.assignment_name', 'a.max_mark', 'a.id')
        .from('assignments as a')
        .where({
            'a.module_id': moduleId,
            'a.year': year
        })
        .orderBy('a.assignment_name', 'asc')
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

var deleteUserModule = function(req, res) {

    knex('module_user_join')
        .where({
            module_id: req.params.id,
            user_id: req.body.user_id
        })
        .del()
        .then(function() {
            res.status(200).send({
                delete: "successful"
            });
        })
        .catch(function(error) {
            res.status(400).send({
                delete: "fail"
            });
        });
}

var getGradeAverage = function(req, res) {

    var sentInfo = req.params.id.split('x'); // splits the sent info into constituent parts
    var moduleId = sentInfo[0];
    var userId = sentInfo[1];

    knex.transaction(function(trx) {

        knex.select('g.id', 'g.score', 'a.max_mark', 'a.weight')
            .transacting(trx)
            .from('grades as g')
            .innerJoin('assignments as a', 'g.assignment_id', 'a.id')
            .innerJoin('assignment_type as at', 'a.assignment_type_id', 'at.id')
            .innerJoin('modules as m', 'a.module_id', 'm.id')
            .where({
                "g.user_id": userId,
                "a.module_id": moduleId
            })
            .then(function(rows) { // this is the data for each assignment related to the module that has been completed

                var weightedAverage = calculateWeightedAverage(rows);

                trx.commit();
                res.status(200).send({
                    average: weightedAverage
                });
            })
            .catch(function(error) {
                res.status(400).send({
                    calculate:"fail"
                });
                trx.rollback();
            });
    })
    .then(function(inserts) {

    })
    .catch(function(error) {

    });
}

var updateGrade = function(req, res) {

    // really should have a validating user id in here

    knex('grades')
        .where({
            id: req.body.id
        })
        .update({
            score: req.body.score
        })
        .then(function(){
            res.status(200).send({
                create: "success"
            });
        })
        .catch(function(error) {
            res.status(400).send({
                insert:"fail"
            });
        });
}

var deleteGrade = function(req, res) {

    // should really have a validating user id in here

    knex('grades')
        .where({
            id: req.body.grade_id
        })
        .del()
        .then(function() {
            res.status(200).send({
                delete: "successful"
            });
        })
        .catch(function(error) {
            res.status(400).send({
                delete: "fail"
            });
        });
}

var createModule = function(req, res) {

    knex('modules')
        .returning('id')
        .insert({
            "module_name": req.body.name,
            "module_code": req.body.code,
            "credits": req.body.credits
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

var createAssignment = function(req, res) {

    knex('assignments')
        .returning('id')
        .insert({
            "assignment_name": req.body.name,
            "module_id": req.body.module,
            "assignment_type_id": req.body.type,
            "max_mark": req.body.max,
            "semester": req.body.semester,
            "weight": req.body.weight,
            "year": req.body.year,
            "due": req.body.due
        })
        .then(function(stuff) {
            res.status(200).send({
                create: "success",
                id: stuff[0]
            });
        })
        .catch(function(error) {
            console.log(error);
            res.status(400).send({
                create: "fail"
            });
        });
}

var getAssignmentTypes = function(req, res) {

    knex('assignment_type')
        .then(function(rows) {
            res.status(200).send(rows);
        })
        .catch(function(error) {
            res.status(400).send({
                delete: "fail"
            });
        });
}

var calculateWeightedAverage = function(rows) {

    var maxMarkSumWeighted = 0;
    var scoreSumWeighted = 0;

    _.each(rows, function(row) { // calculates the combined sum of the weighted components
        maxMarkSumWeighted += (row.max_mark * row.weight / 100);
        scoreSumWeighted += (row.score * row.weight / 100);
    });

    var weightedAverage = 100 * scoreSumWeighted / maxMarkSumWeighted; // works out the percentage grades

    weightedAverage = weightedAverage.toFixed(1); // 1dp all the time

    return weightedAverage;
}

var getYearAverages = function(req, res) {

    var userId = req._parsedUrl.query;

    knex.transaction(function(trx) {

        knex.select('g.id', 'g.score', 'a.max_mark', 'a.weight', 'a.year', 'm.id as module_id', 'm.credits')
            .transacting(trx)
            .from('grades as g')
            .innerJoin('assignments as a', 'g.assignment_id', 'a.id')
            .innerJoin('assignment_type as at', 'a.assignment_type_id', 'at.id')
            .innerJoin('modules as m', 'a.module_id', 'm.id')
            .where({
                "g.user_id": userId
            })
            .orderBy('m.id', 'asc')
            .then(function(rows) { // this is the data for each assignment related to the module that has been completed

                var returnables = [];

                var splitByYear = _.groupBy(rows, function(row) { // splits the data into separate arrays based on their year
                    return row.year;
                });

                _.each(splitByYear, function(yearSet, key) { // iterates through each year set

                    var splitByModule = _.groupBy(yearSet, function(row) { // splits the data into the separate modules
                        return row.module_id;
                    });

                    var maxWeighting = 0;
                    var weightedYearTotal = 0;

                    _.each(splitByModule, function(moduleSet) { // for each module calculates the average

                        var moduleCredit = moduleSet[0].credits;

                        maxWeighting += moduleCredit;
                        weightedYearTotal += (calculateWeightedAverage(moduleSet) * moduleCredit);

                    });

                    var yearAverage = weightedYearTotal / maxWeighting;

                    returnables.push({
                        year: key,
                        average: yearAverage.toFixed(1)
                    });
                });

                trx.commit();
                res.status(200).send(returnables);
            })
            .catch(function(error) {
                res.status(400).send({
                    calculate:"fail"
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
module.exports.getUser = getUser;
module.exports.getUserModules = getUserModules;
module.exports.getGradesForUserFromModule = getGradesForUserFromModule;
module.exports.getModules = getModules;
module.exports.addUserModule = addUserModule;
module.exports.getInstitutions = getInstitutions;
module.exports.getCourses = getCourses;
module.exports.getAssignments = getAssignments;
module.exports.addGrade = addGrade;
module.exports.deleteUserModule = deleteUserModule;
module.exports.getGradeAverage = getGradeAverage;
module.exports.updateGrade = updateGrade;
module.exports.deleteGrade = deleteGrade;
module.exports.createModule = createModule;
module.exports.createAssignment = createAssignment;
module.exports.getAssignmentTypes = getAssignmentTypes;
module.exports.getYearAverages = getYearAverages;