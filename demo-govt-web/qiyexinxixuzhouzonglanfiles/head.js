/***
 * 头部用户信息及修改密码js
 */
$(function () {
	//点击取消按钮后清空form表单
	$("#cancle").click(function(){
		$('#editPwds')[0].reset();
		$("#editPwds div.error").text("");
	});


	$("#editPwds").validate({
		rules: {
			password: {
				required: true,
				rangelength: [6, 20],
				alnum: true,
				checkNewPassword: true
			},
			rePassword: {
				required: true,
				checkPassword: true
			},
			oldPassword: {
				required: true,
				checkOldPassword: true
			}
		},
		errorPlacement: function(error, element){
            error.appendTo(element.parent().parent().next());
        },

        submitHandler: function (form) {
			subChangePassword();
        }
    });

	var icon = "<i class='glyphicon glyphicon-exclamation-sign'></i>";
	//验证输入的新密码与旧密码是否相同
	$.validator.addMethod("checkNewPassword", function(value, element) {
		if(checkNewPassword(value)){
			return true;
		}else{
			return false;
		}
    }, icon+"新密码与原密码不能相同!");
	//验证两次密码输入是否一致
	$.validator.addMethod("checkPassword", function(value, element) {

		var password = $("#password").val();
		if(value == password){
			return true;
		}else{
			return false;
		}
    }, icon+"两次输入密码不一致!");
	//验证输入的原密码是否正确
	$.validator.addMethod("checkOldPassword", function(value, element) {
		if(checkOldPassword(value)){
			return true;
		}else{
			return false;
		}
    }, icon+"旧密码不正确!");
});


function subChangePassword(){
	 $.post(basePath + "service/password/changePassword", $("#editPwds").serialize(),function(data){
		 if(data.success){
			 alertOkFun(data.msg,function(){
				 window.location.href = basePath;
			 });
		 }else{
			 alertErr(data.msg);
		 }
	}, 'json');
}


//验证输入的新密码与旧密码是否相同
function checkNewPassword(password) {
	var userId = $("#userId").val();
	var url = basePath+"service/password/checkNewPassword";
	$.ajax({
		type: "GET",
		url: url,
		data: {password: password},
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		async: false,//异步
		success: function (json) {
			result = json.success ;
		}, failure: function () {
			result = "";
		}
	})
	return result;
}

//验证输入的旧密码是否正确
function checkOldPassword(password) {
	var url = basePath+"service/password/checkOldPassword";
	$.ajax({
		type: "GET",
		url: url,
		data: {password: password},
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		async: false,//异步
		success: function (json) {
			result = json.success ;
		}, failure: function () {
			result = "";
		}
	})
	return result;
}
