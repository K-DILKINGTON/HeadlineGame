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