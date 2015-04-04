'use strict';
// var donApp = angular.module('donApp', ['ngRoute']);
var donApp = angular.module('donApp', []);

// donApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
// 	$routeProvider
// 		.when('/login', {
// 			// templateUrl: '/templates/login.html',
// 			controller: 'LoginController',
// 		})
// 		.when('/designer/:designerKey', {
// 			// templateUrl: '/templates/designer.html',
// 			controller: 'DesignerController',
// 		})
// 		.otherwise({
// 			redirectTo: '/'
// 		});
// 		$locationProvider.html5Mode(true);
// 	}
// ]);


// donApp.controller('AppController', function ($scope, $routeParams, $http, $window, $document, $compile, $location) {
// donApp.controller('AppController', function ($scope, $http, $window, $document, $compile, $location) {
donApp.controller('AppController', function ($scope, $timeout, $http, $window, $document) {
	// console.log('$location.$$path =', $location.$$path);	// use $location.$$path
	// $scope.$location = $location;
	// $scope.$path = $location.$$path;
	$scope.transactions = [];

	$scope.exchanges = [
		{
			name: 'USD / JPY',
			base: 120.12012,
			bid: '1.2456',
			ask: '1.2656'
		},
		{
			name: 'AUD / JPY',
			base: 91.6816817,
			bid: '4.2421',
			ask: '4.2461'
		},
		{
			name: 'EUR / CAD',
			base: 1.36013063,
			bid: '11.2367',
			ask: '11.2661'
		}
	];

	$scope.exchanges2 = [
		{
			name: 'USD / CNY',
			base: 6.14548829,
			bid: '5.2656',
			ask: '5.2782'
		},
		{
			name: 'CAD / CNY',
			base: 4.9226959,
			bid: '2.1487',
			ask: '2.1784'
		},
		{
			name: 'GBP / USD',
			base: 1.49200,
			bid: '7.2756',
			ask: '7.2875'
		}
	];

	// console.log('$scope.exchanges[0] =', $scope.exchanges[0]);


	// var USD_JPY = 120.12012;
	// var AUD_JPY = 91.6816817;
	// var EUR_CAD = 1.36013063;
	// var USD_CNY = 6.14548829;
	// var CAD_CNY = 4.9226959;
	// var GBP_USD = 1.49200;

	$scope.timeInMs = 0;
	var getAskAndBid = function() {
		// $scope.timeInMs += 500;
		// console.log('$scope.timeInMs =', $scope.timeInMs);
		var base = 0;
		var ask = 0;
		var bid = 0;
		// var zone = 0.3;
		var zone = 0.25;
		var bidHigh = 0.9999;
		// var bidLow = 0.98;
		var bidLow = 0.975;
		// var bidLow = 0.97;
		var exchange = {};
		for (var i in $scope.exchanges) {
			exchange = $scope.exchanges[i];
			base = exchange.base;
			ask = base * (1 + (zone * (Math.random() - 0.5)));
			// bid = ask * (bidLow + (zone * (Math.random())));
			bid = ask * (bidLow + (bidHigh - bidLow) * Math.random());
			// console.log(exchange.name);
			// console.log('base =', base);
			// console.log('ask =', ask);
			// console.log('bid =', bid);
			// $scope.exchanges[i].ask = ask;
			// $scope.exchanges[i].bid = bid;
			$scope.exchanges[i].ask = Math.round(ask * 10000) / 10000;
			$scope.exchanges[i].bid = Math.round(bid * 10000) / 10000;
		}

		for (var i in $scope.exchanges2) {
			exchange = $scope.exchanges2[i];
			base = exchange.base;
			ask = base * (1 + (zone * (Math.random() - 0.5)));
			bid = ask * (bidLow + (bidHigh - bidLow) * Math.random());
			$scope.exchanges2[i].ask = Math.round(ask * 10000) / 10000;
			$scope.exchanges2[i].bid = Math.round(bid * 10000) / 10000;
		}
		// $timeout(getAskAndBid, 500);
		// $timeout(getAskAndBid, 1500);
		// $timeout(getAskAndBid, 3500);
		$timeout(getAskAndBid, 5000);
	}
	$timeout(getAskAndBid, 500);
	// $timeout(getAskAndBid, 1500);
	// $timeout(getAskAndBid, 3500);



	// $scope.rows = [
	// 	[
	// 		{
	// 			name: 'USD / JPY',
	// 			bid: '1.2456',
	// 			ask: '1.2656'
	// 		},
	// 		{
	// 			name: 'AUD / JPY',
	// 			bid: '4.2421',
	// 			ask: '4.2461'
	// 		},
	// 		{
	// 			name: 'EUR / CAD',
	// 			bid: '11.2367',
	// 			ask: '11.2661'
	// 		}
	// 	],
	// 	[
	// 		{
	// 			name: 'USD / CNY',
	// 			bid: '5.2656',
	// 			ask: '5.2782'
	// 		},
	// 		{
	// 			name: 'CAD / CNY',
	// 			bid: '2.1487',
	// 			ask: '2.1784'
	// 		},
	// 		{
	// 			name: 'GBP / USD',
	// 			bid: '7.2756',
	// 			ask: '7.2875'
	// 		}
	// 	]
	// ];
	
	$scope.deal = function(order, exchange)
	{
		// console.log('order =', order);
		// console.log('exchange =', exchange);
		var currencies = exchange.name;
		var price = 0;
		if (order === 'Buy') price = exchange.bid;
		else if (order === 'Sell') price = exchange.ask;

		var now = moment().format('YYYY/MM/DD HH:mm:ss');
		console.log('now =', now);


		// console.log('currencies =', currencies);
		// console.log('price =', price);
		var transaction = {
			Order: order,
			Currencies: currencies,
			Amount: '',
			Price: price,
			DateTime: now
		};
		$scope.transactions.unshift(transaction);
		console.log('transactions =', $scope.transactions);
	};

});


