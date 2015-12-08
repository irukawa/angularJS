require([
    'application',
    'modules/cliente/service/cliente-service'
], function (application) {
    return application.lazy.controller('ClienteViewController', function ($scope, ClienteService,notify, $routeParams, $location) {

        //Voltar página de clientes
        $scope.voltar = function () {
            $location.path("/cliente");
        };
        
        if($routeParams.id){
            ClienteService.get($routeParams.id).then(function(responseSuccess){
                $scope.cliente=responseSuccess.data;
                console.info("RESPONSESUCCESS",responseSuccess);
                notify.success("Dados Consultados com sucesso");
                
            },function(responseError){
                console.info("RESPONSEERROR",responseError);
                notify.error("Erro na consulta");
            });
        }

    });
});