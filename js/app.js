'use strict';
var donApp = angular.module('donApp', ['ngModal']);

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
			for (var i in entries) {
				entry = entries[i];
				title = entry.title;
				content = entry.content;
				// console.log('entry.publishedDate =', entry.publishedDate);
				date = entry.publishedDate.split(', ')[1];
				// console.log('date =', date);
				// date = moment(entry.publishedDate).format('YYYY/MM/DD');
				date = moment(date, 'DD MMMM YYYY HH:mm:ss +-HHmm').format('YYYY/MM/DD');
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

	// var USD_JPY = 120.12012;
	// var AUD_JPY = 91.6816817;
	// var EUR_CAD = 1.36013063;
	// var USD_CNY = 6.14548829;
	// var CAD_CNY = 4.9226959;
	// var GBP_USD = 1.49200;

	$scope.timeInMs = 0;
	var getAskAndBid = function() {
		var base = 0;
		var ask = 0;
		var bid = 0;
		var zone = 0.25;
		var bidHigh = 0.9999;
		var bidLow = 0.985;
		var exchange = {};
		for (var i in $scope.exchanges) {
			exchange = $scope.exchanges[i];
			base = exchange.base;
			ask = base * (1 + (zone * (Math.random() - 0.5)));
			bid = ask * (bidLow + (bidHigh - bidLow) * Math.random());
			$scope.exchanges[i].ask = Math.round(ask * 10000) / 10000;
			$scope.exchanges[i].bid = Math.round(bid * 10000) / 10000;
		}

		for (i in $scope.exchanges2) {
			exchange = $scope.exchanges2[i];
			base = exchange.base;
			ask = base * (1 + (zone * (Math.random() - 0.5)));
			bid = ask * (bidLow + (bidHigh - bidLow) * Math.random());
			$scope.exchanges2[i].ask = Math.round(ask * 10000) / 10000;
			$scope.exchanges2[i].bid = Math.round(bid * 10000) / 10000;
		}
		$timeout(getAskAndBid, 500);
	};
	$timeout(getAskAndBid, 500);


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
	};


	$scope.modal = {};

	$scope.showNews = function(news)
	{
		$scope.modal = {
			title: news.title,
		};
		angular.element(document.querySelector('.added')).remove();

		var content = news.content.replace(/<img[^>]*>/g,"").replace('"//', '"http://');
		content = '<div class="added">' + content + '</div>';
		var template = angular.element(content);
		var parent = angular.element(document.querySelector('#modalContent')).append(template);
		$compile(template)($scope);
		$scope.dialogShown = true;
	};

	$scope.hideModal = function() {
		$scope.dialogShown = false;
	};

	$scope.togglePage = function(page) {
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
