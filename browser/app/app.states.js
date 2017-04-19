'use strict';

app.config(($stateProvider) => {
	$stateProvider.state('landing', {
		url: '/landing',
		templateUrl: '/landing/landing.tpl.html',
		controller: "LandingCtrl",
		hideNavbar: true
	});
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: '/home/home.tpl.html',
		controller: 'HomeCtrl',
		hideNavbar: false
	});
	$stateProvider.state('grid', {
		url: '/grid',
		templateUrl: '/grid/grid.tpl.html',
		controller: 'GridCtrl',
		hideNavbar: false
	});
	$stateProvider.state('map', {
		url: '/map',
		templateUrl: '/map/map.tpl.html',
		controller: 'MapCtrl',
		hideNavbar: false
	});
	$stateProvider.state('update', {
		url: '/update',
		templateUrl: '/update/update.tpl.html',
		controller: 'UpdateCtrl',
		hideNavbar: false
	});
});