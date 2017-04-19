'use strict';

const app = angular.module('ynanApp', ['ui.router', 'ngMaterial']);
app.controller("MainCtrl", ($rootScope, $scope, $state) => {
	$scope.stateGoer = (stateStr) => {
		$state.go(stateStr);
	}
	// Pull state to scope (for hiding navbar)
	if ($state) { $scope.state = $state; }
 
 	$scope.logout  = () => {
 		FB.logout();
 		$state.go('landing');
 	}
});

// Interceptor which transforms ress and reqs for auth purposes 
app.config(function($httpProvider){
	$httpProvider.interceptors.push('APIInterceptor');
});
