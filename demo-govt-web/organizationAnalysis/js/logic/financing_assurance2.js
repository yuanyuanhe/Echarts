$(function(){
    // 左边菜单样式控制
    slideMenu('LJRJGFX','LJRJGFX_RZDB');

	var h = document.documentElement.clientHeight - 50 - 40;
	var ih = $("#module1").outerHeight();

});
$(function () {
	refreshChart1();
	refreshChart2();
	refreshChart3();
	refreshChart4();
    refreshPieChart1();
    refreshPieChart2();
    refreshPieChart3();
    refreshPieChart4();
    refreshChart6();
    refreshChart7();
    refreshChart8();
    refreshChart9();

    //各担保形式累计担保金额显示
    $.post(basePath+'service/guaranteeAnalysis/selectAllGuarAmount',
		function(json){
            $("#financing").html(json.financingAmount);//融资性担保
            $("#nonFinancing").html(json.nonFinancingAmount);//非融资性担保
            $("#bondIssuance").html(json.bondIssuanceAmount);//债券担保
			$("#reGuarantee").html(json.reGuaranteeAmount);//再担保
    },"json");
});

// 贷款金额及环比情况
var refreshChart1 = function () {
	var e = echarts.init(document.getElementById("echart_1"));
	e.showLoading({
		text: '加载中...',
		effect: 'whirling'
	});
	var numArray = [];
    var xAxis = [];
	// 同步执行
	$.ajaxSettings.async = false;
    var basePath = $("#basePath").val();
	// 加载数据
	$.post(basePath+'service/guaranteeAnalysis/orgAndPersonAnalysis', { type: 1},
		function(json){
			numArray = json.numList;
            xAxis = json.xAxis;
    },"json");
	var option = {
		title : {
			text: '按注册资本统计',
			top: 10,
			left: 22,
			textStyle:{//标题内容的样式
				color: '#fff',
				fontWeight: 'normal',
				fontSize: 14
			}
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
				crossStyle: {
					color: '#999'
				}
			}
		},
		grid: {
			right: '20',
			bottom: '0',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				data: xAxis,
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
				name:'法人机构数量/个',
				type: 'value',
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
				name:'数量',
				type: 'bar',
				data: numArray,
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
	var dataArray = [];
    var xArray = [];
	// 同步执行
	$.ajaxSettings.async = false;
    var basePath = $("#basePath").val();
	// 加载数据
	$.post(basePath+'service/guaranteeAnalysis/orgAndPersonAnalysis', { type: 2},
		function(json){
			dataArray = json.dataArray;
            xArray = json.xArray;
    },"json");
	var option = {
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
            itemWidth: 18,
            itemHeight: 18,
            itemGap: 20,
			bottom: '0',
			//y : 'center',
			//data: xArray,
			data: ["博士", "研究生", "本科", "大专及以下"],
			textStyle: {
				color: '#fff'
			}
		},
		color: [
		    new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#53abe8'
            }, {
                offset: 1,
                color: '#65bded'
            }]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#df7427'
            }, {
                offset: 1,
                color: '#f09e41'
            }]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#c9518b'
            }, {
                offset: 1,
                color: '#df6da2'
            }]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#6626d4'
            }, {
                offset: 1,
                color: '#8683f4'
            }])],
		calculable : true,
		series : [
			{
				name:'从业人数占比',
				type:'pie',
                radius: ['30%', '70%'],
				center: ['50%', '40%'],
				roseType : 'area',
				label: {
					normal: {
						color: '#e58532'
					}
				},
				//data: dataArray
				data:[
					{value:20, name:'博士'},
					{value:15, name:'研究生'},
					{value:20, name:'本科'},
					{value:35, name:'大专及以下'}
				]
			}
		]
	};

	// 使用刚指定的配置项和数据显示图表。
	e.hideLoading();
	e.setOption(option), $(window).resize(e.resize);
};

// 负债情况
var refreshChart3 = function () {
	var e = echarts.init(document.getElementById("echart_3"));
	e.showLoading({
		text: '加载中...',
		effect: 'whirling'
	});
    var assetsArray = [];//资产
    var liabilitiesArray = [];//负债
    var equityArray = [];//所有者权益
    var yearArray = [];
    var xArray = [];
	// 同步执行
	$.ajaxSettings.async = false;
    var basePath = $("#basePath").val();
	// 加载数据
	$.post(basePath+'service/guaranteeAnalysis/liabilitiesAndProfitAnalysis',
		function(json){
			assetsArray = json.assetsList;
            liabilitiesArray = json.liabilitiesList;
            equityArray = json.equityList;
            yearArray = json.yearList;
            xArray = json.xArray1;
    },"json");
	var option = {
		tooltip : {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		grid: {
			left: '20',
			right: '30',
			bottom: '0',
			containLabel: true
		},
        legend: {
            top: '10',
            right: '10',
            data: xArray,
            textStyle: {
                color: '#fff'
            }
        },
		xAxis : [
			{
				type : 'category',
				boundaryGap : false,
				//data: yearArray,
                data: ['2012年','2013年','2014年','2015年','2016年','2017年'],
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
				name: '单位：个',
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
				name: xArray[0],
				type:'line',
				stack: '总量',
				areaStyle: {normal: {}},
                symbol: 'none',
				smooth:true,
				itemStyle: {
					normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#398dca'
                        }, {
                            offset: 1,
                            color: '#11599d'
                        }])
					}
				},
				//data: assetsArray
                data:[13, 10, 12, 9, 11, 8]
			},
			{
				name: xArray[1],
				type:'line',
				stack: '总量',
				areaStyle: {normal: {}},
                symbol: 'none',
				smooth:true,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#ba9554'
                        }, {
                            offset: 1,
                            color: '#c98559'
                        }])
                    }
                },
				//data: liabilitiesArray
                data:[5.5, 6, 6, 5.5, 6, 6.5]
			},
            {
                name: xArray[2],
                type: 'line',
                //data: equityArray,
                data:[15.5, 13.5, 15, 13, 13.5, 12.5],
				smooth:true,
                itemStyle : {
                    normal : {
                        color:'#fcf8f6',
                        lineStyle:{
                            color:'#fff',
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
var refreshChart4 = function () {
	var e = echarts.init(document.getElementById("echart_4"));
	e.showLoading({
		text: '加载中...',
		effect: 'whirling'
	});
    var incomeArray = [];//担保业务收入
    var netprofitArray = [];//净利润
    var salestaxArray = [];//营业税
    var incometaxArray = [];//企业所得税
    var yearArray = [];
    var xArray = [];
	// 同步执行
	$.ajaxSettings.async = false;
    var basePath = $("#basePath").val();
	// 加载数据
	$.post(basePath+'service/guaranteeAnalysis/liabilitiesAndProfitAnalysis',
		function(json){
			incomeArray = json.incomeList;
            netprofitArray = json.netprofitList;
            salestaxArray = json.salestaxList;
            incometaxArray = json.incometaxList;
            yearArray = json.yearList;
            xArray = json.xArray2;
    },"json");
    var option = {
        tooltip : {
            trigger: 'item',
            axisPointer : {
                type : 'shadow'
            }
        },
        legend: {
            top: '5',
            right: '10',
            data: xArray,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            top: '70',
            left: '45',
            right: '20',
            bottom: '0',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data: yearArray,
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
        yAxis : [
            {
                type : 'value',
                name: '担保业务收益情况/万元',
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
                name: xArray[0],
                type:'bar',
                stack: '金额',
                barWidth: '25px',
                data: incomeArray,
                itemStyle:{
                    normal:{color:'#2378e0'}
                }
            },
            {
                name: xArray[1],
                type:'bar',
                stack: '金额',
                data: netprofitArray,
                itemStyle:{
                    normal:{color:'#57fcfe'}
                }
            },
            {
                name: xArray[2],
                type:'bar',
                stack: '金额',
                data: salestaxArray,
                itemStyle:{
                    normal:{color:'#f9af9c'}
                }
            },
            {
                name: xArray[3],
                type:'bar',
                stack: '金额',
                data: incometaxArray,
                itemStyle:{
                    normal:{color:'#f95184'}
                }
            }
        ]
    };

	// 使用刚指定的配置项和数据显示图表。
	e.hideLoading();
	e.setOption(option), $(window).resize(e.resize);
};

var refreshPieChart1 = function () {
    var e = echarts.init(document.getElementById("pie_echart1"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var amountArray = [];
	// 同步执行
	$.ajaxSettings.async = false;
    var basePath = $("#basePath").val();
	// 加载数据
	$.post(basePath+'service/guaranteeAnalysis/selectAllGuarAmount',
		function(json){
			amountArray = json.financing;
    },"json");
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        grid: {
            top: 10,
            containLabel: true
        },
        color: ['#ff6b6b', '#57fcfe'],
        series: [
            {
                name:'融资性担保累计代偿与损失金额',
                type:'pie',
                radius: ['78%', '90%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        position: 'inner',
                        formatter: "{d}%"
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: amountArray
            }
        ]
    };

    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};

var refreshPieChart2 = function () {
    var e = echarts.init(document.getElementById("pie_echart2"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var amountArray = [];
	// 同步执行
	$.ajaxSettings.async = false;
    var basePath = $("#basePath").val();
	// 加载数据
	$.post(basePath+'service/guaranteeAnalysis/selectAllGuarAmount',
		function(json){
			amountArray = json.bondIssuance;
    },"json");
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        color: ['#ee9e6d', '#c89cff'],
        series: [
            {
                name:'债券发行担保累计代偿与损失金额',
                type:'pie',
                radius: ['78%', '90%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        position: 'inner',
                        formatter: "{d}%"
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: amountArray
            }
        ]
    };

    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};

var refreshPieChart3 = function () {
    var e = echarts.init(document.getElementById("pie_echart3"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var amountArray = [];
	// 同步执行
	$.ajaxSettings.async = false;
    var basePath = $("#basePath").val();
	// 加载数据
	$.post(basePath+'service/guaranteeAnalysis/selectAllGuarAmount',
		function(json){
			amountArray = json.nonFinancing;
    },"json");
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        color: ['#57fcfe', '#ee9e6d'],
        series: [
            {
                name:'非融资性担保累计代偿与损失金额',
                type:'pie',
                radius: ['78%', '90%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        position: 'inner',
                        formatter: "{d}%"
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: amountArray
            }
        ]
    };

    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};

var refreshPieChart4 = function () {
    var e = echarts.init(document.getElementById("pie_echart4"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var amountArray = [];
	// 同步执行
	$.ajaxSettings.async = false;
    var basePath = $("#basePath").val();
	// 加载数据
	$.post(basePath+'service/guaranteeAnalysis/selectAllGuarAmount',
		function(json){
			amountArray = json.reGuarantee;
    },"json");
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        color: ['#c89cff', '#ff6b6b'],
        series: [
            {
                name:'再担保累计代偿与损失金额',
                type:'pie',
                radius: ['78%', '90%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        position: 'inner',
                        formatter: "{d}%"
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: amountArray
            }
        ]
    };

    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};

var refreshChart6 = function () {
    var e = echarts.init(document.getElementById("echart_6"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var guarAmountArray = [];//担保金额
    var compenAmountArray = [];//代偿金额
    var lostAmountArray = [];//损失金额
    var compenRateArray = [];//代偿率
    var lostRateArray = [];//损失率
    var yearArray = [];
    var xArray = [];
	// 同步执行
	$.ajaxSettings.async = false;
    var basePath = $("#basePath").val();
	// 加载数据
	$.post(basePath+'service/guaranteeAnalysis/guarBussinessAnalysis', {type: 1},
		function(json){
			guarAmountArray = json.guarAmountList;
            compenAmountArray = json.compenAmountList;
            lostAmountArray = json.lostAmountList;
            compenRateArray = json.compenRateList;
            lostRateArray = json.lostRateList;
            yearArray = json.yearList;
            xArray = json.xArray;
    },"json");
    var option = {
        tooltip : {
            trigger: 'item',
            axisPointer : {
                type : 'shadow'
            }
        },
        legend: {
            top: '0',
            right: '10',
            data: xArray,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            top: '40',
            left: '20',
            right: '20',
            bottom: '5',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                //data: yearArray,
                data: ['2012年','2013年','2014年','2015年','2016年','2017年'],
                axisLabel:{
                    color:'#fff'
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
        series : [
            {
                name: xArray[0],
                type:'bar',
                stack: '金额',
                barWidth: '25px',
                //data: guarAmountArray,
                data:[7, 5.5, 4.5, 7, 8, 5],
                itemStyle:{
                    normal:{color:'#f9af9c'}
                }
            },
            {
                name: xArray[1],
                type:'bar',
                stack: '金额',
                //data: compenAmountArray,
                data:[5, 5.5, 3.5, 5, 8, 5],
                itemStyle:{
                    normal:{color:'#57fcfe'}
                }
            },
            {
                name:  xArray[2],
                type:'bar',
                stack: '金额',
                //data: lostAmountArray,
                data:[7, 5.5, 4.5, 7, 8, 5],
                itemStyle:{
                    normal:{color:'#2378e0'}
                }
            },
            {
                name: xArray[3],
                type: 'line',
                yAxisIndex: 1,
                //data: lostRateArray,
                data:[9, 6, 7, 5.5, 9.5, 5.5],
                itemStyle : {
                    normal : {
                        color:'#d5548b',
                        lineStyle:{
                            color:'#d5548b',
                            type: 'dashed'
                        }
                    }
                }
            },
            {
                name: xArray[4],
                type: 'line',
                yAxisIndex: 1,
                //data: compenRateArray,
                data:[0, 3.5, 1, 4, 2, 4.5],
                itemStyle : {
                    normal : {
                        color:'#77c68b',
                        lineStyle:{
                            color:'#77c68b',
                            type: 'dashed'
                        }
                    }
                }
            }
        ]
    };

    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};


var refreshChart7 = function () {
    var e = echarts.init(document.getElementById("echart_7"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var amountArray = [];//新增金额
    var numArray = [];//新增户数
    var yearArray = [];
    var xArray = [];
	// 同步执行
	$.ajaxSettings.async = false;
    var basePath = $("#basePath").val();
	// 加载数据
	$.post(basePath+'service/guaranteeAnalysis/guarBussinessAnalysis', {type: 2},
		function(json){
			amountArray = json.amountList;
            numArray = json.numList;
            yearArray = json.yearList;
            xArray = json.xArray;
    },"json");
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            itemWidth: 14,
            itemHeight: 14,
            itemGap: 20,
            top: '0',
            right: '10',
            data: xArray,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            top: '40',
            left: '20',
            right: '20',
            bottom: '5',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                //data: yearArray,
                data: ['2012年','2013年','2014年','2015年','2016年','2017年'],
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
            }
        ],
        series: [
            {
                name: xArray[0],
                type: 'bar',
                //data: amountArray,
                data:[12, 14, 19, 14, 17, 13.5],
                barWidth: '15px',
                barGap: 0,
                itemStyle: {
                    normal: {
                        color: '#fe6085'
                    }
                }
            },
            {
                name: xArray[1],
                type:'bar',
                barWidth: '15px',
                itemStyle: {
                    normal: {
                        color: '#6dbef8'
                    }
                },
                //data: numArray
                data:[15, 10.5, 17, 20, 14.5, 9.8],
            }
        ]
    };

    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};


var refreshChart8 = function () {
    var e = echarts.init(document.getElementById("echart_8"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var amountArray = [];
    var xArray = [];
	// 同步执行
	$.ajaxSettings.async = false;
    var basePath = $("#basePath").val();
	// 加载数据
	$.post(basePath+'service/guaranteeAnalysis/selectGuarTotalAmount',
		function(json){
			amountArray = json.financingList;
            xArray = json.xArray1;
    },"json");
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            itemWidth: 16,
            itemHeight: 16,
            itemGap: 20,
            x: 'center',
            bottom: 5,
            data: xArray,
            textStyle: {
                color: '#fff'
            }
        },
        color: ['#9caefa', '#16caed', '#e24597', '#6a2ea0'],
        series: [
            {
                name: '融资性担保业务累计金额情况',
                type: 'pie',
                radius: ['34%', '55%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        position: 'inner',
                        formatter: "{c}\n{d}%"
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: amountArray
            }
        ]
    };

    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};

var refreshChart9 = function () {
    var e = echarts.init(document.getElementById("echart_9"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var amountArray = [];
    var xArray = [];
	// 同步执行
	$.ajaxSettings.async = false;
    var basePath = $("#basePath").val();
	// 加载数据
	$.post(basePath+'service/guaranteeAnalysis/selectGuarTotalAmount',
		function(json){
			amountArray = json.nonFinancingList;
            xArray = json.xArray2;
    },"json");
    var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            itemWidth: 16,
            itemHeight: 16,
            itemGap: 20,
            x: 'center',
            bottom: 5,
            data: xArray,
            textStyle: {
                color: '#fff'
            }
        },
        color: [
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(83, 129, 221)'
            }, {
                offset: 1,
                color: 'rgb(22, 57, 109)'
            }]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(224, 181, 98)'
            }, {
                offset: 1,
                color: 'rgb(255, 149, 107)'
            }]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(242, 115, 115)'
            }, {
                offset: 1,
                color: 'rgb(238, 67, 67)'
            }])],
        calculable : true,
        series : [
            {
                name:'分布情况',
                type:'pie',
                radius: ['30%', '55%'],
                center: ['50%', '50%'],
                roseType : 'radius',
                label: {
                    normal: {
                        position: 'inner',
                        formatter: "{c}\n{d}%"
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
                data: amountArray
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};