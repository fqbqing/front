<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="_csrf" content="{{$app->request->csrfToken}}">
    <title>错误页</title>
    <link rel="stylesheet" href="/static/css/common.less">
    {{include file="include/tongji.html"}}
    <style>
    .margin-large {
        margin: 30px 0;
    }
    p {
        color: #666;
    }
    </style>
</head>
<body>
<noscript>
    <div class="nojs">
        <p>您的浏览器已经禁用了JavaScript脚本的执行，这会影响您正常使用本站的功能。</p>
    </div>
</noscript>
<div class="x-header">
    <div class="container">
        <a href="/" class="x-header-slogan"></a>
    </div>
</div>
<div class="x-body">
    <div class="container">
        <div class="text-center">
            {{if $name eq 'Not Found (#404)'}}
            <div class="margin-large">
                <img src="/static/images/404.png" style="width: 400px;">
            </div>
            <p>当前访问的页面不存在!</p>
            {{else}}
            <div class="margin-large">
                <img src="/static/images/500.png" style="width: 400px;">
            </div>
            <p>服务器内部出错了!程序员正在努力修复~</p>
            {{/if}}
            <div class="padding-big">
                <a href="javascript:history.back();void(0);" class="btn btn-danger">返回</a>
            </div>
        </div>
    </div>
</div>
</body>
</html>
