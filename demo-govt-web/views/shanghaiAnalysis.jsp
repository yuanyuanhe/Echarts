<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html class="bg">

	<head>
		<meta charset="utf-8" />
		<title>企业信息总览--上海市</title>
		<jsp:include page="/WEB-INF/views/include/commCss.jsp" flush="true" />
        <link rel="stylesheet" type="text/css" href="${basePath}/STATIC/leadcockpit/css/huangpu/analysis.css"/>
	</head>

<body class="bg">
	<jsp:include page="/WEB-INF/views/include/head.jsp" flush="true" />
	<!-- 右边 -->
	<div class="right">
		<!-- 右边框架 -->
		<div class="right-wrapper bg">
			<section class="right-title">
                <div class="right_name" style="width: 280px;">企业信息总览 — 上海</div>
                <div class="quit_fullscreen">
                    <img src="${basePath}STATIC/common/img/out.png">
                </div>
            </section>
			<section class="right-body">
				<div class="row">
					<div class="col-md-4">
						<div id="map" style="height: 660px;"></div>
                        <div class="tableBox">
                            <table class="table_map">
                                <tbody>
                                    <tr>
                                        <td>序号</td>
                                        <td>1</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>地区</td>
                                        <td><a style="color: #fff;" href="${basePath}service/HuangpuIndexController/huangpu?regionId=310101">黄浦区</a></td>
                                        <td><a style="color: #fff;" href="${basePath}service/HuangpuIndexController/huangpu?regionId=310115">浦东新区</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
					</div>
					<div class="col-md-8">
						<div class="row">
							<div class="col-md-12">
								<div class="ibox cbg">
									<div class="row">
									<div class="col-md-4 line" id="module1">
										<div class="ibox-title">
											<span>企业数量</span>
										</div>
										<div class="company_num"><em id="companyNum">123456</em>家</div>
                                        <div class="info_list">
                                            <div class="ibox-title pull-left">
                                                <span>涉及行业</span>
                                            </div>
                                            <div class="industry_number">（<em>0</em>）</div>
                                        </div>
                                        <div class="info_list">
                                            <ul class="industry_list"></ul>
                                        </div>
									</div>
                                        <div class="col-md-4 line">
                                            <div class="ibox-title">
                                                <span>企业规模</span>
                                            </div>
                                            <div id="pie_chart" style="height: 200px;"></div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="company_list">
                                                <table class="table_company">
                                                    <thead>
                                                    <tr>
                                                        <th>企业类型</th>
                                                        <th>数量(家)</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                        </div>
								    </div>
								</div>
							</div>

						</div>
						<div class="row">
							<div class="col-md-12">
								<div class="data_list1">
                                    <div class="ibox cbg">
                                        <div class="ibox-title">
                                            <span>类金融</span>
                                        </div>
                                        <div class="company_num"><em id="industryNum">0</em>家</div>
                                        <div class="data_table">
                                            <div class="table_list" style="padding-right: 15px;">
                                                <table class="table_industry">
                                                    <thead>
                                                        <tr>
                                                            <th>机构类型</th>
                                                            <th class="text-center">数量(家)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                            <div class="table_list" style="padding-left: 15px;">
                                                <table class="table_industry">
                                                    <thead>
                                                    <tr>
                                                        <th>机构类型</th>
                                                        <th class="text-center">数量(家)</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
								<div class="data_list2">
                                    <div class="ibox cbg">
                                        <div class="ibox-title">
                                            <span>质疑风险企业</span>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="company_info"><span>企业</span><em id="comBlackNums">0</em>家</div>
                                                <div id="bar_chart1" style="height: 165px;"></div>
                                                <div class="chart_hint">黑名单数量排名前3的行业</div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="company_info"><span>类金融</span><em id="ljrBlackNums">0</em>家</div>
                                                <div id="bar_chart2" style="height: 165px;"></div>
                                                <div class="chart_hint">黑名单数量排名前3的类金融类型</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
							</div>
						</div>
					</div>
				</div>


			</section>

		</div><!--./right-wrapper-->
	</div>
	<!--./right-->
</body>
<jsp:include page="/WEB-INF/views/include/commJs.jsp" flush="true" />
    <script src="${basePath}/STATIC/common/plugins/echarts/echarts-wordcloud.min.js"></script>
    <script src="${basePath}/STATIC/leadcockpit/js/logic/huangpu/analysis.js"></script>
</html>