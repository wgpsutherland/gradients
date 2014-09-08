var nconf = require('nconf')

//Config source priority
// 1 - argv
// 2 - env
// 3 - overrides file (either dev or prod)
// 4 - common file

nconf.argv().env()

// We need to know if we're in dev or prod env
var env = nconf.get('NODE_ENV') || 'development'

nconf.file('overrides', __dirname + '/' + env + '-config.json')
nconf.file('common', __dirname + '/common-config.json')

module.exports = nconf