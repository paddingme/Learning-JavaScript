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


function positionMessage() {
    if(!document.getElementById) return false;
    if(!document.getElementById("message")) return false;
    var elem = document.getElementById("message");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "100px";
    movement = setTimeout("moveMessage()",5000);
}

function moveMessage() {
    if(!document.getElementById) return false;
    if(!document.getElementById("message")) return false;
    var elem = document.getElementById("message");
     elem.style.left = "200px";
}

addLoadEvent(positionMessage);
