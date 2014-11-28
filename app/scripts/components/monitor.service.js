(function() {
	'use strict';

	angular
	.module('app')
	.service('monitorService' , monitorService);

	monitorService.$inject = ['$http'];

	function monitorService($http) {

		var service =  {
			getStatus: getStatus 
		};

		return service;


		function getStatus(config) {
			return $http(config).
			success(function(data, response) {
    			return response;
    	}).
			error(function(data, response) {
    			return response;
    	});
		}

	}
})();