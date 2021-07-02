def f(x):
    return x * x

r = map(f, range(1, 10))

print(list(r))
# [1, 4, 9, 16, 25, 36, 49, 64, 81]
