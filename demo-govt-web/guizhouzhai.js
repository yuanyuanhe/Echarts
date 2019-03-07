$(function() {

    // 左边菜单样式控制
    slideMenu('LJRJGFX', 'LJRJGFX_XEDK');

    var h = document.documentElement.clientHeight;
    setClientHeight(h - 50);

    // 全屏
    $('.head').on('click', '.enter_fullscreen', function() {
        setClientHeight(h);
    });
    // 退出全屏
    $('.right').on('click', '.quit_fullscreen', function() {
        setClientHeight(h - 50);
    });

    tabChange();
});

function setClientHeight(h) {
    if (h > 900) {
        var h = h - 50;
        var ih = $("#module1").outerHeight() + 10;
        $("#echart_1").height((h - ih) / 2 - 32 - 20);
        $("#echart_3,#echart_13").height((h - ih) / 2 - 45 - 20);
        $("#map").height(h - ih - 45 - 30);
    }
}
$(function() {
    refreshMap();
});

var refreshMap = function() {
    echarts.registerMap('xuzhou', guizhouJson);
    var e = echarts.init(document.getElementById("map"));

    // 同步执行
    $.ajaxSettings.async = false;

    var dataArray = [];

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
    var option = {
        tooltip: {
            show: false
        },
        // grid: {
        //     left: '20',
        //     right: '30',
        //     bottom: '20',
        //     containLabel: true
        // },
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

};
//点击切换
function tabChange() {
    var $li = $('.head-nav li');
    var $tabShow = $('.ibox .tabchange');

    $li.on('click', function() {
        var $this = $(this);
        var $t = $this.index();
        $li.removeClass('active');
        $this.addClass('active');
        // $tabShow.css('display', 'none');
        // $tabShow.eq($t).css('display', 'block');
        $tabShow.fadeOut();
        $tabShow.eq($t).fadeIn();
    })
}

