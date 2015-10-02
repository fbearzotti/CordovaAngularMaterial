var categoriasControllers = angular.module('categoriasControllers', [])

categoriasControllers.controller('categoriasCtrl', function ($http, $timeout, $scope) {

  $scope.loadCategorias = function () {
    var uri = servidorOdata + 'categorias';
    var filtros = '?$filter=idTemporada eq 4&&orderby=nombre&$select=ID,nombre,deno';
    // Use timeout to simulate a 650ms request.
    $scope.categorias = [];
    return $timeout(function () {
      $http.get(uri + filtros)
      .success(function (response) {
        $scope.categorias = response.value;
      });
    }, 0);
  };

  $scope.loadPersonas = function (idCategoria) {

    var uri = servidorOdata + 'personas';
    var IDcategoria = idCategoria;
    var filtrosComienzo = '?$select=apellido,nombre,foto,activo&$filter=activo eq \'1\' and categoriasPersonas/any(d:d/idCategoria eq ';
    var filtrosFin = ')&$orderby=apellido ';

    var res = uri.concat(filtrosComienzo, IDcategoria, filtrosFin);

    $scope.personas = [];
    return $timeout(function () {
      $http.get(res)
      .success(function (response) {
        $scope.personas = response.value;
      });
    }, 0);


  };
});




