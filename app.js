var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: 'WidgetsController'
    })
    .when('/about', {
        templateUrl: 'about.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});

app.controller('WidgetsController', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $scope.widgets = [];
        $http.get('data/widgets.json')
        .success(function(result) {
            $scope.widgets = result;
        })
        .error(function(result) {
            alert('Error');
        });

        $scope.orderByField = 'name';

        $scope.onClickAboutUs = function() {
            $location.path('/about');
        };
    }
    ]);