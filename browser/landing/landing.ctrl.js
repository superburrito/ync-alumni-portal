app.controller('LandingCtrl', ($scope, $state, $rootScope, $mdDialog, $http) => {
	
	$scope.bg = "/media/yalenus_landing2.jpg";
	
	$scope.triggerFBLogin = () => {
		return FB.getLoginStatus((fbGetStatRes) => {
			if (fbGetStatRes.status === 'connected') {
				authenticate(fbGetStatRes.authResponse.accessToken);
			} else {
				console.log("Attempting login.");
				// Get short-lived token (slToken) from Facebook
				return FB.login((fbLoginRes) => {
					if (fbLoginRes && fbLoginRes.authResponse) {
						authenticate(fbLoginRes.authResponse.accessToken);
					} else {
						loginFailureDialog();
					}
				}, {scope: 'email'})
			}
		});	
	}

	function authenticate (slToken) {
		return $http.post('/auth', { slToken: slToken })
		.then((res) => res.data)
		.then((data) => {
			if (data && data.success) {
				// Save tokens 
				localStorage.setItem("ynan-ynanToken", JSON.stringify(data.ynanToken));
				localStorage.setItem("ynan-fbToken", JSON.stringify(data.fbToken));
				// Save profile
				localStorage.setItem("ynan-profile", JSON.stringify(data.user));
				$state.go("home");
			} else {
				loginFailureDialog();
			} 
		}, loginFailureDialog)
	}

	function loginFailureDialog () {
    	$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.body))
				.clickOutsideToClose(true)
				.title(':(')
				.textContent("Login failed.")
				.ariaLabel('Failed Login Dialog')
				.ok("OK")
    	);
    }
    
});
