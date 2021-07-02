from functools import reduce
def fn(x, y):
    return x * 10 + y

a = reduce(fn, [1, 3, 5, 7, 9])
print(a)
# 13579
