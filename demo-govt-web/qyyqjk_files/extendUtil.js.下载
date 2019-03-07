/**
 * 表单转json对象方法
 */

	(function($){
        $.fn.serializeJson=function(){
            var serializeObj={};
            var array=this.serializeArray();
            var str=this.serialize();
            $(array).each(function(){
                if(serializeObj[this.name]){
                    if($.isArray(serializeObj[this.name])){
                        serializeObj[this.name].push(this.value);
                    }else{
                        serializeObj[this.name]=[serializeObj[this.name],this.value];
                    }
                }else{
                    serializeObj[this.name]=this.value;
                }
            });
            return serializeObj;
        };
    })(jQuery);

	/**
	 * 成功提示
	 * @return
	 */
	function alertOk(msg){
		layer.alert(msg, {icon: 6});
	}

	/**
	 * 成功提示[带回调函数]
	 * @return
	 */
	function alertOkCall(msg,callback){
		layer.alert(msg, {icon: 6},function(){
			callback();
		});
	}

	/**
	 * 成功提示.1s后自动执行回调函数
	 * @return
	 */
	function alertOkFun(msg,callback){
		layer.alert(msg, {icon: 6});
		setTimeout(function(){
			  layer.closeAll();
			  callback();
		}, 1000);
	}

	/**
	 * 失败提示
	 * @return
	 */
	function alertErr(msg){
		layer.alert(msg, {icon: 5});
		setTimeout(function(){
			  layer.closeAll('loading');
		}, 5000);
	}

	/**
	 * 弹出遮罩层
	 * @return
	 */
	function modelLoad(){
		layer.msg('加载中', {
			time: 600000, //2秒关闭（如果不配置，默认是3秒）
			icon: 16,
			shade: 0.1
		});
	}

	/**
	 * 透明度加深弹出遮罩层
	 * @return
	 */
	function modelLoadDeepen(){
		layer.msg('加载中', {
			time: 600000, //2秒关闭（如果不配置，默认是3秒）
			icon: 16,
			shade: 0.8
		});
	}

	/**
	 * 邮件发送遮罩层
	 * @return
	 */
	function tipsLoad(){
		layer.msg('邮件发送中...', {
			time: 600000, //2秒关闭（如果不配置，默认是3秒）
			icon: 16,
			shade: 0.1
		});
	}

	/**
	 * 关闭遮罩层
	 * @return
	 */
	function closeLoad(){
		 layer.closeAll();
	}

	/**
	 * 表格没有数据提示
	 * @return
	 */
	function notData(){
		var str = '<td class="not-data">没有找到匹配的记录</td>';
		return str;
	}


