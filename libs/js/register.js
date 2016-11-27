$(function(){    
    //注册框自动居中
    var $height = $("#register_page").outerHeight()/2;
    $("#register_page").css("margin-top",-$height);
    
//	切换注册类型
    $(".reg_lists").on("click","#normal_reg",function(){
    	$(this).addClass("active").siblings().removeClass();
    	$("input","#reg_form").val("");
    	$("select","#reg_form").find("option:first-child").attr("selected","selected");
    	$("#normal").show();
    	$("#wholesale").hide();
   	 	$("#register_page").css("margin-top",-$height);
// 	 	换js文件
   	 	if($("script[src='libs/js/jquery.idcode2.js']","head")){
   	 		$("script[src='libs/js/jquery.idcode2.js']","head").remove();
   	 		$("<script src='libs/js/jquery.idcode.js'></script>").appendTo($("head"));
   	 		$.idcode.setCode();
   	 	}
    }).on("click","#wholesale_reg",function(){
    	$(this).addClass("active").siblings().removeClass();
    	$("input","#wholesale_form").val("");
    	$("select","#wholesale_form").find("option:first-child").attr("selected","selected");
    	$("#normal").hide();
    	$("#wholesale").show();
    	$("#register_page").css("margin-top","-320px");
//  	换js文件
   		if($("script[src='libs/js/jquery.idcode.js']","head")){
   	 		$("script[src='libs/js/jquery.idcode.js']","head").remove();
   	 		$("<script src='libs/js/jquery.idcode2.js'></script>").appendTo($("head"));
   	 		$.idcode2.setCode();
   	 	}
    });
    
//  加载地区信息
    var cityList = new Array();
	cityList['请选择'] = ['请选择'];
   	cityList['福建省'] = ['请选择','福州市','厦门市','泉州市'];
   	cityList['广东省'] = ['请选择','广州市','江门市','深圳市','珠海市'];
   	cityList['江苏省'] = ['请选择','南京市','苏州市','无锡市'];
   	var districts = new Array();
   	districts['请选择'] = districts['福州市'] = districts['厦门市'] = districts['泉州市'] = ['请选择'];
   	districts['广州市'] = ['请选择','海珠区','天河区','白云区','越秀区','荔湾区'];
   	districts['江门市'] = ['请选择','新会区','蓬江区','恩平市','台山市','开平市'];
   	districts['深圳市'] = ['请选择','福田区','罗湖区','龙华区','宝安区'];
   	districts['珠海市'] = ['请选择','斗门区','香洲区','前山市'];
// 	加载省
	function loadProvices(){
		for(var i in cityList){
			$("#provinces").append("<option>"+i+"</option>");
		}
	}
	loadProvices();

//	验证
//  先定义验证方式	
    var emailRight1 = false;
    var pwdRight = false;
    var pwdRight2 = false;
    var userRight1 = false;
    var	sexRight1 = false;
    var phoneRight1 = false;
    var emailExt1 = false;		//判断email1是否存在

//  批发会员注册
	var emailRight2 = false;
	var pwdRight3 = false;
	var pwdRight4 = false;
	var userRight2 = false;
    var	sexRight2 = false;
    var phoneRight2 = false;
    var emailExt2 = false;		//判断email2是否存在
    
    var proRight = false;
    var cityRight = false;
    var disRight = false;
    var adsRight = false;		//详细地址
    
    //加载生成验证码方法
	$.idcode.setCode();  
		
//	验证邮箱
	$("input[id='email1']").on("focus",function(){
		$(".check_email","#reg_form").html("电子邮件不能为空");
	}).on("blur",function(){
		if($(this).val() == ""){
			$(this).focus();
			emailRight1 = false;
		}else{
			var _email = $(this).val();
			var reg =  /^\w+@\w+\.(com|cn|gov)$/;
			if(reg.test(_email)){
				emailRight1 = true;
				if($.cookie("data1")){
					var data1 = $.cookie("data1");		
					var arr = JSON.parse(decodeURIComponent(data1));
					console.log(arr);
					//arr0存放所有email的信息
					var arr0 =[];	
					for(var i=0;i<arr.length;i++){
						var data = arr[i].email;		//data是每个当前email的信息
						arr0.push(data);
					}
//					$.isArray判断值是否存在数值里,是返回下标,不是就返回-1
					if($.inArray(_email, arr0) > -1){
						emailExt1 = false;
						$(".check_email","#reg_form").html("电子邮箱已存在");
					}else{
						emailExt1 = true;
						$(".check_email","#reg_form").html("可以使用的电子邮箱");
					}
				}else{
					emailExt1 = true;
					$(".check_email","#reg_form").html("可以使用的电子邮箱");
				}
			}else{
				emailRight1 = false;
				$(".check_email","#reg_form").html("请输入准确的电子邮箱");
			}
		}
	});
	
	$("input[id='email2']").on("focus",function(){
		$(".check_email","#wholesale_form").html("电子邮件不能为空");
	}).on("blur",function(){
		if($(this).val() == ""){
			$(this).focus();
			emailRight2 = false;
		}else{
			var _email = $(this).val();
			var reg =  /^\w+@\w+\.(com|cn|gov)$/;
			if(reg.test(_email)){
				emailRight2 = true;
				if($.cookie("data2")){
					var data2 = $.cookie("data2");		
					var arr = JSON.parse(decodeURIComponent(data2));			
					var arr0 =[];	//arr0存放着所有username的信息
					for(var i=0;i<arr.length;i++){
						var data = arr[i].email;		//data是每个当前username的信息
						arr0.push(data);
					}
					if($.inArray(_email, arr0) > -1){
						emailExt2 = false;
						$(".check_email","#wholesale_form").html("电子邮箱已存在");
					}else{
						emailExt2 = true;
						$(".check_email","#wholesale_form").html("可以使用的电子邮箱");
					}
				}else{
					emailExt2 = true;
					$(".check_email","#wholesale_form").html("可以使用的电子邮箱");
				}
			}else{
				emailRight2 = false;
				$(".check_email","#wholesale_form").html("请输入准确的电子邮箱");
			}
		}
	});
		
//验证密码
	$("input[id='pwd']").on("blur",function(){
		if($(this).val()){
			pwdRight = true;
		}else{
			pwdRight = false;
		}
	});
	
	$("input[id='pwd2']").on("blur",function(){
		if($(this).val()){
			pwdRight3 = true;
		}else{
			pwdRight3 = false;
		}
	});
	
//验证两次密码是否一致
	$("input[id='pwd_again']").on("blur",function(){
		if($(this).val() == $("input[id='pwd']").val()){
			pwdRight2 = true;
		}else{
			pwdRight2 = false;
		}
	});
	
	$("input[id='pwd_again2']").on("blur",function(){
		if($(this).val() == $("input[id='pwd2']").val()){
			pwdRight4 = true;
		}else{
			pwdRight4 = false;
		}
	});
	
//验证用户名
	$("input[id='user_name']").on("blur",function(){
		if(emailRight1 == false){
			$("input[id='email1']").focus();
		}
		if($(this).val()){
			userRight1 = true;
		}else{
			userRight1 = false;
		}
	}).on("focus",function(){
		$(this).keyup(function(){
			var user_val = $(this).val();
			if(/\d/.test(user_val[user_val.length-1])){
				$(this).val("");
			}
		});
	});
	
	$("input[id='user_name2']").on("blur",function(){
		if(emailRight2 == false){
			$("input[id='email2']").focus();
		}
		if($(this).val()){
			userRight2 = true;
		}else{
			userRight2 = false;
		}
	}).on("focus",function(){
		$(this).keyup(function(){
			var user_val = $(this).val();
			if(/\d/.test(user_val[user_val.length-1])){
				$(this).val("");
			}
		});
	});

//验证性别
	$("select[name ='sex']").on("change",function(){
		if($(this).find(".women").is(":selected") || $(this).find(".men").is(":selected")){
			sexRight1 = true;
		}else{
			sexRight1 = false;
		}
	});
	
	$("select[name ='sex2']").on("change",function(){
		if($(this).find(".women").is(":selected") || $(this).find(".men").is(":selected")){
			sexRight2 = true;
		}else{
			sexRight2 = false;
		}
	});
	
//验证手机号码
	$("input[id='phone_num']").on("blur",function(){
		if(emailRight1 == false){
			$("input[id='email1']").focus();
		}
		var reg = /^1\d{10}$/;
		if(reg.test($(this).val())){
			phoneRight1 = true;
		}else{
			phoneRight1 = false;
		}
	}).on("focus",function(){
			$(this).keyup(function(){
			var phone_val = $(this).val();
			if(/\D/.test(phone_val[phone_val.length-1])){
				$(this).val("");
			}
		});
	});
	
	$("input[id='phone_num2']").on("blur",function(){
		if(emailRight2 == false){
			$("input[id='email2']").focus();
		}
		var reg = /^1\d{10}$/;
		if(reg.test($(this).val())){
			phoneRight2 = true;
		}else{
			phoneRight2 = false;
		}
	}).on("focus",function(){
			$(this).keyup(function(){
			var phone_val = $(this).val();
			if(/\D/.test(phone_val[phone_val.length-1])){
				$(this).val("");
			}
		});
	});
	
//验证码
	$("input[id='Txtidcode']").on("blur",function(){
		if(emailRight1 == false){
			$("input[id='email1']").focus();
		}
	});
	
	$("input[id='Txtidcode2']").on("blur",function(){
		if(emailRight2 == false){
			$("input[id='email2']").focus();
		}
	});
	
//验证地区范围
//省
	$("#provinces").on("change",function(){
		//根据id拿到对象里面的值（value）
		var proviceName = $(this).val();
		var cities = $("#cities")
		//先清空原来的数据
		cities.html("");
		for(var i in cityList[proviceName]){
			cities.append("<option>"+cityList[proviceName][i]+"</option>");	
		}
		if($("option:first-child",this).is(":selected")){
			proRight = false;
			return;
		}else{
			$("#cities").css("display","inline-block");
			proRight = true;
		}
	});
//市
	$("#cities").on("change",function(){
		var	cityName = $(this).val();
		var	district = $("#districts");
		//先清空原来的数据
		district.html("");
		for(var i in districts[cityName]){
			district.append("<option>"+districts[cityName][i]+"</option>");	
		}
		if($("option:first-child",this).is(":selected")){
			cityRight = false;
			return;
		}else{
			district.css("display","inline-block");
			cityRight = true;
		}
	});
//区
	$("#districts").on("change",function(){
		if($("option:first-child",this).is(":selected")){
			disRight = false;
			return;
		}else{
			disRight = true;
		}
	});
	
//	详细地址
	$("#detailed_ads").on("blur",function(){
		if($("#detailed_ads").val() == ""){
			adsRight = false;
		}else{
			adsRight = true;
		}
	});
	
	//普通注册
    $("#submit_btn1").click(function(){
    //	验证是否同意了协议
		if(!($("input[id='_checkbox1']").is(":checked"))){
			alert("请您仔细阅读《时尚起义用户使用条款》，必须同意此条款才能进行下一步");
			return;
		}
      	if(emailRight1 == false && $("input[id='email1']").val().length == 0){
			alert("电子邮箱不能为空");
			return;
		}else if(emailRight1 == false && $("input[id='email1']").val().length > 0){
			alert("请输入正确的电子邮箱");
			$("input[id='email1']").val("");
			return;
		}else if(emailRight1 == true && emailExt1 == false){
			alert("电子邮箱已存在");
			return;
		}else if(pwdRight == false){
			alert("请输入密码");
			return;
		}else if(pwdRight2 == false){
			alert("您两次输入的密码不一致，请重新输入");
			$("#pwd").val("").focus();
			$("#pwd_again").val("");
			return;
		}else if(userRight1 == false){
			alert("请输入用户名");
			return;
		}else if(sexRight1 == false){
			alert("请选择性别");
			return;
		}else if($("input[id='phone_num']").val().length == 0 && phoneRight1 == false){
			alert("请填写手机号码");
			return;
		}else if(phoneRight1 == false && $("input[id='phone_num']").val().length>0){
			alert("请填写正确的手机号码");
			return;
		}
		var IsBy = $.idcode.validateCode()  //调用返回值，返回值结果为true或者false
        if(IsBy){
            alert("注册成功");
          
//          将数据存到cookie里面
//			每个数据放在一个数据对象里面，每一组数据都存到数组里面
			var obj = {
				"email" : $("#email1").val(),
				"username" : $("#user_name").val(),
				"pwd" : $("#pwd").val(),
				"phonenum" : $("#phone_num").val()
			}

			if($.cookie("data1")){
				var data1 = $.cookie("data1");		
				var arr = JSON.parse(decodeURIComponent(data1));			//将字符串形式的data1转为数组
				arr.push(obj);
				data1 = JSON.stringify(arr);
				$.cookie("data1",encodeURIComponent(data1),{expires: 10,path: '/'});
			}else{
				var arr = [];
				arr.push(obj);
				data1 = JSON.stringify(arr);
				$.cookie("data1",encodeURIComponent(data1),{expires: 10,path: '/'});
			}
					
//          清空
			$("#reg_form").find("input").not("checkbox").val("");
            $("select","#reg_form").find("option:first-child").attr("selected","selected");           
        }else {
            alert("验证码不正确");
        }
    });
    
    
    //批发会员注册
    $("#submit_btn2").on("click",function(){
    	if(!($("input[id='_checkbox2']").is(":checked"))){
			alert("请您仔细阅读《时尚起义用户使用条款》，必须同意此条款才能进行下一步");
		}
    	if(emailRight2 == false && $("input[id='email2']").val().length == 0){
			alert("电子邮箱不能为空");
			return;
		}else if(emailRight2 == false && $("input[id='email2']").val().length > 0){
			alert("请输入正确的电子邮箱");
			$("input[id='email2']").val("");
			return;
		}else if(emailRight2 == true && emailExt2 == false){
			alert("电子邮箱已存在");
			return;
		}else if(pwdRight3 == false){
			alert("请输入密码");
			return;
		}else if(pwdRight4 == false){
			alert("您两次输入的密码不一致，请重新输入");
			$("#pwd2").val("").focus();
			$("#pwd_again2").val("");
			return;
		}else if(userRight2 == false){
			alert("请输入用户名");
			return;
		}else if(sexRight2 == false){
			alert("请选择性别");
			return;
		}else if($("input[id='phone_num2']").val().length == 0 && phoneRight2 == false){
			alert("请填写手机号码");
			return;
		}else if(phoneRight2 == false && $("input[id='phone_num2']").val().length>0){
			alert("请填写正确的手机号码");
			return;
		}else if(proRight == false || cityRight == false || disRight == false){
			alert("请选择完整的地区范围");
			return;
		}else if(adsRight == false){
			alert("请填写详细地址");
			return;
		}
    	var IsBy = $.idcode2.validateCode()  //调用返回值，返回值结果为true或者false
        if(IsBy){
            alert("注册成功");
            
            var obj = {
				"email" : $("#email2").val(),
				"username" : $("#user_name2").val(),
				"pwd" : $("#pwd2").val(),
				"phonenum" : $("#phone_num2").val()
			}

			if($.cookie("data2")){
				var data2 = $.cookie("data2");		
				var arr = JSON.parse(decodeURIComponent(data2));			//将字符串形式的data1转为数组
				arr.push(obj);
				data2 = JSON.stringify(arr);
				$.cookie("data2",encodeURIComponent(data2),{expires: 10,path: '/'});
			}else{
				var arr = [];
				arr.push(obj);
				data2 = JSON.stringify(arr);
				$.cookie("data2",encodeURIComponent(data2),{expires: 10,path: '/'});
			}
			
//          清空
 			$("#wholesale_form").find("input").not("checkbox").val("");
            $("select","#wholesale_form").find("option:first-child").attr("selected","selected");

        }else {
            alert("验证码不正确");
        }
    });
    
    //打开登录页面
	$(".login").on("click",function(){
    	$("#login_page").show();
    	$("#register_page").hide();
    	$("input","#register_page").val("");
    	$("select","#register_page").find("option:first-child").attr("selected","selected");
   });
})
