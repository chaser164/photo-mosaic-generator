from urllib.parse import urlparse
import json

def filter_by_photo_id(url_list):
    unique_photo_ids = set()
    filtered_urls = []

    def get_photo_id(url):
        # Parse the URL and get the value of the 'ixid' parameter
        parsed_url = urlparse(url)
        photo_id = parsed_url.path.split('/')[-1].split('?')[0]
        return photo_id

    for url in url_list:
        # We're only concerned with unsplash links
        if not "unsplash" in url:
            # Keep picsum URLs unaffected
            filtered_urls.append(url)
            continue

        photo_id = get_photo_id(url)

        # Only add the URL to the result list if it doesn't have the same photo ID
        if photo_id not in unique_photo_ids:
            unique_photo_ids.add(photo_id)
            filtered_urls.append(url)

    return filtered_urls

# with open('../src/data/images.json', 'r') as file:
#         dict = json.load(file)

# for pair in dict:
#     dict[pair] = filter_by_photo_id(dict[pair])

# # Save dictionary to images.json
# with open('../src/data/images.json', 'w') as file:
#     json.dump(dict, file)