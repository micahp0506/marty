var app = angular.module("Marty", ['ngRoute', 'firebase']);

  app.config(['$routeProvider',
    function($routeProvider) {
 
      $routeProvider
        .when('/', {
          templateUrl: './partials/login.html',
          controller: 'auth'
        })
        // .when('/dashboard', {
        //   templateUrl: './partials/dashboard.html',
        //   controller: 'DashboardController',
        //   controllerAs: 'dashboardCtrl',
        // })
        .otherwise({
          redirectTo: '/login'
        });
}]);