$(function(){
	$("#header_common").load("header.html?_m="+Math.random());
	$("#left_bar_common").load("left_bar.html?_m="+Math.random());
	$("#footer_common").load("footer.html?_m="+Math.random());
	$("#top_bar_common").load("top_bar.html?_m="+Math.random());
	$("#right_bar_common").load("right_bar.html?_m="+Math.random());
	
//	拼接列表里的html 先加载第一页的数据
	$ajax = $.get("libs/data/lists/page1.json",function(_data){
		for(var i=0;i<_data.length;i++){
			var _html = "<dl id='"+_data[i].id+"' big='"+_data[i].bigsrc+"'><dt><a href='details.html'>";
			_html += "<img class='lazy' src='"+_data[i].src+"' width='240' height='330' /></a></dt>";
			_html += "<dd class='items_tips'><span class='new_image'></span><span class='hot_image'></span></dd>";
			_html += "<dd class='gray_color KO_txt'><a href='details.html'>"+_data[i].ko+"</a></dd>";
			_html += "<dd class='gray_color CN_txt'><a href='details.html'>"+_data[i].cn+"</a></dd>";
			_html += "<dd class='EN_txt'><a href='details.html'>"+_data[i].en+"</a></dd>";
			_html += "<dd>￥<span class='price'>"+(Number(_data[i].price)+parseFloat(Math.random().toFixed(2)))+"</span></dd></dl>";
			$("#coats_items").append(_html);
		}
	});
	
	//	获取json数据
	function getJson(page_num){
		$ajax = $.get("libs/data/lists/page"+page_num+".json",function(_data){
		//	i是dl和data的下标
			$("#coats_items").html("");
			for(var i=0;i<_data.length;i++){
				var _html = "<dl id='"+_data[i].id+"' big='"+_data[i].bigsrc+"'><dt><a href='details.html'>";
				_html += "<img class='lazy' src='"+_data[i].src+"' width='240' height='330' /></a></dt>";
				_html += "<dd class='items_tips'><span class='new_image'></span><span class='hot_image'></span></dd>";
				_html += "<dd class='gray_color KO_txt'><a href='details.html'>"+_data[i].ko+"</a></dd>";
				_html += "<dd class='gray_color CN_txt'><a href='details.html'>"+_data[i].cn+"</a></dd>";
				_html += "<dd class='EN_txt'><a href='details.html'>"+_data[i].en+"</a></dd>";
				_html += "<dd>￥<span class='price'>"+(Number(_data[i].price)+parseFloat(Math.random().toFixed(2)))+"</span></dd></dl>";
				$("#coats_items").append(_html);
			}
		});
	}
	
	$("#change_page").on("click","a",function(){
		$(this).addClass("active").siblings().removeClass();
		var page_num = $(this).text();
		getJson(page_num);
		$("option:first-child",".select_sort").attr("selected","selected");
		$("option:first-child",".pic_size").attr("selected","selected");
	});
	
//	排序
	$(".select_sort").change(function(){
		if($("#esc_btn").is(":selected")){
			$("#coats_items").jSort({
                sort_by: 'span.price',
                item: 'dl',
                order: 'esc',
                is_num : true
        	});
		}else if($("#desc_btn").is(":selected")){
			$("#coats_items").jSort({
                sort_by: 'span.price',
                item: 'dl',
                order: 'desc',
                is_num : true
         	});
		}else{
			var page_num = $(".active","#change_page").text();
			getJson(page_num);
			$("option:first-child",".pic_size").attr("selected","selected");
		}
	});
	
//大中小图显示
	$(".pic_size").change(function(){
		if($("#big_pic").is(":selected")){
			$("dl","#coats_items").css({
				width : "286px",
				height : "460px"
			}).find("img").attr({
				width : "240px",
				height : "330px"
			}).end().find("dd").css("width","240px");
		}else if($("#middle_pic").is(":selected")){
			$("dl","#coats_items").css({
				width : "228px",
				height : "424px"
			}).find("img").attr({
				width : "185px",
				height : "254px"
			}).end().find("dd").css("width","185px");
		}else if($("#small_pic").is(":selected")){
			$("dl","#coats_items").css({
				width : "163px",
				height : "300px"
			}).find("img").attr({
				width : "120px",
				height : "165px"
			}).end().find("dd").css("width","120px");
		}
	});
	
//	点击商品存储商品信息到cookie里
	$(".coats_items").on("click","dl",function(){
		var obj = {
			"id" : $(this).attr("id"),
			"src" : $("img",this).attr("src"),
			"en" : $(".EN_txt",this).text(),
			"ko" : $(".KO_txt",this).text(),
			"cn" : $(".CN_txt",this).text(),
			"price" : $(".price",this).text(),
			"bigsrc" : $(this).attr("big")
		}
		var good_detail = JSON.stringify(obj);
		$.cookie("good_detail",good_detail,{expires: 10,path: '/'});	//存储数据到cookie上
	})
})
