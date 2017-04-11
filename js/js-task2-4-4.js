/**
 * Created by Administrator on 2017/4/5.
 */
var x =localStorage.num_;//获取玩家角色分配数据
var num =x.split("|");
console.log(num);

var condition_=localStorage.condition_;//获取玩家生死状态数组
var condition =condition_.split("|");
console.log(condition);



$(document).ready(
    function() {
         for (a= 0 ;a < num.length ;a++) {
             $(".empty-box:first").attr("class", "empty-box1");
             $(".role:first").html(num[a]);
             $(".num:first").html(a+1 + "号玩家");
             $(".role:first").attr("class", "role1 flex-center");
             $(".num:first").attr("class", "num1 flex-center");

        }

//获取被杀死玩家数据

        for(var death=0;death<condition.length;death++){//对已死亡玩家进行标记

            if(condition[death]=="死亡"){
                var player = document.getElementsByClassName("empty-box1");
                var dead_mam= player[death];
                console.log(dead_mam);
                dead_mam.className="empty-box1 box_opacity"
            }

        }
    }
);
function kill() {//杀手杀人时出现的鼠标事件
    for (var z = 0; z <= num.length; z++) {
        var clear = document.querySelectorAll("li");
        clear[z].className = "li1"
    }
    var target = event.target;
    var parent = target.parentElement.parentElement;
    var el = parent.querySelector("li");
    el.className = "li2";


}


var farmer_dead;
var killer_dead;

function back(){
//获取被杀玩家所在元素的位置并存储
    var player = document.getElementsByClassName("empty-box1");
    for(var w=0; player[w].getElementsByClassName("li2").length<1;w++){
    }
    console.log(num[w]);
    condition[w]="死亡";
    console.log(condition);
    condition_ =condition.join("|");
    localStorage.condition_= condition_;

    //去除杀人的鼠标事件
    var z = document.getElementsByClassName("li2");
    console.log(z);
    z[0].style.display="none";
    //判断被杀人员是否在上一轮死亡
    var parent= z[0].parentElement.parentElement;
    console.log(parent.className);
    if (parent.className=="empty-box1 box_opacity"){
        confirm("角色已在上一轮死亡");
        return;
    }
    else {
        parent.className="empty-box1 box_opacity";

    }


//判断游戏是否结束
    var killer_num = 0;
    var farmer_num = 0;
for (var p =0;p<=num.length;p++){

    if (num[p]=="杀手"){
        killer_num++

    }
    else if((num[p]=="平民")){
        farmer_num++;

    }
    console.log(farmer_num);
    console.log(killer_num);
}//定义并赋值全部杀手、平民的人数

    var dead = document.getElementsByClassName("box_opacity");//统计死亡人数，并区分角色
    console.log(dead);

    for (var q=0;q<dead.length;q++){
        console.log(dead[q]);
        var l=dead[q].getElementsByClassName("role1");
console.log(l);
        if (l[0].innerText=="平民"){
            farmer_dead=q;
        }else {
            killer_dead=q;
        }
        console.log(farmer_dead);
        console.log(killer_dead);
    }
if (killer_dead==undefined){//如果杀手无人死亡，则定义为0
    killer_dead=0
}
    var farmer_survivor =farmer_num - farmer_dead;//定义两种角色的生存人数
    var killer_survivor=killer_num - killer_dead;



    if(killer_survivor<farmer_survivor ){
        //跳转网页
        window.open("js-task2-4-2.html")
    }
    else if(killer_survivor>farmer_survivor||killer_survivor==0){
        window.open("js-task2-4-5.html")
    }





}


