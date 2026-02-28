import json
d = json.load(open('data/repeater-status.json'))
print('Valid JSON')
print(f'Nodes: {d["totalNodes"]}')
print(f'Online: {d["onlineNodes"]}')
print(f'Health: {d["networkHealth"]}')
