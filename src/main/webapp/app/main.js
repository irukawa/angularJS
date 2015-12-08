/* global require */
require.config({
    paths: {
        'bower_components': '../bower_components',
        'text': '../bower_components/requirejs-text/text',
        'json': '../bower_components/requirejs-json/json',
        'domReady': '../bower_components/requirejs-domready/domReady',
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'angular': '../bower_components/angular/angular.min',
        'angular-route': '../bower_components/angular-route/angular-route.min',
        'angular-resource': '../bower_components/angular-resource/angular-resource.min',
        'angular-ui-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-ng-table': '../bower_components/ng-table/ng-table.min',
        'angular-input-masks': '../bower_components/angular-input-masks/angular-input-masks-standalone.min',
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-ui-bootstrap': {
            deps: ['angular']
        },
        'bower_components/angular-ui-utils/ui-utils': {
            deps: ['angular']
        },
        'bower_components/angular-animate/angular-animate.min': {
            deps: ['angular']
        },
        'bower_components/angular-cookies/angular-cookies.min': {
            deps: ['angular']
        },
        'bower_components/angular-touch/angular-touch.min': {
            deps: ['angular']
        },
        'bower_components/angular-i18n/angular-locale_pt-br': {
            deps: ['angular']
        },
        'bower_components/angular-translate/angular-translate.min': {
            deps: ['angular']
        },
        'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.min': {
            deps: [
                'angular',
                'bower_components/angular-translate/angular-translate.min'
            ]
        },
        'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min': {
            deps: [
                'angular',
                'bower_components/angular-translate/angular-translate.min'
            ]
        },
        'bower_components/angular-messages/angular-messages.min': {
            deps: ['angular']
        },
        'bower_components/ng-file-upload/angular-file-upload.min': {
            deps: ['angular']
        },
        'angular-ng-table': {
            deps: ['angular']
        },
        'bower_components/ngDraggable/ngDraggable': {
            deps: ['angular']
        },
        'bower_components/bootstrap/dist/js/bootstrap.min': {
            deps: ['jquery']
        },
         'angular-input-masks': {
            deps: ['angular ']
        },
        'application': {
            deps: [
                'angular',
                'jquery',
                'bower_components/bootstrap/dist/js/bootstrap.min'
            ]
        }
    }
});

require(['application']);
