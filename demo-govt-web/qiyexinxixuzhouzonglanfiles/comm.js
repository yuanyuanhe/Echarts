/**
 * 作者：赵延勇
 * 时间：2017年3月22日 10:13:01
 * 版本：1.0.0
 * 说明：注释要详细，修改要填写
 *
 * 修改人：
 * 修改时间：
 * 修改内容：
 * 修改版本：
 *
 * 修改人：
 * 修改时间：
 * 修改内容：
 * 修改版本：
 */
$(function(){

	// 设置右边内容区域最小高
	var documentHright = $(document).height();
	//$('#skin_admin_right').css('min-height',documentHright);

	var minHeight = documentHright - 50;
	//$('.right-wrapper').css('min-height',minHeight);
	//$('.welcome_box').css('min-height',minHeight-110);

	$(window).resize(function(){
		var documentSize = $(document).height();
		//$('#skin_admin_right').css('min-height',documentSize);
	})
	$(window).scroll(function() {
		var _height =  $(document).height();
		//$('#skin_admin_right').css('min-height',_height);
	})

	// 左边菜单展开关闭滑动效果
	$(".left-menu").on('click', '.slide-menu > li > a', function(){
		// 显示隐藏二级菜单
		$('.slide-menu > li').find('ul').addClass('slide-mark');
		$(this).parent().find('ul').removeClass('slide-mark');
		$(this).parent().find('ul').slideToggle(400);
		// 添加删除当前样式
		$(this).parent().toggleClass('active');
		$('.slide-menu > li').addClass('menu-mark');
		$(this).parent().removeClass('menu-mark');
		// 箭头控制
		if ($(this).parent().attr('class') == 'active') {
			$(this).find('.menu').removeClass('glyphicon-menu-right');
			$(this).find('.menu').addClass('glyphicon-menu-down');
		} else{
			$(this).find('.menu').addClass('glyphicon-menu-right');
			$(this).find('.menu').removeClass('glyphicon-menu-down');
		}
		// 隐藏除当前之外的所有二级菜单
		$('.slide-menu > li > .slide-mark').each(function(){
			$(this).slideUp(400);
			$(this).parent().removeClass('active');
		})
		// 隐藏除当前之外的所有active
		$('.slide-menu > .menu-mark').each(function(){
			$(this).removeClass('active');
			$(this).find('.menu').addClass('glyphicon-menu-right');
			$(this).find('.menu').removeClass('glyphicon-menu-down');
		})
	})

	// 头部显示隐藏动画
	$('#user-info-click').on('click',function(e){
		$(this).toggleClass('active');
		if($(this).attr('class') == 'active'){
			// 显示用户详细信息
			$('#user-info-details-display').show();
			$('#user-info-details-display').animate({
				top:'35px',
				opacity:'1'
			});
		}else{
			// 隐藏用户详细信息
			$('#user-info-details-display').animate({
				top:'20px',
				opacity:'0'
			},function(){
				$('#user-info-details-display').hide();
			})
		}
		// 监听点击别处隐藏用户信息
		$(document).one('click', function(){
			$('#user-info-details-display').animate({
				top:'20px',
				opacity:'0'
			},function(){
				$('#user-info-click').toggleClass('active');
				$('#user-info-details-display').hide();
			})
		});
		// 停止冒泡
		e.stopPropagation();
	})

	// 点击用户信息区域停止冒泡
	$('#user-info-details-display').on("click", function(e){
		e.stopPropagation();
	})

	// 用户修改密码摸态框动画控制
	$('#editPassword').on('click',function(){
		$('#editPwd').modal('toggle')
	})

	// 左边菜单图标设置
	/*$('.slide-menu > li > a').each(function(){
		var dataId =$(this).parent().data('id');
		if(dataId == 'ZLFX'){
			$(this).find('i').eq(0).addClass('fa fa-tv');
		}else if(dataId == 'LJRJG'){
			$(this).find('i').eq(0).addClass('fa fa-tasks');
		}else if(dataId == 'SCFX'){
			$(this).find('i').eq(0).addClass('fa fa-area-chart');
		}else if(dataId == 'SYQY'){
			$(this).find('i').eq(0).addClass('fa fa-pie-chart');
		}else if(dataId == 'LJRJG'){
			$(this).find('i').eq(0).addClass('fa fa-bank');
		}else if(dataId == 'QYCX'){
			$(this).find('i').eq(0).addClass('fa fa-users');
		}else if(dataId == 'ZHSZ'){
			$(this).find('i').eq(0).addClass('fa fa-cog');
		}else if(dataId == 'YHGL'){
			$(this).find('i').eq(0).addClass('fa fa-signal');
		}else if(dataId == 'XTCS'){
			$(this).find('i').eq(0).addClass('fa fa-cogs');
		}else if(dataId == 'YHGL'){
			$(this).find('i').eq(0).addClass('fa fa-ship');
		}else if(dataId == 'LDJSC'){
			$(this).find('i').eq(0).addClass('fa fa-id-card');
		}else if(dataId == 'MJQY'){
			$(this).find('i').eq(0).addClass('fa fa-bank');
		}else if(dataId == 'MJBB'){
			$(this).find('i').eq(0).addClass('fa fa-signal');
		}else if(dataId == 'MJFX'){
			$(this).find('i').eq(0).addClass('fa fa-pie-chart');
		}else if(dataId == 'XDBGGL'){
			$(this).find('i').eq(0).addClass('fa fa-line-chart');
		}

	})*/

	// 皮肤切换
	$('#skin_admin').on('click',function(){
		var _switch =$(this).data('switch');
		if(_switch == '0'){
			$('#skin_admin_right').animate({
				right:'0px'
			});
			$(this).data('switch','1')
		}else{
			$('#skin_admin_right').animate({
				right:'-35px'
			});
			$(this).data('switch','0')
		}
	})

	// 点击蓝色
	$('#skin_blue').on('click',function(){
		modelLoadDeepen();
		$("#comm_template").attr("href",basePath+"/STATIC/template/comm.css");
		$("#bootstrap_table_template").attr("href",basePath+"/STATIC/template/bootstrapTable/bootstrap-table.css");
		// 将皮肤数据存到session中
		localStorage.skin = "blue";
		closeLoad();
	})

	// 点击黑色
	$('#skin_black').on('click',function(){
		modelLoadDeepen();
		$("#comm_template").attr("href",basePath+"/STATIC/common/css/comm.css");
		$("#bootstrap_table_template").attr("href",basePath+"/STATIC/common/plugins/bootstrapTable/bootstrap-table.css");
		// 将皮肤数据存到session中
		localStorage.skin = "black";
		closeLoad();
	})

	// ....
	// 继续向下写需要的就行

})

// 左边菜单控制
function slideMenu(one, two){

	setTimeout(function(){
		// 左边菜单样式控制
		$('.slide-menu > li > a').each(function(){
			if($(this).parent().data('id') == one){
				// 显示隐藏二级菜单
				$('.slide-menu > li').find('ul').addClass('slide-mark');
				$(this).parent().find('ul').removeClass('slide-mark');
				$(this).parent().find('ul').slideToggle(0);
				// 添加删除当前样式
				$(this).parent().toggleClass('active');
				$('.slide-menu > li').addClass('menu-mark');
				$(this).parent().removeClass('menu-mark');
				// 二级菜单添加样式
				$(this).next('ul').find('li').each(function(){
					if($(this).data('id') == two){
						$(this).addClass('active');
					}
				})
			}
		})
	},'50')

}

// 点击一级菜单显示二级菜单
$('.navbar-menu>li').on('click',function(){
	$.post(basePath + 'service/LeftMenuController/leftSession?firstPermissionId='+$(this).data("title"), function (json) {
	});
	console.info("----",$(this).find(".menu-area").html());
	$('.navbar-menu>li').removeClass("active");
	$(this).addClass("active");
	$(".left-menu").html($(this).find(".menu-area").html());

	// 是否显示全屏退出全屏按钮
	if ($(this).data("id") == "LDJSC") {
		$(".enter_fullscreen").css("display", "inline-block");
	}
	else {
		$(".enter_fullscreen").hide();
	}
});

// 头部菜单
$('.navbar-menu > li').each(function() {
	var menuId = $(this).data("id");
	var title = $(this).data("title");
	var h_index = $("#h_index").val();

	if (title == h_index) {
		if (menuId == "LDJSC" || menuId == "FXYJ") {
			$(".head").addClass("bg");
			$(".enter_fullscreen").css("display", "inline-block");
		}
		else {
			$(".enter_fullscreen").css("display", "none");
		}
	}
});

// 全屏
$('.head').on('click', '.enter_fullscreen', function(){
	$(".head").hide();
	$(".left").hide();
	$(".right").css("padding-left", "0");
	$(".enter_fullscreen").hide();
	$(".quit_fullscreen").show();
});

// 全屏
$('.right').on('click', '.quit_fullscreen', function(){
	$(".head").show();
	$(".left").show();
	//$(".right").css("padding-left", "245px");
	$(".quit_fullscreen").hide();
	$(".enter_fullscreen").show();
});

// 默认显示的二级菜单
//$('.navbar-menu>li').eq($("#h_index").val()-1).addClass("active");
var index=$("#h_index").val();
$('.navbar-menu>li').each(function() {
	if($(this).data('title') == index){
		$(this).addClass('active');
		$(".left-menu").html($(this).find(".menu-area").html());
		//slideMenu(one, two);
	}
});

//$(".left-menu").html($('.navbar-menu>li').eq($("#h_index").val()-1).find(".menu-area").html());











