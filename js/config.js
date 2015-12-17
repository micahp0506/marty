var app = angular.module("Marty", ['ngRoute', 'firebase']);

  app.config(['$routeProvider',
    function($routeProvider) {
 
      $routeProvider
        .when('/', {
          templateUrl: './partials/login.html',
          controller: 'auth'
        })
        .when('/start', {
          templateUrl: './partials/start.html',
          controller: ''
        }).when('/game', {
          templateUrl: './partials/game.html',
          controller: 'main'
        })  
        .otherwise({
          redirectTo: '/'
        });
}]);