require([
    'application'
], function(application){
    return application.lazy.controller('HomeController', function($scope, $translate){
        $scope.setLang = function(lang) {
            $translate.use(lang);
        };
    });
});