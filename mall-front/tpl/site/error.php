<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="_csrf" content="{{$app->request->csrfToken}}">
    <title>错误页</title>
    <link rel="stylesheet" href="/static/css/pintuer.css">
    <link rel="stylesheet" href="/static/libs/layer/skin/layer.css">
    <link rel="stylesheet" href="/static/css/animate.css">
    <link rel="stylesheet" href="/static/css/common.css">

    <!--[if lt IE 9]>
    <script src="/static/libs/respond.js"></script>
    <![endif]-->
    {{include file="includes/tongji.html"}}
</head>
<body>
<noscript>
    <div class="nojs">
        <p>您的浏览器已经禁用了JavaScript脚本的执行，这会影响您正常使用本站的功能。</p>
    </div>
</noscript>
<div class="container">
    <div class="margin-large">
        <div class="text-center">
            {{if $name eq 'Not Found (#404)'}}
            <!--<h2 class="padding-top">-->
                <!--<strong>{{$name}}</strong>-->
            <!--</h2>-->

            <div class="margin-large">
                <img src="/static/images/404.png" style="max-width: 100%;">
            </div>
            <p>当前访问的页面不存在!</p>
            {{else}}

            <div class="margin-large">
                <img src="/static/images/500.png" style="max-width: 100%;">
            </div>
            <p>服务器内部出错了!程序员正在努力修复~</p>
            {{/if}}
            <div class="padding-big">
                <a href="javascript:history.back();void(0);" class="button bg-yellow">返回</a>
            </div>
        </div>
    </div>
</div>
</body>
</html>
