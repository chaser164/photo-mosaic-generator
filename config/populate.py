from rgb import get_avg_rgb
import json
from unsplash_rm_dup import filter_by_photo_id

# url resources
#image_url = 'https://picsum.photos/200'
image_url = 'https://random.imagecdn.app/200/200/'

while True:
    # Load dictionary from images.json
    with open('../src/data/images.json', 'r') as file:
        dict = json.load(file)

    # get an image and color value and append to dict
    counter = 0
    for i in range(50):
        result = get_avg_rgb(image_url)
        # Ensure exact URL not already in dict
        if result and (result['url'] not in dict[result['average_rgb']]):
            # Ensure unsplash URLs are unique too
            pre_append_len = len(dict[result['average_rgb']])
            dict[result['average_rgb']].append(result['url'])
            dict[result['average_rgb']] = filter_by_photo_id(dict[result['average_rgb']])
            # If len unchanged, it was a duplicate
            if pre_append_len != len(dict[result['average_rgb']]):
                counter += 1

    # Save dictionary to images.json
    with open('../src/data/images.json', 'w') as file:
        json.dump(dict, file)

    print(f'{counter} saved')




