
var app =angular.module("test",[]);
app.controller("myctrl",function($scope){
    $scope.a = {
            "code":0,
            "message":"success",
            "size":10,
            "total":19,
            "data": [
                {"id":189,"name":"完美世界","province":"340000","city":"340001","county":"340002","financing":6,"approved":2,"freezed":0,"industryList":[6]},
                {"id":187,"name":"阿斯蒂芬","province":"3","city":"6","county":"116","financing":1,"approved":1,"freezed":0,"industryList":[1]},
                {"id":186,"name":"测试","province":"2","city":"2","county":"20","financing":0,"approved":0,"freezed":0,"industryList":[0]},
                {"id":184,"name":"撒旦为","province":"340000","city":"340001","county":"340002","financing":0,"approved":1,"freezed":0,"industryList":[0]},
                {"id":185,"name":"微软中国","province":"340000","city":"340001","county":"340002","financing":1,"approved":2,"freezed":0,"industryList":[2]},
                {"id":124,"name":"修真院","province":"1","city":"1","county":"2","financing":1,"approved":1,"freezed":0,"industryList":[4]},
                {"id":182,"name":"分瓦房哥哥","province":"340000","city":"340001","county":"340002","financing":3,"approved":2,"freezed":0,"industryList":[1]},
                {"id":125,"name":"萝卜多","province":"1","city":"1","county":"1","financing":3,"approved":1,"freezed":0,"industryList":[2]},
                {"id":166,"name":"新修改","province":"340000","city":"340001","county":"340002","financing":3,"approved":1,"freezed":0,"industryList":[3]},
                {"id":138,"name":"拉钩","province":"340000","city":"340001","county":"340002","financing":5,"approved":1,"freezed":0,"industryList":[2]}
            ]
        };
    $scope.a1=$scope.a.data

    });