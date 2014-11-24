function stripeTables() {
  if (!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  var odd, rows;
  for (var i = 0; i < tables.length; i++) {
    odd = false;
    rows = tables[i].getElementsByTagName("tr");
    for (var j = 0; j < rows.length; j++) {
        if (odd == true) {
            rows[j].style.backgroundColor = "#ffc";
            odd = false;
        } else {
            odd = true;
        }
    };
  };
}


// copy form 1-8.js
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


function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].onmouseover = function() {
            this.style.fontWeight = "bold";
        }
        rows[i].onmouseout = function() {
            this.style.fontWeight = "normal";
        }
    };
}
addLoadEvent(stripeTables);
addLoadEvent(displayAbbreviations);
addLoadEvent(highlightRows);
