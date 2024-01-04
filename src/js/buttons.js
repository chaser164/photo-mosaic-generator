const step = 50;
const min = 300;
const max = 2500;
const starting_size = 900;
const scale_factor = 12000;
let current_detail = default_detail;
const max_detail = 1.5;
const min_detail = 12;
const detail_step = 0.5;

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const plusButton = document.getElementById('plusButton');
    const minusButton = document.getElementById('minusButton');
    const resetZoomButton = document.getElementById('resetZoomButton');
    const moreDetailButton = document.getElementById('moreDetailButton');
    const lessDetailButton = document.getElementById('lessDetailButton');
    const resetDetailButton = document.getElementById('resetDetailButton');

    plusButton.addEventListener('click', () => {
      // Enable minusButton
      minusButton.disabled = false;
      // Change CSS width
      let currentValue = parseFloat(root.style.getPropertyValue('--image-width'));
      if (isNaN(currentValue)) {
        currentValue = starting_size;
      }
      root.style.setProperty('--image-width', `${Math.min(currentValue + step, max)}px`);
      if((currentValue + step) >= max) {
        plusButton.disabled = true;
      }
    });

    minusButton.addEventListener('click', () => {
      // Enable plusButton
      plusButton.disabled = false;
      // Change CSS width
      let currentValue = parseFloat(root.style.getPropertyValue('--image-width'));
      if (isNaN(currentValue)) {
        currentValue = starting_size;
      }
      root.style.setProperty('--image-width', `${Math.max(currentValue - step, min)}px`);
      // Disable at min size
      if((currentValue - step) <= min) {
        minusButton.disabled = true;
      }
    });

    resetZoomButton.addEventListener('click', () => {
      // Enable both zooms
      minusButton.disabled = false;
      plusButton.disabled = false;
      root.style.setProperty('--image-width', `${starting_size}px`);
    });

    moreDetailButton.addEventListener('click', () => {
      // Enable lessDetailButton
      lessDetailButton.disabled = false;
      // Increase detail if possible
      current_detail -= detail_step;
      render_with_detail(current_detail, currentImagePath);

      if (current_detail <= max_detail) {
        moreDetailButton.disabled = true;
      }
    });

    lessDetailButton.addEventListener('click', () => {
      // Enable moreDetailButton
      moreDetailButton.disabled = false;
      // Diminish detail if possible
      current_detail += detail_step;
      render_with_detail(current_detail, currentImagePath);

      if (current_detail >= min_detail) {
        lessDetailButton.disabled = true;
      }
    });

    resetDetailButton.addEventListener('click', () => {
      // Enable both buttons
      lessDetailButton.disabled = false;
      moreDetailButton.disabled = false;
      current_detail = default_detail;
      render_with_detail(current_detail);
    });
});