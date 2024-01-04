const targetWidth = 175;

document.addEventListener('DOMContentLoaded', () => {
  const parentContainer = document.getElementById('grid-container');

  parentContainer.addEventListener('mousedown', handleZoom);
  parentContainer.addEventListener('mouseup', handleZoomEnd);
  parentContainer.addEventListener('mouseout', handleZoomEnd);

  // Touch events
  parentContainer.addEventListener('touchstart', handleZoom);
  parentContainer.addEventListener('touchend', handleZoomEnd);
  parentContainer.addEventListener('touchcancel', handleZoomEnd);

  function handleZoom(event) {
    const targetImg = event.target.closest('img');
    // Return on non-image event
    if (!targetImg) return;

    const currentWidth = targetImg.offsetWidth;
    const scaleFactor = targetWidth / currentWidth;
    document.documentElement.style.setProperty('--scale-factor', scaleFactor);

    targetImg.classList.add('zoomed');
  }

  function handleZoomEnd(event) {
    const targetImg = event.target.closest('img');
    if (targetImg) {
      targetImg.classList.remove('zoomed');
    }
  }
});
