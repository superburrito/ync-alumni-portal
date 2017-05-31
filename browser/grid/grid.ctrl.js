app.controller("GridCtrl", ($scope, $rootScope, GeneralFac, $state) => {
	// Get all users
	function displayAllUsers () {
		GeneralFac.getAllUsers()
		.then((users) => {
			$scope.users = users;
		})
	}
	displayAllUsers();

	// Draw info from storage
	function loadMyProfile() {
		$scope.myProfile = JSON.parse(localStorage.getItem('ynan-profile'));
	}
	loadMyProfile();

	$scope.removeProfile = () => {
		GeneralFac.unpubliciseUser()
		.then(() => {
			return GeneralFac.updateUserClubs([]);
		})
		.then(displayAllUsers).then(loadMyProfile);
	}

	$scope.triggerFBDialog = GeneralFac.triggerFBDialog;

})