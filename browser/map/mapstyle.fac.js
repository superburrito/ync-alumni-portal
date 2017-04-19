app.factory('MapStyleFac', function () {
	var MapStyleFactory = {};
	const dayStyle = [
	    {
	        "featureType": "landscape",
	        "stylers": [
	            {
	                "hue": "#FFBB00"
	            },
	            {
	                "saturation": 43.400000000000006
	            },
	            {
	                "lightness": 37.599999999999994
	            },
	            {
	                "gamma": 1
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "stylers": [
	            {
	                "hue": "#FFC200"
	            },
	            {
	                "saturation": -61.8
	            },
	            {
	                "lightness": 45.599999999999994
	            },
	            {
	                "gamma": 1
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "stylers": [
	            {
	                "hue": "#FF0300"
	            },
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 51.19999999999999
	            },
	            {
	                "gamma": 1
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "stylers": [
	            {
	                "hue": "#FF0300"
	            },
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 52
	            },
	            {
	                "gamma": 1
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "stylers": [
	            {
	                "hue": "#0078FF"
	            },
	            {
	                "saturation": -13.200000000000003
	            },
	            {
	                "lightness": 2.4000000000000057
	            },
	            {
	                "gamma": 1
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "stylers": [
	            {
	                "hue": "#00FF6A"
	            },
	            {
	                "saturation": -1.0989010989011234
	            },
	            {
	                "lightness": 11.200000000000017
	            },
	            {
	                "gamma": 1
	            }
	        ]
	    }
	]

	const nightStyle = [
	  {
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#242f3e"
	      }
	    ]
	  },
	  {
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#746855"
	      }
	    ]
	  },
	  {
	    "elementType": "labels.text.stroke",
	    "stylers": [
	      {
	        "color": "#242f3e"
	      }
	    ]
	  },
	  {
	    "featureType": "administrative.locality",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#d59563"
	      }
	    ]
	  },
	  {
	    "featureType": "poi",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#d59563"
	      }
	    ]
	  },
	  {
	    "featureType": "poi.park",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#263c3f"
	      }
	    ]
	  },
	  {
	    "featureType": "poi.park",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#6b9a76"
	      }
	    ]
	  },
	  {
	    "featureType": "road",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#38414e"
	      }
	    ]
	  },
	  {
	    "featureType": "road",
	    "elementType": "geometry.stroke",
	    "stylers": [
	      {
	        "color": "#212a37"
	      }
	    ]
	  },
	  {
	    "featureType": "road",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#9ca5b3"
	      }
	    ]
	  },
	  {
	    "featureType": "road.highway",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#746855"
	      }
	    ]
	  },
	  {
	    "featureType": "road.highway",
	    "elementType": "geometry.stroke",
	    "stylers": [
	      {
	        "color": "#1f2835"
	      }
	    ]
	  },
	  {
	    "featureType": "road.highway",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#f3d19c"
	      }
	    ]
	  },
	  {
	    "featureType": "transit",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#2f3948"
	      }
	    ]
	  },
	  {
	    "featureType": "transit.station",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#d59563"
	      }
	    ]
	  },
	  {
	    "featureType": "water",
	    "elementType": "geometry",
	    "stylers": [
	      {
	        "color": "#17263c"
	      }
	    ]
	  },
	  {
	    "featureType": "water",
	    "elementType": "labels.text.fill",
	    "stylers": [
	      {
	        "color": "#515c6d"
	      }
	    ]
	  },
	  {
	    "featureType": "water",
	    "elementType": "labels.text.stroke",
	    "stylers": [
	      {
	        "color": "#17263c"
	      }
	    ]
	  }
	]

	MapStyleFactory.getStyle = () => {
/*		const currDate = new Date();
		const currHr = currDate.getHours();
		if (currHr > 19 || currHr < 7) {
			return nightStyle;
		} else {
			return dayStyle;
		}*/
		return nightStyle;
	}
	return MapStyleFactory;
});
