<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html class="bg">

<head>
    <meta charset="utf-8"/>
    <title>企业信息总览</title>
    <jsp:include page="/WEB-INF/views/include/commCss.jsp" flush="true"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/STATIC/leadcockpit/css/huangpu.css"/>
    <link rel="stylesheet" href="${basePath}STATIC/demo/css/swiper-3.4.2.min.css"/>
</head>

<body class="bg">
<jsp:include page="/WEB-INF/views/include/head.jsp" flush="true"/>
<!-- 右边 -->
<div class="right">
    <!-- 右边框架 -->
    <div class="right-wrapper bg">
        <section class="right-title">
            <div class="right_name" style="width: 300px;">企业信息总览 - <span id="pageTitle"></span></div>
            <div class="quit_fullscreen">
                <img src="${basePath}STATIC/common/img/out.png">
            </div>
        </section>
        <section class="right-body" style="padding: 0 5%;margin-top: 10px;">
            <div class="content-top">
                <div class="content-top-left content-box cbg pull-left"
                     style="width: 55%;padding: 15px 15px;height: 416px;">
                    <div class="col-sm-5">
                        <div class="ibox-title">
                            <span>企业数量</span>
                        </div>
                        <div style="color: #fff;text-align: center;margin: 20px 0;">
                            <span style="color: #f28a62;font-size: 26px;margin-right: 10px;" id="enterpriseNum">0</span>家
                        </div>
                        <div class="ibox-title">
                            <span>企业规模</span>
                        </div>
                        <div style="color: #fff;text-align: center;margin: 20px 0;width: 100%;min-width: 285px;">
                            <div id="pinchart">

                            </div>
                        </div>
                    </div>
                    <div class="col-sm-7">
                        <div class="ibox-title">
                            <span>涉及行业</span>
                        </div>
                        <div style="color: #fff;margin: 20px 0;">
                            <table>
                                <thead>
                                <tr>
                                    <th style="padding-left: 20px;">行业名称</th>
                                    <th style="width: 150px;text-align: center;">数量（家）</th>
                                </tr>
                                </thead>
                                <tbody id="hangye">
                                <%--<tr>--%>
                                <%--<td>采矿业</td>--%>
                                <%--<td>2333</td>--%>
                                <%--</tr>--%>
                                <%--<tr>--%>
                                <%--<td>采矿业</td>--%>
                                <%--<td>2333</td>--%>
                                <%--</tr>--%>
                                <%--<tr>--%>
                                <%--<td>采矿业</td>--%>
                                <%--<td>2333</td>--%>
                                <%--</tr>--%>
                                <%--<tr>--%>
                                <%--<td>采矿业</td>--%>
                                <%--<td>2333</td>--%>
                                <%--</tr>--%>
                                <%--<tr>--%>
                                <%--<td>采矿业</td>--%>
                                <%--<td>2333</td>--%>
                                <%--</tr>--%>
                                <%--<tr>--%>
                                <%--<td>采矿业</td>--%>
                                <%--<td>2333</td>--%>
                                <%--</tr>--%>
                                <%--<tr>--%>
                                <%--<td>采矿业</td>--%>
                                <%--<td>2333</td>--%>
                                <%--</tr>--%>
                                <%--<tr>--%>
                                <%--<td>采矿业</td>--%>
                                <%--<td>2333</td>--%>
                                <%--</tr>--%>
                                <%--<tr>--%>
                                <%--<td>采矿业</td>--%>
                                <%--<td>2333</td>--%>
                                <%--</tr>--%>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="content-top-left content-box cbg pull-right"
                     style="width: 44%;padding-left: 40px;height: 416px;">
                    <div class="ibox-title">
                        <span>类金融机构</span>
                    </div>
                    <div class="col-sm-6">

                        <div style="color: #fff;text-align: center;margin: 20px 0;">
                            <span style="color: #f28a62;font-size: 26px;margin-right: 10px;" id="pseudoBanking">0</span>家
                        </div>
                        <div style="color: #fff;margin-top:55px;">
                            前3名的机构类型
                        </div>
                        <div id="barChart" style="height: 180px">

                        </div>
                    </div>
                    <div class="col-sm-6">
                        <table>
                            <thead>
                            <tr>
                                <th style="padding-left: 10px;">机构类型</th>
                                <th style="width: 100px;">数量（家）</th>
                            </tr>
                            </thead>
                            <tbody id="pseudoBankingTable">
                            <%--<tr style="color: #fff;">--%>
                            <%--<td style="padding-top:16px;padding-bottom: 16px;">--%>
                            <%--小额贷款--%>
                            <%--</td>--%>
                            <%--<td style="color: #35a3da;padding-top:16px;padding-bottom: 16px;">--%>
                            <%--2333--%>
                            <%--</td>--%>
                            <%--</tr>--%>
                            <%--<tr style="color: #fff;">--%>
                            <%--<td style="padding-top:16px;padding-bottom: 16px;">--%>
                            <%--小额贷款--%>
                            <%--</td>--%>
                            <%--<td style="color: #35a3da;padding-top:16px;padding-bottom: 16px;">--%>
                            <%--2333--%>
                            <%--</td>--%>
                            <%--</tr>--%>
                            <%--<tr style="color: #fff;">--%>
                            <%--<td style="padding-top:16px;padding-bottom: 16px;">--%>
                            <%--小额贷款--%>
                            <%--</td>--%>
                            <%--<td style="color: #35a3da;padding-top:16px;padding-bottom: 16px;">--%>
                            <%--2333--%>
                            <%--</td>--%>
                            <%--</tr>--%>
                            <%--<tr style="color: #fff;">--%>
                            <%--<td style="padding-top:16px;padding-bottom: 16px;">--%>
                            <%--小额贷款--%>
                            <%--</td>--%>
                            <%--<td style="color: #35a3da;padding-top:16px;padding-bottom: 16px;">--%>
                            <%--2333--%>
                            <%--</td>--%>
                            <%--</tr>--%>
                            <%--<tr style="color: #fff;">--%>
                            <%--<td style="padding-top:16px;padding-bottom: 16px;font-size: 16px;">--%>
                            <%--小额贷款--%>
                            <%--</td>--%>
                            <%--<td style="color: #35a3da;padding-top:16px;padding-bottom: 16px;">--%>
                            <%--2333--%>
                            <%--</td>--%>
                            <%--</tr>--%>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="content-bottom content-box cbg clearfix">
                <div class="col-sm-4">
                    <div class="ibox-title">
                        <span>质疑风险企业</span>
                    </div>
                    <div id="annulusChart">

                    </div>
                </div>
                <div class="col-sm-8" style="padding-top: 20px;">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <%--<div class="col-sm-6">--%>
                                <%--<table class="slider-table">--%>
                                <%--<thead>--%>
                                <%--<tr>--%>
                                <%--<th style="padding-left: 10px;text-align: center;">企业名称</th>--%>
                                <%--<th style="width: 100px;">法人代表</th>--%>
                                <%--</tr>--%>
                                <%--</thead>--%>
                                <%--<tbody>--%>
                                <%--<tr style="color: #fff;">--%>
                                <%--<td>--%>
                                <%--小额贷款--%>
                                <%--</td>--%>
                                <%--<td>--%>
                                <%--2333--%>
                                <%--</td>--%>
                                <%--</tr>--%>
                                <%--</table>--%>
                                <%--</div>--%>
                                <%--<div class="col-sm-6">--%>
                                <%--<table class="slider-table">--%>
                                <%--<thead>--%>
                                <%--<tr>--%>
                                <%--<th style="padding-left: 10px;text-align: center;">企业名称</th>--%>
                                <%--<th style="width: 100px;">法人代表</th>--%>
                                <%--</tr>--%>
                                <%--</thead>--%>
                                <%--<tbody>--%>
                                <%--<tr style="color: #fff;">--%>
                                <%--<td>--%>
                                <%--小额贷款--%>
                                <%--</td>--%>
                                <%--<td>--%>
                                <%--2333--%>
                                <%--</td>--%>
                                <%--</tr>--%>
                                <%--</table>--%>
                                <%--</div>--%>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
    <!--./right-wrapper-->
</div>
<!--./right-->
</body>
<jsp:include page="/WEB-INF/views/include/commJs.jsp" flush="true"/>
<script src="${basePath}/STATIC/common/plugins/echarts/echarts-wordcloud.min.js"></script>
<script src="${basePath}/STATIC/demo/js/swiper-3.4.2.jquery.min.js"></script>
<script src="${basePath}/STATIC/leadcockpit/js/logic/huangpu/huangpu.js"></script>
<script>
    $(function () {
        var regionid = getParam('regionId')// '310101'
        var cityName = {
            310101: '黄浦区',
            310115: '浦东新区'
        }
        $('#pageTitle').text(cityName[regionid])
        //获取URL参数
        function getParam(paramName) {
            paramValue = "", isFound = !1;
            if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
                arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
                while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
            }
            return paramValue == "" && (paramValue = null), paramValue
        }

        //获取地区企业总数
        $.ajax({
            url: basePath + '/service/shComInfo/getCompanyCountByRegionId',
            data: {
                regionId: regionid
            },
            success: function (data) {
                $('#enterpriseNum').text(data)
            }
        });
        //获取行业类型
        $.ajax({
            url: basePath + '/service/shComInfo/getIndustryTypeByRegionId',
            data: {
                regionId: regionid
            },
            success: function (data) {
                var html = ''
                for (k in data) {
                    html += '<tr><td>' + k + '</td><td>' + data[k] + '</td></tr>'
                }
                $('#hangye').html(html)
            }

        })
        //获取注册资金占比
        $.ajax({
            url: basePath + '/service/shComInfo/getRegisteredRatioByRegionId',
            data: {
                regionId: regionid
            },
            success: function (data) {
                initPin(data);
            }
        })
        //获取类金融信息
        $.ajax({
            url: basePath + '/service/shComInfo/getSimilarFinancingByRegionId',
            data: {
                regionId: regionid
            },
            success: function (data) {
                initBar(data);
                var allCategory = [
                        '小额贷款',
                        '典当',
                        '股权交易',
                        '地方资产',
                        '担保',
                        '租赁',
                        '商业保理',
                        '交易所'
                ];

                    allCategory.forEach(function(v){
                       if(!(data[v])){
                           data[v] = 0
                       }
                    });

                console.log(data);
                var sum = 0
                var html = ''
                var dataArr = []
                for (k in data) {
                    dataArr.push({
                        name:k,
                        value:data[k]
                    })
                }
                dataArr.forEach(function(v){
                    sum += v.value
                })

                dataArr.splice(0,3)
                dataArr.forEach(function(v){

                    html += '<tr style="color: #fff;"> <td style="padding-top:15px;padding-bottom: 15px;">' + v.name + '</td><td style="color: #35a3da;padding-top:10px;padding-bottom: 10px;">' + v.value + '</td></tr>'
                })

                $('#pseudoBanking').text(sum)
                $('#pseudoBankingTable').html(html)

            }
        })
        //获取失信黑名单比例
        $.ajax({
            url: basePath + '/service/shComInfo/getBlacklistCountByRegionId',
            data: {
                regionId: regionid
            },
            success: function (data) {
                initAnnulus(data);
            }

        })
        //获取全部失信黑名单
        $.ajax({
            url: basePath + '/service/shComInfo/getBlacklistLJRListByRegionId',
            data: {
                regionId: regionid
            },
            success: function (data) {
                var sliceArr = sliceArray(data, 14)
                var html = '';
                if(sliceArr.length==0){
                    html += '<div class="swiper-slide">';
                    html += '<div class="col-sm-6"><table class="slider-table"> <thead><tr><th style="padding-left: 10px;text-align: center;">企业名称</th><th style="width: 100px;">法人代表</th></tr></thead><tbody>'
                    html += '</tbody></table></div>'
                    html += '<div class="col-sm-6"><table class="slider-table"> <thead><tr><th style="padding-left: 10px;text-align: center;">企业名称</th><th style="width: 100px;">法人代表</th></tr></thead><tbody>'
                    html += '</tbody></table></div>'
                    html += '</div>'
                }
                sliceArr.forEach(function (v) {
                    html += '<div class="swiper-slide">';
                    var arr1 = sliceArray(v, 7)
                    html += '<div class="col-sm-6"><table class="slider-table"> <thead><tr><th style="padding-left: 10px;text-align: center;">企业名称</th><th style="width: 100px;">法人代表</th></tr></thead><tbody>'
                    if(arr1[0]){
                        arr1[0].forEach(function (value) {
                            html += '<tr style="color: #fff;"><td>' + value.companyName + '</td><td>' + value.legalPerson + '</td></tr>'
                        });
                    }
                    html += '</tbody></table></div>'
                    html += '<div class="col-sm-6"><table class="slider-table"> <thead><tr><th style="padding-left: 10px;text-align: center;">企业名称</th><th style="width: 100px;">法人代表</th></tr></thead><tbody>'
                    if(arr1[1]){
                        arr1[1].forEach(function (value) {
                            html += '<tr style="color: #fff;"><td>' + value.companyName + '</td><td>' + value.legalPerson + '</td></tr>'
                        });
                    }
                    html += '</tbody></table></div>'
                    html += '</div>'

                });

                $('.swiper-wrapper').html(html)
                var mySwiper = new Swiper('.swiper-container', {
                    autoplay: 5000,//可选选项，自动滑动
                })
            }
        });
        //分割数组
        function sliceArray(array, size) {
            var result = [];
            for (var x = 0; x < Math.ceil(array.length / size); x++) {
                var start = x * size;
                var end = start + size;
                result.push(array.slice(start, end));
            }
            return result;
        }
    });
    function initPin(data) {
        var pindata = [
            {
                value: data['1000万以上'], name: '1000万以上', itemStyle: {
                normal: {color: '#04788d'}
            }
            },
            {
                value: data['介于300-1000万'], name: '300-1000万', itemStyle: {
                normal: {
                    color: '#0f69ed'
                }
            }
            },
            {
                value: data['小于300万'], name: '300万以内', itemStyle: {
                normal: {color: '#079bec'}
            }
            }
        ]
        var pinchart = echarts.init(document.getElementById('pinchart'));
        var pinoption = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: '企业规模',
                    type: 'pie',
                    radius: '63%',
                    center: ['45%', '60%'],
                    data: pindata,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {
                        normal: {
                            color: '#fff'
                        }
                    },
                }
            ]
        };
        pinchart.setOption(pinoption)
    }
    function initBar(data) {
        var barchart = echarts.init(document.getElementById(('barChart')))

        var arr = []
        for (k in data) {
            arr.push({
                        name: k,
                        value: data[k]
                    }
            )
        }

        var dataObj = arr.slice(0, 3)
        var yData = [dataObj[2].name, dataObj[1].name, dataObj[0].name];
        var barData = [{
            value: dataObj[2].value,
            itemStyle: {
                normal: {
                    color: '#095067'
                }
            }
        }, {
            value: dataObj[1].value,
            itemStyle: {
                normal: {
                    color: '#0a6583'
                }
            }
        }, {
            value: dataObj[0].value,
            itemStyle: {
                normal: {
                    color: '#0d83aa'
                }
            }

        }];
        var option = {
            tooltip:{
                show:true
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: 10,
                containLabel: true
            },
            xAxis: {
                type: 'value',
                show: false,
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    fontSize: 16
                },
                axisTick: {
                    show: false
                },
                type: 'category',
                data: yData
            },
            series: [
                {
                    barWidth: 20,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20
                        }
                    },
                    label: {
                        normal: {
                            color: '#fff',
                            show: true,
                            position: 'bottom',
                            formatter: '{c}家'
                        }
                    },
                    name: '数量',
                    type: 'bar',
                    data: barData
                }
            ]
        };
        barchart.setOption(option)
    }
    function initAnnulus(data) {
        var annulusChart = echarts.init(document.getElementById('annulusChart'));
        var auuulusData = [
            {
                value: data.ljrBlackNums, name: '类金融机构', itemStyle: {
                normal: {
                    color: '#1156c8'
                }
            }
            },
            {
                value: data.comBlackNums, name: '非类金融机构', itemStyle: {
                normal: {
                    color: '#dc2c32'
                }
            }
            }
        ]
        var sum = data.ljrBlackNums + data.comBlackNums
        var option = {
//            tooltip: {
//                trigger: 'item',
//                formatter: "{a} <br/>{b}: {c} ({d}%)"
//            },
            legend: {
                orient: 'vertical',
                right: 30,
                bottom: 60,
                data: ['类金融机构', '非类金融机构'],
                textStyle: {
                    color: '#fff'
                }
            },
            series: [
                {
                    name: '背景',
                    type: 'pie',
                    hoverAnimation: false,
                    center: ['50%', '50%'],
                    radius: [0, '50%'],
//                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: sum + '(家)',
                            color: '#fff',
                            fontSize: 16
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {
                            value: 335, name: '背景', itemStyle: {
                            normal: {
                                color: 'rgba(0,144,255,0.3)'
                            },
                            emphasis: {}
                        }
                        }
                    ]
                },
                {
                    name: '访问来源',
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            color: '#fff',
                            fontSize: 16,
                            formatter: '{c}家',
                            length: 5,
                            length2: 10
                        }
                    },
                    z: 10,
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data: auuulusData
                }
            ]
        };
        annulusChart.setOption(option)
    }
</script>
</html>