/**
 * Created by Administrator on 2017/4/4.
 */
var x = localStorage.num_;
var condition_=localStorage.condition_;
console.log(condition_);
var num = x.split("|");
var num_ = num.join("|");
localStorage.num_ = num_;
console.log(num);
var a = 0;
var b = 1;
var c = 1;
var a_=a+1;
$(document).ready(
    function(){
    $("#footer_btn").click(function(){
        if (b == 1 && a_ < num.length ) {
            $("#player_id").html(num[a]);
            $("#player_pic1").css("display","none");
            $("#player_pic2").css("display","block");
            a++;
            a_++;
            $("#footer_btn").html("隐藏并传递给" + a_ + "号");
            b=2;
            console.log(a)
        }else
        if(b == 2 && a_ <= num.length ) {
            $("#player_pic1").css("display","block");
            $("#player_pic2").css("display","none");
            $("#player_num").html(a_);
            $("#footer_btn").html("查看" + a_ + "号身份");
            b=1;
            console.log(a)
        }
        else
        if( a_ == num.length && b ==1) {
            $("#player_id").html(num[a]);
            $("#player_pic1").css("display","none");
            $("#player_pic2").css("display","block");
            a++;
            a_++;
            $("#footer_btn").html("法官查看");
            console.log(a)
        }else
        if( a_ > num.length) {
            window.location.href="js-task2-4-1.html"
        }

        }
    )
}
);
