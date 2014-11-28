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
*
*
*/
function monitorController(config,monitorService,$filter) {
	var vm = this;

	var machines = [];
	vm.push = [];

	var c1 = {};
	c1 = angular.copy(config.machines[0]);

	angular.extend(c1,config.main);

	for( var attrName in config.main) {}

		console.log(config.machines.length);
	//this.item = monitorService.getStatus(c1);
    
	vm.checkStatus = function() {


		for(var i=0; i < vm.serverList.length; i++){
			var c2 = config.main;
		//console.log(config.machines[i]);
		var tunedUrl = {};
		//console.log(vm.serverList[i]);
		tunedUrl.url = 'http://'+ vm.serverList[i].url + '/'
		//console.log(tunedUrl);
		angular.extend(c2,tunedUrl);
		//console.log(c2);
		/*monitorService.getStatus(c2).then(function(response){
			console.log(vm,c2);
			console.log(i,response,vm.serverList,"inside then");
			//vm.serverList[checkExist()].receivedStatus = response;
		});*/
		vm.serverList[i] = monitorService.getStatus(c2);

		//console.log(vm.item);
		//call machines
		//push machine status in the array
	}
}

	vm.clearAll = function(){
		vm.serverList = [];
	}
	
	//return the calls
	vm.serverList = [];//config.machines;
	console.log(vm.serverList);

	vm.checkHealth = function(s){
		console.log("the s",s);
		return s.url.indexOf("health") ? true :false;
	}

	vm.addUrl = function () {		
		console.log(vm.newUrl);
		var server = {};
			server.url = vm.newUrl;
			server.checked = true;
			server.receivedStatus = {};

			if(checkExist(vm.newUrl) === null){
				vm.serverList.push(server);
			}
	}

	vm.updateSublist = function(server){
		var server = {};
		//server.url = url;         	
		//server.checked = false;
		console.log("removed",server);
		vm.serverList.splice(vm.serverList.indexOf(checkExist(server.url)), 1);
	}

	function checkExist(itemUrl){
		if(!vm.serverList.length){ return null;}
		for (var i = 0; i < vm.serverList.length; i++){
					if(vm.serverList[i].url === itemUrl){
						console.log("exists");
						return i;
					}				
		}
		return null;
	}

}

})();