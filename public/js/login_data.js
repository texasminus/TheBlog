function postLoginData() {
    const data = {
        username: document.querySelector("input[name='username']").value,
        password: document.querySelector("input[name='password']").value,
    }
    axios.post("http://localhost:3000/login", data).then(data => console.log(data.data));
}