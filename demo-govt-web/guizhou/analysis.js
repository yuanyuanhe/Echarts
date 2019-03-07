/**
 * 业务分析JS逻辑处理
 *
 */
$(function () {
	slideMenu('ZLFX', '');

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

	$('.head').addClass("bg");
	$(".enter_fullscreen").css("display", "inline-block");

	// 企业数量
//     $.ajax({
//         url: basePath + "service/shComInfo/getCompanyCountByRegionId?regionId="+320300,
//         type: "post",
//         dataType: "json",
//         success: function (data) {
//             $("#companyNum").html(data);
//         }
//     });

//     // 涉及行业
//     $.ajax({
//         url: basePath + "service/shComInfo/getIndustryTypeByRegionId?regionId="+320300,
//         type: "post",
//         dataType: "json",
//         success: function (data) {
//             console.info(data);
//             var dataArray = [];
//             var i = 0;
//             for (key in data) {
//                 dataArray[i] = new Object();
//                 dataArray[i].name = key;
//                 dataArray[i].value = data[key];
//                 i++;
//             }
//             $(".industry_num em").html(i);
//             console.info("dataArray",dataArray);
//             $('#industry_list').bootstrapTable('destroy');
//             var oTable = new TableInit();
//             oTable.init(dataArray);

//             setInterval(function () {
//                 changeInvest();
//             }, 3000);
//         }
//     });

//     // 企业类型
//     $.ajax({
//         url: basePath + "service/shComInfo/getCompanyTypeByRegionId?regionId="+320300,
//         type: "post",
//         dataType: "json",
//         success: function (data) {
//             var tr = '';
//             for (key in data) {
//                 if (key != '个体商户') {
//                     tr += '<tr><td>' + key + '</td><td>' + data[key] + '</td></tr>';
//                 }
//             }
//             $(".table_company tbody").html(tr);
//         }
//     });

//     // 类金融机构
//     $.ajax({
//         url: basePath + "service/shComInfo/getSimilarFinancingByRegionId?regionId="+320300,
//         type: "post",
//         dataType: "json",
//         success: function (data) {
//             var tr1 = '';
//             var tr2 = '';
//             var i = 0;
//             var amount = 0;
//             for (key in data) {
//                 if (i > 3) {
//                     tr2 += '<tr><td>'+key+'</td><td>'+data[key]+'</td></tr>';
//                 }
//                 else {
//                     tr1 += '<tr><td>'+key+'</td><td>'+data[key]+'</td></tr>';
//                 }
//                 i++;
//                 amount += data[key];
//             }
//             $("#industryNum").html(amount);
//             $(".table_industry:eq(0) tbody").html(tr1);
//             $(".table_industry:eq(1) tbody").html(tr2);
//         }
//     });

//     // 黑名单
//     $.ajax({
//         url: basePath + "service/shComInfo/getBlacklistCountByRegionId?regionId="+320300,
//         type: "post",
//         dataType: "json",
//         success: function (data) {
//             $("#comBlackNums").html(data.comBlackNums);
//             $("#ljrBlackNums").html(data.ljrBlackNums);
//         }
//     });

    refreshMap();
	refreshBarChart1();
    refreshBarChart2();
    refreshChart13();
    refreshPieChart();
});

function setClientHeight(hh) {
    // var h = hh - 10;
    var h = hh;
    // $("#map").height(h - 300);
    $("#map").height(h - 300);
}

var refreshMap = function() {
    // $.get('common/js/guizhou/guizhou.json', function(dataJson) {
    echarts.registerMap('xuzhou', guizhouJson);
    var e = echarts.init(document.getElementById("map"));

    // 同步执行
    $.ajaxSettings.async = false;

    var dataArray = [];
    // $.ajax({
    //     url: basePath + "service/HuangpuController/shanghaiMap",
    //     type: "post",
    //     dataType: "json",
    //     success: function(data) {
    //         dataArray = data;
    //     }
    // });

    var testGuiZhouMap = [{
            "name": "铜仁市",
            "value": 520600
        },
        {
            "name": "六盘水市",
            "value": 520200
        },
        {
            "name": "黔东南州",
            "value": 522600
        },
        {
            "name": "遵义市",
            "value": 520300
        },
        {
            "name": "黔南州",
            "value": 522700
        },
        {
            "name": "黔西南州",
            "value": 522300
        },
        {
            "name": "安顺市",
            "value": 520400
        },
        {
            "name": "毕节市",
            "value": 520500
        },
        {
            "name": "贵阳市",
            "value": 520100
        },
        {
            "name": "测试",
            "value": 520180
        }
    ]
    dataArray = testGuiZhouMap;
    // top: 10,
    // left: 5,
    // right: 5,
    // bottom: 5,
    var option = {
        tooltip: {
            show: false
        },
        series: [{
            type: 'map',
            map: 'xuzhou',
            top: 10,
            left: 100,
            right: 100,
            bottom: 30,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: { //未选中状态
                    label: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }, //显示名称
                    areaColor: 'rgba(0,0,0,0.6)',
                    borderColor: 'rgba(39,158,208,1)',
                    borderWidth: 1
                },
                emphasis: { //选中状态
                    label: {
                        show: true,
                        textStyle: {
                            color: 'rgba(39,158,208,0.4)'
                        }
                    },
                    areaColor: '#2862a4'
                }
            },
            data: dataArray
        }]
    };

    //单独标注贵阳市的位置
    var data = option.series[0].data;
    var itemStyle = {
        normal: { areaColor: 'rgb(25,170,199)' }
    };
    var label = {
        normal: {
            show: true
        },
        emphasis: {
            show: false
        }
    };

    for (var i = 0; i < data.length; i++) {
        if (data[i].name == '贵阳市') {
            data[i].itemStyle = itemStyle;
            data[i].label = label;
        }
    }

    //单独显示独山县的位置
    var aloneCity = [{
        "name": "独山县",
        "value": [107.542757, 25.826283]
    }]

    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
    // });

};

var refreshBarChart1 = function () {
	var e = echarts.init(document.getElementById("bar_chart1"));

    // 同步执行
    $.ajaxSettings.async = false;

    // var xArray = [], dataArray = [];
    // $.ajax({
    //     url: basePath + "service/shComInfo/getBlacklistComCountByRegionId?regionId="+320300,
    //     type: "post",
    //     dataType: "json",
    //     success: function (data) {
    //         for (key in data) {
    //             xArray.push(key);
    //             dataArray.push(data[key]);
    //         }
    //     }
    // });
    // var dataAxis = []
    var option = {
        // tooltip: {
        //     trigger: 'item'
        // },
        grid: {
            top: '10',
            left: 10,
            right: 10,
            bottom: '0',
            containLabel: true
        },
        xAxis: {
            // data: dataAxis,
            type: 'value',
            axisLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
        },
        yAxis: {
            type: 'category',
            axisLine: {show: false},
            axisLabel: {
                show: true,
                color:'#fff'
            },
            axisTick: {show: false},
            splitLine: {show: false},
            data:  ['交通运输、仓储和邮政业','科学研究和技术服务业','批发和零售业 ',],
        },
        series: [
            {
                name: '数量',
                type: 'bar',
                barMaxWidth: '15px',//固定柱子宽度
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#0074d7'
                        }, {
                            offset: 1,
                            color: '#03aed9'
                        }]),
                        label:{
                            show:true,
                            position: 'top',
                            textStyle:{
                                color:'#fff'
                            }
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'bottom',
                        formatter: "{c} 家",
                        color:'#fff'
                    }
                },
                data: [
                    {value:262,name:'批发和零售业 '},
                    {value:366,name:'科学研究和技术服务业'},
                    {value:822,name:'交通运输、仓储和邮政业'},
                    
                ]
            }
        ]
    };

	e.hideLoading();
	e.setOption(option), $(".right-body").resize(e.resize);
};

var refreshBarChart2 = function () {
    var e = echarts.init(document.getElementById("bar_chart2"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    // 同步执行
    $.ajaxSettings.async = false;

    // var xArray = [], dataArray = [];
    // $.ajax({
    //     url: basePath + "service/shComInfo/getBlacklistLJRCountByRegionId?regionId="+320300,
    //     type: "post",
    //     dataType: "json",
    //     success: function (data) {
    //         for (key in data) {
    //             xArray.push(key);
    //             dataArray.push(data[key]);
    //         }
    //     }
    // });

    var option = {
        // tooltip: {
        //     trigger: 'item'
        // },
        grid: {
            top: '10',
            left: 10,
            right: 10,
            bottom: '0',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
            data:  [ '租赁','融资担保','小贷',],
        },
        yAxis: {
            type: 'category',
            axisLine: {show: false},
            axisLabel: {
                show: true,
                color:'#fff'
            },
            axisTick: {show: false},
            splitLine: {show: false},
            data:   [ '租赁','融资担保','小贷',],
        },
        series: [
            {
                name: '数量',
                type: 'bar',
                barMaxWidth: '15px',//固定柱子宽度
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#fd3f59'
                        }, {
                            offset: 1,
                            color: '#df6f57'
                        }])
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'bottom',
                        formatter: "{c} 家",
                        color:'#fff'
                    }
                },
                data: [
                    {value:13,name:'租赁'},
                    {value:19,name:'融资担保'},
                    {value:57,name:'小贷'}
                       
                ]
            }
        ]
    };

    e.hideLoading();
    e.setOption(option), $(".right-body").resize(e.resize);
};

var refreshPieChart = function () {
    var e = echarts.init(document.getElementById("pie_chart"));
    // 同步执行
    // $.ajaxSettings.async = false;

    // xArray = ['小于300万','介于300-1000万','1000万以上','其他'], 
    // dataArray = [
    //     {value:10945, name:'小于300万'},
    //     {value: 6953, name:'介于300-1000万'},
    //     {value:4118, name:'1000万以上'},
    //     {value:9766, name:'其他'}
    // ],
    // $.ajax({
    //     url: basePath + "service/shComInfo/getRegisteredRatioByRegionId?regionId="+320300,
    //     type: "post",
    //     dataType: "json",
    //     success: function (data) {
    //         var i = 0;
    //         for (key in data) {
    //             xArray.push(key+"（"+data[key]+"）");
    //             dataArray[i] = new Object();
    //             dataArray[i].name = key+"（"+data[key]+"）";
    //             dataArray[i].value = data[key];
    //             i++;
    //         }
    //     }
    // });
       
    option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)",
            position: 'right'
        },
        legend: {
            itemWidth: 10,
            itemHeight: 10,
            bottom: 0,
            data:[ '小于300万','介于300-1000万','1000万以上','其他'],
            textStyle: {
                color: '#fff'
            }
        },
        color: [ '#079bec','#53aa66', '#238bb6','#01669e'],
        calculable : true,
        series : [
            {
                name:'分布情况',
                type:'pie',
                radius : '55%',
                center: ['50%', '40%'],
                data:[
                    {value:153700, name:'小于300万'},
                    {value:41189, name:'介于300-1000万'},
                    {value:34346, name:'1000万以上'},
                    {value:170242, name:'其他'}
                ],
                itemStyle : {
                    normal : {
                        label : {
                            color: '#fff',
                            formatter : "{d} %"
                        }
                    }
                },
                // data: dataArray
            }
        ]
    };

    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};

var TableInit = function () {
    var oTableInit = new Object();

    //初始化Table
    oTableInit.init = function (json) {
        $('#industry_list').bootstrapTable({
            data: json,
            method: 'post',                      //请求方式（*）
            //contentType: 'application/x-www-form-urlencoded',
            queryParams: oTableInit.queryParams,//传递参数（*）
            pagination: true,                   //是否显示分页（*）
            queryParamsType: "",
            paginationLoop: true,//设置为 true 启用分页条无限循环的功能
            //sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 8,                       //每页的记录行数（*）
            minimumCountColumns: 1,             //最少允许的列数
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            classes: 'table-no-bordered',
            paginationPreText: "&nbsp;",
            paginationNextText: "&nbsp;",
            columns: [{
                field: 'id',
                title: '内容',
                formatter: function (value, row, index) {
                    return '<div class="td_industry"><i class="t_icon"></i>'+row.name+'<em>('+row.value+')</em></div>';
                }
            }]
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.pageSize,// 页面大
            pageNo: params.pageNumber// 页码
        };
        return temp;
    };
    return oTableInit;
};
// var index = 1;
// function changeInvest() {
//     var len = $(".info_list .pagination li.page-number").length;

//     // 页码
//     $('.info_list .pagination li.page-number>a').each(function(){
//         var text = $(this).html();
//         if (text == index) {
//             $(this).parent().click();
//         }
//     });

//     index++;
//     if (index == (len + 1)) {
//         index = 1;
//     }
// }
var refreshChart13 = function() {
    var e = echarts.init(document.getElementById("echart_13"));
    e.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var xLabel = [];
    var values = [];
    var percent = [];
    var third = [];
    var TypeName = [];
    // 同步执行
    $.ajaxSettings.async = false;
    var path = $("#path").val();
    //测试数据
    var testArray13 = {
        message: true,
        name: ["其他债务余额", "城投债务","债务率"],
        xLabel: ["贵阳市", "遵义市", "毕节市", "黔南州", "铜仁市","六水盘市","黔西南州","安顺市","黔东南州"],
    }
    xLabel = testArray13.xLabel;
    values = testArray13.sixAmount;
    percent = testArray13.sevenAmount;
    third = testArray13.twelveAmount;
    typeName = testArray13.name;
    // 加载数据
    // $.post(path + 'service/smallLoan/smallLoanData', { type: 4 },
    //     function(json) {
    //         xLabel = json.xLabel;
    //         values = json.sixAmount;
    //         percent = json.sevenAmount;
    //         third = json.twelveAmount;
    //         typeName = json.name;
    //     }, "json");
    var dataAxis = [4618.32,2354,32,1483.32,1132.32,1132.32,963.32,];
    var option = {
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            itemWidth: 15,
            itemHeight: 15,
            top: '10',
            right: '50',
            data: typeName,
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
        xAxis: [{
            type: 'category',
            interval: 0, //强制显示x轴所有标签
            data: xLabel,
            axisLabel: {
                interval:0,  
                rotate:40,
                color: '#fff', 
                fontSize: '10px',
                color: '#fff'
            },
            axisLine: {
                lineStyle: {
                    color: '#72849d'
                }
            },
            
        }],
        yAxis: [{
            type: 'value',
            name: '单位：亿元',
            min: 0,
            max: 5000,
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
            },  

        },
        {
            type : 'value',
            axisLabel: {  
                show: true,  
                interval: 'auto',  
                formatter: '{value} %' ,
                color: '#FF5353' 
                },
            min: 0,
            max: 800,
            
            interval: 100,
            nameTextStyle: {
                color: '#FF5353'
            },

            axisLine: {
                show: true
            },
            splitLine : {show : false}
        }
    ],
        series: [
            {
                name: '城投债务',
                type: 'bar',
                stack: '金额',
                barWidth: '25px',
                data:[
                    {value:2012.41, name:'小于300万'},
                    {value: 1391.16, name:'介于300-1000万'},
                    {value:1016.4, name:'1000万以上'},
                    {value:751.08, name:'其他'},
                    {value:641.48, name:'其他'},
                    {value:528, name:'其他'},
                    {value:439.96, name:'其他'},
                    {value:414.88, name:'其他'},
                    {value:410.56, name:'其他'},
                ],
                itemStyle: {
                    normal: { 
                        color: '#00c7d6'
                     },
                    label:{
                        show:false,
                        position: 'top',
                        textStyle:{
                            color:'#fff'
                        }
                    }
                }
            },
            {
                name: '其他债务余额',
                type: 'bar',
                stack: '金额',
                data:[
                    {value:2605.85, name:'小于300万'},
                    {value: 1577.74, name:'介于300-1000万'},
                    {value:466.89, name:'1000万以上'},
                    {value:435.11, name:'其他'},
                    {value:265.85, name:'其他'},
                    {value:581.28, name:'其他'},
                    {value:395.18, name:'其他'},
                    {value:356.9, name:'其他'},
                    {value:467.9, name:'其他'},
                ],
                itemStyle: {
                    normal: { 
                        color: '#0b4461',
                        label:{
                            show:false,//显示数据值
                            // position: 'top', //数据值显示位置
                            textStyle:{
                                color:'#fff'
                            }
                        }
                     }
                }
            },
            {
                name:'债务率',
                type:'line',
                yAxisIndex: 1,
                itemStyle: {
                  normal: {
                      color: '#FF5353',
                  }
    
                },
 
                data: [689.65,729.12,377.01,365.61,405.01,419.33,345.5,468.13,540.55]
            }

        ]
    };
// data: [689.65,729.12,377.01,365.61,405.01,419.33,345.5,468.13,540.55]
    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};
