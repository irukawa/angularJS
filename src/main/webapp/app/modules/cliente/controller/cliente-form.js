require([
    'application',
    'modules/cliente/service/cliente-service'
], function (application) {
    return application.lazy.controller('ClienteFormController', function ($scope, ClienteService, notify, $location, $routeParams) {


        //Voltar página de clientes
        $scope.voltar = function () {
            $location.path("/cliente");
        };


        $scope.submit = function () {
            ClienteService.save($scope.cliente).then(function (responseSuccess) {
                console.info("SUCCESS", responseSuccess);
                notify.success("Cliente Salvo com sucesso");
                $location.path('/cliente');
            }, function (responseError) {
                console.info("ERROR", responseError);
                notify.error("Erro ao Salvar o cliente");
            });
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