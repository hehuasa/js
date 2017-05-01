/**
 * Created by Administrator on 2017/4/17.
 */
var a=0;
window.onload=function(){
    document.getElementById("btn").onclick=function(){
    if (a==0){
        document.getElementById("ul_").style.display="block";
        a=1;
    }
    else {
        document.getElementById("ul_").style.display="none";
        a=0;
    }
}
};