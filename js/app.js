'use strict';
// var donApp = angular.module('donApp', ['ngRoute']);
// var donApp = angular.module('donApp', ['ngResource', 'ngRoute']);
// var donApp = angular.module('donApp', ['ngRoute', 'ngResource']);
// var donApp = angular.module('donApp', ['ngResource']);
var donApp = angular.module('donApp', ['ngModal']);
// var donApp = angular.module('donApp', []);


// donApp.config(function(ngModalDefaultsProvider) {
// 	ngModalDefaultsProvider.set('closeButtonHtml', 'X');
// 	// ngModalDefaultsProvider.set('option', 'value');
// 	// // Or with a hash
// 	// ngModalDefaultsProvider.set({option: 'value', option2: 'value2'});
// })


donApp.directive('modalDialog', function() {
	return {
		restrict: 'E',
		scope: {
		show: '='
	},
	};
});

donApp.controller('AppController', function ($scope, $timeout, $http, $window, $document, $compile) {
	$scope.exchangeShow = true;
	$scope.newsShow = false;
	$scope.dialogShown = false;
	$scope.amount = 20000;
	$scope.transactions = [];
	$scope.arrNews = [];

	$scope.fields = ['Order', 'Currencies', 'Amount', 'Price', 'Date Time'];
	$scope.fieldsNews = ['Date', 'Title'];

	$.ajax({
		url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss',
		dataType: 'jsonp',
		success: function (data) {
			var entries = data.responseData['feed'].entries;
			var entry = {};
			var news = {};
			var title = '';
			var content = '';
			var date = '';
			var color = '';
			// console.log('entries =', entries);
			for (var i in entries) {
				entry = entries[i];
				// console.log('entry =', entry);
				title = entry.title;
				content = entry.content;
				// date = entry.publishedDate;
				date = moment(entry.publishedDate).format('YYYY/MM/DD');
				if (i % 2 === 0) color = '#E6E6E6';
				else color = '#FFFFFF';
				news = {
					date: date,
					title: title,
					content: content,
					color: color
				};
				$scope.arrNews.push(news);
			}
			// console.log($scope.arrNews);
			// console.log($scope.arrNews[5]);
			// console.log($scope.arrNews[5].title);
		},
		error: function () {}
	});


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
		var bidLow = 0.985;
		// var bidLow = 0.98;
		// var bidLow = 0.975;
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
		$timeout(getAskAndBid, 500);
		// $timeout(getAskAndBid, 1500);
		// $timeout(getAskAndBid, 3500);
		// $timeout(getAskAndBid, 5000);
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
		var color = '';
		if (order === 'Buy') {
			price = exchange.bid;
			color = '#5cb85c';		// green
		} else if (order === 'Sell') {
			price = exchange.ask;
			color = '#d9534f';		// red
		}
		var amount = 0;
		if (Number($scope.amount)) amount = $scope.amount;
		// if ($scope.amount !== undefined) amount = $scope.amount;
		
		var now = moment().format('YYYY/MM/DD HH:mm:ss');
		var transaction = {
			Order: order,
			Currencies: currencies,
			Amount: amount,
			Price: price,
			DateTime: now,
			Color: color
		};
		$scope.transactions.unshift(transaction);
		// console.log('transactions =', $scope.transactions);
	};


	$scope.modal = {};

	$scope.showNews = function(news)
	{
		// console.log('news =', news);
		// var content = news.content;
		$scope.modal = {
			title: news.title,
			// content: news.content,

		};
		angular.element(document.querySelector('.added')).remove();

		var content = news.content.replace(/<img[^>]*>/g,"").replace('"//', '"http://');
		content = '<div class="added">' + content + '</div>';
		var template = angular.element(content);
		// var template = angular.element(news.content);
		// console.log(angular.element(document.querySelector('#modalContent')).children());

		// Step 2: compile the template
		// var linkFn = $compile(template);

		// Step 3: link the compiled template with the scope.
		// var element = linkFn($scope);
		// console.log('element =', element);

		// Step 4: Append to DOM (optional)
		// var parent = angular.element(document.querySelector('#modalContent')).append(element);
		var parent = angular.element(document.querySelector('#modalContent')).append(template);
		// console.log('parent =', parent);
		$compile(template)($scope);
		// parent.appendChild(element);

		$scope.dialogShown = true;
	};

	$scope.hideModal = function() {
		// console.log('Close');
		$scope.dialogShown = false;
	};

	$scope.togglePage = function(page) {
		// console.log('page =', page);
		if (page === 'exchange') {
			$scope.exchangeShow = true;
			$scope.newsShow = false;
		} else if (page === 'news') {
			$scope.exchangeShow = false;
			$scope.newsShow = true;
		}
	};

	$document.ready(function () {
		$('.ng-modal-overlay').css({ visibility: 'visible' });
		$('.ng-modal-dialog').css({ visibility: 'visible' });
	});
});
