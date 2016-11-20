Connection
===

通过 `require('saber-env/connection')` 引入

## API

* _return_ `{Object}`
    * **type** `{string}` 当前网络状态类型

可能的值为: `unknown`、`ethernet`、`wifi`、`2g`、`3g`、`4g`、`none`

_注：当 `无法检测/检测失败/其他异常` 情况下默认返回 `unknown`_
