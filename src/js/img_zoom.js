const targetWidth = 175;
let touchMoved = false;

document.addEventListener('DOMContentLoaded', () => {
  const parentContainer = document.getElementById('grid-container');

  parentContainer.addEventListener('mouseup', handleZoom);
  parentContainer.addEventListener('touchend', handleZoom);

  // Dealing with scrolling action
  parentContainer.addEventListener('touchmove', function(event) {
    touchMoved = true;
  });

  function handleZoom(event) {
    // Guard against scrolling action
    if(touchMoved) {
      touchMoved = false;
      return;
    }
    const targetImg = event.target.closest('img');
    // Return on non-image event
    if (!targetImg) return;

    const currentWidth = targetImg.offsetWidth;
    const scaleFactor = targetWidth / currentWidth;
    document.documentElement.style.setProperty('--scale-factor', scaleFactor);

    targetImg.classList.add('zoomed');
    setTimeout(() => {
      targetImg.classList.remove('zoomed');
    }, 750);
  }
});

