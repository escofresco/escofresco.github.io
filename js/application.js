// // Your JavaScript
// (function() {
//
//     var mX, mY, distance, $element  = $('.sidebar a');
//
//     function calculateDistance(elem, mouseX, mouseY) {
//         return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
//     }
//
//     $(document).mousemove(function(e) {
//         mX = e.pageX;
//         mY = e.pageY;
//         console.log($element.offset())
//         distance = calculateDistance($element, mX, mY);
//         console.log(distance)
//         //$distance.text(distance);
//     });
// })();

$(window).on('load', function() {
  var mX, mY, distance, $element  = $('.sidebar a');
  var elements = [$element].concat($('.rainbow'))
  function calculateDistance(elem, mouseX, mouseY) {
      return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
  }

  $(document).mousemove(function(e) {
      mX = e.pageX;
      mY = e.pageY;
      for(var i=0; i<elements.length; i++) {
        distance = calculateDistance(elements[i], mX, mY);
        elements[i] = elements[i].css('font-variation-settings', '"wght"'+(800-distance))
        console.log(distance)
      }
      //$distance.text(distance);
  });
});
