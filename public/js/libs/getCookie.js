//Filename: getCookie.js
define([
    'jquery',
    'underscore'
], function($, _) {

    $.fn.getCookie = function() {
        var name = this.selector + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
        }
        return "";
    };
});
