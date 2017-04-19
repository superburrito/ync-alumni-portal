app.factory("GeneralFac", ($rootScope, $mdDialog, $http) => {
	const GeneralFactory = {};

	GeneralFactory.getAllUsers = () => {
		return $http.get('/api/user')
		.then((res) => res.data)
		.then((data) => {
			if (data && data.success) {
				return data.users;	
			} else {
				return [];
			}
		}, GeneralFactory.errorDialog)
	}

	// Updates and returns user's profile
	GeneralFactory.updateUser = (userObj) => {
		return $http.post('/api/user', userObj)
		.then((res) => res.data)
		.then((data) => {
			if (data && data.success) {
				localStorage.setItem('ynan-profile', JSON.stringify(data.user));
				return data.user;
			}  
		}, GeneralFactory.errorDialog)
	}

	GeneralFactory.updateUserCoords = (coordsObj) => {
		return $http.post('/api/user/coords', coordsObj)
		.then((res) => res.data)
		.then((data) => {
			if (data && data.success) {
				localStorage.setItem('ynan-profile', JSON.stringify(data.user));
				return data.user;
			}  
		}, GeneralFactory.errorDialog)
	}

	// Unpublicise user's details
	GeneralFactory.unpubliciseUser = () => {
	    return $mdDialog.show(
			$mdDialog.confirm()
				.parent(angular.element(document.body))
				.clickOutsideToClose(true)
				.title('Hey there!')
				.textContent('Are you sure you wish to delete your profile?')
				.ariaLabel('delete profile')
				.ok('Yes')
				.cancel('No')
    	)
    	.then(() => {
    		return GeneralFactory.updateUser({});
    	});
	}
 
	GeneralFactory.removeUserCoords = () => {
		return GeneralFactory.updateUserCoords({});
	}

	GeneralFactory.triggerFBDialog = (toId) => {
		FB.ui({
  			method: 'send',
  			name: "Send Private Message",
  			link: "https://www.yale-nus.edu.sg",
  			to: toId
		});
	}

	GeneralFactory.errorDialog = () => {
    	$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.body))
				.clickOutsideToClose(true)
				.title(':(')
				.textContent("An error occurred.")
				.ariaLabel('Error Dialog')
				.ok("OK")
    	);
    }


	return GeneralFactory;
})