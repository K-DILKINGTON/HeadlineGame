app.controller('ResultsController',['$scope','$location','ScoreService',function($scope,$location,ScoreService){
$scope.score = ScoreService.score;

var startGame = function(){
		ScoreService.resetScore();
		$location.url('/startgame');
	}
	$scope.startGame = startGame;
}]);