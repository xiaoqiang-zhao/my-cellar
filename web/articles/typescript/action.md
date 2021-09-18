# TypeScript 实践备忘录

## import type

看到这样一行代码: `import type { IRoutes } from '@/models/IRoute';`

不懂了，查了一下是这样的: 仅仅想引入他的数据类型，而不是真的引入这个类。

定义结构模块:

```ts
// a 模块
export type Name : string;

export type Student = {
  name: Name,
  age: number
}

export type School = {
  name: Name,
  students: Array<Student>
}
```

使用结构模块来约束数据
```ts
import type { Name, Student,  School } from './a';
const jack: Student = {
    name: 'jack',
    age: 18
}
```

参考: [React 里的 import type](https://www.jianshu.com/p/6fe249d47d27)

## 疑问

```ts
export interface IUser {
  // 用户唯一名
  username: string
}
```

这种写法和 type 写法有什么区别？

## TypeScript 如何为嵌套对象定义接口(interface)

假设我有一个解析为如下内容的 JSON 有效负载:

```ts
{
  name: "test",
  items: {
    a: {
      id: 1,
      size: 10
    },
    b: {
      id: 2,
      size: 34
    }
  }
}
```

```ts
export interface Item {
  id: number;
  size: number;
}

export interface Example {
  name: string;
  items: {
    [key: string]: Item
  };
}
```

参考:
https://www.coder.work/article/1308534

## props.userStore? 写法

```ts
props.userStore?.updateIUser({
  name: getDoctorBaseInfoResData.name,
  avatar: getDoctorBaseInfoResData.avatar,
  isLogin: true,
});
```

## 装饰器

在看 react Mobx 的时候看到了这种写法:

```ts
@observable
public currentUser: IUser = {
  name: '',
  isLogin: false,
  avatar: '',
};
```

这个 @ 有点陌生，查了一下是装饰器。

参考：https://segmentfault.com/a/1190000015566627

## interface 扩展

```ts

```

## 遍历对象

有问题的写法会报 eslint 校验失败: error Use array destructuring prefer-destructuring。

```ts
// 有问题的写法
const filterObj: any = {};
if (filteredInfo) {
  for(const key of Object.keys(filteredInfo)) {
    if (filteredInfo[key]?.length) {
      filterObj[key] = filteredInfo[key][0];
    }
  }
}

// 升级写法
interface ISimpleKeyValueObject {
  [key: string]: [string];
}

interface IFilterObj {
  [key: string]: string;
}

const filterObj: IFilterObj = {};
if (filteredInfo) {
  Object.keys(filteredInfo).forEach((key) => {
    if (Array.isArray(filteredInfo[key]) && filteredInfo[key].length > 0) {
      const [value] = filteredInfo[key];
      filterObj[key] = value;
    }
  });
}
```

参考:
1. https://juejin.cn/post/6844904147146260488
2. https://eslint.org/docs/4.0.0/rules/prefer-destructuring
