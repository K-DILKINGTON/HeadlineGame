app.service('ScoreService',['$log','$http',function($log,$http){
	var scoreService = {
		score:0
	};

	scoreService.incrementScore = function(){
		scoreService.score++;
	}

	scoreService.resetScore = function(){
		scoreService.score=0;
	}



	return scoreService;
	

}]);