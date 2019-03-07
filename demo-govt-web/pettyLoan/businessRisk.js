/**
 * 业务分析JS逻辑处理
 *
 */
$(function () {
	// 菜单
	slideMenu('LJRJG', 'LJRJG_XEDK');

    // 设置一屏展示的高度
    var h = document.documentElement.clientHeight - 50 - 40 - 45;
    var alert = $(".alert").parent().outerHeight();
    var nav = $(".nav-tabs").outerHeight();
    var sign = $(".sign-left").outerHeight()+42;
    var list = $(".loan_list").outerHeight()+10;

    $("#bar_charts").height(h-alert-nav-sign-list-94);
    $("#business_list").height(h-alert-nav-sign-list-42);
    
	$("#tab_1 .sign-left span:eq(0)").addClass("active");
	
	
    var myDate = new Date();
    var year=myDate.getFullYear(); //获取当前年份(2位)
    var month=myDate.getMonth(); //获取当前月份(0-11,0代表1月)
  /*  $("#date1").html(year+"/"+parseInt(month-2));
    $("#date2").html(year+"/"+parseInt(month-1));
    $("#date3").html(year+"/"+parseInt(month));*/
    var date;
    $(".sign-left span").click(function () {
        $(".sign-left span").removeClass("active");
        $(this).addClass("active");
        
        date = $(this).text().replace("/", "-");
        
        getData($(this).index(),date);
        refreshBarChart($(this).index(),date);
        $('#business_list').bootstrapTable('destroy');
        var oTable = new TableInit();
        oTable.Init();
    });

	$(".sign-left span").each(function () {
		if($(this).hasClass("active")){
			date = $(this).text().replace("/", "-");
		}
	})
	//console.log("333333333333",date);
    refreshBarChart($(".sign-left .active").index(),date);
    getData($(".sign-left .active").index(),date);
    var oTable = new TableInit();
    oTable.Init();
    
    $(".ahref").on('click',function(){
    	location.href=basePath+"service/businessRisk/toRiskCompany?date="+date
    });
    
});

var refreshBarChart = function(a,date) {
    var e = echarts.init(document.getElementById("bar_charts"));
    $('.tab-content').resize(function() {
        e.resize();
    });
    var xLabel;
    var bottom;
    var loss;
    var question;
    var second;
    var concern;
    var normal;
    var lossBalance;

   /* map.put("name",name);
    map.put("normal",normal);
    map.put("concern",concern);
    map.put("second",second);
    map.put("question",question);
    map.put("loss",loss);
    map.put("bottom",arr);*/
    // 同步执行
    $.ajaxSettings.async = false;
    var path=$("#path").val();
    var choose=$("#selectOption option:selected").val();
    // 加载数据
    $.post(path+'service/businessRisk/topNumData', { type:a,choose:2,date:date },
        function(json){
            xLabel=json.name;
            bottom=json.bottom;
            loss=json.loss;
            question=json.question;
            second=json.second;
            concern=json.concern;
            normal=json.normal;
            lossBalance = json.lossBalance;
        },"json");
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            left: '40',
            bottom: '0',
            data:bottom,
            textStyle: {
                color: '#3d3d3d'
            }
        },
        grid: {
            top: '40',
            left: '30',
            right: '30',
            bottom: '35',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data :xLabel,
                axisPointer: {
                    type: 'shadow'
                },
                axisLine:{
                    lineStyle:{
                        color:'#a4a4a4'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '单位：万元',
                splitLine: {show: true},
                axisLine:{
                    lineStyle:{
                        color:'#a4a4a4'
                    }
                }
            }
        ],
        series: [
            {
                name:'正常贷款',
                type: 'bar',
                data: normal,
                itemStyle: {
                    normal: {
                        color: '#003B73'
                    }
                }
            },
            {
                name:'关注贷款',
                type: 'bar',
                data: concern,
                itemStyle: {
                    normal: {
                        color: '#006797'
                    }
                }
            },
            {
                name:'次级贷款',
                type: 'bar',
                data: second,
                itemStyle: {
                    normal: {
                        color: '#4AABCC'
                    }
                }
            },
            {
                name:'可疑贷款',
                type: 'bar',
                data:question,
                itemStyle: {
                    normal: {
                        color: '#91DBF4'
                    }
                }
            },
            {
                name:'损失贷款',
                type: 'bar',
                data: loss,
                itemStyle: {
                    normal: {
                        color: '#C8323D'
                    }
                }
            },
            {
                name:'贷款损失一般准备金余额',
                type:'line',
                data: lossBalance,
                itemStyle: {
                    normal: {
                        color: '#4EA9F9'
                    }
                }
            }

        ]
    };
    e.setOption(option);
};
var TableInit = function() {
    var oTableInit = new Object();
    // 初始化Table
    oTableInit.Init = function() {
        $('#business_list').bootstrapTable({
            url: "differentPalace",
            method : 'post', // 请求方式（*）
            pagination : false, // 是否显示分页（*）
            queryParams: queryParams, // 传递参数
            dataType: "json", // 期待返回数据类型
            method: "post",// 请求方式
            sidePagination: "server",
            sortable: false,      //是否启用排序
            cache: false,
            striped: true, // 是否显示行间隔色
            columns : [ {
                field : 'localName',
                title : '县区名称',
                width: '40%',
                valign: 'middle',
                class:'text-center'
            }, {
                field : 'amount',
                title : '不良贷款总额',
                width: '40%',
                valign: 'middle',
                class : 'text-center',
                formatter: function (value, row, index) {
                	var date=$(".sign-left .active").text().replace("/", "-");
                	
                    if(row.amount==null){
                        return '<a href="toRiskCompany?regionId='+row.regionId+'&date='+date+'">'+0.00+' 万元</a>';
                    }else{ return '<a href="toRiskCompany?regionId='+row.regionId+'&date='+date+'">'+row.amount+'万元</a>';
                    }

                }
            } ],
            onLoadSuccess:function(DATA){
                console.log(DATA);
            }
        });
    };
    var queryParams = function (params) {
        var data = getCriteria();
        var param = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit, //页面大小
            offset: params.offset, //页码
            data: data  //查询条件
          
        };
        return param;
    };
    return oTableInit;
};
function getCriteria() {
    var vo ={};
    var index=$(".sign-left .active").index();
    var date = $(".sign-left .active").text().replace("/", "-");
    vo.type=index;
    vo.capital=date;
    // console.log("=====",date);
    /*vo.year = $("#year option:selected").val();
    vo.month = $("#month option:selected").val();
    vo.regionId=$("#regionId option:selected").val();
    vo.type=$("input[name='index1']:checked").val();*/
   // console.log(vo);
    return vo;
}
function getData(what,date) {
    // 同步执行
    $.ajaxSettings.async = false;
    var path=$("#path").val();
    // 加载数据
    $.post(path+'/service/businessRisk/topNumData', { type:what,choose:1,date:date },
        function(json){
            //localName, amount, REGION_ID  normalLoan, concernLoan, badLoan, questionLoan, lossLoan, companyNum
            $("#loan1").html(json.vo.normalLoan+"万元");/**大于60%*/
            $("#loan3").html(json.vo.concernLoan+"万元");/*>5*/
            $("#loan2").html(json.vo.badLoan+"万元");/*50-60*/
            $("#loan4").html(json.vo.questionLoan+"万元");/*3-5*/
            $("#loan5").html(json.vo.lossLoan+"万元");/*0-50*/
            $("#comNum").html(json.vo.companyNum);
        },"json");
}