module.exports = angular.module('is-portfolio', 
	[
		"ngRoute",
		"ngResource",
		//"ngCookies",
		//"ngSanitize"
	]
,function($interpolateProvider) 
	{
		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');
	}
) 