angular.module('global').controller('/Lib/Controllers/Session', ['$scope', 'Session', '$mdDialog', function($scope, Session, $mdDialog) {
    // Define el modelo
    angular.extend($scope, {
        username: null,
        password: null,
        error: false,
        login: function() {
            var self = this;
            Session.api.login({
                username: self.username,
                password: self.password,
            }).then(function(data) {
                Session.login(data.token);
            }).catch(function() {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Error en la autenticación')
                    .textContent('El usuario o contraseña son incorrectos')
                    .ok('Aceptar')
                );
            });
        },
        // unlock: function () {
        //     $scope.$broadcast('$plex-before-submit', this.form);
        //     if (this.form.$valid)
        //         // El servicio SSO hace un broadcast con el evento indicando que se desbloqueó (i.e. de esta manera Plex actualiza la UI)
        //         SSO.unlock(this.password).catch(function () {
        //             $scope.error = true;
        //             $scope.password = null;
        //         });
        // },
        // changeUser: function () {
        //     window.location = "/dotnet/SSO/Logout.aspx?relogin=1&url=" + encodeURIComponent(window.location);
        // },
        // close: function () {
        //     window.location = "/dotnet/SSO/Logout.aspx";
        // },
        // onChangePassword: function () {
        //     $scope.error = false;
        // }
    });
}]);
