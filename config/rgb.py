from PIL import Image
import requests
from io import BytesIO

# Group into 15 buckets
def bucketize(pixel_value):
    if pixel_value == 255:
        return 14
    else:
        return pixel_value // 17

def get_avg_rgb(image_url):
    try:
        # Fetch the image from the redirected URL
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content))

        # Convert the image to RGB mode (if not already in RGB)
        img = img.convert('RGB')

        # Get the image data
        img_data = img.getdata()

        # Calculate the average RGB values
        total_pixels = len(img_data)
        total_r = sum(pixel[0] for pixel in img_data)
        total_g = sum(pixel[1] for pixel in img_data)
        total_b = sum(pixel[2] for pixel in img_data)

        average_r = total_r // total_pixels
        average_g = total_g // total_pixels
        average_b = total_b // total_pixels

        return {
            'average_rgb': f'{bucketize(average_r)}-{bucketize(average_g)}-{bucketize(average_b)}',
            'url': response.url,
        }

    except Exception as e:
        # Handle exceptions (e.g., invalid URL, unable to fetch image)
        print(f"Error: {e}")

    return None