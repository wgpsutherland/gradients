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
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }

            return "";
        },

        /**
         * convert a form to an object containing key value pairs (name: "value") for each field in the form
         * @param form - the form being parsed
         * @returns {{}}
         */
        formToObject: function(form) {

            var o = {};
            var a = form.serializeArray();
            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        }
    }
});