define([
    'application'
], function (application) {
    return application.directive('boxTableActions', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: { 
                title:'@'
            },
            controller: function ($scope, $translate) {
                $translate($scope.title).then(function (text) {
                    $scope.title = text;
                });
            },
            templateUrl: 'app/modules/acao/directive/template/box-table-actions.html'
        };
    });
});