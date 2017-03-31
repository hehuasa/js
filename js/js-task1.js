/**
 * Created by Administrator on 2017/3/29.
 */
/*定义全局变量*/
var num = 0;
var step1;
var step2;

/*按钮1*/
function start() {


    if (num == 0) {
         num = 1;
        step1 = setInterval(shine, 1000);/*为3个随机方块染色设置时间，每一秒一次*/
        step2 = setInterval(back, 999);/*为3个随机方块回复本来颜色，每0.999秒一次*/


    }
    else  {
               num = 0;
            clearInterval(step1);/*清除染色与颜色回复事件*/
            clearInterval(step2);
            setTimeout(back,100);/*确保每个方块都为本来颜色*/


        }






}

/*按钮2*/
function stop(){
    clearInterval(step1);/*清除染色与颜色回复事件*/
    clearInterval(step2);
    setTimeout(back,100);/*确保每个方块都为本来颜色*/
}



function shine() {
            /*获取格子dom*/
            var el = document.querySelectorAll(".rule1");
            /*获取三个随机格子*/
            var a=Math.floor(Math.random() * el.length);
            for(var b=0,c=0;a == b || b == c || a == c;){
                var b=Math.floor(Math.random() * el.length);
                var c=Math.floor(Math.random() * el.length);
            }
            /*获取随机颜色*/
            var color_1 = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
            for(var color_2=0,color_3=0;color_1 == color_2 || color_1 == color_3 || color_2 == color_3;)
            var color_2 = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
            var color_3 = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
            /*为随机格子添加背景色*/
            el[a].style.background = color_1;
            el[b].style.background = color_2;
            el[c].style.background = color_3;
            /*清除颜色渲染*/
        }

function back (){
    var el = document.querySelectorAll(".rule1");
    /*获取三个随机格子*/
    var d=Math.floor(Math.random() * 9);
    for(var d=0;d<9;d++){
        el[d].style.background= "#e78326";
    }/*为3个随机方块回复本来颜色*/

}







