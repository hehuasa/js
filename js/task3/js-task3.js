/**
 * Created by Administrator on 2017/4/13.
 */
//定义全局变量
var id;
var password;
var id_value;
var password_value;
var login_message;
var response;


document.getElementById("btn").onclick=function login(){

    //实时获取input的value
    id = document.getElementById("id_");
    password = document.getElementById("password_");
    id_value = id.value;
    password_value = password.value;


    //定义将要发送的账号及密码字符串
    login_message={
        "name":id_value,
        "pwd":password_value

    };
    //定义将要发送的账号及密码字符串
    response=document.getElementById("response_");


    //创建xhr对象
    var xhr;
    if (window.XMLHttpRequest){
        xhr=new XMLHttpRequest()
    }
    else{
        xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }

    //发送请求
    xhr.open("post","carrots-admin-ajax/a/login",true);
    xhr.send(login_message);

    //异步接受响应
    xhr.onreadystatechange=function(){
        if (xhr.readyState == 4){
            if (xhr.status == 200){
                response.innerText=xhr.responseText;
            }
        }
    };



}