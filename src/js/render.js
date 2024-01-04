const default_detail = 3.5;
let renderCount = 0;

function render_with_detail(detail = default_detail) {
    // Do nothing with empty image path
    if (currentImagePath == '') {
        return;
    }
    // Do nothing if another render is already present
    if(renderCount >= 1) {
      return;
    }
    renderCount++;
    // Clear initial advice
    const initialAdvice = document.getElementById('initial-advice');
    initialAdvice.textContent = '';

    const blockSize = detail;
  
    // Remove all old child elements
    const gridContainer = document.getElementById('grid-container');
    while (gridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }

    // Remove advice during render
    const advice = document.getElementById('advice');
    advice.textContent = '';
    renderCount--;
    
    pixelateImage(currentImagePath, blockSize)
      .then(pixelArray => {
        populateGrid(pixelArray);
        document.documentElement.style.setProperty('--img-helpers-visibility', 'flex');
      })
      .catch(error => {
        // Handle errors
        console.error(error.message);
      });
}