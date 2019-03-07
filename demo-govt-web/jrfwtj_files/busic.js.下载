function operateFormatter(value, row, index) {
	     return ["<a href='javascript:void(0)' class='edit'>修改</a>" 
	             + "<a href='javascript:void(0)' class='delete'>删除</a>"].join('');
 }
function timeFormatter(value, row, index) {
	return new Date(value).pattern("yyyy-MM-dd");
}
function indexFormatter(value, row, index) {
	return index+1;
}
function rateFormatter(value, row, index) {
	var val = parseFloat(value).toFixed(2);
	return val+"%";
}
function moneyFormatter(value, row, index) {
	 return fmoney(value, 2);
}
//格式化金额
function fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}
//地区加载
function txtchange() {
    	var localName = $("#localName").val();
		var data = addr();
		var count = 0;
		$("#tbcontent").html(""); //删除原有数据
	      for (var i = 0; i < data.RfiisRegionList.length; i++) {
	    	  if(data.RfiisRegionList[i].fullName.indexOf(localName) != -1) {
	    		  var fullName = data.RfiisRegionList[i].fullName;//地区名
	    		  var level = data.RfiisRegionList[i].level;//等级
	    		  var regionId = data.RfiisRegionList[i].regionId;//地区id
	    		  $("#tbcontent").append('<div class="item area-c" onclick="mousedown(\''+fullName+'\',\''+level+'\',\''+regionId+'\')">' + fullName + '</div>');
	    		  count++;
	    	  }  
	    	  if(count == 100){
	    		  break;
	    	  }
	      }
	      $("#tbcontent").slideDown();
  }

//监听输入框   没有对弹出的值进行选择
function listenArea(obj){
	var data = addr();
	for (var i = 0; i < data.RfiisRegionList.length; i++) {
		//输入的值与json数据中相匹配
		if(data.RfiisRegionList[i].fullName == obj.value){
			//赋值所属等级
			document.getElementById("administrativeLevel").value = data.RfiisRegionList[i].level;
			//赋值所对应地区id
		    $("#regionId").val(data.RfiisRegionList[i].regionId);
		    break;
		}else{
			//对应等级清空
			document.getElementById("administrativeLevel").value = 0;
			//对应地区id清空
		    $("#regionId").val("");
		}
	}
}

  //选择其中的提示内容
  function mousedown(fullName,level,regionId) {
   document.getElementById("administrativeLevel").value = level;
   $("#localName").val(fullName);
   $("#regionId").val(regionId);
   $("#tbcontent").fadeOut();
  }
  //文档框失去焦点，隐藏提示内容
  function lost() {
	  $("#tbcontent").fadeOut();
  }