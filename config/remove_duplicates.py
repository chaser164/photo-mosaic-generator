import json

def rm_dup(lst):
    # Use set to remove duplicates
    return list(set(lst))

# with open('../src/data/images.json', 'r') as file:
#         dict = json.load(file)

# for pair in dict:
#     dict[pair] = rm_dup(dict[pair])

# # Save dictionary to images.json
# with open('../src/data/images.json', 'w') as file:
#     json.dump(dict, file)
