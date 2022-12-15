import numpy as np

def map_angle_to_speed(x):
  l = np.piecewise(x, [((x >= 0) & (x <= 90)), ((x > 90) & (x <= 180)), ((x > 180) & (x <= 225)), ((x > 225) & (x <= 270)), ((x > 270) & (x <= 360))], 
  [1, lambda x: (-1/45)*x + 3, lambda x: (2/45)*x - 9, lambda x: (-2/45)*x + 11, lambda x: (1/45)*x - 7])
  
  r = np.piecewise(x, [((x >= 0) & (x <= 90)), ((x > 90) & (x <= 180)), ((x > 180) & (x <= 270)), ((x > 270) & (x <= 315)), ((x > 315) & (x <= 360))], 
  [lambda x: (1/45)*x - 1, 1, lambda x: (-1/45)*x + 5, lambda x: (2/45)*x - 13, lambda x: (-2/45)*x + 15])
  
  return (l, r)

def write_to_file(filename):
  with open(filename, 'w') as f:
    for i in range(0, len(angles)):
      f.write(f"{angles[i]}, {l[i]}, {r[i]}\n")

def get_motor_speed(angle):
  return l[angle], r[angle]


angles = np.array([float(i) for i in range(0, 360)])
l, r = map_angle_to_speed(angles)
#write_to_file('speed_angle_mappings.txt')

for angle in [0, 90, 135, 180, 225, 270, 315]:
  l_speed, r_speed = get_motor_speed(angle)
  print(f"At angle {angle}, left motor should be at {l_speed:.2f} and right motor at {r_speed:.2f}")