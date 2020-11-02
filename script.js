xmlhttp = new XMLHttpRequest();
var url = "https://sheets.googleapis.com/v4/spreadsheets/1hNQmlYJpCsNchvmCmjJxGCQIH_ItoA9hG8HsFEZLKhE/values:batchGet?dateTimeRenderOption=FORMATTED_STRING&majorDimension=DIMENSION_UNSPECIFIED&ranges=%E5%B7%A5%E4%BD%9C%E8%A1%A83!A%3AJ&valueRenderOption=FORMATTED_VALUE&key=AIzaSyCkGVQfrH7sqzjaKOR6Z1inbBFQSPE0j-k";
xmlhttp.open("GET", url, true);
xmlhttp.send();

function getNowFormatDate() {  //获取今天日期的8位数字
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year.toString() + month.toString() + strDate.toString();
    return currentdate;
}

function loadXMLDoc() {
    var tbody = document.getElementById("dataTable")  //获取当前页面的 Table
    tbody.innerHTML = '<tbody id="dataTable"><tr><th style="width: 2cm;">手机号</th><th style="width: 1cm;">登记时间</th><th style="width: 3cm;">客人姓名</th><th style="width: 3cm;">読み方</th><th style="width: 4cm;">住所</th><th style="width: 1.5cm;">担当者</th><th style="width: 2cm;">微信</th><th style="width: 2cm;">接听电话时间</th><th style="width: 2cm;">在留卡照片</th><th style="width: 3cm;">受付番号</th></tr></tbody>'
    //创建表头，不登录连表头都看不到
    var datas = JSON.parse(xmlhttp.responseText).valueRanges[0].values  //解析数据库资料
    console.log(datas);  //调试期间使用 
    //var tobody = document.getElementById("dataTable");  
    for (var i = 1; i < datas.length; i++) { //遍历请求的每行内容,
        var tr = document.createElement("tr");     //创建新的一行列表，但是还未插入页面
        var data = datas[datas.length-i];                       //获取单行内容   倒序！！！把最新提交的内容展示在最上方
        if (data[1].replaceAll(/\D/g,"").slice(0,8) == getNowFormatDate()){  //如果时今天的单子，那么全部给标成骚粉色字体
            tr.style = "color: hsl(340deg 60% 65%);"
        }
        for (var u = 0; u < data.length; u++) {            //遍历每行元素的每个单元格
            var th = document.createElement("th");      //创建新的单元格
            if (data[u].indexOf("https://") == -1 && data[u].indexOf("http://") == -1) {  //如果有空单元格内容不包含链接
                if(data[u]==""){          //若单元格为空
                    th.innerText="未填写"
                }else{
                th.innerText = data[u];  //如果不是空就正常表示
                }
                tr.appendChild(th);     //添加整行
            } else {                                                                       //如果单元格内容包含链接
                var a = document.createElement("a");            //插入Link
                a.href = data[u];                               //链接地址即为表格内容
                a.innerHTML = "点击查看证件";
                a.target = "_blank";
                th.appendChild(a);
                tr.appendChild(th)
            }
            tbody.appendChild(tr)                 //插入整行
        }

    }
}
let = users = ["张三","李四","王五","boss"];
let = pass = ["1234","3456","5678","8888"];
let username = document.getElementById("username");
let pw = document.getElementById("pw");
let submit = document.getElementById("subumit");
submit.addEventListener("onclick",loadXMLDoc())