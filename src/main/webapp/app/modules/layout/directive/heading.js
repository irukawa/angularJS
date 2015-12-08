define([
  'angular',
  'application'
], function(angular, application) {
  /**
   * Componente usado para renderizar e manter o header do portal
   */
  return application.directive('heading', function(LayoutService) {
    return {
      restrict: 'E',
      templateUrl: 'app/modules/layout/directive/template/heading.html',
      controller: function($scope) {

        $scope.user = {};
        $scope.avatarUrl = null;

        function _mapToArray(map) {
          var array = [];
          angular.forEach(map, function(value,key){
            value.id = key;
            array.push(value);
          });
          return array;
        }

        $scope.getUserAvatarUrl = function(){
          var avatarUrl = $scope.user.avatarUrl;
          var avatarUrlType = $scope.user.avatarUrlType;

          if(avatarUrlType === 'DATABASE'){
            $scope.avatarUrl = avatarUrl + '?_=' + new Date().getTime();
          } else {
            $scope.avatarUrl = avatarUrl;
          }

        };

        /**
         * Oculta e exibe a barra lateral
         *
         * @returns {undefined}
         */
        $scope.toggleSidebar = function() {
          LayoutService.toggleSidebar();
        };

        $scope.shownModules = function(obj){
          return obj.hide ? false : true;
        };

        $scope.$on('heading.change-logo', function($event, logoSrc){
          $scope.logoSrc = logoSrc+"?_="+new Date().getTime();
        });

        $scope.$on('heading.remove-logo', function($event, logoSrc){
          $scope.logoSrc = null;
        });

        $scope.$on('user.refresh.done', function($event, user){
          $scope.user = user;
          $scope.getUserAvatarUrl();
        });
      }
    };
  });
});
