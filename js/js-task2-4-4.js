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
                dead_mam.style.opacity="0.5"
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


function back(){
//获取被杀玩家所在元素的位置并存储
    var player = document.getElementsByClassName("empty-box1");
    var w ;
    for(w=0; player[w].getElementsByClassName("li2").length<1;w++){
    }
    console.log(num[w]);
    condition[w]="死亡";
    console.log(condition);
    condition_ =condition.join("|");
    localStorage.condition_= condition_;



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
    console.log(farmer_num)
    console.log(killer_num)
}
    var dead = document.getElementsByClassName("li2");
    dead[0].style.display="none";
    var death_num=dead.length;
    var survivor = farmer_num - death_num;
    if(killer_num<=survivor ){
        //跳转网页
        window.open("js-task2-4-2.html")
    }
    else if(killer_num>survivor||killer_num == 0 ){
        window.open("js-task2-4-5.html")
    }





}


