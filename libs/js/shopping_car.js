$(function(){
	$("#left_bar_common").load("left_bar.html?_m="+Math.random());
	$("#footer_common").load("footer.html?_m="+Math.random());
	$("#top_bar_common").load("top_bar.html?_m="+Math.random());
	
	//	头部导航栏图标切换
	$("#head_list li").click(function(){
		$("a",this).css("background-position-x","-100px").parents("li").siblings().find("a").css("background-position-x","0px");
	});
   	
//回到顶部
	$("#btn_top").click(function(){
		$('html,body').animate({scrollTop: '0px'},300);
	});
	
	//右边导航栏切换
	$("#turn").click(function(){
		if($(this).text() == "<"){
			$(this).parents(".right_bar").animate({
				right : 0
			},200);
			$(this).text(">");
		}else if($(this).text() == ">"){
			$(this).parents(".right_bar").animate({
				right : "-100px"
			},200);
			$(this).text("<");
		}
	});

	//帮助菜单
	$(".help_menu li").on("mouseenter","a",function(){
		$(this).css("background-position-x","-100px");
	}).on("mouseleave","a",function(){
		$(this).css("background-position-x","0px");
	});
	
	//微信二维码显示
	$(".help_menu #wechat").on("mouseenter","a",function(){
		$("#wechat_pop").show();
	}).on("mouseleave","a",function(){
		$("#wechat_pop").hide();
	});
	$("#wechat_pop").on("mouseenter",function(){
		$(this).show();
	}).on("mouseleave",function(){
		$(this).hide();
	});
	
	//搜索栏
	$(".quick_search").on("click",function(){
		$(this).siblings(".search_btn").show();
	});
	
	$(".search_go").on("click",function(){
		if($(".search_bar").val() == ""){
			alert("请输入商品名称！");
		}
	});
	
	//点击其他地方搜索栏隐藏
	$(document).on("click",function(e){
		var target = $(e.target);
		if(target.closest(".search_btn").length == 0 && target.closest(".quick_search").length == 0){
			$(".search_btn").hide();
		}
	});
	
	
	
//	往购物车页面添加商品信息
	if($.cookie("goods")){
		$(".car_no").hide();
		$("#gift_detail").show();
		var goods = $.cookie("goods");
		var arr = JSON.parse(goods);
		console.log(arr);
		var len = arr.length;
		$(".shopping_num").text(len);
		for(var i=0;i<arr.length;i++){
//			拼接html
			var _html = "<div class='car_item clearfix' id='"+arr[i].id+"'><div class='goods_detail'>";
			_html += "<input type='checkbox' name='buying' class='select_buy' checked='checked' /><a href='details.html'>";
			_html += "<img src="+arr[i].src+" class='good_img'></a>";
			_html += "<div class='goods_title'><p>"+arr[i].title_en+"</p>";
			_html += "<span class='selected_color'>"+arr[i].color+"</span> / <span class='selected_size'>"+arr[i].size+"</span><br/>";
			_html += "<a href='#' class='goods_alt'></a><a href='#' class='goods_col'></a><a href='#' class='goods_del'></a></div></div>";
			_html += "<div class='goods_price'>￥"+arr[i].price+"<h4>玛瑙会员 0% : ￥";
			_html += "<span class='per_price'>"+arr[i].price+"</span></h4></div>";
			_html += "<div class='goods_emoney'>￥"+arr[i].emoney+"</div>";
			_html += "<div class='goods_num'><a href='#' class='reduce_num'></a>";
			_html += "<input type='text' class='buy_num' value="+arr[i].num+" maxlength='3' />";
			_html += "<a href='#' class='add_num'></a></div>";
			_html += "<div class='goods_sum'>￥<span class='total_price'>0</span></div></div>";
			$("#car_body").append(_html);
		}
		get_per_total();
		getTotal();
	}else{
		$(".car_no").show();
		$("#gift_detail").hide();
	}
	
//	计算每一栏的总价
	function get_per_total(){
		$(".total_price").each(function(){
			var per_total = 0;
			var price = parseFloat($(this).closest(".car_item").find(".per_price").text());
			var num = $(this).closest(".car_item").find(".buy_num").val();
			per_total = parseFloat(price * num);
			$(this).text(per_total.toFixed(2));
		});
	}
	
	
//	计算总价钱
	function getTotal(){
		var total = 0;
		var discount = 10;
		$("#good_discount").text(parseFloat(discount).toFixed(2));
		$(".select_buy:checked").closest(".car_item").find(".total_price").each(function(){
			total += parseFloat($(this).text());
		});
		$("#total_money").text(total.toFixed(2));
		var pay = 0;
		var reduce = parseFloat($("#good_discount").text());
		pay = total - reduce;
		if(total == 0){
			$("#total_money").text("0");
			$("#good_discount").text("0");
			$("#pay_money").text("0");
		}else{
			$("#pay_money").text(pay.toFixed(2));
		}
	}
				
//	绑定全选和单选按钮
	var $checkbox = $('input[name=buying]');
	$('#all').on('change',function(){
		var _checked = $(this).prop('checked');
		$checkbox.prop('checked',_checked);
	});
	$checkbox.on('change',function(){
		var $checked = $checkbox.filter(':checked');
		$('#all').prop('checked',$checkbox.length == $checked.length);
	});
	
//	checkbox改变时绑定事件
	$("input[type=checkbox]").on("change",function(){
		getTotal();
	});
	
//	添加和删减商品
	$(".goods_num").on("click",".add_num",function(){
		var _num = $(this).closest(".goods_num").find("input").val();
		_num++;
		$(this).closest(".goods_num").find("input").val(_num);
		get_per_total();
		getTotal();
//		修改cookie里面对应商品的数量
		var index = $(this).closest(".car_item").index()-1;
		console.log(index);
		var goods = $.cookie("goods");
		var arr = JSON.parse(goods);
		n = arr[index].num;
		modifyCookie(index,n,_num);
		return false;
	}).on("click",".reduce_num",function(){
		var _num = $(this).closest(".goods_num").find("input").val();
		if(_num==1){
			alert("数量不能小于1！");
		}else{
			_num--;
			$(this).closest(".goods_num").find("input").val(_num);
		}
		get_per_total();
		getTotal();
//		修改cookie里面对应商品的数量		
		var index = $(this).closest(".car_item").index()-1;	
		var goods = $.cookie("goods");
		var arr = JSON.parse(goods);
		n = arr[index].num;
		modifyCookie(index,n,_num);
		return false;
	});
	
//	在输入框里面输入数量
	$("input",".goods_num").on("change",function(){
		var _num = $(this).closest(".goods_num").find("input").val();
		if($(this).closest(".goods_num").find("input").val() <= 0){
			alert("数量不能小于1！");
			$(this).closest(".goods_num").find("input").val("1");
		}
		get_per_total();
		getTotal();	
//		修改cookie里面对应商品的数量		
		var index = $(this).closest(".car_item").index()-1;
		console.log(index);
		var goods = $.cookie("goods");
		var arr = JSON.parse(goods);
		n = arr[index].num;
		modifyCookie(index,n,_num);
	});
	
//	修改cookie的数量
	function modifyCookie(i,num,value){
		var goods = $.cookie("goods");
		var arr = JSON.parse(goods);
		arr[i].num = value;
		goods = JSON.stringify(arr);
		$.cookie("goods",goods,{expires: 10,path: '/'});
	}
	
//	删除收藏的商品
	$(".goods_del").on("click",function(){
		var index = $(this).closest(".car_item").index()-1;
		$(this).closest(".car_item").remove();
		$(".car_no").show();
		$("#gift_detail").hide();
		var goods = $.cookie("goods");
		var arr = JSON.parse(goods);
		arr.splice(index,1);
		console.log(arr.length);
		if(arr.length == 0){
//			当没有的时候就移除cookie
			$.cookie("goods",goods,{expires: -1,path: '/'});
		}else{
			goods = JSON.stringify(arr);
			$.cookie("goods",goods,{expires: 10,path: '/'});
		}
		get_per_total();
		getTotal();
		return false;
	});
	
//	编辑购物车的商品
	var ii = 0;			//定义全局变量判断当前修改属性的商品的下标
	$(".goods_alt").on("click",function(){
		$(".change_car").show();
		$(".cover_all").show();
		ii = $(this).closest(".car_item").index()-1;
		var goods = $.cookie("goods");
		var arr = JSON.parse(goods);
		$("#change_img").attr("src",arr[ii].src);
		$("#title_en").text(arr[ii].title_en);
		$("#good_abstract").text(arr[ii].abstract);
		$("#good_Gamount").text(arr[ii].price);
		$("#good_Gemoney").text(arr[ii].emoney);
		//拼接select字符串
		c_html = "<option value='no'>"+arr[ii].all_color[0]+"</option>"
		for(var j=1;j<arr[ii].all_color.length;j++){
			if(arr[ii].all_color[j] == arr[ii].color){
				c_html += "<option value='"+arr[ii].all_color[j]+"' selected='selected'>"+arr[ii].all_color[j]+"</option>";
			}else{
				c_html += "<option value='"+arr[ii].all_color[j]+"'>"+arr[ii].all_color[j]+"</option>";
			}	
		}
		$("select[name='gcolor']").html(c_html);

		s_html = "<option value='no'>"+arr[ii].all_color[0]+"</option>"
		for(var j=1;j<arr[ii].all_size.length;j++){
			if(arr[ii].all_size[j] == arr[ii].size){
				s_html += "<option value='"+arr[ii].all_size[j]+"' selected='selected'>"+arr[ii].all_size[j]+"</option>";
			}else{
				s_html += "<option value='"+arr[ii].all_size[j]+"'>"+arr[ii].all_size[j]+"</option>";
			}
		}
		$("select[name='gsize']").html(s_html);
		$("input[name='gQty']").val(arr[ii].num);
		return false;
	});
	
//	修改信息界面增加 减少数量
	$(".sell_content").on("click","#add",function(){
		var _num = $("#gQty").val();
		_num++;
		$("#gQty").val(_num);
		return false;
	}).on("click","#reduce",function(){
		var _num = $("#gQty").val();
		if(_num==1){
			alert("数量不能小于1！");
		}else{
			_num--;
			$("#gQty").val(_num);
		}
		return false;
	});
	
	$("#gQty").on("change",function(){
		if($("#gQty").val() <= 0){
			alert("数量不能小于1！");
			$("#gQty").val("1");
		}
	});
	
//	提交修改
	$(".submit_change").on("click",function(){
		if($("option:first-child","select[name='gcolor']").is(":selected")){
			alert("请选择颜色");
			return false;
		}else if($("option:first-child","select[name='gsize']").is(":selected")){
			alert("请选择尺寸");
			return false;
		}else{
			var _color = $("option:selected","select[name='gcolor']").text();
			var _size= $("option:selected","select[name='gsize']").text();
			var _num = $("input[name='gQty']").val();
//			改变对应位置的color，size，num的html
			$(".selected_color").eq(ii).html(_color);
			$(".selected_size").eq(ii).html(_size);
			$(".buy_num").eq(ii).val(_num);
			var goods = $.cookie("goods");
			var arr = JSON.parse(goods);
			arr[ii].color = _color;
			arr[ii].size = _size;
			arr[ii].num = _num;
			goods = JSON.stringify(arr);
			$.cookie("goods",goods,{expires: 10,path: '/'});
			$(".change_car").hide();
			$(".cover_all").hide();
			get_per_total();
			getTotal();
			return false;
		}
	});
	
//	取消修改及关闭编辑页面
	$(".cancel_change").on("click",function(){
		$(".change_car").hide();
		$(".cover_all").hide();
		return false;
	});
	
	$("#close_car").on("click",function(){
		$(".change_car").hide();
		$(".cover_all").hide();
		return false;
	})
})