$(function(){
	//登录框自动居中
    var $height = $("#login_page").outerHeight()/2;
   	$("#login_page").css("margin-top",-$height);
   	$(".login_lists").on("click","#normal_login",function(){
    	$(this).addClass("active").siblings().removeClass();
		$("#logining_txt1").show();
		$("#logining_txt2").hide();
	 	$("#login_page").css("margin-top",-$height);
	 	$("#aLi_login","#login_page").show();
    }).on("click","#wholesale_login",function(){
    	$(this).addClass("active").siblings().removeClass();
    	$("#logining_txt1").hide();
    	$("#logining_txt2").show();
    	$("#login_page").css("margin-top",-$height);
    	$("#aLi_login","#login_page").hide();
    });
    
//  确认是否保存邮箱
    $("#saveid").on("change",function(){
    	if($(this).is(":checked")){
    		$("#cover_all2").show();
    		$("#warning_save").show().on("click","#confirm_save",function(){
    			$("#cover_all2").hide();
    			$("#warning_save").hide();
    			return false;
    		}).on("click","#cancel_save",function(){
    			$("#cover_all2").hide();
    			$("#warning_save").hide();
    			$("#saveid").prop("checked",false);
    			return false;
    		});
    	}
    });

    //打开注册页面
	$(".register").on("click",function(){
		$("#register_page").show();
		$("#login_page").hide();
		$("input","#login_page").val("");
	});
	
//	普通登录
	$(".login_btn","#logining_txt1").on("click",function(){
		var _email = $(".login_email","#logining_txt1").val();
		var _pwd = $(".login_pwd","#logining_txt1").val();
		if($.cookie("data1")){
			var data1 = $.cookie("data1");		
			var arr = JSON.parse(decodeURIComponent(data1));
			var arr0 =[];			//arr0存放着所有username的信息
			for(var i=0;i<arr.length;i++){
				var data = arr[i].email;		//data是每个当前email的信息
				arr0.push(data);
			}
			if(_email == ""){
				alert("请输入邮箱");
				return false;
			}else{
				if($.inArray(_email, arr0) > -1){
					if(_pwd == ""){
						alert("请输入密码");
						return false;
					}
					var index = $.inArray(_email, arr0);
					if(_pwd == arr[index].pwd){
						alert("登录成功");
						$("#login_page").hide();
						$("#cover_all").hide();
						if($("#saveid").is(":checked")){
							$(".login_pwd","#logining_txt1").val("");
						}else{
							$(".login_email","#logining_txt1").val("");
							$(".login_pwd","#logining_txt1").val("");
						}
						$("#saveid").prop("checked",false);
						return false;
					}else{
						alert("密码错误，请重新输入");
						return false;
					}
				}else{
					var reg =  /^\w+@\w+\.(com|cn|gov)$/;
					if(reg.test(_email)){
						alert("您还未注册成为会员，请重新输入");
						return false;
					}else{
						alert("您输入的电子邮件地址错误，请重新输入");
						return false;
					}
				}
			}
		}else{
			if(_email == ""){
				alert("请输入邮箱");
				return false;
			}else{
				var reg =  /^\w+@\w+\.(com|cn|gov)$/;
				if(reg.test(_email)){
					alert("您还未注册成为会员，请重新输入");
					return false;
				}else{
					alert("您输入的电子邮件地址错误，请重新输入");
					return false;
				}
			}
		}
	});
	
	//批发用户登录
	$(".login_btn","#logining_txt2").on("click",function(){
		var _email = $(".login_email","#logining_txt2").val();
		var _pwd = $(".login_pwd","#logining_txt2").val();
		if($.cookie("data2")){
			var data2 = $.cookie("data2");		
			var arr = JSON.parse(decodeURIComponent(data2));
			var arr0 =[];		
			for(var i=0;i<arr.length;i++){
				var data = arr[i].email;		
				arr0.push(data);
			}
			if(_email == ""){
				alert("请输入邮箱");
				return false;
			}else{
				if($.inArray(_email, arr0) > -1){
					if(_pwd == ""){
						alert("请输入密码");
						return false;
					}
					var index = $.inArray(_email, arr0);
					if(_pwd == arr[index].pwd){
						alert("登录成功");
						$("#login_page").hide();
						$("#cover_all").hide();
						if($("#saveid").is(":checked")){
							$(".login_pwd","#logining_txt2").val("");
						}else{
							$(".login_email","#logining_txt2").val("");
							$(".login_pwd","#logining_txt2").val("");
						}
						$("#saveid").prop("checked",false);
						return false;
					}else{
						alert("密码错误，请重新输入");
						return false;
					}
				}else{
					var reg =  /^\w+@\w+\.(com|cn|gov)$/;
					if(reg.test(_email)){
						alert("您还未注册成为会员，请重新输入");
						return false;
					}else{
						alert("您输入的电子邮件地址错误，请重新输入");
						return false;
					}
				}
			}
		}else{
			if(_email == ""){
				alert("请输入邮箱");
				return false;
			}else{
				var reg =  /^\w+@\w+\.(com|cn|gov)$/;
				if(reg.test(_email)){
					alert("您还未注册成为会员，请重新输入");
					return false;
				}else{
					alert("您输入的电子邮件地址错误，请重新输入");
					return false;
				}
			}
		}
	});	
})
