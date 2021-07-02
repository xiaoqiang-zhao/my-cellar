# 倒序排
a = sorted(['bob', 'about', 'Zoo', 'Credit'], key=str.lower, reverse=True)
print(a)

# 按成绩从高到低排序：

L = [('Bob', 75), ('Adam', 92), ('Bart', 66), ('Lisa', 88)]

def by_score(t):
    return t[1]

L2 = sorted(L, key=by_score)
print(L2)
# [('Bart', 66), ('Bob', 75), ('Lisa', 88), ('Adam', 92)]