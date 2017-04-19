app.controller("GridCtrl", ($scope, $rootScope, GeneralFac, $state) => {
	// Get all users
	function displayAllUsers () {
		GeneralFac.getAllUsers()
		.then((users) => {
			console.table(users);
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
		.then(displayAllUsers).then(loadMyProfile);
	}

	$scope.triggerFBDialog = GeneralFac.triggerFBDialog;

})