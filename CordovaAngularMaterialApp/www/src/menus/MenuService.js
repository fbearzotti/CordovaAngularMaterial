(function () {
  'use strict';

  angular.module('menus')
         .service('menuService', ['$q', UserService]);

  /**
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function UserService($q) {
    var menus = [
      //{
      //  name: 'Lia Lugo',
      //  avatar: 'svg-1',
      //  content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
      //},
    {
      titulo: 'Personas',
      url: 'index.html',
      icono: 'flaticon-users81'
    },
    {
      titulo: 'Categorias',
      url: 'SSDWEB/categorias.html',
      icono: 'flaticon-multiple25'
    },
    {
      titulo: 'Entrenamientos',
      url: 'index.html',
      icono: 'flaticon-homework'
    },
    {
      titulo: 'Destrezas',
      url: 'index.html',
      icono: 'flaticon-americanfootball2'
    },
    {
      titulo: 'Ficha de Salud',
      url: 'index.html',
      icono: 'flaticon-stethoscope'
    },
    {
      titulo: 'Opciones',
      url: 'index.html',
      icono: 'flaticon-configuration21'
    },
    {
      titulo: 'Salir',
      url: 'index.html',
      icono: 'flaticon-door9'
    }];

    // Promise-based API
    return {
      cargarMenu: function () {
        return $q.when(menus);
      }
    };
  }

})();
