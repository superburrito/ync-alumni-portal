app.factory("GeneralFac", ($rootScope, $mdDialog, $http) => {
	const GeneralFactory = {};

	function resToDataFilter (res) {
		return res.data;
	}
	
	// Clubs as an arr of strs ["YIRPA","Basketball",...]
	GeneralFactory.updateUserClubs = (clubStrs) => {
		return $http.post('/api/user/clubs', { clubStrs: clubStrs })
		.then(resToDataFilter)
		.then((data) => {
			if (data && data.success) {
				return "Success";
			} else {
				GeneralFactory.errorDialog();
				return "Failure"; 
			}
		}, GeneralFactory.errorDialog);		
	}

	GeneralFactory.getAllUsers = () => {
		return $http.get('/api/user')
		.then(resToDataFilter)
		.then((data) => {
			if (data && data.success) {
				return data.users;	
			} else {
				return [];
			}
		}, GeneralFactory.errorDialog);
	}

	// Updates and returns user's profile
	GeneralFactory.updateUser = (userObj) => {
		return $http.post('/api/user', userObj)
		.then(resToDataFilter)
		.then((data) => {
			if (data && data.success) {
				localStorage.setItem('ynan-profile', JSON.stringify(data.user));
				return data.user;
			}  
		}, GeneralFactory.errorDialog)
	}

	GeneralFactory.updateUserCoords = (coordsObj) => {
		return $http.post('/api/user/coords', coordsObj)
		.then(resToDataFilter)
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
				.textContent('Are you sure you wish to delete your public profile?')
				.ariaLabel('delete public profile')
				.ok('Yes')
				.cancel('No')
    	)
    	.then(() => {
    		return GeneralFactory.updateUser({});
    	});
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