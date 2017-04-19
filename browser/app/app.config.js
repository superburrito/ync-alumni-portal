// Url Routing Configurations
app.config(($urlRouterProvider) => {
	// Default paths
    $urlRouterProvider.when('','/');
	  $urlRouterProvider.otherwise('/landing');
});

app.config(($mdThemingProvider) => { 
  	$mdThemingProvider.theme('default')
  		.primaryPalette('indigo')
  		.accentPalette('orange', {'default': '600'});

    $mdThemingProvider.theme('blue')
      .primaryPalette('blue');

    $mdThemingProvider.theme('teal')
      .primaryPalette('teal');

    $mdThemingProvider.theme('orange')
  		.primaryPalette('orange', {'default': '600'});

    $mdThemingProvider.theme('darkorange')
      .primaryPalette('orange')
      .dark();
});






