(function() {
	'use strict';

	angular
	.module('app')
	.filter('checkHealth' , checkHealth)
	.filter('convertSeconds' , convertSeconds);

	function checkHealth() {
		return function (url) {
			return url.indexOf('health') > -1 ? true : false;
		};
	}

	function convertSeconds(){
		return function(str) {
			if(str){
				var secNum = str.split(' ');
				secNum = parseInt(secNum[0],10);

				var hours   = Math.floor(secNum / 3600);
				var minutes = Math.floor((secNum - (hours * 3600)) / 60);
				var seconds = secNum - (hours * 3600) - (minutes * 60);

				if (hours   < 10) {hours   = '0'+hours;}
				if (minutes < 10) {minutes = '0'+minutes;}
				if (seconds < 10) {seconds = '0'+seconds;}
				var time    = hours+'hours:'+minutes+'minutes:'+seconds+'seconds';
				return time;
			}
		};

	}

})();