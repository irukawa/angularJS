define([
  'application',
  // Configuração das rotas e menu
  'json!config.json'
], function(application, config) {
  /**
   * Componente usado para renderizar e manter o menu
   * @param {type} applicationsService
   */
  return application.directive('menu', function() {
    return {
      // replace: true,
      templateUrl: 'app/modules/layout/directive/template/menu.html',
      controller: function($scope, $location, $menu) {
          
        $scope.menu = config.menu;

          /**
         * Testa se esse menu é o ativo atualmente
         *
         * @param {type} item
         * @returns {Boolean}
         */
        $scope.isActive = function(item) {
          var active = false;
          if (item.href) {
            // Monta uma RegExp e testa contra a url atual removendo a primeira barra
            
            var regex = item.href+'($|[\/].*)';
            
            active = new RegExp(regex).test($location.url().replace('/', ''));
          }

          // Caso o menu tenha filhos, verifica recursivamente se
          // algum deles é o ativo
          if (item.children && item.children.length) {
            var activeChildren = item.children.filter(function(child) {
              return $scope.isActive(child);
            });

            active = active || activeChildren.length > 0;
          }

          return active;
        };

        $scope.toggle = function(item) {
          if (item.children && item.children.length) {
            item.opened = !item.opened;
          }
        };

        $scope.isOpened = function(item) {
          return item.opened;
        };
      }
    };
  });
});
