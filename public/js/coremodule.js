var app = angular.module("coreApp",['ngRoute']);










app.config(function($routeProvider){
	$routeProvider

	.when('/',{
		templateUrl:"content/home.html",
		controller:"HeadLineController"
	})

	.when('/startgame',{
		templateUrl:"content/game.html",
		controller:"HeadLineController"
	})

	.when('/results',{
		templateUrl:"content/results.html",
		controller:"ResultsController"
	});

});

app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode(true).hashPrefix('');
}]);





