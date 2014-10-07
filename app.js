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

app.directive('widgetJumbotron', function() {
    return {
        restrict: 'EA',
        templateUrl: 'jumbotron.html'
    };
});

app.directive('widgetListItem', function() {
    return {
        restrict: 'EA',
        templateUrl: 'widget-list-item.html',
        scope: {
            widget: '='
        }
    }
});

app.directive('snippet', function() {
    return {
        restrict: 'E',
        scope: {
        },
        template: '{{snippet}} <a ng-click="toggleExpanded()">{{ isExpanded ? "[Less]" : "[More]" }}</a>',
        link: function(scope, element, attrs) {

            scope.isExpanded = false;
            scope.snippet = '';

            attrs.$observe('text', function(value) {
                update();
            });

            scope.toggleExpanded = function() {
                scope.isExpanded = !scope.isExpanded;
                update();
            }

            function update() {
                var numWords = parseInt(attrs.words);
                var split = attrs.text.split(" ");
                if (scope.isExpanded || split.length <= numWords) {
                    scope.snippet = attrs.text;
                } else {
                    var snipped = split.slice(0, numWords);
                    var joined = snipped.join(" ");
                    scope.snippet = joined + ' ...';
                }
            }
        }
    }
});
