/**
 * Created by Administrator on 2017/4/1.
 */
//定义全局变量
var totalnum ;
var part0 ;
totalnum =document.getElementById("total");//取得输入的玩家人数的值
 part0 = new RegExp(/^[4-9]{1}|[1]{1}[0-8]{1}$/);//判断输入值是否在4到18这个范围，超出范围弹出提示

var killer;
var farmer;
var num;
var num_;
var condition;
var condition_;
//确定输入玩家人数的范围，超出范围弹出提示。
function arrange(){
       if(part0.exec(totalnum.value )){
        match()
    }

}
//对输入的玩家人数进行杀手与平民的分配
function match(){
    var part1=new RegExp(/^[4-8]{1}$/);
    var part2=new RegExp( /^[9]{1}|[1]{1}[0-1]{1}$/);
    var part3=new RegExp(/^[1]{1}[2-5]{1}$/);
    var part4=new RegExp(/^[1]{1}[6-8]{1}$/);



    if (part1.exec(totalnum.value )){
        killer = 1;
        farmer = totalnum.value  -1;
    }else if (part2.exec(totalnum.value )){
        killer = 2;
        farmer = totalnum.value  -2;
    }else
    if (part3.exec(totalnum.value )){
        killer = 3;
        farmer = totalnum.value  -3;
    }else
    if ( part4.exec(totalnum.value )){
        killer = 4;
        farmer = totalnum.value  -4;
    }
//对分配好的杀手以及平民人数赋值到input
    document.getElementById("killer_num").value= killer ;
    document.getElementById("farmer_num").value = farmer;

//分配角色到每个具体的玩家
    var num = [];
      num.length = totalnum.value  ;
    for ( var i= 0;i<totalnum.value ;i++ ){
        if (killer>i){
            num[i] = "杀手";
        }
      else {
        num[i] = "平民"
    }
    }
    num.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});//进行随机分配
    num_ = num.join("|");
    localStorage.num_ =num_;

    console.log(num);
    //在控制台输出已分配好角色的玩家数组

    var condition=new Array;//设置玩家生存状态的数组
    for (var l=0;l< num.length;l++){
        condition[l]="生存"
    }
    console.log(condition);
    condition_ = condition.join("|");
    localStorage.condition_ =condition_;
    console.log(condition_);
}

function opencheck(){
    if(part0.exec(totalnum.value )){
        window.open("js-task2-3.html")
    }
    else {
        confirm("请输入正确数字")
    }

}






