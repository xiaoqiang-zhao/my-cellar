a = list(range(1, 11))
print(a)
# [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

b = [x * x for x in range(1, 11)]
print(b)
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

c = [x * x for x in range(1, 11) if x % 2 == 0]
print(c)
