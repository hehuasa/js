/**
 * Created by Administrator on 2017/4/15.
 */

angular.module('test',['ngRoute'])
    .config(['$routeProvider',
        function($routeProvider){
            $routeProvider
                .when('/',{templateUrl:'../task6/js-task6-wel.html'})
                .when('/list',{templateUrl:'../task6/js-task6-3.html'})
                .when('/add',{templateUrl: '../task6/js-task6-4.html'})
                .otherwise({redirectTo:'/'});}
    ])
.controller("myctrl",function($scope,$http){
    $http({
        method: "GET",
        url: "http://119.10.57.69:880/carrots-admin-ajax/a/article/search"
    }).then(function successCallback(response) {
        $scope.a = response.data.data.articleList;
        for (var i = 0 ;i<$scope.a.length;i++) {
            if ($scope.a[i].type == "0") {
                $scope.a[i].type = "首页banner"
            } else if  ($scope.a[i].type == "1") {
                $scope.a[i].type = "寻找精英banner"
            }
            else if  ($scope.a[i].type == "2") {
                $scope.a[i].type = "寻找职位banner"
            }
            else if  ($scope.a[i].type == "3") {
                $scope.a[i].type = "行业大图"
            }


        if($scope.a[i].status == 1){
            $scope.a[i].status = "草稿"
        }else {
            $scope.a[i].status = "上线"
        }
        }// 将get到的数据中的代码转换为文字


        $scope.b =new Array();// 将下线编辑删除三个a标签作为数组，准备用ng-repeat获取。
        for (var z=0;z< $scope.a.length;z++){
            $scope.b[z]={"a":"下线","b":"编辑","c":"删除"}
        }    });
});