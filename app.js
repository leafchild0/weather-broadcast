var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function ($routeProvider) {
    $routeProvider
        .when( '/', {
        templateUrl: 'pages/main.html',
        controller: 'MainController'
    })
    .when( '/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'ForecastController'
    })
    .when( '/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'ForecastController'
    });
});

weatherApp.directive('weatherDay', function() {
    return {
        restrict: 'AE',
        templateUrl: 'directives/weatherDay.html'
    };
});

weatherApp.controller('MainController', ['$scope', 'forecastService', function($scope, forecastService) {
    $scope.city = forecastService.city;
    $scope.days = forecastService.days;
    
    $scope.$watch('city', function() {
         forecastService.city = $scope.city;
    });
    $scope.$watch('days', function() {
         forecastService.days = $scope.days;
    });
    
 
}])
.controller('ForecastController', ['$scope', '$resource',  '$routeParams', 'forecastService', 'weatherService', function($scope, $resource, $routeParams, forecastService, weatherService) {

    $scope.city = forecastService.city;
    $scope.days = forecastService.days;
    
    $scope.convertToCelcius = function(temp) {
        return Math.round(temp - 273);
    };
    
    $scope.convertToDate = function(date) {
        return new Date(date * 1000);
    }
    
    $scope.weatherResults = weatherService.getWeaher($scope.city, $routeParams.days || $scope.days);
}]);