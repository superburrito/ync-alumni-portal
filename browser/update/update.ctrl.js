app.controller("UpdateCtrl", ($scope, $state, GeneralFac) => {
	$scope.bg = '/media/yalenus_options.jpg';

	$scope.submit = () => {
		if ($scope.inputCoordAgree) {
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(addProfile, navFailureDialog);
			} else {
				navFailureDialog();
				addProfile(null);
			}
		} else {
			addProfile(null);
		}
	}

	function addProfile (posObj) {
		if (posObj && posObj.coords) {
			$scope.inputUser.lat = posObj.coords.latitude;
			$scope.inputUser.lng = posObj.coords.longitude;
			$scope.nextState = "map";
		} else {
			$scope.nextState = "grid";
		}
		GeneralFac.updateUser($scope.inputUser)
		.then(() => {
			$state.go($scope.nextState)
		}, GeneralFac.errorDialog);
	}

	function navFailureDialog () {
    	$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.body))
				.clickOutsideToClose(true)
				.title('Oh no.')
				.textContent("We were unable to retrieve your geolocation.")
				.ariaLabel('Failed Nav Dialog')
				.ok("OK")
    	);
    }

})