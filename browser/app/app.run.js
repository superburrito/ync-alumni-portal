app.run(($window, $rootScope) => {

	// Initialise FB JS SDK
	$window.fbAsyncInit = function() {
		FB.init({
		  appId      : '201756480323021',
		  cookie     : true,
		  xfbml      : true,
		  version    : 'v2.8'
		});
		FB.AppEvents.logPageView();   
	};

	(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
    
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