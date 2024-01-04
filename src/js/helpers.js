// Groups a number from 0 to 255 into categories from 0 to 14
function bucketize(pixelValue) {
  if (pixelValue === 255) {
    return 14;
  } else {
    return Math.floor(pixelValue / 17);
  }
}

// Returns random element of the list
function choice(list) {
  if (list.length === 0) {
    // Return null for an empty list
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

// Function to load JSON file
function loadJSON(path) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", path, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      }
    };
    xhr.send(null);
  });
}

// Given an rgbTuple, returns a random link to an image with the corresponding color scheme
function findImage(rgbTuple, images) {
  const r = bucketize(rgbTuple[0]);
  const g = bucketize(rgbTuple[1]);
  const b = bucketize(rgbTuple[2]);

  const formatted = `${r}-${g}-${b}`;
  if (images[formatted] && images[formatted].length > 0) {
    return choice(images[formatted]);
  }

  const offsets = [-1, 0, 1];
  let fallbackFormatted = '';
  for (const i of offsets) {
    for (const j of offsets) {
      for (const k of offsets) {
        const potFormatted = `${r + i}-${g + j}-${b + k}`;
        try {
          if (images[potFormatted] && images[potFormatted].length > 0) {
            fallbackFormatted = potFormatted;
            break;
          }
        } catch {
          // Do nothing if a key error is encountered
          continue;
        }
      }
    }
    if (fallbackFormatted) {
      break;
    }
  }

  // Set to average pixel value as ultimate fallback
  if (!fallbackFormatted) {
    const avg = Math.round((r + g + b) / 3);
    fallbackFormatted = `${avg}-${avg}-${avg}`;
  }

  return choice(images[fallbackFormatted]);
}

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
// Set willReadFrequently to true
context.canvas.willReadFrequently = true;

// Returns 3D array of pixelated RGB triple values
function pixelateImage(imagePath, blockSize) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imagePath;

    image.onload = function() {  
      const originalWidth = image.width;
      const originalHeight = image.height;

      // Set the desired width for resizing
      const targetWidth = 190;

      // Calculate the proportional height based on the target width
      const targetHeight = (targetWidth / originalWidth) * originalHeight;
      
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw the resized image on the canvas
      context.drawImage(image, 0, 0, targetWidth, targetHeight);

      // Pixelate the resized image
      context.imageSmoothingEnabled = false;

      const pixelArray = [];

      for (let y = 0; y < targetHeight; y += blockSize) {
        const row = [];

        for (let x = 0; x < targetWidth; x += blockSize) {
          const pixelData = context.getImageData(x, y, blockSize, blockSize).data;
          row.push([pixelData[0], pixelData[1], pixelData[2]]);
        }

        pixelArray.push(row);
      }

      // Resolve the promise with the pixelArray
      resolve(pixelArray);
    };

    // Handle image loading errors
    image.onerror = function() {
      reject(new Error('Failed to load the image.'));
    };
  });
}

// Populates HTML with images
function populateGrid(pixelArray) {
  loadJSON("data/images.json")
    .then(data => {
      const imageData = data;

      const gridContainer = document.getElementById('grid-container');

      for (let i = 0; i < pixelArray.length; i++) {
        const row = document.createElement('div');
        row.classList.add('grid-row');

        for (let j = 0; j < pixelArray[i].length; j++) {
          const pixel = pixelArray[i][j];
          const imgElement = document.createElement('img');
          // Configure imgElement settings
          imgElement.draggable = false;
          imgElement.style.width = `${80/(pixelArray[i].length)}%`
          // Get color-matching url
          imgElement.src = findImage(pixel, imageData);
          imgElement.classList.add('grid-item');
          row.appendChild(imgElement);
        }
        gridContainer.appendChild(row);
      }
      // Tack on advice
      const advice = document.getElementById('advice');
      advice.textContent = 'Click and hold pixels to enlarge';
    })
    .catch(error => {
      // Handle errors
      console.error(error.message);
      return;
    });
}