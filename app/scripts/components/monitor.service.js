(function() {
	'use strict';

	angular
	.module('app')
	.service('monitorService' , monitorService);

	monitorService.$inject = ['$http'];

	function monitorService($http) {
		var order = 0;

		var service =  {
			getStatus: getStatus 
		}

		return service;

/*
		function getStatus(config) {
			return $http(config).
			success(function(data, status, headers, config) {
    		// this callback will be called asynchronously
    		// when the response is available
    		console.log("status for",config.url,status);
    		return status;
    	}).
			error(function(data, status, headers, config) {
    		// called asynchronously if an error occurs
    		// or server returns response with an error status
    		console.log("status for",config.url,status);
    		return status;
    	});
		}
*/
		function getStatus(config) {
		$http.get(config)
  		.then(function(result) {
   			 return result;
		});
  		}
		function responseOk(){

		}

		function responseFail(){

		}
	}
})();