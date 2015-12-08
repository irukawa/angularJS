define([
    'angular',
    'jquery',
    // Configuração das rotas e menu
    'json!config.json',
    // Dependências principais  
    'angular-route',
    'angular-resource',
    'angular-ui-bootstrap',
    'bower_components/angular-ui-utils/ui-utils',
    'angular-ng-table',
    'bower_components/prefix-free/prefixfree.min',
    'bower_components/angular-animate/angular-animate.min',
    'bower_components/angular-cookies/angular-cookies.min',
    'bower_components/angular-touch/angular-touch.min',
    'bower_components/angular-i18n/angular-locale_pt-br',
    'bower_components/angular-translate/angular-translate.min',
    'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.min',
    'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min',
    'bower_components/ngDraggable/ngDraggable',
    'bower_components/angular-messages/angular-messages.min',
    'bower_components/ng-file-upload/angular-file-upload.min',
    'bower_components/angular-currency-mask/angular-currency-mask'
], function (angular, $, config) {

    var application = angular.module('application', [
        'ngRoute',
        'ngResource',
        'ngCookies',
        'ngAnimate',
        'ngTouch',
        'ngLocale',
        'ngTable',
        'ngDraggable',
        'ngMessages',
        'ui.bootstrap',
        'ui.mask',
        'pascalprecht.translate',
        'angularFileUpload',
        'currencyMask'
    ]);

    /**
     * Salva a referência dos providers em todos os módulos para poder
     * registrar componentes por lazy loading
     *
     * @param {type} $controllerProvider
     * @param {type} $compileProvider
     * @param {type} $provide
     * @param {type} $filterProvider
     * @returns {undefined}
     */
    function configureLazyProviders($controllerProvider, $compileProvider, $provide, $filterProvider) {
        var lazy = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            constant: $provide.constant,
            decorator: $provide.decorator,
            factory: $provide.factory,
            provider: $provide.provider,
            service: $provide.service,
            value: $provide.value,
            filter: $filterProvider.register
        };

        application.lazy = lazy;
    }

    /**
     * Configura as traduções da aplicação
     * @param {type} $translateProvider
     * @param {type} navigator
     * @returns {undefined}
     */
    function configureTranslations($translateProvider, $translatePartialLoaderProvider, navigator) {
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'app/modules/{part}/translate/{lang}.json'
        });

        $translateProvider.determinePreferredLanguage(function () {
            if (navigator.userLanguage || navigator.language) {
                var lang = navigator.userLanguage || navigator.language;
                return lang.toLowerCase();
            }

            return 'en-us';
        });

        $translateProvider.fallbackLanguage('en-us');

        $translateProvider.useCookieStorage();

        //Registro dos arquivos de translate para cada módulo
        $translatePartialLoaderProvider.addPart('layout');


    }

    /**
     * Configura as rotas da aplicação
     * @param {type} $routeProvider
     * @returns {undefined}
     */
    function configureRoutes($routeProvider) {

        angular.forEach(config.routes, function (route, url) {
            if (route.controllerUrl) {
                if (!route.resolve) {
                    route.resolve = {};
                }

                if (!route.resolve.load) {
                    route.resolve.load = function ($q, $timeout, $rootScope) {
                        var deferred = $q.defer();
                        require([route.controllerUrl], function () {
                            $timeout(function () {
                                deferred.resolve();
                                $rootScope.$apply();
                            }, 100);
                        });
                        return deferred.promise;
                    };
                }
            }

            $routeProvider.when(url, route);
        });
    }

    /**
     * Configura os padrões de tratamento de Request e Response dos serviços REST
     * @param {object} $httpProvider
     * @param {object} applications
     */
    function configureRequestInterceptors($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $rootScope) {
            return {
                request: function (config) {
                    return config;
                },
                responseError: function (rejection) {
                    var responseInterceptors = {
                        400: function (rejection) { // BAD REQUEST
                            $rootScope.$broadcast('layout.notify', rejection.data);
                        },
                        401: function (rejection) { // UNAUTHORIZED
                            $rootScope.$broadcast('login.request_unathorized', rejection);
                            $rootScope.$broadcast('layout.notify', rejection.data);
                        },
                        403: function (rejection) { // FORBIDDEN
                            $rootScope.$broadcast('layout.notify', rejection.data);
                        },
                        404: function (rejection) { // PAGE NOT FOUND
                            $rootScope.$broadcast('layout.notify', rejection.data);
                        },
                        500: function (rejection) { // INTERNAL SERVER ERROR
                            $rootScope.$broadcast('layout.notify', rejection.data);
                        }
                    };

                    if (responseInterceptors[rejection.status]) {
                        responseInterceptors[rejection.status](rejection);
                    }

                    return $q.reject(rejection);
                }
            };
        });
    }

    /**
     * Configura o whitelist de todos os protocolos que podem ser usados
     * em links no HTML (retira o unsafe:... da frente do protocolo)
     * @param {type} $compileProvider
     * @param {type} $sceProvider
     */
    function configureHTTPWhitelist($compileProvider, $sceProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|javascript):/);
        $sceProvider.enabled(false);
    }

    /**
     * Configura o listener da mudança de rotas
     * específico da aplicação
     * @param {type} $rootScope
     * @param {type} $menu
     */
    function configureRouteChangeListener($rootScope) {

        /**
         * Verifica mudança de rotas e emite os eventos de entrada e saida dos módulos
         * Bem como a mudança do menu de contexto de cada módulo
         */
        $rootScope.$on('$routeChangeSuccess', function ($event, $destRoute, $originRoute) {
        });
    }

    /**
     * Configura um request transformer para todos os requests pra incluir o
     * token de autenticação no cabeçalho
     *
     * @param {type} $http
     * @param {type} LoginService
     * @returns {undefined}
     */
    function configureAuthenticationListener($http, $rootScope, $route, LoginService) {
        $http.defaults.transformRequest.push(function (data, getHeaders) {
            getHeaders()["X-Authorization-Token"] = LoginService.getAuthenticationToken();
            return data;
        });

        $rootScope.$on('login.authenticated', function ($event, authenticated) {
            //Ao autenticar emite evento de enter do módulo novamnete
            if (authenticated) {
                $rootScope.$broadcast($route.current.$$route.module + '.enter', $route.current);
            }
        });
    }


    /**
     * Carrega os templates relativos ao portal no momento do carregamento
     * ao inves de on-demand
     * @param  $http
     * @param  $templateCache
     * @return
     */
    function loadTemplatesIntoCache($http, $templateCache) {
        var templateUrls = [
            {
                name: 'application-error-messages',
                url: 'app/modules/layout/template/application-error-messages.html'
            }            
        ];

        angular.forEach(templateUrls, function (template) {
            $http.get(template.url).then(function (response) {
                $templateCache.put(template.name, response.data);
            });
        });
    }
    application.config(function ($controllerProvider, $compileProvider, $provide, $filterProvider, $translateProvider, $routeProvider, $httpProvider, $sceProvider, $translatePartialLoaderProvider) {

        configureLazyProviders($controllerProvider, $compileProvider, $provide, $filterProvider);
        configureTranslations($translateProvider, $translatePartialLoaderProvider, window.navigator);
        configureRoutes($routeProvider);
        configureRequestInterceptors($httpProvider);
        configureHTTPWhitelist($compileProvider, $sceProvider);

    });

    application.run(function ($rootScope, $http, $route,$templateCache) {

//    configureAuthenticationListener($http, $rootScope, $route);
        configureRouteChangeListener($rootScope);
        loadTemplatesIntoCache($http, $templateCache);

    });

    /**
     * Inicia as dependências principais do módulo do Portal e inicia a aplicação
     *
     * FIXME Devia apenas chamar as diretivas e cada uma delas declarar suas dependências
     *
     * @param {type} doc
     * @returns {undefined}
     */
    require([
        'domReady!',
        'modules/layout/controller/app-main',
        'modules/layout/service/menu',
        'modules/layout/service/layout',
        'modules/layout/directive/conf-modal',
        'modules/layout/service/notify'
    ], function (doc) {
        application.host = "http://localhost:8080/CrudJPAEjb";
        //application.host="http://"+location.host+"/me-orcamento-backend";
        //application.host="http://192.168.3.32:7009/me-orcamento-backend";
        application.clientsRestUrl = application.host + "/rest/clientes";
        console.info("APPLICATION", application);
        angular.bootstrap(doc, [application.name]);
    });

    return application;
});
