import random, json

n = 20

statics = []
for i in range(n):
    data = {
        'x':random.random() * 18000 -9000,
        'y':random.random() * 300 + 800,
        'w':random.random() * 1000 + 1000,
        'h':random.random() * 100 + 50,
    }

    statics.append(data)

with open('map.json', 'w') as f:
    f.write(json.dumps(statics))
