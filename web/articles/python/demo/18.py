a = 1
b = 2

# a, b = b, a + b
t = b
b = a + b
a = t

print(a, b)

# 一个有趣的尝试，在 py 中居然有这种写法 a, b = b, a + b，而且自带缓存变量特性。