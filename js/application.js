'use strict';
const assert = (condition) => {
  if (!!!condition)
  throw "Assertion Error!";
}

const activeframeSingleton = (() => {
  /* iframe display logic to make sure only one iframe shows up at a time
  * uses the YUI Module pattern to shield these variables from global scope.
  * See:
  * https://stackoverflow.com/a/2613647
  * https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s02.html
  */
  let frameOverlayContainer;
  let frame;
  let overlay;
  let isVisible = false;

  // Make the iframe overlay container (".frame-overlay-container") and underlying
  // content visible.
  const open = () => {
    frameOverlayContainer.css({ 'display': 'block' });
    isVisible = true;
  };

  // Close the open iframe overlay container
  const close = () => {
    frameOverlayContainer.css({ 'display': 'none' });
    isVisible = false;
  };

  // Display the new overlay with a spinner until the underlying iframe
  // has loaded.
  const setUp = (container) => {
    assert(container.hasClass("frame-overlay-container"));
    assert(!isVisible);
    frameOverlayContainer = container;
    overlay = $(container.find(".overlay")[0]);
    frame = $(container.find("iframe")[0]);
    assert(frame.data("src") !== undefined);

    // If the src attribute exists, then the iframe is already loaded;
    // exit early.
    if (frame.attr("src") != undefined) return;

    // Add spinner to overlay
    overlay.html(`
      <div class="d-flex justify-content-center  align-items-center" style="height: 100%">
      <div class="spinner-border spinner-border-sm ms-auto" role="status" aria-hidden="true"></div>
      <strong>Loading...</strong>
      </div>`
    );

    // Add onload callback that hides the loading overlay and displays
    // the loaded iframe.
    frame.on("load", () => {
      // Hide the overlay
      overlay.css({ "display": "none" });
    });

    // Display the loading overlay
    overlay.css({ "display": "block" });

    // Use the data-src attribute to set the src. This is intended to delay
    //  loading of the iframe.
    frame.attr("src", frame.data("src"));


  };

  const update = (container) => {
    close();
    setUp(container);
  };

  return {

    toggle: (container) => {

      // Handle intialization
      if (frameOverlayContainer === undefined) setUp(container);
      assert(frameOverlayContainer !== undefined);

      // Handle toggle for new element
      // Check if this container is the one that is currently open.
      if (!frameOverlayContainer.is(container)) update(container);

      // Toggle display
      if (isVisible) close();
      else open();
    },
    state: () => isVisible
  };
})();

const toggleIframe = (elm) => {
  /*
  * This is a convenience method for Singleton.toggle that finds the nearest
  * element with "frame-overlay-container" class and uses that as the toggle
  * element.
  */
  const frameOverlayContainer = $(
    $(elm).closest('li').find(".frame-overlay-container")[0]
  );
  activeframeSingleton.toggle(frameOverlayContainer);
}

const emojiRain = (() => {
  /* Full screen emoji rain animation,
   * courtesy of https://codepen.io/robertheiser/pen/NXrqXa
   */
  const container = document.querySelector("#animate");
  const emoji = ['🌽', '🍇', '🍌', '🍒', '🍕', '🍷', '🍭', '💖', '💩', '🐷', '🐸', '🐳', '🎃', '🎾', '🌈', '🍦', '💁', '🔥', '😁', '😱', '🌴', '👏', '💃'];
  const circles = [];
  let circleInView = true;

  function Circle(x, y, c, v, range) {
    let _this = this;
    this.x = x;
    this.y = y;
    this.color = c;
    this.v = v;
    this.range = range;
    this.element = document.createElement('span');
    this.element.style.opacity = 0;
    this.element.style.position = 'absolute';
    this.element.style.fontSize = '26px';
    this.element.style.color = 'hsl('+(Math.random()*360|0)+',80%,50%)';
    this.element.innerHTML = c;
    container.appendChild(this.element);

    this.update = () => {
      if (_this.y > window.innerHeight*2) {
        _this.y = 80 + Math.random() * 4;
        _this.x = _this.range[0] + Math.random() * _this.range[1];
        circleInView = false;
        return;
      }
      _this.y += _this.v.y;
      _this.x += _this.v.x;
      this.element.style.opacity = 1;
      this.element.style.transform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
      this.element.style.webkitTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
      this.element.style.mozTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
    };
  };

  const addCircle = (delay, range, color) => {
    setTimeout(() => {
      const c = new Circle(range[0] + Math.random() * range[1], 80 + Math.random() * 4, color, {
        x: -0.15 + Math.random() * 0.3,
        y: 10 + Math.random() * 1
      }, range);
      circles.push(c);
    }, delay);
  }

  for (let i = 0; i < 15; i++) {
    addCircle(i * 150, [10 + 0, 300], emoji[Math.floor(Math.random() * emoji.length)]);
    addCircle(i * 150, [10 + 0, -300], emoji[Math.floor(Math.random() * emoji.length)]);
    addCircle(i * 150, [10 - 200, -300], emoji[Math.floor(Math.random() * emoji.length)]);
    addCircle(i * 150, [10 + 200, 300], emoji[Math.floor(Math.random() * emoji.length)]);
    addCircle(i * 150, [10 - 400, -300], emoji[Math.floor(Math.random() * emoji.length)]);
    addCircle(i * 150, [10 + 400, 300], emoji[Math.floor(Math.random() * emoji.length)]);
    addCircle(i * 150, [10 - 600, -300], emoji[Math.floor(Math.random() * emoji.length)]);
    addCircle(i * 150, [10 + 600, 300], emoji[Math.floor(Math.random() * emoji.length)]);
  }

  function _animate() {
    for (let i in circles) circles[i].update();
    if (circleInView) requestAnimationFrame(_animate);
    else console.log("forecast: no emoji rain");
    circleInView = true;
  }
  return {
    animate: (limit) => _animate()
  };
})();

$(window).on('load', function() {
  /* Do these things once loaded */

  // Make all attribute of the frame overlay singleton immutable.
  Object.freeze(activeframeSingleton);

  // Enable Bootstrap tooltip
  $("body").tooltip({ selector: '[data-toggle=tooltip]' });

  //emojiRain.animate();
  
});
