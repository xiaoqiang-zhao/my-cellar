class Student(object):

    def __init__(self, name, score):
        self.__name = name
        self.__score = score

    def print_score(self):
        print('%s: %s' % (self.__name, self.__score))

a = Student('xiaoqiang', 60)

a.print_score()

# error
# print(a.__score)

# 不规范的使用
print(a._Student__score)
