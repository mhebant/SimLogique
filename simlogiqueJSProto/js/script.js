/*function addEvent(element, event, func) {
    if (element.addEventListener) {
        element.addEventListener(event, func, false);
    } else {
        element.attachEvent('on' + event, func);
    }
}
function removeEvent(element, event, func) {
    if (element.removeEventListener) {
        element.removeEventListener(event, func, false);
    } else {
        element.detachEvent('on' + event, func);
    }
}*/
var editor;

function load() {
	$("canvas").attr({width: window.innerWidth, height: window.innerHeight});
	editor = new Editor($("#editor"), new Manager());
}


