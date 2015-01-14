var getCookie = function(list, cookie) {

    var name = cookie + "=";
    var ca = list.split(';');

    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }

    return "";
};

module.exports.getCookie = getCookie;