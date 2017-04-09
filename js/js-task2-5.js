/**
 * Created by Administrator on 2017/4/6.
 */
var l = 0 ;
function switches(){
var menu = {
    state:"run",
    initialize:function(){

        switch (this.state){
            case "stop":
                this.state="run"; l++;break;
            case "run":
                this.state="stop";  l++;break;
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
function kill(){
    btn1.event();
    if (btn1.state=="stop" && l ==1 ){
        document.getElementById("kill").style.background="yellow";
    }else
     {
        confirm("请按照游戏步骤进行");
         l--;
         console.log(l)
    }
}
function dead(){
    btn2.event();
    if (btn2.state=="stop"&& l ==2 ){
        document.getElementById("dead").style.background="yellow"
    }
    else
    {
        confirm("请按照游戏步骤进行");
        l--;
    }
}
function talk(){
    btn3.event();
    if (btn3.state=="stop"&& l ==3 ){
        document.getElementById("talk").style.background="yellow"
    }
    else
    {
        confirm("请按照游戏步骤进行");
        l--;
    }
}
function vote(){
    btn4.event();
    if (btn4.state=="stop"&& l ==4 ){
        document.getElementById("vote").style.background="yellow"
    }
    else
    {
        confirm("请按照游戏步骤进行");
        l--;
    }
}