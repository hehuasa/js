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
                this.state="step1"; break;
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

//控制每一天的菜单折叠
function fold(){
    fold_.event();
    var a =document.getElementById("step_");
    if(fold_.state=="step1"){
       a.style.display="none";
    }
    else {
        a.style.display="inline-block";
    }

}

//定义天数,取出存储的天数值
var day = localStorage.day_;
console.log(day);
if(day == undefined){
    day =1;
    var i = 1;

}
else {
    day = localStorage.day_;
    i = day
}
var sourceNode=document.getElementById("day_");
var clonedNode = sourceNode.cloneNode(true); // 克隆节点
clonedNode.setAttribute("id", "day_"+i ); // 修改一下id 值，避免id 重复

//杀手请杀人
function kill(){

    btn1.event();
    if (btn1.state=="step1"&& day==i ){
        document.getElementById("kill").style.background="yellow";
        window.open("js-task2-4-3.html");
        btn2.state="step1";
    }else
     {
        confirm("请按照游戏步骤进行");
    }
}
//亡灵发表遗言
function dead(){
    btn2.event();
    console.log(btn2.state);
    if (btn2.state=="step2"&& day==i ){
        document.getElementById("dead").style.background="yellow";
        btn3.state="step2";
    }
    else
    {
        confirm("请按照游戏步骤进行");
    }
}
//玩家依次发言
function talk(){
    btn3.event();
    console.log(btn3.state);
    if (btn3.state=="step3"&& day==i ){
        document.getElementById("talk").style.background="yellow";
        btn4.state="step3";
    }
    else
    {
        confirm("请按照游戏步骤进行");
    }
}
//全民投票
function vote(){
    btn4.event();
    console.log(btn4.state);
    if (btn4.state=="step4"&& day==i ){
        day++;
        document.getElementById("vote"+i).style.background="yellow";
        localStorage.day_=day;//存储天数
            sourceNode.parentNode.appendChild(clonedNode); // 在父节点插入克隆的节点
    }
    else
    {
        confirm("请按照游戏步骤进行");
    }
}
//法官日志
function log(){
   window.open("js-task2-4-1.html")
}
//结束游戏

//进入下一天


