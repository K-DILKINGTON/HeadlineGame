app.controller('HomeController',['$scope','$location',function($scope,$location){
var startGame = function(){
$location.url("/startgame")
}

$scope.startGame = startGame;


}]);
