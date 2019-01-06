## 强缓存

Expires：

Expires 是 http1.0 提出的一个表示资源过期时间的 header，它描述的是一个绝对时间，由服务器返回，用 GMT 格式的字符串表示，如：Expires:Thu, 31 Dec 2037 23:55:55 GMT。

1) 浏览器第一次跟服务器请求一个资源，服务器在返回这个资源的同时，在respone的header加上Expires的header

2) 浏览器在接收到这个资源后，会把这个资源连同所有 response header 一起缓存下来（所以缓存命中的请求返回的 header 并不是来自服务器，而是来自之前缓存的 header）；

3）浏览器再请求这个资源时，先从缓存中寻找，找到这个资源后，拿出它的Expires跟当前的请求时间比较，如果请求时间在Expires指定的时间之前，就能命中缓存，否则就不行。

4）如果缓存没有命中，浏览器直接从服务器加载资源时，Expires Header 在重新加载的时候会被更新。

Expires 是较老的强缓存管理 header，由于它是服务器返回的一个绝对时间，在服务器时间与客户端时间相差较大时，缓存管理容易出现问题，比如随意修改下客户端时间，就能影响缓存命中的结果。所以在 http1.1 的时候，提出了一个新的 header，就是 Cache-Control。

Cache-Control:

Cache-Control 设置一个相对时间，在配置缓存的时候，以秒为单位，用数值表示，如：Cache-Control:max-age=315360000。

1）浏览器第一次跟服务器请求一个资源，服务器在返回这个资源的同时，在respone的header加上Cache-Control的header；

2）浏览器在接收到这个资源后，会把这个资源连同所有 response header 一起缓存下来；

3）浏览器再请求这个资源时，先从缓存中寻找，找到这个资源后，根据它第一次的请求时间和Cache-Control 设定的有效期，计算出一个资源过期时间，再拿这个过期时间跟当前的请求时间比较，如果请求时间在过期时间之前，就能命中缓存，否则就不行。

4）如果缓存没有命中，浏览器直接从服务器加载资源时，Cache-Control Header在重新加载的时候会被更新。

如果想要设置不缓存，Expires 设为 -1，Cache-Control 设为 no-cache。
