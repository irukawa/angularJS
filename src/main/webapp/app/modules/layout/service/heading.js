define([
    'application'
], function (application) {
    /**
     * Serviço de gerenciamento do heading
     *
     * @param {type} $rootScope
     * @returns {undefined}
     */
    return application.service('$heading', function ($rootScope) {
      this.setLogo = function (logoSrc){
        $rootScope.$broadcast('heading.change-logo', logoSrc);
      };

      this.clearLogo = function(){
        $rootScope.$broadcast('heading.remove-logo');
      };

    });
});
