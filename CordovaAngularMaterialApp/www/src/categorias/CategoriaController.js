(function(){

  angular
       .module('categorias')
       .controller('CategoriaController', [
          'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          CategoriaController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function CategoriaController( userService, $mdSidenav, $mdBottomSheet, $log, $q) {
    var self = this;

    self.selected             = null;
    self.categorias           = [ ];
    self.selectCategoria      = selectCategoria;
    self.toggleList           = toggleCategoriasList;
    self.showCategoriaOptions = showCategoriaOptions;

    // Carga todas las categorias

    userService
          .traerCategorias()
          .then( function( categorias ) {
            self.categorias = [].concat(categorias);
            self.selected = categorias[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleCategoriasList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser(categoria) {
      self.selected = angular.isNumber(categoria) ? $scope.users[categoria] : categoria;
      self.toggleList();
    }

    /**
     * Show the bottom sheet
     */
    function showCategoriaOptions($event) {
      var categoria = self.selected;

        return $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: './src/users/view/contactSheet.html',
          controller: [ '$mdBottomSheet', ContactPanelController],
          controllerAs: "cp",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          clickedItem && $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function ContactPanelController( $mdBottomSheet ) {
          this.user = user;
          this.actions = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.submitContact = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
