/**
 * Created by Administrator on 2017/4/15.
 */
angular.module('test',['ui.router'])
.config(function($urlRouterProvider,$stateProvider) {
            $urlRouterProvider.when("", "/homepage");
            $stateProvider
                .state("homepage", {
                    url: '/homepage',
                    templateUrl: "js-task8-tab.html",
                    cache:'false'
                })
                .state("homepage.wel", {
                    url: '/wel',
                    templateUrl: "../task8/js-task8-wel.html",
                    cache:'false'
                })
                .state("homepage.list", {
                    url: "/list",
                    templateUrl: '../task8/js-task8-list.html',
                    cache:'false',
                    controller:"myctrl"
                })

                .state("homepage.add", {
                    url: "/add",
                    templateUrl: " ../task8/js-task8-addArticle.html",
                    cache:'false'
                });
        })

.controller("myctrl",function ($scope,$http){
    $scope.page="1";
    $scope.size="6";
    $scope.start_time="";
    $scope.end_time="";
    $scope.state="全部";
    $scope.states=["全部","上线","草稿"];
    $scope.type="全部";
    $scope.types=["全部","首页banner","寻找精英banner","寻找职位banner","行业大图"];

    $scope.http=function(){//获取服务器的企业列表
      $http({

            method: "GET",
            url: 'http://119.10.57.69:880/carrots-admin-ajax/a/article/search?page='+$scope.page+'&size='+$scope.size+'&status='+$scope.state
            +'&type='+$scope.type+'&startAt='+$scope.start_time+'&endAt='+$scope.end_time
        });

            $scope.b = new Array();// 将下线编辑删除三个a标签作为数组，准备用ng-repeat获取。
            for (var z = 0; z < $scope.a.length; z++) {
                $scope.b[z] = {"a": "下线", "b": "编辑", "c": "删除"}
            }

          //计算总体页数,自动进行分页

          $scope.num = response.data.data.total;
          $scope.total_page= Math.ceil($scope.num/$scope.size);
          $scope.pages = new Array([ $scope.total_page]);
          $scope.page_num=1;
          for (var num=0;num<$scope.total_page;num++){
              $scope.pages[num]=$scope.page_num;
              $scope.page_num++
          }
    };
    $scope.http();//默认加载一次获取企业列表的函数

    $scope.page_turn=function(){//数字按钮的页面跳转
        $scope.page= Number(event.target.innerText);
        $scope.http();
    };

    $scope.page_first=function(){//企业列表中跳转首页
        $scope.page= $scope.pages[0];
        $scope.http();
    };

    $scope.page_final=function(){//企业列表中跳转末页
        $scope.page= $scope.pages[$scope.total_page-1];
        $scope.http();
    };

    $scope.page_last = function () {//企业列表中跳转前一页
        if ($scope.page==1){
            $scope.page=1
        }else {
            $scope.page= $scope.page-1;
        }
        $scope.http();
    };
    $scope.page_next=function(){//企业列表中跳转后一页
        if($scope.page==$scope.pages[$scope.pages.length-1]){
            $scope.page= $scope.pages[$scope.pages.length-1]
        }else {
            $scope.page= $scope.page+1;
        }
        $scope.http();
    };

    $scope.next=function(){
        $scope.b =$scope.page- 10;
        $http({
            method: "GET",
            url: 'http://119.10.57.69:880/carrots-admin-ajax/a/article/search?size=' + $scope.size
        }).then(function successCallback(response) {
            $scope.a = response.data.data.articleList;
            for (var i = 0; i < $scope.a.length; i++) {// 将get到的数据中的代码转换为文字
                if ($scope.a[i].type == "0") {
                    $scope.a[i].type = "首页banner"
                } else if ($scope.a[i].type == "1") {
                    $scope.a[i].type = "寻找精英banner"
                }
                else if ($scope.a[i].type == "2") {
                    $scope.a[i].type = "寻找职位banner"
                }
                else if ($scope.a[i].type == "3") {
                    $scope.a[i].type = "行业大图"
                }


                if ($scope.a[i].status == 1) {
                    $scope.a[i].status = "草稿"
                } else {
                    $scope.a[i].status = "上线"
                }
            }


            $scope.b = new Array();// 将下线编辑删除三个a标签作为数组，准备用ng-repeat获取。
            for (var z = 0; z < $scope.a.length; z++) {
                $scope.b[z] = {"a": "下线", "b": "编辑", "c": "删除"}
            }

        })
    };

    $scope.clear=function(){
        $scope.http()
    };
    $scope.search=function(){

        $scope.http()
    }
   })
    .filter('filter_', function() {
      return function (ft){
          if (ft.type == "0") {
              ft = "首页banner"
          } else if (ft.type == "1") {
              ft.type = "寻找精英banner"
          }
          else if (ft.type == "2") {
              ft.type = "寻找职位banner"
          }
          else if (ft.type == "3") {
              ft.type = "行业大图"
          }


          if (ft.status == 1) {
              ft.status = "草稿"
          } else {
              ft.status = "上线"
          }
      }
    });


