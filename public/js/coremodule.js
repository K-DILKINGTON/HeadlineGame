var app = angular.module("coreApp",['ngRoute']);

app.service('HeadLineService',['$log','$http',function($log,$http){
	var getRandomHeadLine = function(){
		return $http.get("/api/headlineatrandom")
		.then(function(response){
			return response.data;
		});
	}

	return{
		getRandomHeadLine:getRandomHeadLine
	}

}]);

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


app.controller('HeadLineController',['$scope','$rootScope','$http','$location','HeadLineService','ScoreService',function($scope,$rootScope,$http,$location,HeadLineService,ScoreService){

	$scope.leftHeadline  = {};
	$scope.rightHeadline = {};
	$scope.headlineText = "";
	$rootScope.score = ScoreService.score;
	$scope.locked = true;
	$scope.tempLeft = {};
	$scope.tempRight = {};

	var updateHeadlines = function(callback){
		HeadLineService.getRandomHeadLine().
		then(function(headLineOne){
			HeadLineService.getRandomHeadLine()
			.then(function(headLineTwo){
				if(headLineOne.headline==headLineTwo.headline){
					updateHeadlines(callback);
				}
				else{
					$scope.tempLeft = headLineOne;
					$scope.tempRight = headLineTwo;
					console.log("succesfully updated");
					if(typeof callback === "function"){
						console.log("calledback");
					callback();
				}
				}
			});
		});
	}

	var startGame = function(){
		$location.url('/startgame');
		updateHeadlines(refreshScope);
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
		return left>right?left:right;
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

	var refreshScope = function(){
		$scope.leftHeadline = $scope.tempLeft;
		$scope.rightHeadline = $scope.tempRight;
		console.log("succesfully refreshed");
		unlockGame();
	}



	$scope.executeAnswer = executeAnswer;
	$scope.startGame =startGame;
	$rootScope.incrementScore =incrementScore;
	$scope.$on("continueRendering",function(){
		console.log("otherd");
		refreshScope();
	});
	updateHeadlines(refreshScope);

}]);

app.config(function($routeProvider){
	$routeProvider

	.when('/',{
		templateUrl:"content/home.html",
		controller:"HeadLineController"
	})

	.when('/startgame',{
		templateUrl:"content/game.html",
		controller:"HeadLineController"
	});

});

app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode(true).hashPrefix('');
}]);

app.directive("gameBalls",function(){
	var linkFunction = function(scope,element,attrs){
		var items = element[0].querySelectorAll(".game-ball");
		var left = items[0];
		var right = items[1];

		var slideUp = function(){
			$(this).find(".info-area").css("border-bottom","solid 9px cornsilk");
		}

		var slideDown = function(){
			$(this).find(".info-area").css("border-bottom","solid 0px cornsilk");
		}

		var delayedRendering = function(){
			$(".answer-overlay").css("visibility","hidden")
			scope.$emit("continueRendering");
		}

		var visualizeAnswer = function(selected,isCorrect){
			if(isCorrect){
				$(selected).find(".answer-overlay").css("visibility","visible");
				$(selected).find(".answer-overlay").css("background","green");

			}else{
				$(selected).find(".answer-overlay").css("visibility","visible");
				$(selected).find(".answer-overlay").css("background","red");
		}

		setTimeout(delayedRendering,2000);


		}

	

		scope.$on("broadcastAnswer",function(data,clicked,correct){
			var selected = clicked==="left"?left:right;
			var correct = correct==="true"?true:false;
			visualizeAnswer(selected,correct);


		});

		$(".game-ball").on("mouseover",slideUp);
		$(".game-ball").on("mouseleave",slideDown);


	}

	return{
		restrict:"E",
		link:linkFunction,
		scope:true
	}
});

