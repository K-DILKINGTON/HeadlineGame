app.controller('HeadLineController',['$scope','$rootScope','$http','$location','$timeout','$interval','HeadLineService','ScoreService','ImagesService',function($scope,$rootScope,$http,$location,$timeout,$interval,HeadLineService,ScoreService,ImagesService){

	$scope.leftHeadline  = {};
	$scope.rightHeadline = {};
	$scope.headlineText = "";
	$rootScope.score = ScoreService.score;
	$scope.locked = true;
	$scope.timeLeft = 60;

	var startTimer = function(){
		var timer =$interval(function(){
			if($scope.timeLeft===0){
				$interval.cancel(timer);
				endGame();
			}else{
			$scope.timeLeft = $scope.timeLeft-1;
		}
		},1000);
	}

	var updateHeadlines = function(){
		HeadLineService.getRandomHeadLine().
		then(function(headLineOne){
			HeadLineService.getRandomHeadLine()
			.then(function(headLineTwo){
				if(headLineOne.headline==headLineTwo.headline){
					updateHeadlines();
				}
				else{
					delayedUpdate(headLineOne,headLineTwo);
				}
			});
		});
	}

	var delayedUpdate = function(headLineOne,headLineTwo){
		$timeout(function(){
			
			$scope.leftHeadline = headLineOne;
			$scope.rightHeadline = headLineTwo;
			unlockGame();
		},300);
	}

	var startGame = function(){
		ScoreService.resetScore();
		$location.url('/startgame');
		updateHeadlines();
	}

	var executeAnswer = function(selection,side){
		if($scope.locked!==true){
			if(selection.date===rightAnswer()){
				$scope.$broadcast("broadcastAnswer",side,"true");
				incrementScore();
			}else{
				$scope.$broadcast("broadcastAnswer",side,"false");
			}
			lockGame();
			updateHeadlines();
		}
	}

	var rightAnswer = function(){
		var left = $scope.leftHeadline.date;
		var right = $scope.rightHeadline.date;
		return left<right?left:right;
	}

	var incrementScore = function(){
		ScoreService.incrementScore();
		$rootScope.score = ScoreService.score;
	}

	var lockGame = function(){
		$scope.locked = true;

	}

	var unlockGame = function(){
		$scope.locked = false;
	}

	var endGame = function(){
		$location.url('/results');
	}

	$scope.executeAnswer = executeAnswer;
	$scope.startGame =startGame;
	$rootScope.incrementScore =incrementScore;
	ImagesService.loadAllImages();
	updateHeadlines();
	startTimer();

}]);