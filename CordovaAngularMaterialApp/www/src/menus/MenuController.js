(function(){

  angular
       .module('menus')
       .controller('MenuController', [
          'menuService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          MenuController
       ]);

  /**
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function MenuController( menuService, $mdSidenav, $mdBottomSheet, $log, $q) {
    var self = this;

    self.selected     = null;
    self.menus        = [ ];
    self.selectMenu   = selectMenu;
    self.toggleList   = toggleMenusList;

    // Carga todos los items del menu
    menuService
          .cargarMenu()
          .then( function( menus ) {
            self.menus    = [].concat(menus);
            self.selected = menus[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleMenusList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectMenu ( menu ) {
      self.selected = angular.isNumber(menu) ? $scope.menus[menu] : menu;
      self.toggleList();
    }

    /**
     * Show the bottom sheet
     */
    //function showContactOptions($event) {
    //    var user = self.selected;
    //    return $mdBottomSheet.show({
    //      parent: angular.element(document.getElementById('content')),
    //      templateUrl: './src/users/view/contactSheet.html',
    //      controller: [ '$mdBottomSheet', ContactPanelController],
    //      controllerAs: "cp",
    //      bindToController : true,
    //      targetEvent: $event
    //    }).then(function(clickedItem) {
    //      clickedItem && $log.debug( clickedItem.name + ' clicked!');
    //    });
    //    /**
    //     * Bottom Sheet controller for the Avatar Actions
    //     */
    //    function ContactPanelController( $mdBottomSheet ) {
    //      this.user = user;
    //      this.actions = [
    //        { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
    //        { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
    //        { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
    //        { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
    //      ];
    //      this.submitContact = function(action) {
    //        $mdBottomSheet.hide(action);
    //      };
    //    }
    //}

  }

})();
