/**
 * Created by Administrator on 2017/4/24.
 */



    var file_input=document.getElementById("file_");
    file_input.onchange=function(){
        var file_list=file_input.files;// 存储上传文件信息的数组
        console.log(file_list);
        var reader = new FileReader();
        var file=this.files[0];
        for(var i=0;i<this.files.length;i++ ){
            reader.readAsDataURL(file)
        }
        reader.onload = function(e){
            document.getElementById("file_img").src=e.target.result;
        }

    };

var tbody=$("body").append("<tbody><tr><td ng-repeat='x in file_list track by $index'>{{x.name}}</td>" +
    "<td ng-repeat='x in file_list track by $index'>{{x.size + 'kb'}}</td>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "</tr></tbody>");
$("#table_tittle").after(tbody)

function append(){
    $("#table_tittle").after("<tbody><tr><td ng-repeat='x in file_list track by $index'>{{x.name}}</td>" +
        "<td ng-repeat='x in file_list track by $index'>{{x.size + 'kb'}}</td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "</tr></tbody>");
}