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




//提前复制下一天的数据（初始值）。
var sourceNode_date_=document.getElementById("date_");
var sourceNode_step_=document.getElementById("step_");
var sourceNode_btn_=document.getElementById("fold_menu");



var i =1;
for (i =1;i<=day;i++){
console.log(i);

    var clonedNode_date_ = sourceNode_date_.cloneNode(true); // 克隆节点
    var clonedNode_step_ = sourceNode_step_.cloneNode(true); // 克隆节点

    sourceNode_date_.parentNode.appendChild((clonedNode_date_));// 在父节点插入克隆的节点

    var daxie = new Array("一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四");//修改天数显示
    clonedNode_date_.innerText="第"+daxie[i-1]+"天";

    sourceNode_step_.parentNode.appendChild(clonedNode_step_);
    clonedNode_date_.style.display="inline-block";
    clonedNode_step_.style.display="inline-block";




    console.log(i);
    clonedNode_date_.setAttribute("id","day_"+i);///修改被复制元素的id，以避免重复
    clonedNode_step_.setAttribute("id","step_"+i);

    var step=document.getElementById("step_"+i);
    var step_content=step.getElementsByClassName("step-btn");
    console.log(step);
console.log(step_content[0]);
}


//控制每一天的菜单折叠
var swich =0;
function fold(){
    var target=event.target;
    var nextSibling =target.nextSibling;

    if(swich ==0){
        nextSibling.style.display="none";
        swich =1;
    }
    else {
        nextSibling.style.display="inline-block";
        swich =0;
    }
}

//将之前的天数及步骤设置为已经触发
var past = document.getElementsByClassName("step-btn");
var clicks = click+4;
console.log( clicks);
for(var e=0;e<click+8;e++){
    console.log(click);
    past[e].style.background="#92B7A5";
    past[e].onclick=function(){
        confirm("请按照游戏步骤进行");
    }
}



//杀手请杀人
step_content[0].onclick = function(){
    btn1.event();
    console.log(btn1.state);

    if (btn1.state=="step1" && click==(day-2)*4){
        step_content[0].style.background="#92B7A5";
        window.open("js-task2-4-3.html");
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

    if (btn2.state=="step2"){
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
    if (btn3.state=="step3"){
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
        window.open("js-task2-4-4.html");
    }
    else
    {
        confirm("请按照游戏步骤进行");
    }
    return step;
};
//法官日志
function log(){
   window.open("js-task2-4-1.html")
}
//结束游戏

//进入下一天


