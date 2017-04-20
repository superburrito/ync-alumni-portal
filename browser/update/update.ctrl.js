app.controller("UpdateCtrl", ($scope, $state, GeneralFac) => {
	$scope.bg = '/media/yalenus_options.jpg';

	$scope.submit = () => {
		convertClubs();
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

	function convertClubs () {
		if ($scope.inputUser.clubsStr && 
			$scope.inputUser.clubsStr.length > 0) {
			const clubStrs = $scope.inputUser.clubsStr.split(",");
			$scope.inputUser.clubStrs = clubStrs.map((clubStr) => {
				if (clubStr[0] == " ") {
					return clubStr.slice(1);
				} else if (clubStr[clubStr.length-1] == " ") {
					return clubStr.slice(0,-1);
				} else {
					return clubStr;
				}
			})
		} else {
			$scope.inputUser.clubStrs = [];
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
			return GeneralFac.updateUserClubs($scope.inputUser.clubStrs);
		})
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