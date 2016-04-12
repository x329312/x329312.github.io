/**
 * Created by Administrator on 2016/4/11.
 */
angular.module('cModule',['ng','ngRoute','ngAnimate']).config(function($routeProvider){
    $routeProvider
        .when("/start",{templateUrl:'tpl/start.html',controller:"startCtr"})
        .when("/main",{templateUrl:'tpl/main.html',controller:"mainCtr"})
        .when("/detail/:dishID",{templateUrl:'tpl/detail.html',controller:"detailCtr"})
        .when("/createOrder/:did",{templateUrl:'tpl/createOrder.html',controller:"createOrderCtr"})
        .when("/myOrder",{templateUrl:'tpl/myOrder.html',controller:"myOrderCtr"})
        .otherwise({redirectTo:'/start'})
    }).controller('parentCtr',function($scope,$location){
        $scope.jump = function(targetUrl){
            $location.path(targetUrl);
        }
    }).controller('startCtr',function(){

    }).controller('mainCtr',function($scope,$http){
        $scope.isHasMore = true;
        $http.get("data/dish_getbypage.php?start=0").success(function(data){
                $scope.dishArray = data;
            });
        $scope.loadMore = function(){
            $http.get("data/dish_getbypage.php?start=" +  $scope.dishArray.length).success(function(data){
                $scope.dishArray = $scope.dishArray.concat(data);
                if(data.length < 5){
                    $scope.isHasMore = false;
                }
            });
        };
        $scope.$watch("kw",function(){
            console.log($scope.kw);
            if($scope.kw){
                $http.get("data/dish_getbykw.php?kw=" + $scope.kw).success(function(data){
                    $scope.dishArray = data;
                    console.log(data)
                });
            }
        });


    }).controller('detailCtr',function($scope,$http,$routeParams){
            var v = $routeParams.dishID;
            console.log(v);
            $http.get("data/dish_getDishById.php?id=" + v).success(function(data){
                $scope.dish = data[0];
                console.log(data);
            });
    }).controller('createOrderCtr',function($scope,$http,$routeParams){
            $scope.order = {"did":$routeParams.did};

            $scope.submitOrder = function(){console.log($scope.order)};
    }).controller('myOrderCtr',function(){

    });