import random, json

LOWER_BOUND = -1000
UPPER_BOUND = 1000
COLLIDER_RANGE = 1000
n = 20

statics = []
for i in range(n):
    data = {
        'x':random.random() * (UPPER_BOUND - LOWER_BOUND) + LOWER_BOUND,
        'y':random.random() * (UPPER_BOUND - LOWER_BOUND) + LOWER_BOUND,
        'w':random.random() * COLLIDER_RANGE,
        'h':random.random() * COLLIDER_RANGE,
    }

    statics.append(data)

with open('map.json', 'w') as f:
    f.write(json.dumps(statics))
