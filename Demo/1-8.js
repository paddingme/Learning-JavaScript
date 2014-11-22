function displayAbbreviations() {
    if (!document.getElementsByTagName) return false;
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;

    //取得所有缩略词
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    //遍历这些缩略词
    for (var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        //如果当前元素没有子节点，就立刻开始下一次循环。
        if (current_abbr.childNodes.length < 1) continue;
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    //创建定义列表
    var dlist = document.createElement("dl");
    //遍历定义
    for (key in defs) {
        var definition = defs[key];
        //创建定义标题
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        //创建定义描述
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        //把它们添加到定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }

    //对于 dl 没有任何子节点，则立即退出 displayAbbreviations。
    if (dlist.childNodes.length < 1) return false;

    // 创建标题
    var header = document.createElement("h2");
    var headerText = document.createTextNode("Abbreviations");
    header.appendChild(headerText);
    //把标题页添加到页面主体
    document.body.appendChild(header);
    //把定义列表添加到页面主体
    document.body.appendChild(dlist);
}

function displayAccesskeys() {
    if (!document.getElementsByTagName || !document.createTextNode || !document.createElement) return false;
    //取得文章当中的所有链接
    var links = document.getElementsByTagName("a");
    //创建一个数组，保存快捷键
    var akeys = new Array();
    //遍历链接
    for (var i = 0; i < links.length; i++) {
        var current_link = links[i];
        //如果没有 accesskey 属性，继续循环
        if (!links[i].getAttribute("accesskey")) continue;
        //取得 accesskey 的值
        var key = current_link.getAttribute("accesskey");
        // 取得链接文本
        var text = current_link.lastChild.nodeValue;
        //添加到数组
        akeys[key] = text;
    }

    //创建列表
    var list = document.createElement("ul");
    //遍历快捷键
    for (key in akeys) {
        var text = akeys[key];
        //创建放到列表中的字符串
        var str = key + ":" + text;
        //创建列表象
        var item = document.createElement("li");
        var item_text = document.createTextNode(str);
        item.appendChild(item_text);
        //把列表创建到列表中
        list.appendChild(item);
    }

    //创建标题
    var header = document.createElement("h1");
    var header_text = document.createTextNode("Acceskeys");
    header.appendChild(header_text);
    //把标题添加到主体上
    document.body.appendChild(header);
    //把列表放到主体上
    document.body.appendChild(list);
}



addLoadEvent(displayAbbreviations);
addLoadEvent(displayAccesskeys);
