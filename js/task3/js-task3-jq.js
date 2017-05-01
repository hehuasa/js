/**
 * Created by Administrator on 2017/4/14.
 */


$(document).ready(function() {
    $("#btn").click(function(){


        $.post(
            "http://119.10.57.69:880/carrots-admin-ajax/a/login",
            { name:  $("#id_").val() , pwd:  $("#password_").val()},
           function(data){
               var obj =JSON.parse(data);
               if (obj.message=="success"){
                   window.location="http://www.jnshu.com"
               }
               else {
                   $("#response_").html(obj.message)
               }

           }

        );


    }
    )
}
)