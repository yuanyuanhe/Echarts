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


    refreshMap();
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



    var testGuiZhouMap = [{
            "name": "铜仁市",
            "value": 1
        },
        {
            "name": "六盘水市",
            "value": 1
        },
        {
            "name": "黔东南州",
            "value": 10
        },
        {
            "name": "遵义市",
            "value": 20
        },
        {
            "name": "黔南州",
            "value": 5
        },
        {
            "name": "黔西南州",
            "value": 5
        },
        {
            "name": "安顺市",
            "value": 1
        },
        {
            "name": "毕节市",
            "value": 5
        },
        {
            "name": "贵阳市",
            "value": 15
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
        dataRange: {
            show:false,
            x: 'left',
            y: 'bottom',
            splitList: [
                {start: 1, end: 1, color: '#00ECFF'},
                {start: 5, end: 5, color: '#049BEC'},
                {start: 10, end: 10, color: '#049BEC'},
                {start: 15, end: 15, color: '#133896'},
                {start: 20, end: 20, color: '#061750'},
            ],
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
                    areaColor: 'rgba(4, 155, 236, 0.7)',
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
                    areaColor: '#FFD306'
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


    var option = {
        tooltip: {
            trigger: 'item'
        },
        grid: {
            top: '10',
            left: '10',
            right: '50',
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
            data:  ['其他','批发和零售业','商务服务业',],
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
                    {value:111,name:'其他'},
                    {value:195,name:'批发和零售业'},
                    {value:668,name:'商务服务业'},
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


    var option = {
        tooltip: {
            trigger: 'item'
        },
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
            data: [ '租赁','担保','商业保理',],
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
            data:  [ '租赁','担保','商业保理',],
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
                    {value:11,name:'租赁'},
                    {value:56,name:'担保'},
                    {value:123,name:'商业保理'}
                ]
            }
        ]
    };

    e.hideLoading();
    e.setOption(option), $(".right-body").resize(e.resize);
};

var refreshPieChart = function () {
    var e = echarts.init(document.getElementById("pie_chart"));

       
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
                    {value:198613, name:'小于300万'},
                    {value: 66448, name:'介于300-1000万'},
                    {value:26014, name:'1000万以上'},
                    {value:23455, name:'其他'}
                ],
                itemStyle : {
                    normal : {
                        label : {
                            color: '#fff',
                            formatter : "{d} %"
                        }
                    }
                },
                // data:
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
