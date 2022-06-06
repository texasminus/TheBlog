createArticle.addEventListener("click", function(){
    let params = "title="+title.value+"&content="+content.value;
    let ajax = new XMLHttpRequest();
    ajax.responseType = "json";
    ajax.open("POST", "http://localhost:3000/articles/newArticle");
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    ajax.send(params);
})