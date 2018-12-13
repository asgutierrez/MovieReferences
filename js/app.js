// Ui.router: dependencia que facilita el enrutamiento de vistas
app = angular.module("Peliculas",["ui.router"]);
app.config(function($stateProvider,$urlRouterProvider){
	
	//Vista por defecto
	$urlRouterProvider.otherwise("/");

	//Enrutador de vistas
	$stateProvider
        .state('/', {
            url: "/",
            controller: "controllerHome",
            templateUrl: "templates/list.html"
        })
        .state('/detail/:page/:movie_id', {
            url: "/detail/:page/:movie_id",
            controller: "controllerDetail",
            templateUrl: "templates/detail.html",
        });

});