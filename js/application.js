// // Your JavaScript

$(window).on('load', function() {
    adjustContentHeight();
    adjustSidebarHeight();
    // $('.toggleIframe').hide();
    toggleIframe()

    // var mX, mY, distance, $element  = $('.sidebar a');
    // // var elements = [$element].concat($('.rainbow'));
    // var classes = ['.sidebar a', '.rainbow'] //.concat($('.content a'));
    // function calculateDistance(elem, mouseX, mouseY) {
    //     return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
    // }
    //
    // $(document).mousemove(function(e) {
    //     mX = e.pageX;
    //     mY = e.pageY;
    //     for(var i=0; i<classes.length; i++) {
    //       $(classes[i]).each(function(j, elm) {
    //
    //         if ($(elm).length) {
    //           distance = calculateDistance($(elm), mX, mY);
    //           $(elm).css('font-variation-settings', '"wght"'+(800-distance));
    //         }
    //       });
    //     }
    // });
});

$( window ).resize(function() {
    adjustContentHeight();
    adjustSidebarHeight();
});

function adjustContentHeight() {
    /* Change size of content class so it fits in the middle of the screen */
    if($('.content').height() < $(window).height()) {
        $('.content').css({'top': $(window).height()/2-$('.content').height()/2 + 'px'})
    }
}

function adjustSidebarHeight() {
    /* Change size of sidebar class so it fits in the middle of the screen */
    if($('.sidebar').height() < $(window).height()) {
        $('.sidebar').css({'top': $(window).height()/2-$('.sidebar').height()/2 + 'px'})
    }
}

function toggleIframe() {
    /* Takes a list item (li) and expects exactly one anchor element and one
    iframe child. */
    anchorSelector = '.toggleIframe > a'
    iframeSelecter = '.toggleIframe > iframe'

    displayToggle(anchorSelector, iframeSelecter, function (elm) {
        elm_is_displayed = elm.css('display') != 'none';
        if (elm_is_displayed) {
            elm.prop('src', function (){
                // Set src attribute to the value of data-src
                return elm.data('src');
            });
        }
    })
}

function displayToggle(btn, elm, cb) {
    /* On btn click, toggle the display property of elm between show and hide */
    $(btn).on('click', function (event){
        event.stopPropagation();
        event.stopImmediatePropagation();
        $(this).parent().find('iframe').toggle("slow", function () {
            cb($(this));
        });
    });
}
