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
