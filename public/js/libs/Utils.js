define([
    'jquery',
    'underscore'
], function($, _) {

    return {

        /**
         * ensures that each field in the supplied form is filled
         * @param form - array of each item in the form
         * @returns {boolean}
         */
        goodForm: function(form) {

            // returns the values that are empty
            var empty = _.filter(form, function(field) {

                return field.trim().length === 0;
            });

            return empty.length === 0;
        },

        /**
         * returns the value of the wanted cookie
         * @param cookie - the name of the cookie wanted
         * @returns {string}
         */
        getCookie: function(cookie) {

            var name = cookie + "=";
            var ca = document.cookie.split(';');

            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
            }

            return "";
        }
    }
});