/**
 * Created by Administrator on 2017/4/5.
 */
var x =localStorage.num_;
var num =x.split("|");
console.log(num);
var condition_=localStorage.condition_;
var condition=condition_.split("|");
console.log(condition_);



var a ;

$(document).ready(
    function() {
         for (a= 0 ;a < num.length ;a++) {
             $(".empty-box:first").attr("class", "empty-box1");
             $(".role:first").html(num[a]);
             $(".num:first").html(a+1 + "号玩家");
             $(".role:first").attr("class", "role1 flex-center");
             $(".num:first").attr("class", "num1 flex-center");

             console.log(num.length);
             console.log(a)
        }
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



function start(){
    window.open("js-task2-4-2.html")
}