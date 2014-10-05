var app = angular.module('app', []);

app.controller('WidgetsController', ['$scope', '$http',
    function($scope, $http) {
        $scope.widgets = [];
        $http.get('data/widgets.json')
            .success(function(result) {
                $scope.widgets = result;
            })
            .error(function(result) {
                alert('Error');
            });

        $scope.orderByField = 'name';
    }
]);
