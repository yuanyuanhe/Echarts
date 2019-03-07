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

// 调用方法
var regionId;
$(function () {

	regionId=GetQueryString("regionId");
	if(regionId!=null && regionId !=''){
		$("#areaId").val(regionId);
	}

	var myDate = new Date();
	var year=myDate.getFullYear(); //获取当前年份(2位)
	var month=myDate.getMonth(); //获取当前月份(0-11,0代表1月)
	var str="全部";
	var ss="全部";
	for(var a=year;a>year-4;a--){
		if (a == year) {
			ss += "<option value='" + a + "' selected='selected'>" + a + "</option>";
		}else{
			ss += "<option value='" + a + "'>" + a + "</option>";
		}
	}
	for(var i=1;i<=12;i++) {
		var j;
		if(i<10){
			j="0"+i;
		}else{
			j=i;
		}
		if (i == month) {
			str += "<option value='" + j + "' selected='selected'>" + i + "月份</option>";
		}else{
			str += "<option value='" + j + "'>" + i + "月份</option>";
		}
	}
	$("#year").html(ss);
	$("#month").html(str);
	
	
	var date=GetQueryString("date");
	if(date!=null && date !=''){
		var arr=date.split("-");
		//console.log("22222arr",arr[0]);
		$("#year").val(arr[0]);
		$("#month").val(arr[1]);
		//$("#date").val(date);
	}
	
	var oTable = new TableInit();
	oTable.Init();
});

var TableInit = function() {
	var queryParams = function (params) {
		var data = getCriteria();
		var param = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			limit: params.limit, //页面大小
			offset: params.offset, //页码
			data: data  //查询条件
		};
		return param;
	};
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
		$('#regulation_list').bootstrapTable({
			//data : json,
			url:'riskCompanyDetail',
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
			columns : [ {
				width: '40%',
				valign: 'top',
				formatter: function (value, row, index) {

					return '<div class="company-name">公司名称:'+row.companyName+'</div>'
						+ '<div class="company-cont">'
						+ '<p><span class="t_title">法定代表人：</span>'+row.legalName+'</p>'
						+ '<p><span class="t_title">地址：</span>'+row.address+'</p>'
						+ '<p><span class="t_title">贷款余额情况：</span>正常贷款'+row.normalLoan+'万元、关注贷款'
						+row.concernLoan+'万元、次级贷款'+row.secondLoan+'万元、可疑贷款'+
						row.questionLoan+'万元、损失贷款'+row.lossLoan+'万元</p>'
						+ '<p><span class="t_title">不良贷款率：</span>'+row.loanRate+'%</p>'
						+ '<p>贷款损失一般准备金额余额='+row.readyLoan+'万元</p>'
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
							+ '<p><span class="t_title">注册时间：</span>'+ date +'</p>'
							+ '</div>';
					}else {
						return '<div class="company-name">&nbsp;</div>'
							+ '<div class="company-cont">'
							+ '<p><span class="t_title">注册资本：</span>'+row.capital+'万人民币</p>'
							+ '<p><span class="t_title">注册时间：</span>'+row.registerDate+'</p>'
							+ '</div>';
					}
				}
			} ],
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
	return oTableInit;

};
function getCriteria() {

	var vo ={};
	/*var year= $("#year option:selected").val();
	var month=$("#month option:selected").val();*/

	vo.regionId=$("#areaId option:selected").val();
	vo.year = $("#year option:selected").val();
	vo.month = $("#month option:selected").val();
	
	var ss=$("input[name='index1']:checked").val();
	if(ss==1){
		vo.startAmount=0;
		vo.endAmount=100;
	}else if(ss==2){
		vo.startAmount=100;
		vo.endAmount=500;
	}else {
		vo.startAmount=$("#text1").val();
		vo.endAmount=$("#text2").val();
	}
	vo.type=$("input[name='index2']:checked").val();
	//console.log("111vo:",vo);
	return vo;
}
function selectMEthod() {
	$('#regulation_list').bootstrapTable('destroy');
	var oTable = new TableInit();
	oTable.Init();
}