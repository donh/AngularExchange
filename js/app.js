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
	// replace: true, // Replace with the template below
	// transclude: true, // we want to insert custom content inside the directive
	// link: function(scope, element, attrs) {
	// 	scope.dialogStyle = {};
	// 	if (attrs.width)
	// 		scope.dialogStyle.width = attrs.width;
	// 	if (attrs.height)
	// 		scope.dialogStyle.height = attrs.height;
	// 	scope.hideModal_old = function() {
	// 		console.log('Close');
	// 		scope.dialogShown = false;
	// 	};
	// },
	// template: '...' // See below
	};
});

// donApp.config(['$resourceProvider', function($resourceProvider) {
// 	// Don't strip trailing slashes from calculated URLs
// 	$resourceProvider.defaults.stripTrailingSlashes = false;
// }]);

// donApp.factory('FeedLoader', function ($resource) {
// 	return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
// 		fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
// 	});
// });

// donApp.factory('FeedService', function ($http) {
// 	return {
// 	parseFeed : function(url) {
// 		return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
// 		}
// 	}
// });


// donApp.service('FeedList', function ($rootScope, FeedLoader) {
// 	this.get = function() {
// 		var feedSources = [
// 			{title: 'Slashdot', url: 'http://rss.slashdot.org/Slashdot/slashdot'},
// 			{title: 'Tweakers', url: 'http://feeds.feedburner.com/tweakers/mixed'},
// 			{title: 'Wired', url: 'http://feeds.wired.com/wired/index'},
// 		];
// 		if (feeds.length === 0) {
// 			for (var i=0; i<feedSources.length; i++) {
// 				FeedLoader.fetch({q: feedSources[i].url, num: 10}, {}, function (data) {
// 					var feed = data.responseData.feed;
// 					feeds.push(feed);
// 				});
// 			}
// 		}
// 		return feeds;
// 	};
// });



// donApp.factory('newsResource', function($resource) {
// 	return $resource('http://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=%E6%96%B0%E8%81%9E', {}, {
// 		get: {
// 			method: 'JSONP',
// 			params: { callback: 'JSON_CALLBACK' }
// 		}
// 	});
// });


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
// donApp.controller('AppController', function ($scope, $timeout, $http, $window, $document) {
donApp.controller('AppController', function ($scope, $timeout, $http, $window, $document, $compile) {
// donApp.controller('AppController', function ($scope, $timeout, $http, $window, $document, FeedList, $resource, $rootScope) {
// donApp.controller('AppController', function ($scope, $timeout, $http, $window, $document, FeedService, FeedList) {
// donApp.controller('AppController', ['FeedService', 'FeedList', function ($scope, $timeout, $http, $window, $document, FeedService, FeedList) {
// donApp.controller('AppController', ['newsResource', function ($scope, $timeout, $http, $window, $document, newsResource, $resource) {
	// newsResource.get(
	// 	function(successResponse){
	// 		console.log(successResponse);
	// 	}
	// );



	// $scope.feeds = FeedList.get();
	// $scope.$on('FeedList', function (event, data) {
	// 	console.log(data);
	// 	$scope.feeds = data;
	// });

	// console.log('$location.$$path =', $location.$$path);	// use $location.$$path
	// $scope.$location = $location;
	// $scope.$path = $location.$$path;
	$scope.dialogShown = false;
	$scope.transactions = [];
	$scope.arrNews = [];

	$scope.fields = ['Order', 'Currencies', 'Amount', 'Price', 'Date Time'];
	$scope.fieldsNews = ['Date', 'Title'];



	$.ajax({
		url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss',
		dataType: 'jsonp',
		success: function (data) {
			// console.log(data);
			// console.log(data.responseData);
			// console.log(data.responseData.feed);
			// console.log(data.responseData['feed']);
			// console.log(data.responseData['feed'].entries);

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
		// console.log('now =', now);
		// console.log('amount =', $scope.amount);


		// console.log('currencies =', currencies);
		// console.log('price =', price);
		var transaction = {
			Order: order,
			Currencies: currencies,
			Amount: amount,
			Price: price,
			DateTime: now,
			Color: color
		};
		$scope.transactions.unshift(transaction);
		console.log('transactions =', $scope.transactions);
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
		// console.log('content =', news.content);
		// var html = news.content;
		// var el = angular.element(html);
		// jQuery("#modalContent").append(el);
		// $compile(el)($scope);

		// Step 1: parse HTML into DOM element
		// var template = angular.element(html);
		// var template = angular.element(news.content.replace('"//', '"http://'));
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




	// loadFeed=function(e,url){
 //        $scope.currentButtonText = angular.element(e.target).text();
 //        // empty out filter text from last time they put one in, because
 //        // when they hit a new feed it is confusing.
 //        $scope.filterText = "";
 //        console.log("loadFeed / click event fired");

 //        if ($scope.currentButtonText == $scope.allFeeds[0].titleText)
 //        {
 //            //console.log($scope.feedSrc);
 //            url = $scope.feedSrc;
 //        }

        
 //        $scope.feedSrc = url;
 //        if (url === undefined || url === "")
 //        {
 //            $scope.phMessage = "Please enter a valid Feed URL & try again.";
 //            return;
 //        }
 //        console.log("button text: " + angular.element(e.target).text());
 //        console.log("value of url: " );
 //        console.log(url);
 //        FeedService.parseFeed(url).then(function(res){
 //            $scope.loadButonText=angular.element(e.target).text();
 //            $scope.feeds=res.data.responseData.feed.entries;
 //        });
 //    }

    


	$document.ready(function () {
		$('.ng-modal-overlay').css({ visibility: 'visible' });
		$('.ng-modal-dialog').css({ visibility: 'visible' });
		// angular.element(document.querySelector('.ng-modal-overlay')).css({ visibility: 'visible' });
		// $.ajax({
		// 	url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss',
		// 	dataType: 'jsonp',
		// 	success: function (data) {
		// 		// console.log(data);
		// 		// console.log(data.responseData);
		// 		// console.log(data.responseData.feed);
		// 		// console.log(data.responseData['feed']);
		// 		// console.log(data.responseData['feed'].entries);
		// 		$scope.arrNews = data.responseData['feed'].entries;
		// 		console.log($scope.arrNews);
		// 	},
		// 	error: function () {}
		// });


		// var x2js = new X2JS();
		// var url = 'http://rss.slashdot.org/Slashdot/slashdot';
		// var url = 'http://feeds.feedburner.com/tweakers/mixed';
		// var url = 'http://feeds.wired.com/wired/index';

		// {title: 'Slashdot', url: 'http://rss.slashdot.org/Slashdot/slashdot'},
		// {title: 'Tweakers', url: 'http://feeds.feedburner.com/tweakers/mixed'},
		// {title: 'Wired', url: 'http://feeds.wired.com/wired/index'},



		// $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));

		// var url = 'http://www.wsj.com/xml/rss/3_7031.xml?callback=jsonp_callback';
		// var url = 'http://www.bloomberg.com/feed/podcast/first-word.xml?callback=jsonp_callback';
		// var url = 'http://rss.nytimes.com/services/xml/rss/nyt/Economy.xml?callback=jsonp_callback';


		// var url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss?callback=jsonp_callback';
		// var url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss';

		// var url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss';


		// var url = 'http://www.wsj.com/xml/rss/3_7031.xml';
		// var url = 'http://cdn.rawgit.com/motyar/bcf1d2b36e8777fd77d6/raw/bfa8bc0d2d7990fdb910927815a40b572c0c1078/out.xml';
		// var url = 'http://rss.cnn.com/rss/money_news_international.rss';
		// var url = 'http://www.bloomberg.com/feed/podcast/first-word.xml';
		// var url = 'http://rss.nytimes.com/services/xml/rss/nyt/Economy.xml';
		// var url = 'http://www.bloomberg.com/tvradio/podcast/cat_markets.xml';
		// var url = 'http://www.bloomberg.com/tvradio/podcast/cat_news.xml';

		// $.ajax({
		// 	type: "GET",
		// 	// url: "books.xml",
		// 	url: url,
		// 	dataType: "xml",
		// 	success: xmlParser
		// });
		
		// $http.jsonp(url)
		// // $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url))
		// // $http.get(url)
		// // $http.head(url)
		// 	.success(function(data) {
		// 		console.log('data =', data);
		// 		// console.log(data.found);
		// 	})
		// 	.error(function(data, status, headers, config) {
		// 		console.log('data =', data);
		// 		console.log('status =', status);
		// 		console.log('headers =', headers);
		// 		console.log('config =', config);
		// 		// $scope.status = status;
		// 	});

		// $http.get(base_url + 'assets/js/angularxml/courseDef.xml').then(function(response) {
		// $http.get(url).then(function(response) {
		// 	console.log('response =', response);
		// // var chapters = [];
		// /*setting up the response*/
		// 	var json = x2js.xml_str2json(response.data);
		// 	console.log('json =', json);
		// // var courseDef = x2js.xml_str2json(response.data);
		// // $scope.chaptersObj = courseDef.course.navigation.chapter;

		// // /*looping through the chapters*/
		// // var numOfChapters = $scope.chaptersObj.length;
		// // for (var i = 0; i < numOfChapters; i++) {
		// // 	chapters.push({
		// // 		name: $scope.chaptersObj[i].name,
		// // 		number: $scope.chaptersObj[i]._number
		// // 	});
		// // }

		// // $scope.chapterNames = chapters;


		// // jQuery.getFeed({
		// // 	// url: 'rss.xml',
		// // 	url: 'http://www.bloomberg.com/feed/podcast/first-word.xml',
		// // 	success: function(feed) {
		// // 		alert(feed.title);
		// // 	}
		// });
	});
});
// }]);

function xmlParser(data) {
	// returning from async callbacks is (generally) meaningless
	console.log(data);
	// console.log(data.found);
}


    function retrieveFromLocalStorage()
    {
      $scope.allFeeds = [];
      console.log("retrieving localStorage...");
      try
      {
        $scope.allFeeds = JSON.parse(localStorage["feeds"]);
        console.log($scope.allFeeds.length);

        // console.log(JSON.stringify($scope.allFeeds));
        if ($scope.allFeeds === null)
        {
            console.log("couldn't retrieve feeds" );
            loadDefaultFeeds();
        }
      }
      catch (ex)
      {
        console.log("ex: " + ex);
        loadDefaultFeeds();
        saveToLocalStorage($scope.allFeeds);
      }      
    }


function loadDefaultFeeds()
{
 $scope.allFeeds = [{titleText:"Load (from textbox)",url:""},
  {titleText:"CodeProject C#",url:"http://www.codeproject.com/webservices/articlerss.aspx?cat=3"},  {titleText:"ComputerWorld - News",url:"http://www.computerworld.com/index.rss"},
  {titleText:"Dr. Dobb's",url:"http://www.drdobbs.com/rss/all"},
  {titleText:"InfoWorld Today's News",url:"http://www.infoworld.com/news/feed"},
   {titleText:"Inc. Magazine",url:"http://www.inc.com/rss/homepage.xml"},
   {titleText:"TechCrunch",url:"http://feeds.feedburner.com/TechCrunch"},
   {titleText:"CNN",url:"http://rss.cnn.com/rss/cnn_topstories.rss"}
                 ];
}

function saveToLocalStorage(feeds)
    {
      // Put the object into storage

      localStorage.setItem('feeds', angular.toJson(feeds));
      console.log(angular.toJson(feeds));
      console.log("wrote feeds to localStorage");
    }




function jsonp_callback(data) {
	// returning from async callbacks is (generally) meaningless
	console.log(data);
	// console.log(data.found);
}