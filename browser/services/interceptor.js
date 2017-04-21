'use strict';

// Create the interceptor
app.factory('APIInterceptor', ($rootScope) => {

	var APIInterceptor = {};

	APIInterceptor.request = (config) => {
		if (localStorage.getItem('ynan-ynanToken') != null) {
			config.headers['x-access-token'] = JSON.parse(localStorage.getItem('ynan-ynanToken'));
		}
		return config;
	}

	APIInterceptor.response = (response) => {
		if (response.status === 401 || response.status == 403) { 
			$rootScope.$broadcast('unauthenticated');
		}
		return response;
	}

	APIInterceptor.responseError = (response) => {
		// If client receives status 401, broadcast it
		if (response.status === 401 || response.status == 403) { 
			$rootScope.$broadcast('unauthenticated');
		}
		return response;
	}
	
	return APIInterceptor;
})
