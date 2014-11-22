function addLoadEvent(func) {
    var oldload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function() {
            oldload();
            func();
        }
    }
}


function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("image-gallery")) return false;
    var gallery = document.getElementById("image-gallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            return !showPic(this);
        }
        links[i].onkeyPress = links[i].onclick;
    }
}



function showPic(whichpic) {
    if (!document.getElementById('placeholder')) return false;
    var placeholder = document.getElementById('placeholder');

    var source = whichpic.getAttribute('href');
    placeholder.setAttribute('src', source);
    if (document.getElementById('decription')) {
        var text = whichpic.getAttribute('title');
        var decription = document.getElementById('decription');
        decription.firstChild.nodeValue = text;
    }
    return true;
}


addLoadEvent(prepareGallery);
