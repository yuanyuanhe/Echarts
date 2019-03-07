/**
 * 业务分析JS逻辑处理
 *
 */
function GetQueryString(name)
{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}
$(function () {
	var date=GetQueryString("date");
	var type1=GetQueryString("type1");
	var type2=GetQueryString("type2");
	var arr=date.split("-");

	var myDate = new Date();
	var year=myDate.getFullYear(); //获取当前年份(2位)
	var month=myDate.getMonth(); //获取当前月份(0-11,0代表1月)
	var str="";
	var ss="";
	for(var a=year;a>year-4;a--){
	/*	if (a == year) {
			ss += "<option value='" + a + "' selected='selected'>" + a + "</option>";
		}else{*/
			ss += "<option value='" + a + "'>" + a + "</option>";
		
	}
	for(var i=1;i<=12;i++) {
		var j;
		if(i<10){
			j="0"+i;
		}else{
			j=i;
		}
		/*if (i == month) {
			str += "<option value='" + i + "' selected='selected'>" + i + "月份</option>";
		}else{*/
			str += "<option value='" + j + "'>" + i + "月份</option>";
		//}
	}
	$("#year").html(ss);
	$("#month").html(str);
	$("#year").val(arr[0]);
	$("#month").val(arr[1]);
	if(type1!=0){
		$("input:radio[name='index1']").eq(type1).attr("checked",'checked');
		//$("input[name='index1']:checked").val(type1);
	}
	if(type2!=0) {
		$("input:radio[name='index2']").eq(type2).attr("checked",'checked');
		//$("input[name='index2']:checked").val(type2);
	}
	TableInit();

});

function TableInit() {
	var oTableInit = new Object();
	var queryParams = function (params) {
		var data = getCriteria();
		var param = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit: params.limit, //页面大小
			offset: params.offset, //页码
			data: data  //查询条件
		};
		return param;
	};
	var colModelValue=[ {
		width: '40%',
		valign: 'top',
		formatter: function (value, row, index) {
			console.log("===row====",row.legalName);
			return '<div class="company-name">'+row.companyName+'</div>'
				+ '<div class="company-cont">'+'<input type="hidden" name="chechvadio" value="'+row.type+'">'
				+ '<p><span class="t_title">法定代表人：</span>'+row.legalName+'</p>'
				+ '<p><span class="t_title">地址：</span>'+row.address+'</p>'
				+ '<p><span class="t_title">本月单户贷款余额不超过200万元的占比：</span>'+row.loanRate+'%</p>'
				+ '<p><span class="t_title">本月最高单户贷款余额超过注册资本比例：</span>'+row.capitalRate+'%</p>'
				+ '</div>';
		}
	}, {
		width: '30%',
		valign: 'top',
		formatter: function (value, row, index) {
			if(row.registerDate){
				var date = new Date(row.registerDate).pattern("yyyy-MM-dd HH:mm:ss");
				return '<div class="company-name">&nbsp;</div>'
					+ '<div class="company-cont">'
					+ '<p><span class="t_title">注册资本：</span>'+row.capital+'万人民币</p>'
					/*+ '<p><span class="t_title">注册时间：</span>'+ date +'</p>'*/
					+ '</div>';
			}else {
				return '<div class="company-name">&nbsp;</div>'
					+ '<div class="company-cont">'
					+ '<p><span class="t_title">注册资本：</span>'+row.capital+'万人民币</p>'
				/*	+ '<p><span class="t_title">注册时间：</span>'+row.registerDate+'</p>'*/
					+ '</div>';
			}
		}
	} ];
	// 初始化Table
		$('#regulation_list').bootstrapTable({
			//data : json,
			url:'companyDetail',
			queryParams: queryParams, // 传递参数
			dataType: "json", // 期待返回数据类型
			method: "post",// 请求方式
			sidePagination: "server",
			sortable: false,      //是否启用排序
			cache: false,
			striped: true, // 是否显示行间隔色
			pagination: true, // 是否显示分页
			pageNumber: 1, // 初始化加载第一页，默认第一页
			pageSize:10, // 每页的记录行数
			pageList: [10,20, 30,40,50], // 可供选择的每页的行数
			columns :colModelValue,
			onLoadSuccess : function(data) {
				//alertErr(data.rows.length);
				if (data.rows.length!=null && data.rows.length!=0){
					$("#countNum").html(data.rows.length);
				}else{
					$("#countNum").html(0);
				}
			}
		});




};
function getCriteria() {
	var vo ={};
	var year= $("#year option:selected").val();
	var month=$("#month option:selected").val();
	console.log("2222",year);
	var myDate = new Date();
	if(year==null || year ==""){
		year=myDate.getFullYear(); //获取当前年份(2位)
		var month=myDate.getMonth(); //获取当前月份(0-11,0代表1月)
	}
	if(month==null || month ==""){
		month=myDate.getMonth(); //获取当前月份(0-11,0代表1月)
	}
	vo.year = year;
	vo.month = month;
	vo.areaId=$("#areaId option:selected").val();
	var type1=$("input[name='index1']:checked").val();
	var type2=$("input[name='index2']:checked").val();
	console.log("===",type1);
	if (type1==1){
		vo.startRate=60
	}else if(type1==2){
		vo.startRate=50
		vo.endRate=60;
	}else if(type1==3){
		vo.endRate=50;
	}else{
		vo.endRate=0;
	}
	if (type2==1){
		vo.startAmount=5
	}else if(type2==2){
		vo.startAmount=3
		vo.endAmount=5;
	}else if(type2==3){
		vo.endAmount=3;
	}else{
		vo.endAmount=0;
	}
	console.log(vo);
	return vo;
}
function selectMEthod() {
	$('#regulation_list').bootstrapTable('destroy');
	TableInit();
}