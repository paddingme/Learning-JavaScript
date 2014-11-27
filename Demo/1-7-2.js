function getHTTPObject() {
  if (typeof XMLHttpRequest == "undefined") {
    XMLHttpRequest = function() {
      try { return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
        catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
        catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP");}
        catch (e) {}
      return false;
    }
  }
  return new XMLHttpRequest();
}


function getNewContent() {
  var request = new getHTTPObject();
  if (request) {
    request.open("GET","1-7-2.txt",true);
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        var para = document.createElement("p");
        var txt = document.createTextNode(request.responseText);
        para.appendChild(txt);
        document.getElementById("new").appendChild(para);
      }
    };
    request.send(null);
  } else {
    alert ("对不起，您的浏览器不支持 XMLHttpRequest!");
  }
}

addLoadEvent(getNewContent);
