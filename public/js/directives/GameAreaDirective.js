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

		var visualizeAnswer = function(selected,isCorrect){
			var color = isCorrect?".tick":".cross";
			
			$(selected).find(color).css("visibility","visible");
			hideAnswer()
}

		var hideAnswer = function(){
			setTimeout(function(){
				$(".answer").css("visibility","hidden");
			},300)
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