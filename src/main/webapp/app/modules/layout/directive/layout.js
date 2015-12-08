define([
  'application',
  'modules/layout/directive/heading',
  'modules/layout/directive/menu',
  'modules/layout/service/layout'
], function(application) {
  /**
   * Componente usado para renderizar e manter o header do portal
   *
   * @returns {undefined}
   */
  return application.directive('layout', function() {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'app/modules/layout/directive/template/layout.html',
      controller: function($scope, LayoutService) {
        $scope.showAsFlat = false;
        $scope.fullscreen = false;
        $scope.showMenu = LayoutService.isSidebarVisible();
        $scope.showSidebarRight = false;
        $scope.sidebarMini = false;
        //FIXME ajustar funcionalidade de login
        $scope.authenticated = true;

        /**
         * Evento para exibir o menu
         */
        $scope.$on('menu.show', function() {
          $scope.showMenu = true;
        });
        /**
         * Evento para ocultar o menu
         * TODO Remover esse e receber o boolean pelo evento
         */
        $scope.$on('menu.hide', function() {
          $scope.showMenu = false;
        });
        /**
         * Evento para mostrar o form de login
         */
        $scope.$on('login.authenticated', function($event, authenticated) {
          $scope.authenticated = authenticated;
        });
        /**
         * Evento para mostrar a barra lateral
         */
        $scope.$on('sidebarRight.show', function(ev, val) {
          $scope.showSidebarRight = val;
        });
        /**
         * Evento para minimizar a barra lateral
         */
        $scope.$on('sidebar.mini', function(ev, val) {
          $scope.sidebarMini = val;
        });
        /**
         * Evento para mostrar o page container sem fundo
         * e sem padding
         */
        $scope.$on('page.flat', function(ev, val) {
          $scope.showAsFlat = val;
        });
        /**
         * Evento para mostrar o page container sem fundo
         * e sem padding
         */
        $scope.$on('page.fullscreen', function(ev, val) {
          $scope.fullscreen = val;
        });
      }
    };
  });
});
