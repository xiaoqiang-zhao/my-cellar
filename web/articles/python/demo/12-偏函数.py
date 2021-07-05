import functools
def int2(x, base=2):
    return int(x, base)

a = int2('10')
int3 = functools.partial(int, base=8)
b = int3('10')
print(a, b)
# 2 8