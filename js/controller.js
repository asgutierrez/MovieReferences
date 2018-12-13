angular.module("Peliculas")
.controller("controllerHome",function($scope,$http){
	//Controlador para la vista home

	//Variables iniciales
	$scope.posts = [[]];  //Almacena todos los post que provee la Api
	$scope.temp = [];
	$scope.genres = [{id:0, name:"All"}]; //Almacena los géneros
	genre_id = 0;
	$scope.genre_name = "All";
	$scope.pages = [1,2,3];
	$scope.current_page = 1;
	$scope.page_class = ["btn-dark","btn-secondary","btn-secondary"];
	$scope.url = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
	$scope.search_letters = "";
	api_key ="62fdeaede80b5fa694e2f71173a022fa"
	movies_list_url = "https://api.themoviedb.org/4/list/1?page=";
	genre_list_url = "https://api.themoviedb.org/3/genre/movie/list?api_key=";
	

	//Petición Get inicial: página 1
	$http.get(movies_list_url+1+"&api_key="+api_key)
		.then(function successCallback(response) {
	   		$scope.temp = response["data"]["results"];
	   		for (var j = $scope.temp.length - 1; j >= 0; j--) {
	   			//Determinación del color según el promedio de votos
	   			if ($scope.temp[j].vote_average<7) {
	   				$scope.temp[j].vote_color = "orange";
	   			}else{
	   				$scope.temp[j].vote_color = "green";
	   			}
	   			$scope.temp[j].identifier = j;
	   		}
	   		$scope.posts[0] = $scope.temp;
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});	

	//Petición Get de los géneros
  	$http.get(genre_list_url+api_key)
		.then(function successCallback(response) {
    		$scope.genres = $scope.genres.concat(response["data"]["genres"]);
  			console.log($scope.genres);
  		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
  		});

	//Busqueda de los títulos que concuerdan con la busqueda
	$scope.search = function(current){
		title = current.title.toLowerCase();
		genre = current.genre_ids.concat([0]);
		return (title.search($scope.search_letters)!=-1 && genre.indexOf(genre_id)!=-1);
	}

	//Selección del género de busqueda
	$scope.press = function(current){
		genre_id = current.id;
		$scope.genre_name = current.name;
	}

	//Selección de una nueva página
	$scope.page_change = function(current){
		$scope.current_page = current;
		$scope.page_class = ["btn-secondary","btn-secondary","btn-secondary"];
		$scope.page_class[current-1] = "btn-dark";

		//Nueva petición Get para la nueva página seleccionada
		$http.get(movies_list_url+current+"&api_key="+api_key)
			.then(function successCallback(response) {
		   		$scope.temp = response["data"]["results"];
		   		for (var j = $scope.temp.length - 1; j >= 0; j--) {
		   			if ($scope.temp[j].vote_average<7) {
		   				$scope.temp[j].vote_color = "orange";
		   			}else{
		   				$scope.temp[j].vote_color = "green";
		   			}
		   			$scope.temp[j].identifier = j;
		   		}
		   		$scope.posts[current-1] = $scope.temp;
			}, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
	}

})
.controller("controllerDetail",function($scope,$stateParams,$http){
	//Controlador para la vista home

	//Variables iniciales
	page = $stateParams.page;	//Parámetro "página" enviado desde la vista principal
	movie_id = $stateParams.movie_id;	//Parámetro "id" enviado desde la vista principal
	$scope.posts = [];
	$scope.detailed_post = {};
	$scope.url = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
	$scope.url2 = "https://image.tmdb.org/t/p/w1400_and_h450_bestv2";
	api_key ="62fdeaede80b5fa694e2f71173a022fa"
	movies_list_url = "https://api.themoviedb.org/4/list/1?page=";
	
	//Nueva petición Get para la página recibida
	$http.get(movies_list_url+page+"&api_key="+api_key)
		.then(function successCallback(response) {
	   		$scope.posts = response["data"]["results"];
	   		if ($scope.posts[movie_id].vote_average<7) {
	   			$scope.posts[movie_id].vote_color = "orange";
	   		}else{
	   			$scope.posts[movie_id].vote_color = "green";
	   		}
	   		//Escogencia de la película seleccionada
	   		$scope.detailed_post = $scope.posts[movie_id];
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	
});




