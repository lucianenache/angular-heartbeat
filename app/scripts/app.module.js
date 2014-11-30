(function() {
	'use strict';

	angular.module('app',['ngRoute']);

	angular.module('app').
	config(['$routeProvider', function ($routeProvider){
		$routeProvider
		.when('/', {
			controller:'monitorController',
			controllerAs: 'vm',
			templateUrl:'index.html'
		})
		.otherwise({redirectTo:'/'});
	}]);

	angular.module('app').
	run(function () {

	});

	//configuration for the machines
	angular.module('app').
	constant('config',{
		'main':{
			'method':'GET',
			'cache':false,
				'timeout': 2000 //120 seconds
			},
			'machines':
				 [{'url':'54.77.100.45',
				 	'checked': false
				 	}, //cors out
				  {'url':'54.171.126.19/healthcheck',
				 	'checked': true}, //we're cool
				  {'url':'54.76.250.49/healthcheck',
				 	'checked': false},  //fail
				  {'url':'54.171.129.65/healthcheck',
				 	'checked': false}, //we're cool
				  {'url':'54.77.234.164',
				 	'checked': false} //cors out
				  ]

				});

})();