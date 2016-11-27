$(function(){
	$("#header_common").load("header.html?_m="+Math.random());
	$("#left_bar_common").load("left_bar.html?_m="+Math.random());
	$("#footer_common").load("footer.html?_m="+Math.random());
	$("#top_bar_common").load("top_bar.html?_m="+Math.random());
	$("#right_bar_common").load("right_bar.html?_m="+Math.random());
	
//	初始化信息
	var good_detail = $.cookie("good_detail");
	var obj = JSON.parse(good_detail);
	$(".introduce").text(obj.cn);
	$(".good_item").attr("id",obj.id);		//把当前打开的商品的id给到.good_item
	$("img",".good_img").attr({
		"src" : obj.src,
		"jqimg" :obj.bigsrc
	});
	$("#title_en").text(obj.en);
	$(".ko_txt").text(obj.ko);
	$(".abstract").text(obj.cn);
	$("#good_price").text(obj.price);
	$("#good_emoney").text(parseInt(Math.random()*10)+1);
	
//	放大镜功能
	$(".good_img").jqueryzoom({
		  xzoom: 350,//放大区域宽度
		  yzoom: 400,//放大区域高度
		  preload: 1,//是否显示预加载
		  offset:5,//放大区域偏离小图的距离
		  position: "right",//放大区域显示的位置（left,right）
		  lens:true //是否显示小图上的透明区域
	});
	
//	添加进购物车
	$("#toShop_cart").on("click",function(){
		if($("option:first-child","select[name='gcolor']").is(":selected")){
			alert("请选择颜色");
			return false;
		}else if($("option:first-child","select[name='gsize']").is(":selected")){
			alert("请选择尺寸");
			return false;
		}else{
//			将购物车的数据存到cookie里
			var _color = $("option:selected","select[name='gcolor']").text();
			var _size= $("option:selected","select[name='gsize']").text();
			var _num = $("input",".num_list").val();
			var obj = {
				"src" : $("img",".good_img").prop("src"),
				"color" : _color,
				"size" : _size,
				"title_en" : $("#title_en").text(),
				"price" : $("#good_price").text(),
				"num" : _num,
				"emoney" : $("#good_emoney").text(),
				"abstract" : $(".abstract").text(),
				"id" : $(".good_item").attr("id")
			}
			var all_color = [];
			$("option","select[name='gcolor']").each(function(){
				all_color.push($(this).text());
			});
			obj.all_color = all_color;
			var all_size = [];
			$("option","select[name='gsize']").each(function(){
				all_size.push($(this).text());
			});
			obj.all_size = all_size;
			console.log(obj.id);
			
			if($.cookie("goods")){
//				判断原来购物车是否有该商品	有的话把数量添加进去
				var goods = $.cookie("goods");		
				var arr = JSON.parse(goods);			
				var arr0 = [];
				var arr1 = [];
				var arr2 = [];
//				商品名 颜色 大小
				for(var i=0;i<arr.length;i++){
					var data = arr[i].id;
					var data1 = arr[i].color;
					var data2 = arr[i].size;
					arr0.push(data);
					arr1.push(data1);
					arr2.push(data2);
				}
//				判断id，颜色，大小一样就在原来的基础上加1，isArray大于-1说明存在
				if($.inArray(obj.id, arr0) > -1 && $.inArray(obj.color, arr1) > -1 && $.inArray(obj.size, arr2) > -1){
					var index = $.inArray(obj.id, arr0);
					arr[index].num = Number(arr[index].num) + Number(_num);
					goods = JSON.stringify(arr);
					$.cookie("goods",goods,{expires: 10,path: '/'});
				}else{
					arr.push(obj);
					goods = JSON.stringify(arr);
					$.cookie("goods",goods,{expires: 10,path: '/'});	
				}
			}else{
				var arr = [];
				arr.push(obj);
				goods = JSON.stringify(arr);
				$.cookie("goods",goods,{expires: 10,path: '/'});
			}
					
//			在弹出框输出选择的信息
			$("#selected_name").html("").html(obj.title_en);
			$("#selected_color").html("").html(_color);
			$("#selected_size").html("").html(_size);
			$("#selected_num").html("").html(_num);
			$(".selected_cn").html("").html(obj.abstract);
			$(".cover_all").show();
			$("#to_car_page").show();
		}
	});
	
//	添加，删除商品数量
	$(".num_list").on("click","#add",function(){
		var _num = $("input",".num_list").val();
		_num++;
		$("input",".num_list").val(_num);
	}).on("click","#reduce",function(){
		var _num = $("input",".num_list").val();
		if(_num==1){
			alert("数量不能小于1！");
		}else{
			_num--;
			$("input",".num_list").val(_num);
		}	
	});
	
	$("input",".num_list").on("change",function(){
		if($("input",".num_list").val() <= 0){
			alert("数量不能小于1！");
			$("input",".num_list").val("1");
		}
	});
	
//	点击导航栏切换商品信息
	$("a","#goods_nav_list").on("click",function(){
		var index = $(this).index()/2;
		$(this).addClass("active").siblings("a").removeClass("active");
		$("#all_details").children("li:eq("+index+")").show().siblings().hide();
		return false;
	});
	
//	点击换页按钮
	$("#page_btn").on("click","a",function(){
		$(this).addClass("active").siblings().removeClass();
		var page_num = $(this).text();
		$ajax = $.get("libs/data/details/comment"+page_num+".json",function(data){
			for(var i=0;i<data.length;i++){
				$("li","#review_main").find(".list_time").html("").html(data[i].time);
				$("li","#review_main").find(".list_title").html("").html(data[i].title);
				$("li","#review_main").find(".list_writer").html("").html(data[i].writer);
				$("li","#review_main").find(".review_size").html("").html(data[i].size);
				$("li","#review_main").find(".review_content").html("").html(data[i].content);
				if($("li","#review_main").find(".emoney_icon")){
					$("li","#review_main").find(".emoney_icon").html(data[i].emoney);
				}
			}
		});
		$("li",".review_box ul").find(".review_detail").hide();
		return false;
	});
	
	//点击评论显示出详情
	$("ul",".review_box").on("click","li",function(){
		$(".review_detail",this).show().closest("li").siblings().find(".review_detail").hide();
	});
	
	//提问
	$("#ask_btn").on("click",function(){
		$("#ask_form").show();
		$("input[name='title']",".form_input").val("");
		$("textarea[name='contents']",".form_input").val("");
	});
		
	$(".form_list").on("click","a",function(){
		var n = $("#ask_count").html();
		var date1 = new Date();
		var _year = date1.getFullYear();
		var _month = date1.getMonth()+1;
		var _date = date1.getDate();
		var _title = $("input[name='title']",".form_input").val();
		var _content = $("textarea[name='contents']",".form_input").val();
		if(_title && _content){
			n++;
			$("#ask_count").html("").html(n);
			_html = "<li><div class='review_list clearfix'>"
			_html += "<div class='list_time'>"+_year+"/"+_month+"/"+_date+"</div>";
			_html += "<div class='list_title'>"+_title+"</div>";
			_html += "<div class='list_writer'>8923756**</div>";
			_html += "</div><div class='review_detail'>";
			_html += "<div class='review_content'>"+_content+"</div>";
			_html += "</div></li>";
			$("#ask_main").append(_html);
			$("#ask_form").hide();
		}
		return false;
	});
	
//	关闭弹出的框
	$("#return_btn").on("click",function(){
		$(this).closest("#to_car_page").hide();
		$(".cover_all").hide();
	});
	$(document).on("click",function(e){
		var target = $(e.target);
		if(target.closest("#to_car_page").length == 0 && target.closest("#toStaging_rack").length == 0 && target.closest("#toShop_cart").length == 0){
			$("#to_car_page").hide();
			$(".cover_all").hide();
		}
	});
	
})
