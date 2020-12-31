'use strict';

$(window).on('load', function() {
  /* Do these things once loaded */

  // Call resize functions to setup page content
  adjustContentHeight();
  adjustSidebarHeight();

  // Set up iframe toggle listener
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

$(window).resize(function() {
  adjustContentHeight();
  adjustSidebarHeight();
});

function adjustContentHeight() {
  /* Change size of content class so it fits in the middle of the screen */
  if ($('.content').height() < $(window).height()) {
    $('.content').css({
      'top': $(window).height() / 2 - $('.content').height() / 2 + 'px'
    })
  }
}

function adjustSidebarHeight() {
  /* Change size of sidebar class so it fits in the middle of the screen */
  if ($('.sidebar').height() < $(window).height()) {
    $('.sidebar').css({
      'top': $(window).height() / 2 - $('.sidebar').height() / 2 + 'px'
    })
  }
}

function toggleIframe() {
  /* Takes a list item (li) and expects exactly one anchor element and one
  iframe child. */
  const anchorSelector = '.toggleIframe > a'
  const iframeSelecter = '.toggleIframe > iframe'

  displayToggle(anchorSelector, iframeSelecter, function(elm) {
    const elmIsDisplayed = elm.css('display') != 'none'
    if (elmIsDisplayed) {
      /* iframe is visible */
      // make spinner overlay if it hasn't been created
      if (!immediateElementExists('.spinner-container', elm.parent())) {
        overlaySpinner(elm);
      } else {
        // display loading spinning until iframe has loaded
        toggleLoadingSpinnerForElm(elm, elmIsDisplayed);
      }

      elm.on('load', function() {
        /* iframe has loaded */
        // remove loading spinner
        //toggleLoadingSpinnerForElm(elm, elmIsDisplayed);
      });
      elm.prop('src', function() {
        // Set src attribute to the value of data-src
        return elm.data('src');
      });
    }
  })
}

function displayToggle(btn, elm, cb) {
  /* On btn click, toggle the display property of elm between show and hide */
  $(btn).on('click', function(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    $(this).parent().find('iframe').toggle("slow", function() {
      cb($(this));
    });
  });
}

function toggleLoadingSpinnerForElm(elm, elmIsDisplayed) {
  const spinner = $(elm.parent().children('.spinner-container')[0]);
  spinner.toggle(!elmIsDisplayed);
}

function overlaySpinner(elm) {
  const spinnerContainer = $('<div style="z-index: 100;" class="spinner-container"></div>');
  const spinner = $(`
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>`);
  const elmHeight = elm.height();
  const elmWidth = elm.width();

  // put spinner in spinner container
  spinnerContainer.append(spinner);

  // put spinner-container right before elm
  elm.before(spinnerContainer);

  // make spinner-container same size as elm
  spinnerContainer.css({
    'z-index': 2, // for overlay
    'position': 'relative',
    'height': elmHeight,
    'width': elmWidth
  });

  // center spinner in spinner-container
  spinner.css({
    'position': 'relative',
    'top': elmHeight / 2 - spinner.height() / 2,
    'left': elmWidth / 2 - spinner.width() / 2
  });
}

function immediateElementExists(selector, container) {
  /* Check if elm is in container */
  return container.children(selector).length > 0;
}