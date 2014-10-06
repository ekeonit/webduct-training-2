var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'WidgetsController'
        })
        .when('/details/:widgetId', {
            templateUrl: 'widget.html',
            controller: 'WidgetController'
        })
        .when('/about', {
            templateUrl: 'about.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('WidgetController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        var widgetId = $routeParams.widgetId;

        $http.get('/data/' + widgetId + '.json')
            .success(function(result) {
                $scope.widget = result;
            });
    }
]);

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