$(function(){
	// 左边菜单样式控制
	slideMenu('LJRJGFX','LJRJGFX_XEDK');

	var h = document.documentElement.clientHeight;
    setClientHeight(h-50);

    // 全屏
    $('.head').on('click', '.enter_fullscreen', function(){
        setClientHeight(h);
    });
    // 退出全屏
    $('.right').on('click', '.quit_fullscreen', function(){
        setClientHeight(h-50);
    });
});

function setClientHeight(h) {
    if (h > 900) {
        var h = h - 50;
        var ih = $("#module1").outerHeight()+10;
        $("#echart_1").height((h-ih)/2-32-20);
        $("#echart_3,#echart_13").height((h-ih)/2-45-20);
        $("#polar_echart").height(h-ih-45-30);
    }
}

$(function () {
	refreshChart(0);
	refreshChart3();
	refreshChart13();
	refreshPolarChart();
	refreshRoseChart();

	// 自动切换投资金额、投资笔数
	setInterval(changeChart, 3500);

	$(".head-nav li").click(function() {
		var i = $(this).index();
		index = i;
		$(".head-nav li").removeClass("active");
		$(".head-nav li").eq(i).addClass("active");
		refreshChart(i);
	});
});

var index = 0;
function changeChart() {
	$(".head-nav li").removeClass("active");
	$(".head-nav li").eq(index).addClass("active");
	var len = $(".head-nav li").length;
	refreshChart(index);
	index++;
	if (index == len) {
		index = 0;
	}
}

var refreshChart = function(n) {
	var e = echarts.init(document.getElementById("echart_1"));
	$('.nav_content').resize(function() {
		e.resize();
	});

	// 同步执行
	$.ajaxSettings.async = false;
	var path = $("#path").val();

	if (n == 0) {
		var xLabel = [];
		var values = [];
		var percent=[];
		var typeName=[];

		// 加载数据
		$.post(path+'service/smallLoan/smallLoanData', { type: 2},
			function(json){
				xLabel = json.xLabel;
				values = json.yData;
				percent=json.percent;
				typeName=json.name;
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
				top: '10',
				right: '10',
				data:typeName,
				textStyle: {
					color: '#fff'
				}
			},
			grid: {
				top: '60',
				left: '20',
				right: '20',
				bottom: '25',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: xLabel,
					axisPointer: {
						type: 'shadow'
					},
					axisLabel: {
						color: '#fff'
					},
					axisLine:{
						lineStyle:{
							color:'#72849d'
						}
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					name: '单位：笔',
					/*min: 0,
					 max: 20,*/
					nameTextStyle: {
						color: '#fff'
					},
					axisLabel: {
						color: '#fff'
					},
					axisLine:{
						show: false
					},
					splitLine: {
						show: true,
						lineStyle:{
							color:'#72849d'
						}
					}
				},
				{
					type: 'value',
					nameTextStyle: {
						color: '#fff'
					},
					splitLine: {
						show: false
					},
					axisLabel: {
						color: '#fff',
						formatter: '{value}%'
					},
					axisLine:{
						show: false
					}
				}
			],
			series: [
				{
					name:'贷款笔数',
					type: 'bar',
					data:values,
					barWidth: '25px',
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#ff6b6b'
							}, {
								offset: 1,
								color: '#ff9270'
							}])
						}
					},
					label: {
						normal: {
							show: true,
							position: 'top',
							formatter: "{c}",
							color: '#fff'
						}
					}
				},
				{
					name:'贷款笔数环比',
					type:'line',
					yAxisIndex: 1,
					data:percent,
					itemStyle : {
						normal : {
							color:'#ff6c6b',
							lineStyle:{
								color:'#ff8f8e',
								type: 'dashed'
							}
						}
					}
				}
			]
		};
		e.setOption(option);
	}
	else if (n == 1) {
		var categories = [];
		var values = [];
		var percent=[];
		var typeName=[];

		// 加载数据
		$.post(path+'service/smallLoan/smallLoanData', { type: 1},
			function(json){
				categories = json.xLabel;
				values = json.yData;
				percent=json.percent;
				typeName=json.name;
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
				top: '10',
				right: '10',
				data:typeName,
				textStyle: {
					color: '#fff'
				}
			},
			grid: {
				top: '60',
				left: '20',
				right: '20',
				bottom: '25',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data:categories/*['2012年','2013年','2014年','2015年','2016年','2017年']*/,
					axisPointer: {
						type: 'shadow'
					},
					axisLabel: {
						color: '#fff'
					},
					axisLine:{
						lineStyle:{
							color:'#72849d'
						}
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					name: '单位：万元',
					nameTextStyle: {
						color: '#fff'
					},
					axisLabel: {
						color: '#fff'
					},
					axisLine:{
						show: false
					},
					splitLine: {
						show: true,
						lineStyle:{
							color:'#72849d'
						}
					}
				},
				{
					type: 'value',
					nameTextStyle: {
						color: '#fff'
					},
					splitLine: {
						show: false
					},
					axisLabel: {
						color: '#fff',
						formatter: '{value}%'
					},
					axisLine:{
						show: false
					}
				}
			],
			series: [
				{
					name:'贷款金额',
					type: 'bar',
					data:values,
					barWidth: '25px',
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#34a7e8'
							}, {
								offset: 1,
								color: '#58ffff'
							}])
						}
					}
				},
				{
					name:'贷款金额环比',
					type:'line',
					yAxisIndex: 1,
					data:percent,
					itemStyle : {
						normal : {
							color:'#35a9e9',
							lineStyle:{
								color:'#abe1ff',
								type: 'dashed'
							}
						}
					}
				}
			]
		};
		e.setOption(option);
	}
	else if (n == 2) {
		var xLabel = [];
		var values = [];
		var percent=[];
		var typeName=[];

		// 加载数据
		$.post(path+'service/smallLoan/smallLoanData', { type: 5},
			function(json){
				xLabel = json.xLabel;
				values = json.yData;
				percent=json.percent;
				typeName=json.name;
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
				top: '10',
				right: '10',
				data:typeName,
				textStyle: {
					color: '#a4a4a4'
				}
			},
			grid: {
				top: '60',
				left: '20',
				right: '20',
				bottom: '25',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: xLabel,
					axisPointer: {
						type: 'shadow'
					},
					axisLabel: {
						color: '#fff'
					},
					axisLine:{
						lineStyle:{
							color:'#72849d'
						}
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					name: '单位：万元',
					/*min: 0,
					 max: 20,*/
					nameTextStyle: {
						color: '#fff'
					},
					axisLabel: {
						color: '#fff'
					},
					axisLine:{
						show: false
					},
					splitLine: {
						show: true,
						lineStyle:{
							color:'#72849d'
						}
					}
				},
				{
					type: 'value',
					nameTextStyle: {
						color: '#fff'
					},
					splitLine: {
						show: false
					},
					axisLabel: {
						color: '#fff',
						formatter: '{value}%'
					},
					axisLine:{
						show: false
					}
				}
			],
			series: [
				{
					name:'金额',
					type: 'bar',
					data:values,
					barWidth: '25px',
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#b89796'
							}, {
								offset: 1,
								color: '#0d73eb'
							}])
						}
					}
				},
				{
					name:'环比',
					type:'line',
					yAxisIndex: 1,
					data:percent,
					itemStyle : {
						normal : {
							color:'#ffa458',
							lineStyle:{
								color:'#ffbeaa',
								type: 'dashed'
							}
						}
					}
				}
			]
		};
		e.setOption(option);
	}
	else if (n == 3) {
		var xLabel = [];
		var values = [];
		var percent=[];
		var typeName=[];

		// 加载数据
		$.post(path+'service/smallLoan/smallLoanData', { type: 6},
			function(json){
				xLabel = json.xLabel;
				values = json.yData;
				percent=json.percent;
				typeName=json.name;
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
				top: '10',
				right: '10',
				data:typeName,
				textStyle: {
					color: '#a4a4a4'
				}
			},
			grid: {
				top: '60',
				left: '20',
				right: '20',
				bottom: '25',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: xLabel,
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
					/*min: 0,
					 max: 20,*/
					nameTextStyle: {
						color: '#fff'
					},
					axisLabel: {
						color: '#fff'
					},
					axisLine:{
						show: false
					},
					splitLine: {
						show: true,
						lineStyle:{
							color:'#72849d'
						}
					}
				},
				{
					type: 'value',
					nameTextStyle: {
						color: '#fff'
					},
					splitLine: {
						show: false
					},
					axisLabel: {
						color: '#fff',
						formatter: '{value}%'
					},
					axisLine:{
						show: false
					}
				}
			],
			series: [
				{
					name:'金额',
					type: 'bar',
					data:values,
					barWidth: '25px',
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#ff6b9b'
							}, {
								offset: 1,
								color: '#ED6F7A'
							}])
						}
					}
				},
				{
					name:'环比',
					type:'line',
					yAxisIndex: 1,
					data:percent,
					itemStyle : {
						normal : {
							color:'#ec8f6f',
							lineStyle:{
								color:'#ff6b6b',
								type: 'dashed'
							}
						}
					}
				}
			]
		};
		e.setOption(option);
	}
}

// 贷款金额及环比情况
var refreshChart1 = function () {
	var e = echarts.init(document.getElementById("echart_1"));
	e.showLoading({
		text: '加载中...',
		effect: 'whirling'
	});
	var categories = [];
	var values = [];
	var percent=[];
	var typeName=[];
	// 同步执行
	$.ajaxSettings.async = false;
var path=$("#path").val();
	// 加载数据
	$.post(path+'service/smallLoan/smallLoanData', { type: 1},
		function(json){
			categories = json.xLabel;
			values = json.yData;
			percent=json.percent;
			typeName=json.name;
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
			top: '10',
			right: '10',
			data:typeName,
			textStyle: {
				color: '#fff'
			}
		},
		grid: {
			top: '60',
			left: '20',
			right: '20',
			bottom: '25',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				data:categories/*['2012年','2013年','2014年','2015年','2016年','2017年']*/,
				axisPointer: {
					type: 'shadow'
				},
				axisLabel: {
					color: '#fff'
				},
				axisLine:{
					lineStyle:{
						color:'#72849d'
					}
				}
			}
		],
		yAxis: [
			{
				type: 'value',
				name: '单位：万元',
				nameTextStyle: {
					color: '#fff'
				},
				axisLabel: {
					color: '#fff'
				},
				axisLine:{
					show: false
				},
				splitLine: {
					show: true,
					lineStyle:{
						color:'#72849d'
					}
				}
			},
			{
				type: 'value',
				interval: 10,
				nameTextStyle: {
					color: '#fff'
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					color: '#fff',
					formatter: '{value}%'
				},
				axisLine:{
					show: false
				}
			}
		],
		series: [
			{
				name:'贷款金额',
				type: 'bar',
				data:values,
				barWidth: '25px',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#34a7e8'
						}, {
							offset: 1,
							color: '#58ffff'
						}])
					}
				}
			},
			{
				name:'贷款金额环比',
				type:'line',
				yAxisIndex: 1,
				data:percent,
				itemStyle : {
					normal : {
						color:'#35a9e9',
						lineStyle:{
							color:'#abe1ff',
							type: 'dashed'
						}
					}
				}
			}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	e.hideLoading();
	e.setOption(option), $(window).resize(e.resize);
};

// 贷款笔数及环比情况
var refreshChart2 = function () {
	var e = echarts.init(document.getElementById("echart_2"));
	e.showLoading({
		text: '加载中...',
		effect: 'whirling'
	});
	var xLabel = [];
	var values = [];
	var percent=[];
	var typeName=[];
	// 同步执行
	$.ajaxSettings.async = false;
	var path=$("#path").val();
	// 加载数据
	$.post(path+'service/smallLoan/smallLoanData', { type: 2},
		function(json){
			xLabel = json.xLabel;
			values = json.yData;
			percent=json.percent;
			typeName=json.name;
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
			top: '10',
			right: '10',
			data:typeName,
			textStyle: {
				color: '#fff'
			}
		},
		grid: {
			top: '60',
			left: '20',
			right: '20',
			bottom: '25',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				data: xLabel,
				axisPointer: {
					type: 'shadow'
				},
				axisLabel: {
					color: '#fff'
				},
				axisLine:{
					lineStyle:{
						color:'#72849d'
					}
				}
			}
		],
		yAxis: [
			{
				type: 'value',
				name: '单位：笔',
				/*min: 0,
				max: 20,*/
				nameTextStyle: {
					color: '#fff'
				},
				axisLabel: {
					color: '#fff'
				},
				axisLine:{
					show: false
				},
				splitLine: {
					show: true,
					lineStyle:{
						color:'#72849d'
					}
				}
			},
			{
				type: 'value',
				/*min: 0,
				max: 40,*/
				interval: 10,
				nameTextStyle: {
					color: '#fff'
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					color: '#fff',
					formatter: '{value}%'
				},
				axisLine:{
					show: false
				}
			}
		],
		series: [
			{
				name:'贷款笔数',
				type: 'bar',
				data:values,
				barWidth: '25px',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#ff6b6b'
						}, {
							offset: 1,
							color: '#ff9270'
						}])
					}
				}
			},
			{
				name:'贷款笔数环比',
				type:'line',
				yAxisIndex: 1,
				data:percent,
				itemStyle : {
					normal : {
						color:'#ff6c6b',
						lineStyle:{
							color:'#ff8f8e',
							type: 'dashed'
						}
					}
				}
			}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	e.hideLoading();
	e.setOption(option), $(window).resize(e.resize);
};

// 涉农、小微贷款金额
var refreshChart3 = function () {
	var e = echarts.init(document.getElementById("echart_3"));
	e.showLoading({
		text: '加载中...',
		effect: 'whirling'
	});
	var xLabel = [];
	var values = [];
	var smallLoan=[];
	var typeName=[];
	// 同步执行
	$.ajaxSettings.async = false;
	var path=$("#path").val();
	// 加载数据
	$.post(path+'service/smallLoan/smallLoanData', { type: 3},
		function(json){
			xLabel = json.xLabel;
			values = json.agrLoan;
			smallLoan=json.smallLoan;
			typeName=json.name;
		},"json");
	var option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#72849d'
				}
			}
		},
		legend: {
			itemWidth: 12,
			itemGap: 20,
			top: '5',
			right: '5',
			data:typeName,
			textStyle: {
				color: '#fff'
			}
		},
		grid: {
			top: '50',
			left: '20',
			right: '15',
			bottom: '5',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				data: xLabel,
				axisPointer: {
					type: 'shadow'
				},
				axisLabel: {
					color: '#fff'
				},
				axisLine:{
					lineStyle:{
						color:'#72849d'
					}
				}
			}
		],
		yAxis: [
			{
				type: 'value',
				name: '单位：万元',
				/*min: 0,
				max: 20,*/
				nameTextStyle: {
					color: '#fff'
				},
				axisLabel: {
					color: '#fff'
				},
				axisLine:{
					show: false
				},
				splitLine: {
					show: true,
					lineStyle:{
						color:'#72849d'
					}
				}
			}
		],
		series: [
			{
				name:'涉农',
				type: 'bar',
				data:values,
				barWidth: '15px',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgb(77, 244, 203)'
						}, {
							offset: 1,
							color: 'rgb(24, 183, 178)'
						}]),
						barBorderRadius: 10
					}
				}
			},
			{
				name:'小微',
				type:'bar',
				barWidth: '15px',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgb(241, 181, 95)'
						}, {
							offset: 1,
							color: 'rgb(255, 149, 107)'
						}]),
						barBorderRadius: 10
					}
				},
				data:smallLoan
			}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	e.hideLoading();
	e.setOption(option), $(window).resize(e.resize);
};

// 股权性投资金额与环比情况
var refreshChart11 = function () {
	var e = echarts.init(document.getElementById("echart_11"));
	e.showLoading({
		text: '加载中...',
		effect: 'whirling'
	});
	var xLabel = [];
	var values = [];
	var percent=[];
	var typeName=[];

	// 同步执行
	$.ajaxSettings.async = false;
	var path=$("#path").val();
	// 加载数据
	$.post(path+'service/smallLoan/smallLoanData', { type: 5},
		function(json){
			xLabel = json.xLabel;
			values = json.yData;
			percent=json.percent;
			typeName=json.name;
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
			top: '10',
			right: '10',
			data:typeName,
			textStyle: {
				color: '#a4a4a4'
			}
		},
		grid: {
			top: '60',
			left: '20',
			right: '20',
			bottom: '25',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				data: xLabel,
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
				/*min: 0,
				max: 20,*/
				splitLine: {show: true},
				axisLine:{
					lineStyle:{
						color:'#a4a4a4'
					}
				}
			},
			{
				type: 'value',
				/*min: 0,
				max: 40,*/
				interval: 10,
				axisLabel: {
					formatter: '{value}%'
				},
				axisLine:{
					lineStyle:{
						color:'#a4a4a4'
					}
				}
			}
		],
		series: [
			{
				name:'金额',
				type: 'bar',
				data:values,
				barWidth: '25px',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#b89796'
						}, {
							offset: 1,
							color: '#0d73eb'
						}])
					}
				}
			},
			{
				name:'环比',
				type:'line',
				yAxisIndex: 1,
				data:percent,
				itemStyle : {
					normal : {
						color:'#ffa458',
						lineStyle:{
							color:'#ffbeaa',
							type: 'dashed'
						}
					}
				}
			}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	e.hideLoading();
	e.setOption(option), $(window).resize(e.resize);
};

// 股权性投资金额与环比情况
var refreshChart12 = function () {
	var e = echarts.init(document.getElementById("echart_12"));
	e.showLoading({
		text: '加载中...',
		effect: 'whirling'
	});
	var xLabel = [];
	var values = [];
	var percent=[];
	var typeName=[];
	// 同步执行
	$.ajaxSettings.async = false;
	var path=$("#path").val();
	// 加载数据
	$.post(path+'service/smallLoan/smallLoanData', { type: 6},
		function(json){
			xLabel = json.xLabel;
			values = json.yData;
			percent=json.percent;
			typeName=json.name;
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
			top: '10',
			right: '10',
			data:typeName,
			textStyle: {
				color: '#a4a4a4'
			}
		},
		grid: {
			top: '60',
			left: '20',
			right: '20',
			bottom: '25',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				data: xLabel,
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
				/*min: 0,
				max: 20,*/
				splitLine: {show: true},
				axisLine:{
					lineStyle:{
						color:'#a4a4a4'
					}
				}
			},
			{
				type: 'value',
				/*min: 0,
				max: 40,*/
				interval: 10,
				axisLabel: {
					formatter: '{value}%'
				},
				axisLine:{
					lineStyle:{
						color:'#a4a4a4'
					}
				}
			}
		],
		series: [
			{
				name:'金额',
				type: 'bar',
				data:values,
				barWidth: '25px',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#ff6b9b'
						}, {
							offset: 1,
							color: '#ED6F7A'
						}])
					}
				}
			},
			{
				name:'环比',
				type:'line',
				yAxisIndex: 1,
				data:percent,
				itemStyle : {
					normal : {
						color:'#ec8f6f',
						lineStyle:{
							color:'#ff6b6b',
							type: 'dashed'
						}
					}
				}
			}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	e.hideLoading();
	e.setOption(option), $(window).resize(e.resize);
};

// 不同贷款期限-贷款额
var refreshChart13 = function () {
	var e = echarts.init(document.getElementById("echart_13"));
	e.showLoading({
		text: '加载中...',
		effect: 'whirling'
	});
	var xLabel = [];
	var values = [];
	var percent=[];
	var third=[];
	var TypeName=[];
	// 同步执行
	$.ajaxSettings.async = false;
	var path=$("#path").val();
	// 加载数据
	$.post(path+'service/smallLoan/smallLoanData', { type: 4},
		function(json){
			xLabel = json.xLabel;
			values = json.sixAmount;
			percent=json.sevenAmount;
			third=json.twelveAmount;
			typeName=json.name;
		},"json");
	var option = {
		tooltip : {
			trigger: 'item',
			axisPointer : {
				type : 'shadow'
			}
		},
		legend: {
			itemGap: 20,
			top: '10',
			right: '10',
			data:typeName,
			textStyle: {
				color: '#fff'
			}
		},
		grid: {
			top: '50',
			left: '20',
			right: '20',
			bottom: '25',
			containLabel: true
		},
		xAxis : [
			{
				type : 'category',
				data: xLabel,
				axisLabel: {
					color: '#fff'
				},
				axisLine:{
					lineStyle:{
						color:'#72849d'
					}
				}
			}
		],
		yAxis : [
			{
				type : 'value',
				name: '单位：万元',
				/*min: 0,
				max: 80,*/
				nameTextStyle: {
					color: '#fff'
				},
				axisLabel: {
					color: '#fff'
				},
				axisLine:{
					show: false
				},
				splitLine: {
					show: true,
					lineStyle:{
						color:'#72849d'
					}
				}
			}
		],
		series : [
			{
				name:'0-6个月',
				type:'bar',
				stack: '金额',
				barWidth: '25px',
				data:values,
				itemStyle:{
					normal:{color:'#f9af9c'}
				}
			},
			{
				name:'7-12个月',
				type:'bar',
				stack: '金额',
				data:percent,
				itemStyle:{
					normal:{color:'#57fcfe'}
				}
			},
			{
				name:'12个月以上',
				type:'bar',
				stack: '金额',
				data:third,
				itemStyle:{
					normal:{color:'#2378e0'}
				}
			}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	e.hideLoading();
	e.setOption(option), $(window).resize(e.resize);
};

// 股权性投资金额与环比情况
var refreshPolarChart = function () {
	var e = echarts.init(document.getElementById("polar_echart"));
	e.showLoading({
		text: '加载中...',
		effect: 'whirling'
	});
	var xLabel = [];
	var values = [];
	var percent=[];
	var third=[];
	var TypeName=[];
	// 同步执行
	$.ajaxSettings.async = false;
	var path=$("#path").val();
	// 加载数据
	$.post(path+'service/smallLoan/smallLoanData', { type: 7},
		function(json){
			xLabel = json.loan_amount;
			values = json.guar_amount;
			percent=json.invest_amount;
			third=json.region_name;
			typeName=json.name;
		},"json");
	var option = {
		tooltip : {
			trigger: 'item',
			formatter: "{b} <br/>{a} : {c} 万元"
		},
		legend: {
			itemGap: 20,
			top: '10',
			show: true,
			data: typeName,
			textStyle: {
				color: '#fff'
			}
		},
		grid: {
			containLabel: true
		},
		color: ['#ca2731', '#175173', '#3db0c1'],
		angleAxis: {
			type: 'category',
			data: third,
			axisLine:{
				lineStyle:{
					color:'#fff'
				}
			},
			z: 10
		},
		radiusAxis: {
			axisLine:{
				lineStyle:{
					color:'#fff'
				}
			}
		},
		polar: {
		},
		series: [{
			type: 'bar',
			data: values,
			coordinateSystem: 'polar',
			name: '融资余额',
			stack: 'a'
		}, {
			type: 'bar',
			data: percent,
			coordinateSystem: 'polar',
			name: '累计股权投资',
			stack: 'a'
		},{
			type: 'bar',
			data: xLabel,
			coordinateSystem: 'polar',
			name: '累计贷款',
			stack: 'a'
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	e.hideLoading();
	e.setOption(option), $(".right-body").resize(e.resize);
};

var refreshRoseChart = function () {
	var e = echarts.init(document.getElementById("rose_echart"));
	e.showLoading({
		text: '加载中...',
		effect: 'whirling'
	});
	var categories = [];
	var values;
	var typeName = [];

	// 同步执行
	$.ajaxSettings.async = false;
	var path=$("#path").val();

	// 加载数据
	$.getJSON(path+'/service/smallLoan/selectLoanBalance' ,function (json) {
		//categories = json.xLabel;
		values = json.loanBalance;
		typeName = json.typeName;
	});
	var option = {
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			itemWidth: 17,
			itemHeight: 12,
			itemGap: 20,
			orient: 'vertical',
			right: '10%',
			y : 'center',
			data: typeName,/*["正常类贷款", "关注类贷款", "次级类贷款", "可疑类贷款", "损失类贷款"]*/
			textStyle: {
				color: '#fff'
			}
		},
		color: [
			new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				color: 'rgb(124, 202, 248)'
			}, {
				offset: 1,
				color: 'rgb(92, 177, 229)'
			}]),
			new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				color: 'rgb(248, 78, 171)'
			}, {
				offset: 1,
				color: 'rgb(250, 75, 171)'
			}]),
			new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				color: 'rgb(254, 191, 100)'
			}, {
				offset: 1,
				color: 'rgb(238, 167, 66)'
			}]),
			new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				color: 'rgb(131, 118, 218)'
			}, {
				offset: 1,
				color: 'rgb(114, 99, 218)'
			}]),
			new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				offset: 0,
				color: 'rgb(253, 115, 100)'
			}, {
				offset: 1,
				color: 'rgb(251, 110, 67)'
			}])
		],
		calculable : true,
		series : [
			{
				name:'分布情况',
				type:'pie',
				radius : [50, 120],
				center: ['35%', '50%'],
				roseType : 'radius',
				label: {
					normal: {
						position: 'inner',
						formatter: "{c}\n {d}%"
					},
					emphasis: {
						show: true
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: values
			}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	e.hideLoading();
	e.setOption(option), $(window).resize(e.resize);
};