/* Font Poper */
/* DanBrianWhite */

/* Triggers a callback when a font pops in and is loaded.  */

/* This function enables you to register a callback to occur when a font is loaded an pops in. Hence the name font popper! Supply the font name and font style you want to watch. Then when the font pops in, the callback function will be run. This allows you to update views or any other layouts that utilize JavaScript for sizing or anything else. */

/* currently requires jQuery */

var fontPopper = function (fontName, fontStyle, callback) {
    var _fontToPop = $('<div class="fontPopper" style="margin: 0; padding: 0; border: 0; font-size: 16px; vertical-align: baseline; visibility: hidden; position: fixed; z-index: -100000; width: 250px; height: auto; line-height: 16px; top: 0px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies, risus a porttitor malesuada, est purus ullamcorper elit, sit amet malesuada tortor odio id turpis. Maecenas nisi tellus, scelerisque ac tincidunt sit amet, semper semper velit. Pellentesque sit amet tincidunt orci. Proin sem dolor, laoreet eget egestas in, pulvinar eu diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra pulvinar lacus a interdum. Praesent quis tellus facilisis, tincidunt nibh ut, convallis urna.</div>');

    if (fontStyle === 'b') {
        _fontToPop.wrapInner('<b></b>');
    }
    else if (fontStyle === 'i') {
        _fontToPop.wrapInner('<i></i>');
    }
    else if (fontStyle === 'bi') {
        _fontToPop.wrapInner('<b><i></i></b>');
    }


    $('body').append(_fontToPop);
    
    var _origHeight = _fontToPop.height();

    _fontToPop.css('font-family', fontName);

    var _fontPopperInterval = setInterval(function () { _checkFontPop() }, 100);

    var _checkFontPop = function () {

        var _popped = _fontToPop.height() !== _origHeight;

        if (_popped) {
            clearInterval(_fontPopperInterval);
            _fontToPop.remove();
            callback();
        }
    }

}

fontPopper('fontello', 'r', function () {$(window).resize();});