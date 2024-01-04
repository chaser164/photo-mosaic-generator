let currentImagePath = ''

function handleImageUpload() {
    const input = document.getElementById('imageInput');

    const file = input.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // Enable detail buttons
        lessDetailButton.disabled = false;
        moreDetailButton.disabled = false;
        // Enable both zooms
        minusButton.disabled = false;
        plusButton.disabled = false;
        // Reset detail and zoom
        current_detail = default_detail;
        document.documentElement.style.setProperty('--image-width', `${starting_size}px`);
        const imageUrl = e.target.result;
        currentImagePath = imageUrl;
        render_with_detail(default_detail);
      };

      reader.readAsDataURL(file);
    }
  }

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('imageInput').addEventListener('change', handleImageUpload);
});