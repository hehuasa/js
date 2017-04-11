


var farmer_survivor = localStorage.farmer_survivor;//取出存储的各角色生存人数
var killer_survivor = localStorage.killer_survivor;


var result=document.getElementById("result_");
result.innerText=" 杀手   "+killer_survivor+"  人"+"                "+"平民   "+farmer_survivor+"  人";

var day = localStorage.day_; //取出存储的天数值


//提前复制下一天的数据（初始值）。
var sourceNode_detail_=document.getElementById("detail_");
var sourceNode_night=document.getElementById("night");
var sourceNode_light=document.getElementById("light");

// 动态控制每天的游戏内容显示
for (var i =1;i<=day;i++){
    console.log(day);

    var clonedNode_detail_ = sourceNode_detail_.cloneNode(true); // 克隆节点
    var clonedNode_night = sourceNode_night.cloneNode(true);
    var clonedNode_light = sourceNode_light.cloneNode(true);

    sourceNode_detail_.parentNode.appendChild((clonedNode_detail_));// 在父节点插入克隆的节点
    sourceNode_night.parentNode.appendChild((clonedNode_night));
    sourceNode_light.parentNode.appendChild((clonedNode_light));

    var daxie = new Array("一","二","三","四","五","六","七","八","九","十");//修改天数显示
    clonedNode_detail_.innerText="第"+daxie[i-1]+"天";


    clonedNode_detail_.setAttribute("id","detail_"+i);//修改被复制元素的id，以避免重复
    clonedNode_night.setAttribute("id","night"+i);
    clonedNode_light.setAttribute("id","light"+i);
}

//详细游戏信息显示


var  deadnum_=localStorage.deadnum_;//取出存储的死亡玩家序号、身份数组
var  deadman_=localStorage.deadman_;
var deadnum=deadnum_.split("|");
var deadman=deadman_.split("|");

var detail=document.getElementsByClassName("detail");
var night=document.getElementsByClassName("detail-text1");
var light=document.getElementsByClassName("detail-text2");
console.log(deadman);

var num;
for ( num=0;num<day;num=num+2){
    console.log(num);
    console.log(day);
    var num_1=num+1;//页面原始的文档的块设置为不显示了，所以从第二个块开始
    night[num_1].innerText="黑夜:"+deadnum[num]+"号玩家被杀死了，真实身份是"+deadman[num];
    light[num_1].innerText="白天:"+deadnum[num+1]+"号玩家全民投票投死，真实身份是"+deadman[num+1];

    detail[num_1].style.display="inline-block";
    night[num_1].style.display="inline-block";
    light[num_1].style.display="inline-block";
    }

function again(){
    window.open("js-task2-2.html")
}