define([
    'jquery',
    'underscore'
], function($, _) {

    return {

        /**
         * ensures that each field in the supplied form is filled
         * @param form - array of each item in the form
         */
        goodForm: function(form) {

            // returns the values that are empty
            var empty = _.filter(form, function(field) {

                return field.trim().length === 0;
            });

            return empty.length === 0;
        }
    }
});