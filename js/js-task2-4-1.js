/**
 * Created by Administrator on 2017/4/5.
 */
var x =localStorage.num_;
var num =x.split("|");
console.log(num);
var condition_=localStorage.condition_;
console.log(condition_);



var a ;

$(document).ready(
    function() {
         for (a= 0 ;a < num.length ;a++) {
             $(".role:first").html(num[a]);
             $(".num:first").html(a+1 + "号玩家");
             $(".role:first").attr("class", "role1 flex-center");
             $(".num:first").attr("class", "num1 flex-center");
             $(".empty-box:first").attr("class", "empty-box1");
             console.log(num.length);
             console.log(a)
        }

        var z =localStorage.w;//获取被杀死玩家数据
        console.log(z);
        var player = document.getElementsByClassName("empty-box1");
        console.log(player);
        if(z!=0){
            player[z].style.opacity="0.5";
        }
    }
);



function start(){
    window.open("js-task2-4-2.html")
}