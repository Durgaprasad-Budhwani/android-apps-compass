// hook the compass watch
// normally I would un-hook an event, but this is a quick tutorial
document.addEventListener('deviceready', function () {
    // use to reset when application launch fist time
    addWinEvent('resize', onResize);
    addWinEvent('orientationchange', onResize);
    onResize();

    var options = { frequency:100 };
    watchID = navigator.compass.watchHeading(function (heading) {
        // only magnetic heading works universally on iOS and Android
        // round off the heading then trigger newHeading event for any listeners
        var newHeading = Math.round(heading.magneticHeading);
        rotate(360  + ( -1 * window.orientation )  -  newHeading);
        $("#headingValue").html(newHeading + "&deg;");

    }, function (e) {
        alert('Compass Error: ' + e.code);
    }, options);
});

function resizeImages(el) {
    $(el).each(function () {
        if (reverseSize > screenSize) {
            $(this).css({
                height:screenSize-50,
                width:screenSize-50
            });
        }
        else {
            $(this).css({
                height:reverseSize-50,
                width:reverseSize-50
            });
        }
    });
}


function addWinEvent(type, fn) {
    var win = this;
    if (win.addEventListener) addEventListener(type, fn, false); else attachEvent('on' + type, fn);
}

function onResize() {
    var _from = 'browser';
    var docEl = document.documentElement;
    screenSize =
        /^device$/i.test(String(_from)) ? !win.orientation || orientation == 180 ? screen.width : screen.height
            : /^browser$/i.test(String(_from)) ? docEl.clientWidth > docEl.clientHeight ? docEl.clientHeight : docEl.clientWidth
            : (_from instanceof String) ? Function('return ' + _from)()
            : parseInt(_from, 10) || 0;


    reverseSize = /^device$/i.test(String(_from)) ? !win.orientation || orientation == 180 ? screen.height : screen.width
        : /^browser$/i.test(String(_from)) ? docEl.clientHeight
        : (_from instanceof String) ? Function('return ' + _from)()
        : parseInt(_from, 10) || 0;

    resizeImages("#imgCompass");
}

function OnImageLoad() {
    onResize()
}

function rotate(value) {
    document.getElementById('imgCompass').style.webkitTransform = "rotate(" + value + "deg)";
}
