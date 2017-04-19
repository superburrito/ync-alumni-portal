app.controller('ProfileCtrl', ($mdDialog, $scope, $rootScope, GeneralFac) => {
	$scope.cancel = () => {
		$mdDialog.cancel();
	}
	$scope.currProfile = $rootScope.currProfile;
	$scope.triggerFBDialog = GeneralFac.triggerFBDialog;
	
})