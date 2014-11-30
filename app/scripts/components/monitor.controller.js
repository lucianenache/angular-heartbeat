(function() {
	'use strict';

	angular
	.module('app')
	.controller('monitorController' , monitorController);

	monitorController.$inject = ['config','monitorService','$filter'];

/*
*TODO
*1.validate addresses
*2.better pagination
*3.persist the stuff either to local storage/db
*4.bind a call with setinterval 
*
*/
function monitorController(config,monitorService,$filter) {
	
	var vm = this;
	var orderBy = $filter('orderBy');
	vm.reverseS = true; // used in the orderBy filter -- server response
	vm.reverseD = true; // used in the orderBy filter -- DB response
	vm.serverList = config.machines

	vm.checkStatus = function(selected) { //check only those that have status true
		var servers = [];
		var toCheck = false;

		if(arguments>0){
			servers = selected;
		} else {
			servers = vm.serverList;
		}

		for(var i=0; i < vm.serverList.length; i++){
			var staticConf = config.main;
			var tunedUrl = {};

			tunedUrl.url = enrichUrl(vm.serverList[i].url);
			angular.extend(staticConf,tunedUrl);
			if(vm.serverList[i].checked === true){
				toCheck = true;
				monitorService.getStatus(staticConf).then(function(j,response){
					//match the ones to update 
					vm.serverList[j].receivedStatus = response;
				}.bind(null,i));
			}
		} if(toCheck === false){
			console.log('at least one server should be checked!');
		}	 
	};

	vm.clearAll = function(){
		vm.serverList = [];
	};
	
	vm.checkHealth = function(s){
		return s.url.indexOf('health') ? true :false;
	};

	vm.addUrl = function () {		
		var server = {};
		server.url = vm.newUrl;
		server.checked = true;
		server.receivedStatus = {};

		if(checkExist(vm.newUrl) === null){
			vm.serverList.push(server);
		}
	};

	vm.updateSublist = function(server){
		vm.serverList.splice(vm.serverList.indexOf(checkExist(server.url)), 1);
	};

	vm.order = function(predicate, reverse){
		console.log(predicate,reverse);
    	vm.serverList = orderBy(vm.serverList, predicate, reverse);
  	};

 	//vm.order('-status',false);


	function checkExist(itemUrl){
		if(!vm.serverList.length){ return null;}
		for (var i = 0; i < vm.serverList.length; i++){
			if(vm.serverList[i].url === itemUrl){
				return i;
			}				
		}
		return null;
	}

	function enrichUrl(url){
		return url.indexOf('http') !== -1 ? url : 'http://' + url;

	}

}

})();