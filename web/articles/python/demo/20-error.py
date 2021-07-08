class FooError(ValueError):
    pass

def foo(s):
    n = int(s)
    if n == 0:
        raise FooError('invalid value: %s' % s)
    return 10 / n

if 0 == '0':
    print("0 == '0' Ture")
else:
    print("0 == '0' False")

foo('0')
