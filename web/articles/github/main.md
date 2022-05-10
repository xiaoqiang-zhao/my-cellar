# 使用 github 遇到的问题记录

## 提交代码问题

### 问题描述

remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
fatal: Authentication failed for 'https://github.com/xiaoqiang-zhao/my-cellar.git/'

好久不用 github，今天提交代码发现不能提交了。看了一下提示，原来是使用用户名和密码的方式提交代码在 2021.8.13 不再被支持了。

应该是安全方案升级，推荐使用 token 的方式来替代，给了文档链接: [https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/)

### 解决方案

需要两步:

1. 生成 token:

https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

按步骤一步步操作就可以。或者直接传送 https://github.com/settings/tokens

注意最后一步需要复制 token，以后就看不到了，这个是一次性的。

2. 登录

本地执行 `git push` 的时候，会弹出用户名和密码输入框，将原来的密码换成上面生成的 token 就可以。
