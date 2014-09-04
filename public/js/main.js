// Filename: main.js
require.config({
	paths: {
		jquery: "//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.2/jquery.min",
        underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min",
        backbone: "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",
        bootstrap: "//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/js/bootstrap.min",
        text: "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text",
        templates: "../templates"
	},
	shim: {
		backbone: {
			deps: ['underscore']
		},
		underscore: {
			exports: '_'
		}
	}
});

require(['app'],

	function(App) {
		App.initialise();
	}
)