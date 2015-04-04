/*! angular_express 2015-04-05 */
"use strict";var donApp=angular.module("donApp",["ngModal"]);donApp.directive("modalDialog",function(){return{restrict:"E",scope:{show:"="}}}),donApp.controller("AppController",function($scope,$timeout,$http,$window,$document,$compile){$scope.exchangeShow=!0,$scope.newsShow=!1,$scope.dialogShown=!1,$scope.amount=2e4,$scope.transactions=[],$scope.arrNews=[],$scope.fields=["Order","Currencies","Amount","Price","Date Time"],$scope.fieldsNews=["Date","Title"],$.ajax({url:"http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss",dataType:"jsonp",success:function(data){var entries=data.responseData.feed.entries,entry={},news={},title="",content="",date="",color="";for(var i in entries)entry=entries[i],title=entry.title,content=entry.content,date=entry.publishedDate.split(", ")[1],date=moment(date,"DD MMMM YYYY HH:mm:ss +-HHmm").format("YYYY/MM/DD"),color=i%2===0?"#E6E6E6":"#FFFFFF",news={date:date,title:title,content:content,color:color},$scope.arrNews.push(news)},error:function(){}}),$scope.exchanges=[{name:"USD / JPY",base:120.12012,bid:"1.2456",ask:"1.2656"},{name:"AUD / JPY",base:91.6816817,bid:"4.2421",ask:"4.2461"},{name:"EUR / CAD",base:1.36013063,bid:"11.2367",ask:"11.2661"}],$scope.exchanges2=[{name:"USD / CNY",base:6.14548829,bid:"5.2656",ask:"5.2782"},{name:"CAD / CNY",base:4.9226959,bid:"2.1487",ask:"2.1784"},{name:"GBP / USD",base:1.492,bid:"7.2756",ask:"7.2875"}],$scope.timeInMs=0;var getAskAndBid=function(){var base=0,ask=0,bid=0,zone=.25,bidHigh=.9999,bidLow=.985,exchange={};for(var i in $scope.exchanges)exchange=$scope.exchanges[i],base=exchange.base,ask=base*(1+zone*(Math.random()-.5)),bid=ask*(bidLow+(bidHigh-bidLow)*Math.random()),$scope.exchanges[i].ask=Math.round(1e4*ask)/1e4,$scope.exchanges[i].bid=Math.round(1e4*bid)/1e4;for(i in $scope.exchanges2)exchange=$scope.exchanges2[i],base=exchange.base,ask=base*(1+zone*(Math.random()-.5)),bid=ask*(bidLow+(bidHigh-bidLow)*Math.random()),$scope.exchanges2[i].ask=Math.round(1e4*ask)/1e4,$scope.exchanges2[i].bid=Math.round(1e4*bid)/1e4;$timeout(getAskAndBid,500)};$timeout(getAskAndBid,500),$scope.deal=function(order,exchange){var currencies=exchange.name,price=0,color="";"Buy"===order?(price=exchange.bid,color="#5cb85c"):"Sell"===order&&(price=exchange.ask,color="#d9534f");var amount=0;Number($scope.amount)&&(amount=$scope.amount);var now=moment().format("YYYY/MM/DD HH:mm:ss"),transaction={Order:order,Currencies:currencies,Amount:amount,Price:price,DateTime:now,Color:color};$scope.transactions.unshift(transaction)},$scope.modal={},$scope.showNews=function(news){$scope.modal={title:news.title},angular.element(document.querySelector(".added")).remove();var content=news.content.replace(/<img[^>]*>/g,"").replace('"//','"http://');content='<div class="added">'+content+"</div>";{var template=angular.element(content);angular.element(document.querySelector("#modalContent")).append(template)}$compile(template)($scope),$scope.dialogShown=!0},$scope.hideModal=function(){$scope.dialogShown=!1},$scope.togglePage=function(page){"exchange"===page?($scope.exchangeShow=!0,$scope.newsShow=!1):"news"===page&&($scope.exchangeShow=!1,$scope.newsShow=!0)},$document.ready(function(){$(".ng-modal-overlay").css({visibility:"visible"}),$(".ng-modal-dialog").css({visibility:"visible"})})});