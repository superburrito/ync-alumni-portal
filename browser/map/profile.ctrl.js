app.controller('ProfileCtrl', ($mdDialog, $scope, $rootScope, GeneralFac) => {

	function loadMyProfile() {
		$scope.myProfile = JSON.parse(localStorage.getItem('ynan-profile'));
	}
	loadMyProfile();
	
	$scope.cancel = () => {
		$mdDialog.cancel();
	}
	$scope.currProfile = $rootScope.currProfile;
	$scope.triggerFBDialog = GeneralFac.triggerFBDialog;
	
})