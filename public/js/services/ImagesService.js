app.service('ImagesService',['$log','$http',function($log,$http){
	var imagesService = {};

	var images = [
	"images/2011tsunami.jpg",
	"images/911.jpg",
	"images/bataclan.jpg",
	"images/benedictresigns.jpg",
	"images/bowiedies.jpg",
	"images/brexit.jpg",
	"images/collabro.jpg",
	"images/croatia.jpg",
	"images/danielthirdwin.jpg",
	"images/disneymarvel.jpg",
	"images/donald-trump.jpg",
	"images/facebookoculus.jpg",
	"images/gangamstyle.jpg",
	"images/gravwaves.jpg",
	"images/higgsfound.jpg",
	"images/mandeladies.jpg",
	"images/michaeld.jpg",
	"images/microsofnokia.jpg",
	"images/obamawins.jpg",
	"images/parisclimate.jpg",
	"images/russianjets.jpg",
	"images/Saddam.jpg",
	"images/thatcherdies.jpg"
	]

	imagesService.loadAllImages = function(){
		for (var x = 0, len = images.length; x < len; x++) {
			var img = new Image();
			img.src = images[x];
		}
	}

	return imagesService;



	

}]);