$(function(){
    // 左边菜单样式控制
    slideMenu('LJRJGFX','LJRJGFX_RZDB');

    var h = document.documentElement.clientHeight - 50 - 40;
    var ih = $("#module1").outerHeight();

});
$(function () {
    refreshChart1();
    refreshChart13();
    // refreshChart2();
    refreshChart3();
    // refreshChart4();
    // refreshPieChart1();
    // refreshPieChart2();
    // refreshPieChart3();
    // refreshPieChart4();
    // refreshChart6();
    // refreshChart7();
    // refreshChart8();
    // refreshChart9();

    //各担保形式累计担保金额显示
    // $.post(basePath+'service/guaranteeAnalysis/selectAllGuarAmount',
    // 	function(json){
    //         $("#financing").html(json.financingAmount);//融资性担保
    //         $("#nonFinancing").html(json.nonFinancingAmount);//非融资性担保
    //         $("#bondIssuance").html(json.bondIssuanceAmount);//债券担保
    // 		$("#reGuarantee").html(json.reGuaranteeAmount);//再担保
    // },"json");
});

// // 贷款金额及环比情况
// var refreshChart1 = function () {
// 	var e = echarts.init(document.getElementById("echart_1"));
// 	e.showLoading({
// 		text: '加载中...',
// 		effect: 'whirling'
// 	});
// 	var numArray = [];
//     var xAxis = [];
// 	// 同步执行
// 	$.ajaxSettings.async = false;
//     var basePath = $("#basePath").val();
// 	// 加载数据
// 	$.post(basePath+'service/guaranteeAnalysis/orgAndPersonAnalysis', { type: 1},
// 		function(json){
// 			numArray = json.numList;
//             xAxis = json.xAxis;
//     },"json");
// 	var option = {
// 		title : {
// 			text: '按注册资本统计',
// 			top: 10,
// 			left: 22,
// 			textStyle:{//标题内容的样式
// 				color: '#fff',
// 				fontWeight: 'normal',
// 				fontSize: 14
// 			}
// 		},
// 		tooltip: {
// 			trigger: 'axis',
// 			axisPointer: {
// 				type: 'shadow',
// 				crossStyle: {
// 					color: '#999'
// 				}
// 			}
// 		},
// 		grid: {
// 			right: '20',
// 			bottom: '25',
// 			containLabel: true
// 		},
// 		xAxis: [
// 			{
// 				type: 'category',
// 				data: xAxis,
// 				axisPointer: {
// 					type: 'shadow'
// 				},
//                 axisLabel: {
//                     color: '#fff'
//                 },
//                 axisLine:{
//                     lineStyle:{
//                         color:'#72849d'
//                     }
//                 }
// 			}
// 		],
// 		yAxis: [
// 			{
// 				name:'法人机构数量/个',
// 				type: 'value',
//                 nameTextStyle: {
//                     color: '#fff'
//                 },
//                 axisLabel: {
//                     color: '#fff'
//                 },
//                 axisLine:{
//                     show: false
//                 },
//                 splitLine: {
//                     show: true,
//                     lineStyle:{
//                         color:'#72849d'
//                     }
//                 }
// 			}
// 		],
// 		series: [
// 			{
// 				name:'数量',
// 				type: 'bar',
// 				data: numArray,
// 				barWidth: '25px',
// 				itemStyle: {
// 					normal: {
// 						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
// 							offset: 0,
// 							color: '#34a7e8'
// 						}, {
// 							offset: 1,
// 							color: '#58ffff'
// 						}])
// 					}
// 				}
// 			}
// 		]
// 	};

// 	// 使用刚指定的配置项和数据显示图表。
// 	e.hideLoading();
// 	e.setOption(option), $(window).resize(e.resize);
// };

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
            bottom: '10',
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



var refreshChart13 = function () {
    var e = echarts.init(document.getElementById("echart_13"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var assetsArray = [];//资产
    var liabilitiesArray = [];//负债
    var equityArray = [];//所有者权益
    var yearArray = [];
    var xArray =["贵阳市", "遵义市", "毕节市", "黔南市", "铜仁市","六水盘市","黔西南州","安顺市","黔东南州"];
    var tempArray =[
        {name:'贵阳市',},
        {name:'遵义市',},
        {name:'毕节市',},
        {name:'黔南市',},
        {name:'铜仁市',},
        {name:'六水盘市',},
        {name:'黔西南州',},
        {name:'安顺市',},
        {name:'黔东南州',},
    ];
    // 同步执行
    $.ajaxSettings.async = false;
    var basePath = $("#basePath").val();
    // 加载数据
    // $.post(basePath+'service/guaranteeAnalysis/liabilitiesAndProfitAnalysis',
    // 	function(json){
    // 		assetsArray = json.assetsList;
    //         liabilitiesArray = json.liabilitiesList;
    //         equityArray = json.equityList;
    //         yearArray = json.yearList;
    //         xArray = json.xArray1;
    // },"json");
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
            width:'300',
            left: '10',
            right: '30',
            bottom: '20',
            containLabel: true
        },
        color:['#FFB675','#D64653','#8B98B5','#10557B','#617144','#23E9F9','#261AB5','#36B2F5','#6936AF'],
        legend: {
            type: 'scroll',
            orient: 'vertical',
            selectedMode:'single',
            width:'120',
            top: '50',
            right: '0',
            data: tempArray,
            textStyle: {
                color: '#fff'
            }
        },
        xAxis : [
            {
                name: '年',
                nameTextStyle: {
                    color: '#fff'
                },
                type : 'category',
                boundaryGap : false,
                //data: yearArray,
                data: ['2018','2019','2020','2021','2022','2023'],
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
                max:700,
                min:0,
                type : 'value',
                name: '亿元',
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine:{
                    show: true,
                    lineStyle:{
                        color:'#72849d'
                    }
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
                type: 'line',
                data:[150, 470, 350, 440, 310, 570],

                lineStyle:{
                    normal : {
                        color:'#FFB675',

                    }
                }
            },
            {
                name: xArray[1],
                type: 'line',
                data:[230, 340, 460, 480, 360, 450],
                // smooth:true,
                lineStyle:{
                    normal : {
                        color:'#D64653',
                    }
                }
            },
            {
                name: xArray[2],
                type: 'line',
                data:[240, 340, 230, 340, 670, 560],
                // smooth:true,
                lineStyle:{
                    normal : {
                        color:'#8B98B5',
                    }
                }
            },
            {
                name: xArray[3],
                type: 'line',
                data:[550, 470, 450, 480, 350, 530],
                // smooth:true,

                lineStyle:{
                    normal : {
                        color:'#10557B',
                    }
                }
            },
            {
                name: xArray[4],
                type: 'line',
                data:[250, 440, 470, 520, 350, 510],
                // smooth:true,

                lineStyle:{
                    normal : {
                        color:'#617144',
                    }
                }
            },
            {
                name: xArray[5],
                type: 'line',
                data:[120, 230, 340, 480, 350, 430],
                // smooth:true,

                lineStyle:{
                    normal : {
                        color:'#23E9F9',
                    }
                }
            },
            {
                name: xArray[6],
                type: 'line',
                data:[450, 470, 350, 480, 550, 530],
                // smooth:true,
                lineStyle:{
                    normal : {
                        color:'#261AB5',
                    }
                }
            },
            {
                name: xArray[7],
                type: 'line',
                data:[650,370, 560, 340, 250, 530],
                // smooth:true,

                lineStyle:{
                    normal : {
                        color:'#36B2F5',
                    }
                }
            },
            {
                name: xArray[8],
                type: 'line',
                data:[340, 430, 350, 420, 350, 450],
                // smooth:true,

                lineStyle:{
                    normal : {
                        color:'#6936AF',
                    }
                }
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
    // $.post(basePath+'service/guaranteeAnalysis/liabilitiesAndProfitAnalysis',
    // 	function(json){
    // 		assetsArray = json.assetsList;
    //         liabilitiesArray = json.liabilitiesList;
    //         equityArray = json.equityList;
    //         yearArray = json.yearList;
    //         xArray = json.xArray1;
    // },"json");
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
            bottom: '20',
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
                name: '年',
                nameTextStyle: {
                    color: '#fff'
                },
                type : 'category',
                boundaryGap : false,
                //data: yearArray,
                data: ['2018','2019','2020','2021','2022','2023'],
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
                max:10000,
                min:0,
                type : 'value',
                name: '亿元',
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine:{
                    show: true,
                    lineStyle:{
                        color:'#72849d'
                    }
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
                name: xArray[2],
                type: 'line',
                data:[35.90, 8527.85, 260.00, 1191.09, 134.00,733.76],
                // smooth:true,
                itemStyle : {
                    normal : {
                        color:'#fcf8f6',
                        lineStyle:{
                            color:'#03AFCB',
                            // type: 'dashed'
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

var refreshChart1 = function() {
    var e = echarts.init(document.getElementById("echart_1"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var xLabel = [];
    var values = [];
    var smallLoan = [];
    var typeName = [];
    // 同步执行
    $.ajaxSettings.async = false;
    var path = $("#path").val();
    //测试数据
    var testArray3 = {
        message: true,
        agrLoan: [1132, 1616, 1132, 1632, 664],
        message: true,
        name: ["2015年", "2016年","2017年"],
        smallLoan: [518, 499, 518, 718, 676],
        xLabel: ['贵阳市', '遵义市', '毕节市', '黔南州', '铜仁市', '六盘水市', '黔西南州', '安顺市', '黔东南州']
    }

    typeName = testArray3.name;


    option = {
        legend: {


        },
        tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                position: function(point, params, dom, rect, size){
                    //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
                    var x = point[0];//
                    var y = point[1];
                    var viewWidth = size.viewSize[0];
                    var viewHeight = size.viewSize[1];
                    var boxWidth = size.contentSize[0];
                    var boxHeight = size.contentSize[1];
                    var posX = 0;//x坐标位置
                    var posY = 0;//y坐标位置
                    
                    if(x<boxWidth){//左边放不开
                        posX = 5;    
                    }else{//左边放的下
                        posX = x-boxWidth; 
                    }
                    
                    if(y<boxHeight){//上边放不开
                        posY = 5; 
                    }else{//上边放得下
                        posY = y-boxHeight;
                    }
                    
                    return [posX,posY];
             
             }
            },
        xAxis :{
            data : ['贵阳市', '遵义市', '毕节市', '黔南州', '铜仁市', '六盘水市', '黔西南州', '安顺市', '黔东南州'],
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {
                interval:0,
                rotate:40,
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: '#72849d'
                }
            }
        },

        yAxis : [
            {
                type: 'value',
                name: '亿元',
                min: 0,
                max: 700,
                interval: 100,
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine: {
                    show: true
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#72849d'
                    }
                }
            },
            {
                type : 'value',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    // formatter: '{value} %' ,
                    color: '#F9F900'
                },
                min: 0,
                max: 16,
                interval: 2,
                nameTextStyle: {
                    color: '#F9F900'
                },

                axisLine: {
                    show: true
                },
                splitLine : {show : false}
            }
        ],
        series : [
            {
                name:'存量债余额(亿元)',
                type:'bar',
                barWidth : 20,
                itemStyle: {
                    normal: {
                        color: '#2278E0',
                    }

                },
                data:[691.9, 317.8,149.1, 116.8, 94.4, 63.5, 117.1,132.7,35.9]
            },
            {
                name:'城投平台数',
                type:'line',
                yAxisIndex: '1',
                itemStyle: {
                    normal: {
                        color: '#F9F900',
                    }

                },
                data:[15, 12,  9, 7, 4, 6,5,7,2]

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
            bottom: '5',
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
        title: {
            text: '融资性担保',
            top: '48%',
            left: '38%',
            textStyle:{//标题内容的样式
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 16
            }
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
                radius: ['70%', '90%'],
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
        title: {
            text: '债券发行担保',
            top: '48%',
            left: '36%',
            textStyle:{//标题内容的样式
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 16
            }
        },
        color: ['#ee9e6d', '#c89cff'],
        series: [
            {
                name:'债券发行担保累计代偿与损失金额',
                type:'pie',
                radius: ['70%', '90%'],
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
        title: {
            text: '非融资性担保',
            top: '48%',
            left: '36%',
            textStyle:{//标题内容的样式
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 16
            }
        },
        color: ['#57fcfe', '#ee9e6d'],
        series: [
            {
                name:'非融资性担保累计代偿与损失金额',
                type:'pie',
                radius: ['70%', '90%'],
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
        title: {
            text: '再担保',
            top: '48%',
            left: '40%',
            textStyle:{//标题内容的样式
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 16
            }
        },
        color: ['#c89cff', '#ff6b6b'],
        series: [
            {
                name:'再担保累计代偿与损失金额',
                type:'pie',
                radius: ['70%', '90%'],
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
            top: '10',
            right: '10',
            data: xArray,
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
            top: '10',
            right: '10',
            data: xArray,
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
        title: {
            text: '融资性担保业务',
            top: '38%',
            left: '29%',
            textStyle:{//标题内容的样式
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 16
            }
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
                radius: ['40%', '65%'],
                center: ['40%', '40%'],
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
                radius: ['30%', '70%'],
                center: ['40%', '40%'],
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