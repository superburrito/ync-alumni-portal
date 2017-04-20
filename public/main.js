'use strict';

var app = angular.module('ynanApp', ['ui.router', 'ngMaterial']);
app.controller("MainCtrl", function ($rootScope, $scope, $state) {
	$scope.stateGoer = function (stateStr) {
		$state.go(stateStr);
	};
	// Pull state to scope (for hiding navbar)
	if ($state) {
		$scope.state = $state;
	}

	$scope.logout = function () {
		FB.logout();
		$state.go('landing');
	};
});

app.config(function ($locationProvider, $httpProvider) {
	$locationProvider.html5Mode(true);
	$httpProvider.interceptors.push('APIInterceptor');
});
'use strict';

// Url Routing Configurations
app.config(function ($urlRouterProvider) {
  // Default paths
  $urlRouterProvider.when('', '/');
  $urlRouterProvider.otherwise('/landing');
});

app.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette('orange', { 'default': '600' });

  $mdThemingProvider.theme('blue').primaryPalette('blue');

  $mdThemingProvider.theme('teal').primaryPalette('teal');

  $mdThemingProvider.theme('orange').primaryPalette('orange', { 'default': '600' });

  $mdThemingProvider.theme('darkorange').primaryPalette('orange').dark();
});
'use strict';

app.run(function ($window, $rootScope) {

	// Initialise FB JS SDK
	$window.fbAsyncInit = function () {
		FB.init({
			appId: '201756480323021',
			cookie: true,
			xfbml: true,
			version: 'v2.8'
		});
		FB.AppEvents.logPageView();
	};

	(function (d, s, id) {
		var js,
		    fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	})(document, 'script', 'facebook-jssdk');

	// Dummy data
	/*	$rootScope.profiles = [{
 		id: 43,
 		fbId: 737785921,
 		name: "Natalie Tan",
 		linkedIn: "https://sg.linkedin.com/in/natalie-tan-a34789a0",
 		class: "2017",
 		src: "https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.719.719/10294522_10153526705055922_1406401780955058911_n.jpg?oh=05672b3361e116ce1ca1e496a39543a0&oe=5992BB03",
 		coord: [1.29, 103.81],
 		desc: "I did my capstone on selfies",
 		currRole: "Curator",
 		currEmployer: "National Art Gallery",
 		currCity: "Singapore",
 		major: "A&H",
 		clubs: ["Visual Arts Society", "G-Spot"]
 	}]*/
});
'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('landing', {
		url: '/landing',
		templateUrl: '/landing/landing.tpl.html',
		controller: "LandingCtrl",
		hideNavbar: true
	});
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: '/home/home.tpl.html',
		controller: 'HomeCtrl',
		hideNavbar: false
	});
	$stateProvider.state('grid', {
		url: '/grid',
		templateUrl: '/grid/grid.tpl.html',
		controller: 'GridCtrl',
		hideNavbar: false
	});
	$stateProvider.state('map', {
		url: '/map',
		templateUrl: '/map/map.tpl.html',
		controller: 'MapCtrl',
		hideNavbar: false
	});
	$stateProvider.state('update', {
		url: '/update',
		templateUrl: '/update/update.tpl.html',
		controller: 'UpdateCtrl',
		hideNavbar: false
	});
});
"use strict";

app.controller("HomeCtrl", function ($scope, $rootScope) {
	$scope.slides = [{
		src: '/media/yalenus1.jpg',
		title: "A Community of Learning"
	}, {
		src: '/media/yalenus2.jpg',
		title: 'In Asia'
	}, {
		src: '/media/yalenus3.jpg',
		title: 'For the World'
	}];
});
"use strict";

app.controller("GridCtrl", function ($scope, $rootScope, GeneralFac, $state) {
	// Get all users
	function displayAllUsers() {
		GeneralFac.getAllUsers().then(function (users) {
			console.table(users);
			$scope.users = users;
		});
	}
	displayAllUsers();

	// Draw info from storage
	function loadMyProfile() {
		$scope.myProfile = JSON.parse(localStorage.getItem('ynan-profile'));
	}
	loadMyProfile();

	$scope.removeProfile = function () {
		GeneralFac.unpubliciseUser().then(function () {
			return GeneralFac.updateUserClubs([]);
		}).then(displayAllUsers).then(loadMyProfile);
	};

	$scope.triggerFBDialog = GeneralFac.triggerFBDialog;
});
'use strict';

app.controller('LandingCtrl', function ($scope, $state, $rootScope, $mdDialog, $http) {

	$scope.bg = "/media/yalenus_landing2.jpg";

	$scope.triggerFBLogin = function () {
		return FB.getLoginStatus(function (fbGetStatRes) {
			if (fbGetStatRes.status === 'connected') {
				authenticate(fbGetStatRes.authResponse.accessToken);
			} else {
				console.log("Attempting login.");
				// Get short-lived token (slToken) from Facebook
				return FB.login(function (fbLoginRes) {
					if (fbLoginRes && fbLoginRes.authResponse) {
						authenticate(fbLoginRes.authResponse.accessToken);
					} else {
						loginFailureDialog();
					}
				}, { scope: 'email' });
			}
		});
	};

	function authenticate(slToken) {
		return $http.post('/auth', { slToken: slToken }).then(function (res) {
			return res.data;
		}).then(function (data) {
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
		}, loginFailureDialog);
	}

	function loginFailureDialog() {
		$mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true).title(':(').textContent("Login failed.").ariaLabel('Failed Login Dialog').ok("OK"));
	}
});
'use strict';

app.controller('MapCtrl', function ($scope, MapStyleFac, $rootScope, $mdDialog, GeneralFac, $state, $http, $mdSidenav) {

	$scope.openSidenav = function () {
		$mdSidenav('left').toggle();
	};

	function shutSidenav() {
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
	var options = {};
	options.center = { lat: 1.29, lng: 103.85 };
	options.zoom = 14;
	options.styles = MapStyleFac.getStyle();

	// Load map
	var map = new google.maps.Map(document.getElementById('mapDisplay'), options);

	// Toolbar commands
	// If GPS available, pan to current location
	$scope.currPos = null;
	function panToCurrLoc() {
		map.panTo($scope.currPos);
	}
	$scope.findAndPanToCurrLoc = function () {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (pos) {
				// Store curr position in scope
				$scope.currPos = {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				};
				panToCurrLoc();
			});
		}
		shutSidenav();
	};
	$scope.findAndPanToCurrLoc();

	// Update marker
	$scope.updateUserCoords = function () {
		clearMarkersSync();
		GeneralFac.updateUserCoords($scope.currPos).then(loadMarkers).then(loadMyProfile);
		shutSidenav();
	};

	$scope.removeProfile = function () {
		clearMarkersSync();
		GeneralFac.unpubliciseUser().then(function () {
			return GeneralFac.updateUserClubs([]);
		}).then(loadMarkers).then(loadMyProfile);
		shutSidenav();
	};

	$scope.removeMarker = function () {
		clearMarkersSync();
		GeneralFac.updateUserCoords({}).then(loadMarkers).then(loadMyProfile);
		shutSidenav();
	};

	// Load Markers
	var markers = [];
	function loadMarkers() {
		var iconOptions = {
			url: '/media/mapMarker.png',
			scaledSize: new google.maps.Size(42, 42),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(0, 0)
		};
		return GeneralFac.getAllUsers().then(function (users) {
			console.table(users);
			var ctr = 0;
			users.forEach(function (user) {
				if (user.lat && user.lng) {
					var marker = new google.maps.Marker({
						position: { lat: user.lat, lng: user.lng },
						map: map,
						icon: iconOptions,
						title: user.name,
						zIndex: ctr
					});
					markers.push(marker);
					marker.setMap(map);
					ctr++;
					marker.addListener('click', function () {
						$rootScope.currProfile = user;
						showProfile();
					});
				}
			});
		});
	}
	loadMarkers();

	function clearMarkersSync() {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
			markers[i] = null;
		}
		markers = [];
	}

	function showProfile() {
		$mdDialog.show({
			controller: 'ProfileCtrl',
			templateUrl: '/map/profile.tpl.html',
			parent: angular.element(document.body),
			targetEvent: null,
			clickOutsideToClose: true,
			fullscreen: false
		});
	}
});
"use strict";

app.factory('MapStyleFac', function () {
	var MapStyleFactory = {};
	var dayStyle = [{
		"featureType": "landscape",
		"stylers": [{
			"hue": "#FFBB00"
		}, {
			"saturation": 43.400000000000006
		}, {
			"lightness": 37.599999999999994
		}, {
			"gamma": 1
		}]
	}, {
		"featureType": "road.highway",
		"stylers": [{
			"hue": "#FFC200"
		}, {
			"saturation": -61.8
		}, {
			"lightness": 45.599999999999994
		}, {
			"gamma": 1
		}]
	}, {
		"featureType": "road.arterial",
		"stylers": [{
			"hue": "#FF0300"
		}, {
			"saturation": -100
		}, {
			"lightness": 51.19999999999999
		}, {
			"gamma": 1
		}]
	}, {
		"featureType": "road.local",
		"stylers": [{
			"hue": "#FF0300"
		}, {
			"saturation": -100
		}, {
			"lightness": 52
		}, {
			"gamma": 1
		}]
	}, {
		"featureType": "water",
		"stylers": [{
			"hue": "#0078FF"
		}, {
			"saturation": -13.200000000000003
		}, {
			"lightness": 2.4000000000000057
		}, {
			"gamma": 1
		}]
	}, {
		"featureType": "poi",
		"stylers": [{
			"hue": "#00FF6A"
		}, {
			"saturation": -1.0989010989011234
		}, {
			"lightness": 11.200000000000017
		}, {
			"gamma": 1
		}]
	}];

	var nightStyle = [{
		"elementType": "geometry",
		"stylers": [{
			"color": "#242f3e"
		}]
	}, {
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#746855"
		}]
	}, {
		"elementType": "labels.text.stroke",
		"stylers": [{
			"color": "#242f3e"
		}]
	}, {
		"featureType": "administrative.locality",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#d59563"
		}]
	}, {
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#d59563"
		}]
	}, {
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [{
			"color": "#263c3f"
		}]
	}, {
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#6b9a76"
		}]
	}, {
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [{
			"color": "#38414e"
		}]
	}, {
		"featureType": "road",
		"elementType": "geometry.stroke",
		"stylers": [{
			"color": "#212a37"
		}]
	}, {
		"featureType": "road",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#9ca5b3"
		}]
	}, {
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [{
			"color": "#746855"
		}]
	}, {
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [{
			"color": "#1f2835"
		}]
	}, {
		"featureType": "road.highway",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#f3d19c"
		}]
	}, {
		"featureType": "transit",
		"elementType": "geometry",
		"stylers": [{
			"color": "#2f3948"
		}]
	}, {
		"featureType": "transit.station",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#d59563"
		}]
	}, {
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [{
			"color": "#17263c"
		}]
	}, {
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#515c6d"
		}]
	}, {
		"featureType": "water",
		"elementType": "labels.text.stroke",
		"stylers": [{
			"color": "#17263c"
		}]
	}];

	MapStyleFactory.getStyle = function () {
		/*		const currDate = new Date();
  		const currHr = currDate.getHours();
  		if (currHr > 19 || currHr < 7) {
  			return nightStyle;
  		} else {
  			return dayStyle;
  		}*/
		return nightStyle;
	};
	return MapStyleFactory;
});
'use strict';

app.controller('ProfileCtrl', function ($mdDialog, $scope, $rootScope, GeneralFac) {

	function loadMyProfile() {
		$scope.myProfile = JSON.parse(localStorage.getItem('ynan-profile'));
	}
	loadMyProfile();

	$scope.cancel = function () {
		$mdDialog.cancel();
	};
	$scope.currProfile = $rootScope.currProfile;
	$scope.triggerFBDialog = GeneralFac.triggerFBDialog;
});
"use strict";

app.controller("UpdateCtrl", function ($scope, $state, GeneralFac) {
	$scope.bg = '/media/yalenus_options.jpg';

	$scope.submit = function () {
		convertClubs();
		if ($scope.inputCoordAgree) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(addProfile, navFailureDialog);
			} else {
				navFailureDialog();
				addProfile(null);
			}
		} else {
			addProfile(null);
		}
	};

	function convertClubs() {
		if ($scope.inputUser.clubsStr && $scope.inputUser.clubsStr.length > 0) {
			var clubStrs = $scope.inputUser.clubsStr.split(",");
			$scope.inputUser.clubStrs = clubStrs.map(function (clubStr) {
				if (clubStr[0] == " ") {
					return clubStr.slice(1);
				} else if (clubStr[clubStr.length - 1] == " ") {
					return clubStr.slice(0, -1);
				} else {
					return clubStr;
				}
			});
		} else {
			$scope.inputUser.clubStrs = [];
		}
	}

	function addProfile(posObj) {
		if (posObj && posObj.coords) {
			$scope.inputUser.lat = posObj.coords.latitude;
			$scope.inputUser.lng = posObj.coords.longitude;
			$scope.nextState = "map";
		} else {
			$scope.nextState = "grid";
		}
		GeneralFac.updateUser($scope.inputUser).then(function () {
			return GeneralFac.updateUserClubs($scope.inputUser.clubStrs);
		}).then(function () {
			$state.go($scope.nextState);
		}, GeneralFac.errorDialog);
	}

	function navFailureDialog() {
		$mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true).title('Oh no.').textContent("We were unable to retrieve your geolocation.").ariaLabel('Failed Nav Dialog').ok("OK"));
	}
});
"use strict";

app.factory("GeneralFac", function ($rootScope, $mdDialog, $http) {
	var GeneralFactory = {};

	// Clubs as an arr of strs ["YIRPA","Basketball",...]
	GeneralFactory.updateUserClubs = function (clubStrs) {
		return $http.post('/api/user/clubs', { clubStrs: clubStrs }).then(function (res) {
			return res.data;
		}).then(function (data) {
			if (data && data.success) {
				return "Success";
			} else {
				GeneralFactory.errorDialog();
				return "Failure";
			}
		}, GeneralFactory.errorDialog);
	};

	GeneralFactory.getAllUsers = function () {
		return $http.get('/api/user').then(function (res) {
			return res.data;
		}).then(function (data) {
			if (data && data.success) {
				return data.users;
			} else {
				return [];
			}
		}, GeneralFactory.errorDialog);
	};

	// Updates and returns user's profile
	GeneralFactory.updateUser = function (userObj) {
		return $http.post('/api/user', userObj).then(function (res) {
			return res.data;
		}).then(function (data) {
			if (data && data.success) {
				localStorage.setItem('ynan-profile', JSON.stringify(data.user));
				return data.user;
			}
		}, GeneralFactory.errorDialog);
	};

	GeneralFactory.updateUserCoords = function (coordsObj) {
		return $http.post('/api/user/coords', coordsObj).then(function (res) {
			return res.data;
		}).then(function (data) {
			if (data && data.success) {
				localStorage.setItem('ynan-profile', JSON.stringify(data.user));
				return data.user;
			}
		}, GeneralFactory.errorDialog);
	};

	// Unpublicise user's details
	GeneralFactory.unpubliciseUser = function () {
		return $mdDialog.show($mdDialog.confirm().parent(angular.element(document.body)).clickOutsideToClose(true).title('Hey there!').textContent('Are you sure you wish to delete your public profile?').ariaLabel('delete public profile').ok('Yes').cancel('No')).then(function () {
			return GeneralFactory.updateUser({});
		});
	};

	GeneralFactory.triggerFBDialog = function (toId) {
		FB.ui({
			method: 'send',
			name: "Send Private Message",
			link: "https://www.yale-nus.edu.sg",
			to: toId
		});
	};

	GeneralFactory.errorDialog = function () {
		$mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true).title(':(').textContent("An error occurred.").ariaLabel('Error Dialog').ok("OK"));
	};

	return GeneralFactory;
});
'use strict';

// Create the interceptor

app.factory('APIInterceptor', function () {

	var APIInterceptor = {};

	APIInterceptor.request = function (config) {
		if (localStorage.getItem('ynan-ynanToken') != null) {
			config.headers['x-access-token'] = JSON.parse(localStorage.getItem('ynan-ynanToken'));
		}
		return config;
	};

	APIInterceptor.response = function (response) {
		return response;
	};

	/*	APIInterceptor.responseError = (response) => {
 		// If client receives status 401, broadcast it
 		if (response.status === 401) { 
 			$rootScope.$broadcast('unauthenticated');
 		}
 		return response;
 	}*/

	return APIInterceptor;
});