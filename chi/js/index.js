/**
 * Created by Administrator on 2016/4/11.
 */
angular.module('cModule',['ng','ngRoute','ngAnimate']).config(function($routeProvider){
    $routeProvider
        .when("/start",{templateUrl:'tpl/start.html',controller:"startCtr"})
        .when("/main",{templateUrl:'tpl/main.html',controller:"mainCtr"})
        .when("/detail",{templateUrl:'tpl/detail.html',controller:"detailCtr"})
        .when("/createOrder",{templateUrl:'tpl/createOrder.html',controller:"createOrderCtr"})
        .when("/myOrder",{templateUrl:'tpl/myOrder.html',controller:"myOrderCtr"})
        .otherwise({redirectTo:'/start'})
    }).controller('parentCtr',function($scope,$location){
        $scope.jump = function(targetUrl){
            $location.path(targetUrl);
        }
    }).controller('startCtr',function(){

    }).controller('mainCtr',function($scope,$http){
        $scope.isHasMore = true;
        $http.get("json/detail.json").success(function(data){
                $scope.dishArray = data;
            });
        $scope.loadMore = function(){
            $http.get("json/detail.json").success(function(data){
                $scope.dishArray = $scope.dishArray.concat(data);
                if(data.length < 3){
                    $scope.isHasMore = false;
                }
            });
            $scope.$watch("kw",function(){
                if($scope.kw){
                    $http.get("json/kw.json").success(function(data){
                        $scope.dishArray = data;
                    });
                }
            });
        };


    }).controller('detailCtr',function(){

    }).controller('createOrderCtr',function(){

    }).controller('myOrderCtr',function(){

    });