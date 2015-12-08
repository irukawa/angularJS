define([
    'application'
], function (application) {
    /**
     * Serviço de tradução de propriedades da Modal
     * @param {object} modalParams
     * @param {text} prop
     * @param {text} alias
     */
    return application.lazy.factory('$modalTranslate', function ($translate) {
        return function (modalParams, prop, alias) {
            $translate(alias).then(function (text) {
               modalParams[prop] = text;
            });
        };
    });
});