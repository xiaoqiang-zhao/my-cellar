# HTTP

> 关于协议的那些备忘信息

## Content-Type

POST: 提交数据时Content-Type的不同配置会导致数据以不同的形式来传递。

application/x-www-form-urlencoded  ->  Form Data  表单式的打平的数据

multipart/form-data -> Request Payload   会把数据拼起来，像GET请求那样

application/json   -> Request Payload    结构化的 JSON 数据

## 跨域

在返回头(Response Headers)中配置 Access-Control-Allow-Origin，星号表示允许所有域名下的页面请求和使用返回的数据，也可以单独配置

Access-Control-Allow-Origin:http:*

Access-Control-Allow-Origin:http://www.baidu.com

Access-Control-Allow-Methods:POST