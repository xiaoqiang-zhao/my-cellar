## 布局组件

RelativeLayout，相对布局，使用广泛，控件的位置是按照相对位置来计算的，控件之间的位置具有相对对应的关系，是最灵活最常用的布局。
ConstraintLayout，约束布局，最好嵌套在最后一层的布局里,作为为其他控件提供确定位置的布局
LinearLayout，线性布局
CoordinatorLayout，协调布局，必需做为根布局存在,才能使它的子view或者layout都有动画关联效果

layout_constraintLeft_toLeftOf  我的左侧与你的左侧对齐，parent，@+id/editText
layout_constraintBaseline_toBaselineOf 基线对齐

[CoordinatorLayout 与 ConstraintLayout 的关系](https://www.cnblogs.com/guanxinjing/p/10158562.html)

[ConstraintLayout-进阶的RelativeLayout](https://www.jianshu.com/p/d64d845b6b90)

[ConstraintLayout 全解析](https://juejin.im/post/5c0bd6b05188257c3045dc50)

[ConstraintLayout在项目中实践与总结](https://juejin.im/post/5a1d9ba66fb9a044fb07819e)
