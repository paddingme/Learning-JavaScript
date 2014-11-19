
    // 1.取得 image-gallery
    // 2. image-gallery 的每个子女点击则响应事件
    // 3. 要创建

    // <img id="placeholder"  src="images/codercat.jpg" alt="">

    // <p id="decription">请选择一张图片</p>



// 1. 先创建 img src 取每个li 里的 href；
// 2. 每个li的a 标签被点击时才触发；

var images =  document.getElementById("image-gallery");

var link = images.nodeChild;

var img = body.insertAfter('img');


for (var i = 0; i < link.length; i++) {
    link[i].onclick = showImg(this);
    img.setAttribute("src",link[i].getAttribute("href"));
    img.setAttribute("src",link[i].getAttribute("href"));
};

function showImg(node){
    var placeholder = document.getElementById("placeholder");
    var decription = document.getElementById("decription");
    var title = this.title

}
