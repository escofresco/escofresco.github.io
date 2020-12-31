'use strict';

$(window).on('load', function() {
  /* Do these things once loaded */


});

function toggleIframe(elm) {

  const frameOverlayContainer = $($(elm).closest('li').find(".frame-overlay-container")[0]);
  console.log(frameOverlayContainer);
  if ( frameOverlayContainer.css('display') === 'none' ) {
    frameOverlayContainer.css({'display': 'block'});
  } else {
    frameOverlayContainer.css({'display': 'none'});
  }
}
