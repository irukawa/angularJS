require([
    'application',
    'modules/cliente/service/cliente-service'
], function (application) {
    return application.lazy.controller('ClienteListController', function ($scope, ClienteService, notify, $translate) {


        ClienteService.list().then(function (responseSuccess) {
            console.info("ljdglkjdsbgkljsnbdk", responseSuccess);
            $scope.clientes = responseSuccess.data;
            notify.success("CABO CONNECTA");
        }, function (responseError) {
            notify.error("CABO CONNECTA");
            console.info("ljdglkjdsbgkljsnbdk", responseError);
        });

        $scope.remove = function (id) {
            ClienteService.delete(id).then(function () {
                notify.success("Cliente Removido com Sucesso");
                $scope.list();
            }, function (response) {
                notify.error("Erro na remoção do cliente");

            });
        };

        //Parâmetros da Modal
        $scope.modalParams = {
            title: "Remoção de Cliente",
            text: "Deseja realmente remover o Cliente?",
            size: 'sm',
            success: $scope.remove
        };


        $scope.list = function () {
            ClienteService.list().then(function (response) {
                $scope.clientes = response.data;
            }, function (response) {
                console.log('deu ruim', response);
            });
        };







    });
});