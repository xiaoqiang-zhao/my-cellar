def lazy_sum(*args):
    ax = None
    def sum():
        nonlocal ax
        if ax != None:
            print('cache')
            return ax
        else:
            ax = 0
            for n in args:
                ax = ax + n
            print('count')
            return ax
    return sum

sum = lazy_sum(1, 2)

print(sum())
# count 3
print(sum())
# cache 3