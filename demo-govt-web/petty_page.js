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
});

function setClientHeight(h) {
    if (h > 900) {
        var h = h - 50;
        var ih = $("#module1").outerHeight() + 10;
        $("#echart_1").height((h - ih) / 2 - 32 - 20);
        $("#echart_3,#echart_13").height((h - ih) / 2 - 45 - 20);
        $("#polar_echart").height(h - ih - 45 - 30);
    }
}

$(function() {
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
        $(".head-nav li").addClass("active");
        $(".head-nav li").eq(i).removeClass("active");
        refreshChart(!i);
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
//左第一个
var refreshChart = function(n) {
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

    if(n==1){
         //测试数据
        var testArray3 = {
            message: true,
            agrLoan: [1132, 1616, 1132, 1632, 664],
            message: true,
            name: ["2015年", "2016年","2017年"],
            smallLoan: [518, 499, 518, 718, 676],
            xLabel: ['贵阳市', '遵义市', '毕节市', '黔南州', '铜仁市', '六盘水市', '黔西南州', '安顺市', '黔东南州']
        }
    }else{
         //测试数据
        var testArray3 = {
            message: true,
            agrLoan: [1132, 1616, 1132, 1632, 664],
            message: true,
            name: ["2015年", "2016年","2017年"],
            smallLoan: [518, 499, 518, 718, 676],
            xLabel: ['贵阳市', '遵义市', '毕节市', '黔南州', '铜仁市', '六盘水市', '黔西南州', '安顺市', '黔东南州']
        }
    }
    typeName = testArray3.name;
    if(n==1){
        var option = {
            color: ['#ff2d2d', '#0080ff', '#00e3e3'],
            tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
            legend: {
                    textStyle: {color: '#FDFFFF'},
                    bottom: '5',
                data: ['2015年', '2016年', '2017年']
            },
            grid: {
                top: '50',
                left: '20',
                right: '15',
                bottom: '50',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: xLabel,
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
                        color: '#fff'
                    }
                },
                 data: ['贵阳市', '六盘水市', '安顺市', '遵义市', '毕节市','铜仁市', '黔西南州', '黔东南州','黔南州',]
            }],
            
            yAxis: [{
                type: 'value',
                name: '单位：亿元',
                /*min: 0,
                max: 20,*/
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#72849d'
                    }
                }
            }],

            series: [{
                    name: '2015年',
                    type: 'bar',
                    data: [2793.75,1201.08,2168.34,625.41,1461.35,770.89,801.65,811.55,902.91],
                    barWidth: '6px'

                },
                {
                    name: '2016年',
                    type: 'bar',
                    barWidth: '5px',
                     data: [3105.29,1313.7,2403.94,701.35,1625.79,856.97,929.14,939.05,1023.39]
                    
                },
                {
                    name: '2017年',
                    type: 'bar',
                    barWidth: '5px',
                    data: [3551.05,1461.71,2748.59,802.46,1841.61,969.86,1067.6,972.18,1160.59]
                }
            ]
        };
    }else{
        var option = {
            color: ['#ff2d2d', '#0080ff', '#00e3e3'],
            tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
            legend: {
                    textStyle: {color: '#FDFFFF'},
                    bottom: '5',
                data: ['2015年', '2016年', '2017年']
            },
            grid: {
                top: '50',
                left: '20',
                right: '15',
                bottom: '50',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: xLabel,
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
                        color: '#fff'
                    }
                },
                 data: ['贵阳市', '六盘水市', '安顺市', '遵义市', '毕节市','铜仁市', '黔西南州', '黔东南州','黔南州',]
            }],
            
            yAxis: [{
                type: 'value',
                name: '单位：元',
                /*min: 0,
                max: 20,*/
                nameTextStyle: {
                    color: '#fff'
                },
                axisLabel: {
                    color: '#fff'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#72849d'
                    }
                }
            }],

            series: [{
                    name: '2015年',
                    type: 'bar',
                    data: [71307,41618,35123,27065,22230,24712,28464,23311,27888],
                    barWidth: '6px'

                },
                {
                    name: '2016年',
                    type: 'bar',
                    barWidth: '5px',
                     data: [77371,45325,38709,30216,24544,27366,32833,26857,31472]
                    
                },
                {
                    name: '2017年',
                    type: 'bar',
                    barWidth: '5px',
                    data: [60242,50136,44060,34345,27690,30801,37471,27654,35481]
                }
            ]
        };
    }
    
    

    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
    
}


// 贷款笔数及环比情况
var refreshChart2 = function() {
    var e = echarts.init(document.getElementById("echart_2"));
 
};

// 地区GDP增长率
var refreshChart3 = function() {
    var e = echarts.init(document.getElementById("echart_3"));
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
    var testArray4 = {
        message: true,
        xLabel: ["2013", "2014", "2015", "2016", "2017"]
    }
    xLabel = testArray4.xLabel;

    typeName = testArray4.name;

    var option = {
        tooltip: {
            trigger: 'axis',
            // axisPointer: {
            //     type: 'cross',
            //     crossStyle: {
            //         color: '#72849d'
            //     },
            //     label: {
            //         color: '#f60',
            //         backgroundColor: '#ccc'
            //     }
            // },
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
        legend: {
            // itemWidth: 12,
            itemGap: 10,
            // top: '50',
            bottom: '2',
            data: ['贵阳市', '六盘水市','遵义市','安顺市', '毕节市', '黔南州', '铜仁市',  '黔西南州',  '黔东南州','黔西南州'],
            textStyle: {
                color: '#fff'
            }
            
        },
        grid: {
            top: '50',
            left: '20',
            right: '15',
            bottom: '80',
            containLabel: true
        },


        xAxis: [{
            boundaryGap: false,
            type: 'category',
            data: ["2013", "2014", "2015", "2016", "2017"],
             axisPointer: {
                type: 'shadow'
            },
            axisLabel: {
                
                color: '#fff'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#fff'
                }
            }
        }],



        yAxis: [
            {
                name: '%',
            type: 'value',
            min: 0,
            max: 25,
            
            interval: 5.00,
            nameTextStyle: {
                color: '#fff'
            },
            axisLabel: {
                color: '#fff'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                show: false
            }
        }

    ],
     series: [
   			{
     			type: 'line',
     			name: '贵阳市',
          data: [18.70,18.89,16.68,11.15,14.35],
          itemStyle: {
	        	normal: {
	            color: "#2ec7c9",
	            lineStyle: {
	                color: "#2ec7c9"
	            }
	        	}
	    		}

      	},
        {        	
	        type: 'line',
	        name: '六盘水市',
          data: [19.42,18.21,15.19,9.38,11.27]
    		},
        {        	
	        type: 'line',
	        name: '遵义市',
          data: [17.91,18.28,15.68,10.86,14.33]
    		},
        {        	
	        type: 'line',
	        name: '安顺市',
          data: [21.70,21.18,20.25,12.14,14.41]
    		},
        {        	
	        type: 'line',
	        name: '毕节市',
          data: [17.73,21.57,15.36,11.25,13.27]
    		},
        {        	
	        type: 'line',
	        name: '铜仁市',
          data: [16.88,21.02,19.01,11.16,13.17]
    		},
        {        	
	        type: 'line',
	        name: '黔西南州',
          data: [17.06,20.04,19.47,15.90,14.90]
    		},
        {        	
	        type: 'line',
	        name: '黔东南州',
          data: [18.13,19.81,15.65,15.71,3.53]
    		},
        {        	
	        type: 'line',
	        name: '黔南州',
          data: [17.29,24.19,12.61,13.34,13.41]
    		}
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};

// 股权性投资金额与环比情况
var refreshChart11 = function() {
    var e = echarts.init(document.getElementById("echart_11"));

    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};

// 股权性投资金额与环比情况
var refreshChart12 = function() {
    var e = echarts.init(document.getElementById("echart_12"));
 
    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};

// 资金流向
var refreshChart13 = function(n) {
    var e = echarts.init(document.getElementById("echart_13"));
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
        xLabel: ['2013年', '2014年', '2015年', '2016年', '2017年', '六盘水市', '黔西南州', '安顺市', '黔东南州']
    }
    
    typeName = testArray3.name;
    
    
    var option = {
    	color: ['#9849D8 ', '#23E9F9', '#3657C5','#7DC780','#0478EC'],
        tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
        legend: {
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: '#FDFFFF',
                    fontSize:'10'
                },
                top:5,
                left:100,
                // right:'-30',
        		bottom: '300',
            data: ['农林牧渔业（亿元）', '工业（亿元）', '建筑业（亿元）','金融业（亿元）','房地产业（亿元）']
        },
        grid: {
            top: '50',
            left: '6',
            right: '15',
            bottom: '50',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: xLabel,
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {  
						   interval:0,  
						//    rotate:40,
						   color: '#fff'  
						},
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            data: ['2013年', '2014年', '2015年', '2016年', '2017年']
        }],
        
        yAxis: [{
            type: 'value',
            name: '单位：亿元',
            min: 0,
            max: 5000,
            interval: 1000,
            nameTextStyle: {
                color: '#fff'
            },
            axisLabel: {
                color: '#fff'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#72849d'
                }
            }
        }],

        series: [{
                name: '农林牧渔业（亿元）',
                type: 'bar',
                data: [1031.70, 1311.08, 1712.70,1944.32, 2139.97],
                barWidth: '6px'

            },
            {
                name: '工业（亿元）',
                type: 'bar',
                barWidth: '6px',
                 data: [2686.52,3140.88, 3315.58,3715.64,4260.48]
                
            },
            {
                name: '建筑业（亿元）',
                type: 'bar',
                barWidth: '6px',
                data: [590.69,717.69,833.44,955.44,1169.47]
            },
            {
                name: '金融业（亿元）',
                type: 'bar',
                barWidth: '6px',
                data: [444.53, 491.65, 607.11, 689.40, 787.88]
            },
            {
                name: '房地产业（亿元）',
                type: 'bar',
                barWidth: '6px',
                data: [202.94, 220.48, 232.07, 249.20, 283.05]
            },
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
    
}

// 贵州地图
var refreshPolarChart = function() {
    //var e = echarts.init(document.getElementById("polar_echart"));

};

//金融产品利率波动
var refreshRoseChart = function() {
    var e = echarts.init(document.getElementById("rose_echart"));
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
    var testArray4 = {
        message: true,
        xLabel: ["2013", "2014", "2015", "2016", "2017","2018"]
    }
    xLabel = testArray4.xLabel;
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // type: 'cross',
                // crossStyle: {
                //     color: '#72849d'
                // }
                type: 'shadow'
            }
        },
        legend: {

            // top: '50',
            // left: '6',
            // right: '15',
            // bottom: '50',
            // itemWidth: 10,
            itemGap: 10,
            top: '-5',
            left: '100',
            // bottom:'300',
            data: typeName,
            textStyle: {
                color: '#fff'
            },
            data:['国家基准利率','地方债利率']
        },
        grid: {
            top: '50',
            left: '20',
            right: '15',
            bottom: '5',
            containLabel: true
        },
        xAxis: [{
            boundaryGap: false,
            type: 'category',
            data: xLabel,
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {
                
                color: '#fff'
            },
            axisLine: {
            	show: true,
                lineStyle: {
                    color: 'rgba(0,0,0,0)'
                }
            }
        }],
        yAxis: [
            {
            name: '年利率',
            type: 'value',
            min: 0,
            max: 8,
            interval: 2.00,
            nameTextStyle: {
                color: '#fff'
            },

            axisLabel: {  
              show: true,  
              interval: 'auto',  
              formatter: '{value} %' ,
              color: '#fff' 
              }
              ,axisLine: {
            	show: true,
                lineStyle: {
                    color: 'rgba(0,0,0,0)'
                }
            }
        }

    ],
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
     series: [
   			{
                    name:'国家基准利率',
                 type: 'line',
        
          data: [6.4,6,5.25,4.75,4.75,4.75]
      	},
        {
            name:'地方债利率',
        	
	        data: [7.02,7.28,5.85,5.16,6.75,7.58],
	        type: 'line',
	       areaStyle: {normal: {
                                color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#8835c3'},
                                            {offset: 0.5, color: '#2837c6'},
                                            {offset: 1, color: '#000'}
                                        ]
                                )
                            }}
    		}
      ]
    };


    
    // 使用刚指定的配置项和数据显示图表。
    e.hideLoading();
    e.setOption(option), $(window).resize(e.resize);
};