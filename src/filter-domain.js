angular.module('gettext').filter('translateDomain', function (gettextCatalog) {
    function filter(input, domain) {
        return gettextCatalog.getString(input, null, domain);
    }
    filter.$stateful = true;
    return filter;
});