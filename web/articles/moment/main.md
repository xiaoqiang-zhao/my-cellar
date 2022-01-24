# moment

> moment 是前端很常用的一个库，需要记录一些常用方法，每次都去查官网挺浪费时间的。

## 官网

https://momentjs.com/

## 构造函数

moment(String);

```js
var day = moment("1995-12-25");
```

moment(String, String);
moment(String, String, String);
moment(String, String, String[]);
moment(String, String, Boolean);
moment(String, String, String, Boolean);

```js
// 如果你知道日期的格式
moment("12-25-1995", "MM-DD-YYYY");
```

最后 Boolean 参数为是否为严格模式。

## valueOf()

```js
var a = moment();
a.valueOf(); // 1360002924000
```

## 获取秒数

```js
var a = moment();
a.unix()(); // 1360002924
```

## startOf(String)

在搜索条件中，如果是日期区间，经常需要输入 2021.12.1 0:00:00 ~ 2021.12.2 23:59:59 这种格式的数据。取前面的零点零分，去后面的 23 点 59 分 59 秒

```js
moment().startOf('year');    // set to January 1st, 12:00 am this year
moment().startOf('month');   // set to the first of this month, 12:00 am
moment().startOf('quarter');  // set to the beginning of the current quarter, 1st day of months, 12:00 am
moment().startOf('week');    // set to the first day of this week, 12:00 am
moment().startOf('isoWeek'); // set to the first day of this week according to ISO 8601, 12:00 am
moment().startOf('day');     // set to 12:00 am today
moment().startOf('date');     // set to 12:00 am today
moment().startOf('hour');    // set to now, but with 0 mins, 0 secs, and 0 ms
moment().startOf('minute');  // set to now, but with 0 seconds and 0 milliseconds
moment().startOf('second');  // same as moment().milliseconds(0);
```

## endOf(String)

同上

## isValid()

```js
moment("2010 13",           "YYYY MM").isValid();     // false (not a real month)
```

## 计算剩余天数

moment().diff(Moment|String|Number|Date|Array, String, Boolean);

示例一:
```js
const momentStart = moment('2021-10-1');
const momentEnd = moment('2021-11-4');
const str = `间隔${momentEnd.diff(momentStart, 'day')}天`;
```

示例二:
```js
var a = moment([2008, 9]);
var b = moment([2007, 0]);
a.diff(b, 'years');       // 1
a.diff(b, 'years', true); // 1.75
```

## 日期格式化

```js
const date = moment(new Date());
date.format('YYYY-MM-DD')
```
