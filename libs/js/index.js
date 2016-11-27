
$(function(){
	$("#header_common").load("header.html?_m="+Math.random());
	$("#left_bar_common").load("left_bar.html?_m="+Math.random());
	$("#footer_common").load("footer.html?_m="+Math.random());
	$("#top_bar_common").load("top_bar.html?_m="+Math.random());
	$("#right_bar_common").load("right_bar.html?_m="+Math.random());
	
	//延时加载图片
	$("img.lazy").lazyload({
		effect:"fadeIn",
		failure_limit : 10	//将 failurelimit 设为 10 ，令插件找到 10 个不在可见区域的图片时才停止搜索
	});
	
	//主要商品信息列信息显示
	$(".best_wrap").on("mouseenter",function(){
		$(".show_msg",this).show();
	}).on("mouseleave",function(){
		$(".show_msg",this).hide();
	});
	
	//登录框
    var $height = $("#login_page").outerHeight()/2;
    function change_login(){
		$("#normal_login",".login_lists").addClass("active").siblings().removeClass();
		$(".login_form1").find("input").not("checkbox").val("");
		$("#logining_txt1").show();
		$("#logining_txt2").hide();
	 	$("#login_page").css("margin-top",-$height);
    }
    
    //关闭登录页面
    $("#login_page").on('click',".close_page",function(){
    	change_login();
    	$("#login_page").hide();
    	$("#cover_all").hide();
    });
    
	//注册框
    var $height = $("#register_page").outerHeight()/2;
    function change_reg(){
    	$("#normal_reg",".reg_lists").addClass("active").siblings().removeClass();
    	$("#reg_form").find("input").not("checkbox").val("");
    	$("#normal").show();
    	$("#wholesale").hide();
   	 	$("#register_page").css("margin-top",-$height);
// 	 	换js文件
   	 	if($("script[src='libs/js/jquery.idcode2.js']","head")){
   	 		$("script[src='libs/js/jquery.idcode2.js']","head").remove();
   	 		$("<script src='libs/js/jquery.idcode.js'></script>").appendTo($("head"));
   	 		$.idcode.setCode();
   	 	}
    }
    
      //关闭注册页面
    $("#register_page").on('click',".close_page",function(){
    	change_reg();
    	$("#register_page").hide();
    	$("#cover_all").hide();
    });
	  
//	  点击其它地方关闭注册 登录页面
   $(document).on("click",function(e){	
    	var target = $(e.target);
    	if(target.closest("#warning_save").length==0 && target.closest("#cover_all2").length==0 && target.closest(".ehong-idcode-val").length==0 && target.closest("#register_page").length==0 && target.closest("#login_page").length==0 && target.closest(".register").length==0 && target.closest(".login").length==0 && target.closest("#turn").length==0 ){
    		change_reg();
    		change_login();
	    	$("#register_page").hide();
	    	$("#login_page").hide();
	    	$("#cover_all").hide();
    	}
   });
})
