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

    $("#pie_charts").height(h-alert-nav-sign-list-102);
    $("#bar_charts").height(h-alert-nav-sign-list-17);
    
	$("#tab_1 .sign-left span:eq(0)").addClass("active");

    var myDate = new Date();
    var year=myDate.getFullYear(); //获取当前年份(2位)
    var month=myDate.getMonth(); //获取当前月份(0-11,0代表1月)
    var date;
    $(".sign-left span").click(function () {
        $(".sign-left span").removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        console.log(index+"***");
        date = $(this).text().replace("/", "-");
        console.log("222222",date);
        getData(index,1,date);
        refreshChart(index,date);
        refreshBarChart(index,date);

    });
	$(".sign-left span").each(function () {
		if($(this).hasClass("active")){
			date = $(this).text().replace("/", "-");
		}
	})
	console.log("1111",date);
	  getData(2,1,date);
	refreshChart(2,date);
    refreshBarChart(2,date);
});
$("#selectOption").change(function(){
    var index=$(".sign-left .active").index();
    var date = $(".sign-left .active").text().replace("/", "-");
        refreshChart(index,date);
        refreshBarChart(index,date);

});
var refreshChart = function (a,date) {
	var e = echarts.init(document.getElementById("pie_charts"));
	e.showLoading({
		text: '加载中...',
		effect: 'whirling'
	});
    var xLabel;
    var value;
    // 同步执行
    $.ajaxSettings.async = false;
    var path=$("#path").val();
    var choose=$("#selectOption option:selected").val();
    // 加载数据
    $.post(path+'service/smallLoanWarn/chartData', { type:a,choose:choose,style:1,date:date},
        function(json){
            xLabel=json.name;
            value=json.data;
            console.log(xLabel+"****-----"+value+'////');
        },"json");
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			bottom: 10,
			left: 'center',
			data:xLabel
		},
		color: ['#FEB79B', '#FDA380', '#6FC4FD', '#4CA6FC'],
		series: [
			{
				name:'企业分析',
				type:'pie',
				radius: ['50%', '70%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						position: 'inner'
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data:value
			}
		]
	};

	e.hideLoading();
	e.setOption(option), $(window).resize(e.resize);
};

var refreshBarChart = function(a,date) {
    var e = echarts.init(document.getElementById("bar_charts"));
    $('.tab-content').resize(function() {
        e.resize();
    });
    var xLabel;
    var value;
    var title;
    // 同步执行
    $.ajaxSettings.async = false;
    var path=$("#path").val();
    var choose=$("#selectOption option:selected").val();

    // 加载数据
    $.post(path+'service/smallLoanWarn/chartData', { type:a,choose:choose,style:2 ,date:date},
        function(json){
            xLabel=json.name;
            value=json.data;
            title=json.title;
            console.log(xLabel+"****-----");
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
            right: '30',
            bottom: '0',
            data:[title],
            textStyle: {
                color: '#3d3d3d'
            }
        },
        grid: {
            top: '50',
            left: '40',
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
                name: '企业数量（家）',
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
                name:title,
                type: 'bar',
                data: value,
                barGap: '10%',
                barMaxWidth: '30px',//固定柱子宽度
                itemStyle: {
                    normal: {
                        color: '#4CA6FC'
                    }
                }
            }
        ]
    };
    e.setOption(option);
};
function getData(type,choose,date) {
    // 同步执行
    $.ajaxSettings.async = false;
    var path=$("#path").val();
    // 加载数据
    $.post(path+'service/smallLoanWarn/jsonData', { type:type,choose:choose ,date:date},
        function(json){
            if(json.vo!=null) {
               /* $("#one").html(json.vo.sixtyPercent + "家企业");
                $("#two").html(json.vo.fivePercent+"家企业");/!*>5*!/
                $("#three").html(json.vo.fivtyPercent+"家企业");/!*50-60*!/
                $("#four").html(json.vo.threePercent+"家企业");/!*3-5*!/
                $("#five").html(json.vo.thirtyPercent+"家企业");/!*0-50*!/
                $("#six").html(json.vo.zeroPercent+"家企业");/!*0-3*!/*/
                $("#one").html('≥60%<a href="toDetail?date='+date+'&type1=1&type2=0">'+json.vo.sixtyPercent+'家企业</a>');
                $("#two").html('≥5%<a href="toDetail?date='+date+'&type1=0&type2=1">'+json.vo.fivePercent+'家企业</a>');
                $("#three").html('50%（含）~60%<a href="toDetail?date='+date+'&type1=2&type2=0">'+json.vo.fivtyPercent+'家企业</a>');
                $("#four").html('3%（含）~5%<a href="toDetail?date='+date+'&type1=0&type2=2">'+json.vo.threePercent+'家企业</a>');
                $("#five").html('＜50%<a href="toDetail?date='+date+'&type1=3&type2=0">'+json.vo.thirtyPercent+'家企业</a>');
                $("#six").html('＜3%<a href="toDetail?date='+date+'&type1=0&type2=3">'+json.vo.zeroPercent+'家企业</a>');
                $("#comNum").html(json.vo.companyNum);
                /**大于60%*/
            }else{
                $("#one").html('≥60%<a href="toDetail?date='+date+'&type1=1&type2=0">0家企业</a>');
                $("#two").html('≥5%<a href="toDetail?date='+date+'&type1=0&type2=1">0家企业</a>');
                $("#three").html('50%（含）~60%<a href="toDetail?date='+date+'&type1=2&type2=0">0家企业</a>');
                $("#four").html('3%（含）~5%<a href="toDetail?date='+date+'&type1=0&type2=2">0家企业</a>');
                $("#five").html('＜50%<a href="toDetail?date='+date+'&type1=3&type2=0">0家企业</a>');
                $("#six").html('＜3%<a href="toDetail?date='+date+'&type1=0&type2=3">0家企业</a>');
                $("#comNum").html(0);
            }

        },"json");
}
