define([
    'application'
], function (application) {
    /**
     * Serviço de gerenciamento do menu
     *
     * @param {type} $rootScope
     * @returns {undefined}
     */
    return application.service('$menu', function ($rootScope, $route) {
      this.set = function (menu) {
        $rootScope.$broadcast('menu.change', menu);
      };

      this.update = function(){
        this.set(this.getCurrent());
      };

//      this.getCurrent = function(){
//        return angular.module($route.current.$$route.module)._menu;
//      };
    });
});

