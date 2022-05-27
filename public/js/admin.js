createUserButton.addEventListener("click", function(){
	let params = "username="+username.value+"&password="+password.value;
	let ajax = new XMLHttpRequest();
	ajax.responseType = "json";
	// ajax.addEventListener("load", function(){
	// 	console.log(this.response[0].message);
	// 	alert(this.response[0].message);
	// });
	ajax.open("POST", "http://localhost:3000/users");
	ajax.setRequestHeader("Content-type", "application/json;charset=UTF-8");
	ajax.send(params);
})