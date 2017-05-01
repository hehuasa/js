/**
 * Created by Administrator on 2017/4/15.
 */
angular.module('test',['ui.router','ng.ueditor','ui.date'])
.config(function($urlRouterProvider,$stateProvider) {
            $urlRouterProvider.when("", "/homepage/wel");
            $stateProvider
                .state("homepage", {
                    url: '/homepage',
                    templateUrl: "../task8/js-task8-tab.html",
                    controller:"mytab"

                })
                .state("homepage.wel", {
                    url: '/wel',
                    templateUrl: "../task8/js-task8-wel.html"

                })
                .state("homepage.list", {
                    url: "/list",
                    templateUrl: '../task8/js-task8-list.html',
                    controller:"myctrl"
                })
                .state("homepage.add", {
                    url: "/add",
                    params:{data:null},
                    templateUrl: " ../task8/js-task8-addArticle.html",
                    controller:"upload"
                });
        })


.controller("mytab",function($scope, $http){
    //获取权限
    $http({
        method: "POST",
        url: "/carrots-admin-ajax/a/login",
        data:"name="+ "admin"+"&pwd="+"123456",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(function successCallback(response){
            console.log(response.data);
            $scope.account=response.data.data.manager.name;
            $scope.role=response.data.data.role.name;
        });
    //退出登录
    $scope.loginout=function(){
        $http({
            method:'post',
            url:'/carrots-admin-ajax/a/logout'
        }).then(function(){
            if (confirm("确认退出吗？")){
                window.location="../task3/js-task3.html"
            }

        })
    };




    $scope.show=function(){
        var a=event.target;
        var left= a.getElementsByClassName("glyphicon-chevron-left")[0];
        var right= a.getElementsByClassName("glyphicon-chevron-down")[0];
console.log( $scope.left);
            if (a.nextElementSibling.style.display===""){
                a.nextElementSibling.style.display="block";
                left.style.display="none";
                right.style.display="block";
            }
            else {
                a.nextElementSibling.style.display="";
                left.style.display="block";
                right.style.display="none";
            }
        }
    })


.controller("myctrl",function ($scope,$http, $state){


    $scope.page="1";
    $scope.size="10";
    $scope.startTime="";
    $scope.endTime="";
    $scope.state="全部";
    $scope.states=["全部","上线","草稿"];
    $scope.type="全部";
    $scope.types=["全部","首页banner","寻找精英banner","寻找职位banner","行业大图"];





    //input 时间插件
    $.extend($.datepicker.regional, {
        'zh-CN' : {
            closeText: '关闭',
            prevText: '<上月',
            nextText: '下月>',
            currentText: '今天',
            monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            monthNamesShort: ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
            dayNamesMin: ['日','一','二','三','四','五','六'],
            weekHeader: '周',
            dateFormat: 'yy-mm-dd',
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: true,
            yearSuffix: '年'
        }
    });
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);





    var state_;
    var type_;
    $scope.switch_state = function(){//将搜索用的双向绑定值进行转换,同时避免直接修改双向绑定的默认值
        state_=$scope.state;
        if(state_=="全部"){
            state_="";
        }else  if(state_=="草稿"){
            state_=1;
        }
        else  if(state_=="上线"){
            state_=2;
        }else {
            state_=""
        }
        return state_;

    } ;
    $scope.switch_type = function(){//将搜索用的双向绑定值进行转换,同时避免直接修改双向绑定的默认值
        type_=$scope.type;
        if(type_=="全部"){
            type_="";
        }else  if(type_=="首页banner"){
            type_=0;
        }else  if(type_=="寻找精英banner"){
            type_=1;
        }else  if(type_=="寻找职位banner"){
            type_=2;
        }else  if(type_=="行业大图"){
            type_=3;
        }else {
            type_=""
        }
        return type_;
    } ;

    $scope.http=function(){//获取服务器的企业列表
        var time1;
        var time2;
        if ( $scope.startTime==""){
            time1= $scope.startTime
        }else { time1= new Date($scope.startTime).valueOf();}

        if ( $scope.endTime==""){
            time2= $scope.endTime
        }else { time2= new Date($scope.endTime).valueOf();}

        $http({
            method: "GET",
            url: '/carrots-admin-ajax/a/article/search?page='+$scope.page+'&size='+$scope.size+'&status='+state_
            +'&type='+type_+'&startAt='+time1+'&endAt='+time2
        }).then(function successCallback(response) {
            $scope.a = response.data.data.articleList;
            for (var z = 0; z < $scope.a.length; z++) {
                if( $scope.a[z].status==1){
                    $scope.a[z].a= "上线";
                }else if( $scope.a[z].status==2){
                    $scope.a[z].a= "下线";
                }
                $scope.a[z].b="编辑";
                $scope.a[z].c="删除";
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


      });
    };
    $scope.switch_state();
    $scope.switch_type();
    $scope.http();//默认加载一次获取企业列表的函数

    $scope.page_turn=function(){//数字按钮的页面跳转
        $scope.page= Number(event.target.innerText);
        $scope.switch_state();
        $scope.switch_type();
        $scope.http();
    };

    $scope.page_first=function(){//企业列表中跳转首页
        $scope.page= $scope.pages[0];
        $scope.switch_state();
        $scope.switch_type();
        $scope.http();
    };

    $scope.page_final=function(){//企业列表中跳转末页
        $scope.page= $scope.pages[$scope.total_page-1];
        $scope.switch_state();
        $scope.switch_type();
        $scope.http();
    };

    $scope.page_last = function () {//企业列表中跳转前一页
        if ($scope.page==1){
            $scope.page=1
        }else {
            $scope.page= $scope.page-1;
        }
        $scope.switch_state();
        $scope.switch_type();
        $scope.http();
    };
    $scope.page_next=function(){//企业列表中跳转后一页
        if($scope.page==$scope.pages[$scope.pages.length-1]){
            $scope.page= $scope.pages[$scope.pages.length-1]
        }else {
            $scope.page= $scope.page+1;
        }
        $scope.switch_state();
        $scope.switch_type();
        $scope.http();
    };


    $scope.clear=function(){
        $scope.page="1";
        $scope.startTime="";
        $scope.endTime="";
        $scope.state="全部";
        $scope.type="全部";
        $scope.switch_state();
        $scope.switch_type();
        $scope.http()
    };
    $scope.search=function(){
        $scope.page="1";
        $scope.switch_state();
        $scope.switch_type();
        $scope.http()
    };


    //编辑article
    $scope.edit=function(id){
      $http({
          method: "GET",
            url:'/carrots-admin-ajax/a/article/'+id,
          headers:{
              'Content-Type': 'application/x-www-form-urlencoded','charset':'UTF-8'
          }
        }).then(function success(response){
          if (confirm("请确认操作")){
              $state.go('homepage.add',{data:response.data.data.article})
          }
      })

    };
    //上下线功能
    $scope.offline=function(id,status,index){
        if (status===1){
            status=2
        }else if (status===2){
            status=1
        }
        console.log(status);
        $http({
            method: "PUT",
            url:'/carrots-admin-ajax/a/u/article/status',
            data: $.param({id:id,status:status}),
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded','charset':'UTF-8'
            }
        }).then(function (){
        $scope.switch_state();
        $scope.switch_type();
        if (confirm("请确认操作")){
            $scope.http();


        }
        });


    };
    //删除article
    $scope.delete=function(id) {
        $http({
            method: "delete",
            url:'/carrots-admin-ajax/a/u/article/'+id,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded','charset':'UTF-8'
            }
        }).then(function(){
            $scope.switch_state();
            $scope.switch_type();
            if (confirm("请确认操作")){
                $scope.http()
            }

        })

    }

   })
.filter('type', function() {//过滤器
      return function (type){
          if (type == "0") {
              type = "首页banner"
          } else if (type == "1") {
              type = "寻找精英banner"
          }
          else if (type == "2") {
              type = "寻找职位banner"
          }
          else if (type == "3") {
              type = "行业大图"
          }return type;
      }
    })
.filter('state', function() {//过滤器
    return function (state){
        if (state == 1) {
            state = "草稿"
        } else
        if(state == 2) {
            state = "上线"
        }
        return state
    }
})

.controller("upload", function ($scope,$http,$state,$stateParams) {
        console.log($stateParams.data);
        $scope.types=["请选择","首页banner","寻找精英banner","寻找职位banner","行业大图"] ;
        $scope.types_child=["请选择","移动互联","电子商务","O2O","企业服务","教育","金融","游戏"] ;
        var file_input=document.getElementById("file_");//选择dom
        var img_view=document.getElementsByClassName("img-view");
        var disabled_div=document.getElementsByClassName("disabled");
        var progress_file=document.getElementById("progress_");
        var save_=document.getElementById("save");
        var btn_upload=document.getElementById("btn_upload");
        var btn_del=document.getElementById("btn_del");
        var btn_online=document.getElementById("btn_online");


        $scope.img_load=function(){//判定预览图是否出现的表单验证
            return(img_view[0].style.display!="inline-block"&&
            disabled_div[0].style.display!="inline-block")

        };


    if ($stateParams.data==null){//判断接收的参数是否为null，并赋值
        $scope.form_tittle="";
        $scope.from_url="";
        $scope.form_type="请选择";
        $scope.form_type_child="请选择";
    }else {
        $scope.form_tittle=$stateParams.data.title;
        $scope.status=$stateParams.data.status;
        $scope.from_url=$stateParams.data.url;
        $scope.form_type=$scope.types[$stateParams.data.type+1];
        $scope.form_type_child=$scope.types_child[$stateParams.data.industy+1];
        $scope.form_text=$stateParams.data.content;
        $scope.imgsrc=$stateParams.data.img;
        img_view[0].style.display="inline-block";
        disabled_div[0].style.display="inline-block";
        $scope.img_load();
        console.log($scope.img_load())


    }








    //设置二级联动菜单


    $scope.industry=function(){
        return(($scope.form_type=="行业大图"))
    };


    $scope.type =function(){ return( $scope.form_type=="请选择"||($scope.form_type=="行业大图")&& $scope.form_type_child=="请选择")};
    console.log($scope.type());


    function visible(){//上传图片后，相应元素设置为可见
        progress_file.style.display="inline-block";
        save_.style.display="inline-block";
        btn_upload.style.display="inline-block";
        btn_del.style.display="inline-block";
    }
    file_input.onchange=function(){
        $scope.file_list= file_input.files[0];// 提取所上传的文件信息用于显示
        $scope.file_size= Math.ceil(($scope.file_list.size)/1024);

        var reader = new FileReader();
        for(var i=0;i<this.files.length;i++ ){
            var file=this.files[i];
            reader.readAsDataURL(file);
        }
        reader.onload=function(event){
            if ($stateParams.data==null){
                $scope.imgsrc=event.target.result;
            }else {
                $scope.imgsrc=$stateParams.data.img;
            }

        };


        reader.onprogress=function(pro){
            visible();
        };
        $scope.upload_=function(){
            img_view[0].style.display="inline-block";
            disabled_div[0].style.display="inline-block";
            $scope.img_load();

            $scope.img_data=new FormData();//将图片的值传入formdata
            $scope.img_data.append('file', $scope.file_list);
            console.log(file);
            if (btn_online.style.cursor=="not-allowed"){
                return btn_online;
            }else {
                console.log(progress_file.value);

                $http({//用angularhttp方法上传
                    method:"post",
                    url: '/carrots-admin-ajax/a/u/img/test',
                    data: $scope.img_data,
                    cache:false,
                    headers: {
                        'Content-Type': undefined
                    },
                    uploadEventHandlers: {
                        progress: function(e) {
                            progress_file.value= e.loaded
                        }
                    }
                }).then(function successCallback(response) {
                    console.log(progress_file.value);
                    $scope.responsecode=response.data.data.url;
                    console.log( $scope.responsecode)
                });

                //var xhr; //原生xhr方法上传
                //if (window.XMLHttpRequest){//判断浏览器是否支持
                //    xhr=new XMLHttpRequest()
                //}
                //else {
                //    xhr=new ActiveXObject("Microsoft.XMLHTTP");
                //}
                //xhr.open('post','/carrots-admin-ajax/a/u/img/test',true);
                //xhr.send( $scope.img_data);
                //
                ////j检测POST状态
                //xhr.onreadystatechange=function(){
                //    if (xhr.readyState == 4){
                //        if (xhr.status == 200){
                //            var response=xhr.response;
                //            console.log(response);
                //
                //        }
                //    }
                //};

            }




        };
        $scope.del_=function(){
            var file=file_input.files;
            reader.abort(file);
            $scope.img_load=true;
            img_view[0].style.display="none";
            disabled_div[0].style.display="none";
       } ;
        $scope.$apply();//将非angular函数进行绑定
    };
    var type_;
    $scope.switch_type = function(){//将搜索用的双向绑定值进行转换,同时避免直接修改双向绑定的默认值

        type_=$scope.form_type;
        switch (type_){
            case "首页banner":
                type_=0;break;
            case "寻找精英banner":
                type_=1;break;
            case "寻找职位banner":
                type_=2;break;
            case "行业大图":
                type_=3;break;

        }
        return type_;} ;
    var child;
    $scope.type_child=function(){

        child=$scope.form_type_child;
        if ($scope.form_type=="行业大图"){
        switch (child){
            case "移动互联网":
                child=0;break;
            case "电子商务":
                child=1;break;
            case "企业服务":
                child=2;break;
            case "O2O":
                child=3;break;
            case "教育":
                child=4;break;
            case "金融":
                child=5;break;
            case "游戏":
                child=6;break;
        }
        }else {child=""}
        return child;
    };

    $scope.http=function(){
        if ($stateParams.data==null){
            console.log(progress_file.value);
        $http({
            method: "POST",
            url: '/carrots-admin-ajax/a/u/article',
            data: $.param({title:$scope.form_tittle,type:type_,status:$scope.status,img:$scope.responsecode,
            content:$scope.form_text,url:$scope.from_url,industry:child}),
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded','charset':'UTF-8'
            },
            uploadEventHandlers: {
                progress: function(e) {
                    progress_file.value= e.loaded
                }
            }

        }).then(function successCallback(response) {
            $scope.a = response.data.message;
            console.log($scope.a );
            $state.go('homepage.list')
    })
        }
    else {
            var img;
            if ($scope.responsecode==undefined){
                 img=$scope.imgsrc
            }
            else {
                img=$scope.responsecode
            }
            $http({
                method: "PUT",
                url: '/carrots-admin-ajax/a/u/article/'+$stateParams.data.id,
                data: $.param({
                    id:$stateParams.data.id,
                    author:$stateParams.data.author,
                    title:$scope.form_tittle,
                    type:type_,
                    status:$scope.status,
                    img:img,
                    content:$scope.form_text,
                    url:$scope.from_url,
                    industry:child,
                    createBy:$stateParams.data.createBy,
                    updateBy:$stateParams.data.updateBy,
                    publishat:$stateParams.data.publishat,
                    updateAt:$stateParams.data.updateAt,
                    createAt: $stateParams.data.createAt
                }),

                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded','charset':'UTF-8'
                }

            }).then(function successCallback(response) {
                $scope.a = response.data.message;
                console.log($scope.a );
                $state.go('homepage.list')
        }
            )
        }};
    $scope.save=function(){
        $scope.switch_type();
        $scope.type_child();
        $scope.status=2;
       $scope.http()
    };
    $scope.draft=function(){
        $scope.switch_type();
        $scope.type_child();
        $scope.status=1;
        $scope.http()
    }
















}



);
