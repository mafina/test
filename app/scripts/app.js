angular.module('webApp', ['ui.bootstrap'])
	.constant('httpStatusCodes', {
		"200": {errNumber: 200, statusText: "Successful"},
		"404": {errNumber: 404, statusText: "Not Found!"},		
		"400": {errNumber: 400, statusText: "Bad Request"},
		"408": {errNumber: 408, statusText: "Request Timeout"}
	});