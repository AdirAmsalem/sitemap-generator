$stateProvider.state('wizard.finish', {
    url: '/finish',
    templateUrl: 'partials/wizard/step_3.html',
    controller: function($scope) {
        $scope.signup();
    }
});