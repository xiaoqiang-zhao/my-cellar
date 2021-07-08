try:
    f = open('./21-read-file.py', 'r')
    print(f.read())
finally:
    if f:
        f.close()
