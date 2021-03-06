$.ajaxSetup({ 
	xhrFields: { 
		withCredentials: true 
	}, 
	crossDomain: true 
});


$(function () {
	inputHover();

	login();

    keyLogin();

});

function inputHover(){
	$(".name input").focus(function () {
		$(".focus").removeClass("focus");
		$(".name").addClass("focus");
	});

	$(".password input").focus(function () {
		$(".focus").removeClass("focus");
		$(".password").addClass("focus");
	});
}

function login() {
	$("#login").click(function () {
		var username = $("#username").val();
		var password_hash = $("#password_hash").val();
		$.ajax({
             url: "http://server.shaonvonly.com/api/login",
             type:"POST",
             data: {
                 username : username,
                 password_hash: password_hash,
             },
             success: function(resp){
             	if (resp.status== 0) {
/*             		swal({
                        title:'登录成功！',
                        type: 'success',
                        timer:2000,
                        background:'#fff',
                        confirmButtonColor: '#fc8c9c',
                    });
             		setTimeout("window.location = 'index.html'",2000); */
                    window.location = "index.html";
                    var user_id = resp.data.user_id;
                    var authedshops_id = new Array();                    
                    sessionStorage.user_id = user_id;
                    if (resp.data.shops.length > 0) {
                        sessionStorage.shops_id = resp.data.shops[0].id;
                        console.log(sessionStorage.shops_id);
                        if (resp.data.shops[0].authed=="yes") {
                            sessionStorage.authedshops_id = resp.data.shops[0].id;
                            console.log(sessionStorage.authedshops_id);                           
                        }
                    }
                    
             	}
             	else if (resp.message=='参数不合法') {
                    swal({
                        text:'输入不正确，请重新输入!',
                        title:'登录失败',
                        type: 'warning',
                        timer:2000,
                        background:'#fff',
                        confirmButtonColor: '#fc8c9c',
                    });
             	}
             	else if (resp.message=='密码错误') {
                    swal({
                        text:'密码错误!',
                        title:'登录失败',
                        type: 'error',
                        timer:2000,
                        background:'#fff',
                        confirmButtonColor: '#fc8c9c',
                    });
             	}
             	else if (resp.message=='用户名不存在') {
             		swal({
                        text:'用户名不存在!',
                        title:'登录失败',
                        type: 'warning',
                        timer:2000,
                        background:'#fff',
                        confirmButtonColor: '#fc8c9c',
                    });
             	}
             },
         });
	}); 

	
}

function keyLogin(){
    $("body").keydown(function (event) {
        if (event.keyCode==13)  //回车键的键值为13
        $("#login").click(); //调用登录按钮的登录事件
    });
}


