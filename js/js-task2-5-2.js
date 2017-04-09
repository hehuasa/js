/**
 * Created by Administrator on 2017/4/5.
 */
var x =localStorage.num_;
var num =x.split("|");
console.log(num);
var a ;

$(document).ready(
    function() {
         for (a= 0 ;a < num.length ;a++) {
             $(".role:first").html(num[a]);
             $(".num:first").html(a+1 + "号玩家");
             $(".role:first").attr("class", "role1 flex-center");
             $(".num:first").attr("class", "num1 flex-center");
             $(".empty-box:first").attr("class", "empty-box1");
        }
    }
);
function kill(){//杀手杀人时出现的鼠标事件
    for (var z = 0;z<=num.length;z++){
     var   clear = document.querySelectorAll("li");
        clear[z].className ="li1"
    }

    var target = event.target;
    var parent = target.parentElement.parentElement;
    var el = parent.querySelector("li");
    el.className  = "li2";

}


function back(){//标记被杀的玩家
   var dead = document.getElementsByClassName("li2");
    var dead_warp = dead[0].parentElement.parentElement;
    dead_warp.style.opacity="0.5";
    dead[0].style.display="none";


    var player = document.getElementsByClassName("empty-box1");//获取被杀玩家所在元素的位置并存储
    var w ;
    for(w=0; player[w].getElementsByClassName("li2").length==1;w++){
    }
    localStorage.w= w
}

