createArticle.addEventListener('click', function(){
    let list = document.getElementById("list");
    let element = document.createElement("a");
    let title = document.createTextNode(document.getElementById("title").value);
    let content = document.createTextNode(document.getElementById("content").value);
    let data = new Object();
    element.appendChild(title);
    list.appendChild(element);
});


