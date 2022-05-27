createUserButton.addEventListener("click",function(){
    let params = "Name="+username.value+"&Password="+password.value;
    let ajax = new XMLHttpRequest();
    ajax.responseType="json";
    ajax.addEventListener('load', function(){
        console.log(this.response[0].message);
        alert(this.response[0].message);
    });
    ajax.open("POST", "/index.js");
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(params);

});

logoutButton.addEventListener("click", function(){
	let ajax = new XMLHttpRequest();
	ajax.responseType = "json";
	ajax.addEventListener("load", function(){
		console.log(this.response[0].message);
		username.value = "";
		password.value = "";
		document.getElementsByClassName('main_body')[0].setAttribute("hidden",true);
		changePasswordButton.setAttribute("hidden",true);

	});
	ajax.open("delete", "index.js");
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send();
})

loginButton.addEventListener("click",function(){
	let params = "Name="+username.value+"&Password="+password.value;
	let ajax = new XMLHttpRequest();
	ajax.responseType = "json";
	ajax.addEventListener("load", function(){
		console.log(this.response[0].message);
		if(this.response[0].status==true){
			changePasswordButton.removeAttribute("hidden");
			blog.removeAttribute("hidden");
			document.getElementsByClassName('main_body')[0].removeAttribute("hidden");
			password.value=""
		} else {
			alert("Not a chance! Try again when the real "+username.value+" is here!")
		}
		
	});
	ajax.open("POST", "index.js");
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(params);
})

changePasswordButton.addEventListener("click", function(){
	let params = "User="+username.value+"&Password="+password.value;
	console.log(params);
	let ajax = new XMLHttpRequest();
	ajax.responseType = "json";
	ajax.addEventListener("load", function(){
		alert(this.response[0].message)
		password.value="";
	});
	ajax.open("PUT","index.js");
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send(params);
})