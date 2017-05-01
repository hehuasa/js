/**
 * Created by Administrator on 2017/4/6.
 */


//每天四个步骤的状态机
function switches(){
var menu = {
    state:"step4",
    initialize:function(){

        switch (this.state){
            case "step1":
                this.state="step2"; break;
            case "step2":
                this.state="step3"; break;
            case "step3":
                this.state="step4"; break;
            case "step4":
                this.state="step1";
                break;
        }
    },
    event:function(){this.initialize()}
};
    return menu;
}
var btn1 = new switches();
var btn2 = new switches();
var btn3 = new switches();
var btn4 = new switches();
var fold_ = new switches();


//取出存储的天数值以及点击数值
var day = localStorage.day_;
var click = localStorage.click_;
if (day==undefined){
    day =1;
}
else {
    day = parseInt(localStorage.day_);
}
if (click==undefined){
    click =0;
}
else {
    click =parseInt( localStorage.click_);
}

var x =localStorage.num_;//获取玩家角色分配数据
var num =x.split("|");
console.log(num);




//提前复制下一天的数据（初始值）。
var sourceNode_date_=document.getElementById("date_");
var sourceNode_step_=document.getElementById("step_");
var sourceNode_btn_=document.getElementById("fold_menu");



var i ;
for (i =1;i<=day;i++){


    var clonedNode_date_ = sourceNode_date_.cloneNode(true); // 克隆节点
    var clonedNode_step_ = sourceNode_step_.cloneNode(true); // 克隆节点

    sourceNode_date_.parentNode.appendChild((clonedNode_date_));// 在父节点插入克隆的节点

    var daxie = new Array("一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四");//修改天数显示
    clonedNode_date_.innerText="第"+daxie[i-1]+"天";

    sourceNode_step_.parentNode.appendChild(clonedNode_step_);
    clonedNode_date_.style.display="inline-block";






    clonedNode_date_.setAttribute("id","day_"+i);///修改被复制元素的id，以避免重复
    clonedNode_step_.setAttribute("id","step_"+i);

    var step=document.getElementById("step_"+i);

    var step_content=step.getElementsByClassName("step-btn");
    var text_=step.getElementsByTagName("div");


}
step.style.display="inline-block";
var  deadnum=localStorage.deadnum_;//取出存储的死亡玩家序号数组

if (deadnum==undefined){
    deadnum = new Array();
}else {
    var deadnum_=localStorage.deadnum_;
    deadnum = deadnum_.split("|")
}
var  deadman=localStorage.deadman_;//取出存储的死亡玩家身份数组
if (deadman==undefined){
    deadman = new Array();
}else {
    var deadman_=localStorage.deadman_;
    deadman= deadman_.split("|")
}

//杀人信息显示与修改
var text=document.getElementsByClassName("text");
var line_left=document.getElementsByClassName("line-left");

var text_num;
for (  text_num=0;text_num<click;text_num=text_num+2){

    var plus2=text_num+2;//页面原始的两个块设置为不显示了，所以从第三个块开始
    if((text[plus2])==undefined){
        break
    }else {
        text[plus2].innerText=deadnum[text_num]+"号被杀手杀死，真实身份是"+deadman[text_num];
        console.log(text_num);
        console.log(text[plus2]);
    }
    var plus3=text_num+3;
    console.log(plus3);
    console.log(text[plus3]);
    if((text[plus3])==undefined){
        break
    }else {
        text[plus3].innerText=deadnum[text_num+1]+"号被投票杀死，真实身份是"+deadman[text_num+1];

    }




    if (click>=(text_num*2)+1 && click<(text_num*2)+4){
        text[text_num+2].style.display="inline-block";
        line_left[plus2].style.height="0.75rem";

    }
    if (click>=(text_num*2)+4){
        text[text_num+3].style.display="inline-block";text[text_num+2].style.display="inline-block";
        line_left[plus3].style.height="1.55rem";
        line_left[plus2].style.height="0.75rem";

    }



}



//控制每一天的菜单折叠
function fold(){
    var target=event.target;
    var nextSibling =target.nextSibling;
    if( nextSibling.style.display==""){
        nextSibling.style.display="inline-block";

    }
    else if(nextSibling.style.display=="inline-block"){
        nextSibling.style.display=""
    }
}

//将之前的天数及步骤设置为已经触发
var past = document.getElementsByClassName("step-btn");

for(var e=0;e<click+4;e++){
    console.log(click);
    past[e].style.background="#92B7A5";
    past[e].onclick=function(){
        confirm("请按照游戏步骤进行");
    }
}



//杀手请杀人
step_content[0].onclick = function(){
    btn1.event();
    if (btn1.state=="step1" && click==(day-1)*4){
        step_content[0].style.background="#92B7A5";
        window.location.href="js-task2-4-3.html";
        btn2.state="step1";
        click++;
        localStorage.click_=click;//存储步骤数
      var  state_1=btn2.state;//存储状态机的状态
        localStorage.state=state_1;

        return click;

    }else
    {
        confirm("请按照游戏步骤进行");
    }

    console.log(btn2.state);
};
//亡灵发表遗言
step_content[1].onclick = function(){
    var state_2=localStorage.state;//读取状态机的状态
    btn2.state = state_2;
    btn2.event();
    console.log(btn2.state);
    if (btn2.state=="step2" && click==(day-1)*4+1){
        confirm("请亡灵发表遗言");
        step_content[1].style.background="#92B7A5";
        btn3.state="step2";
        click++;
    }
    else
    {
        confirm("请按照游戏步骤进行");
    }
};
//玩家依次发言
step_content[2].onclick = function(){
    btn3.event();
    console.log(btn3.state);
    if (btn3.state=="step3" && click==(day-1)*4+2){
        confirm("请玩家依次发言");
        step_content[2].style.background="#92B7A5";
        btn4.state="step3";
        click++;
    }
    else
    {
        confirm("请按照游戏步骤进行");
    }
};
//全民投票
step_content[3].onclick = function(){
    btn4.event();
    console.log(btn4.state);
    if (btn4.state=="step4"){
        step_content[3].style.background="#92B7A5";
        day++;
        click++;
        localStorage.day_=day;//存储天数
        localStorage.click_=click;//存储步骤数

        window.location.href="js-task2-4-4.html";
    }
    else
    {
        confirm("请按照游戏步骤进行");
    }
    return step;
};
//法官日志
function log(){
    window.location.href="js-task2-4-1.html"
}
//结束游戏
function again(){
    window.location.href="js-task2-4-5.html"
}
//进入下一天


