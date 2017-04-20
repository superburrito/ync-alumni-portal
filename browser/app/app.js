'use strict';

const app = angular.module('ynanApp', ['ui.router', 'ngMaterial']);
app.controller("MainCtrl", ($rootScope, $scope, $state) => {

	$scope.stateGoer = (stateStr) => {
		$state.go(stateStr);
	}
	// Pull state to scope (for hiding navbar)
	if ($state) { $scope.state = $state; }
 
 	$scope.logout = () => {
 		FB.logout();
 		localStorage.removeItem('ynan-ynanToken');
 		localStorage.removeItem('ynan-fbToken');
 		localStorage.removeItem('ynan-profile');
 		$state.go('landing');
 	}
});

app.config(($httpProvider) => {
	$httpProvider.interceptors.push('APIInterceptor');
})

