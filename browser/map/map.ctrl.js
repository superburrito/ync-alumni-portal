app.controller('MapCtrl', ($scope, MapStyleFac, $rootScope, $mdDialog, GeneralFac, $state, $http, $mdSidenav) => {

	$scope.openSidenav = () => {
		$mdSidenav('left').toggle();
	}
	
 	function shutSidenav () {
 		if ($mdSidenav('left').isOpen()) {
 			$mdSidenav('left').close();
 		}
 	}

	// Draw info from storage
	function loadMyProfile() {
		$scope.myProfile = JSON.parse(localStorage.getItem('ynan-profile'));
	}
	loadMyProfile();

	// Define gmap options
	const options = {};
	options.center = { lat: 1.29, lng: 103.85 }
	options.zoom = 14;
	options.styles = MapStyleFac.getStyle();
	
	// Load map
	const map = new google.maps.Map(document.getElementById('mapDisplay'), options);

	// Toolbar commands
	// If GPS available, pan to current location
	$scope.currPos = null;
	function panToCurrLoc () { map.panTo($scope.currPos); }
	$scope.findAndPanToCurrLoc = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				// Store curr position in scope
				$scope.currPos = { 
					lat: pos.coords.latitude, 
					lng: pos.coords.longitude 
				}
				panToCurrLoc();
			})
		} 
		shutSidenav();
	}
	$scope.findAndPanToCurrLoc();

	// Update marker
	$scope.updateUserCoords = () => {
		clearMarkersSync();
		GeneralFac.updateUserCoords($scope.currPos)
		.then(loadMarkers).then(loadMyProfile);
		shutSidenav();
	}

	$scope.removeProfile = () => {
		clearMarkersSync();
		GeneralFac.unpubliciseUser()
		.then(() => {
			return GeneralFac.updateUserClubs([]);
		})
		.then(loadMarkers).then(loadMyProfile);
		shutSidenav();
	}

	$scope.removeMarker = () => {
		clearMarkersSync();
		GeneralFac.updateUserCoords({})
		.then(loadMarkers).then(loadMyProfile);
		shutSidenav();
	}

	// Load Markers
	let markers = [];
	function loadMarkers () { 
		const iconOptions = {
			url: '/media/mapMarker.png',
			scaledSize: new google.maps.Size(42, 42),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(0, 0)	
		}
		return GeneralFac.getAllUsers()
		.then((users) => {
			console.table(users);
			let ctr = 0;
			users.forEach((user) => {
				if(user.lat && user.lng){
					const marker = new google.maps.Marker({
						position: {lat: user.lat, lng: user.lng },
						map: map,
						icon: iconOptions,
						title: user.name,
						zIndex: ctr 
					});
					markers.push(marker);
					marker.setMap(map);
					ctr++;
					marker.addListener('click', () => {
						$rootScope.currProfile = user;
						showProfile();
					})
				}
			})
		})
	}
	loadMarkers();

	function clearMarkersSync () {
		for(let i=0; i<markers.length; i++){
			markers[i].setMap(null);
			markers[i] = null;
		}
		markers = [];
	}

	function showProfile () {
	    $mdDialog.show({
	      controller: 'ProfileCtrl',
	      templateUrl: '/map/profile.tpl.html',
	      parent: angular.element(document.body),
	      targetEvent: null,
	      clickOutsideToClose:true,
	      fullscreen: false
	    })		
	}

})