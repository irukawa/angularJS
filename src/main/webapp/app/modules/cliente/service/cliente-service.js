define([
    'application'
], function (application) {
    return application.lazy.service('ClienteService', function ($http) {


        this.get = function (id) {
            var url = application.clientsRestUrl + "/" + id;
            return $http.get(url);
        };

        this.list = function (params) {
            var url = application.clientsRestUrl;
            return $http.get(url, {params: params});
        };

        this.save = function (cliente) {
            console.info("NOME",cliente);
            var url = application.clientsRestUrl;
            return $http.post(url,cliente);
        };      

        this.delete = function (id) {
            var url = application.clientsRestUrl + '/' + id;
            return $http.delete(url);
        };

    });
});

