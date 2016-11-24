// node_modules 默认被添加到了 ignore 列表中，所以不做处理也不会被发布
//require('fis3-smarty')(fis);

var fs = require('fs');
var CDN_DOMAIN = '//oss.zhanqu.im';
var CDN_PREFIX = 'pay-front';

var nodeConfig = {oss: {
    accessKey:'iKz7jLlSvgxaeL61',
    accessKeySecret:'37lvuBqppN4Lybv6TYdZff22ORZOZD'
}};
/*if (process.env.NODE_ENV == 'prod') {
 nodeConfig = fs.readFileSync('/home/work/.node-config', 'utf8');
 nodeConfig = JSON.parse(nodeConfig);
 }*/

fis.match('*', {
    useHash: false, // md5 都关掉
    release: '/$0'
});
fis.match('/static/**', {
    useHash: true,
    release: '/$0'
});

//fis.match('/static/libs/{**/*.js,*.js}', {
//    packTo: '/static/libs/lib.js'
//});
fis.match('/static/**/*.less', {
    parser: 'less2',
    rExt: '.css',
    release: '/$0'
});
fis.match('/tpl/**.less', {
    parser: 'less2',
    rExt: '.css',
    release: '/static/$0'
});

fis.match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    //  node v5下不兼容，暂时关闭
    //optimizer: fis.plugin('png-compressor')
});

fis.match('/tpl/**.{png,js,css}', {
    useHash: true,
    release: '/static/$0'
});

fis.match('*.php', {
    release: '/$0'
});

fis.match('/smarty/{*,**/*}', {
    release: '/$0'
});

fis.match('/tpl/(**)/(*.html)', {
    release: '/tpl/$1/$2'
});

var CDN_DEPLOY = [
    fis.plugin('aliyunoss', {


        ak: 'iKz7jLlSvgxaeL61', // 在阿里云OSS申请的 accessKeyId
        sk: '37lvuBqppN4Lybv6TYdZff22ORZOZD', // 在阿里云OSS申请的 secretAccessKey
        bucket: 'zhanqu', // 你的存储空间名称
        prefix: CDN_PREFIX, // 目录前缀
        region: 'oss-cn-shenzhen-internal',
        ossServer: 'http://oss-cn-shenzhen.aliyuncs.com'
    }),
    fis.plugin('local-deliver')
];


fis.match('*', {
    deploy: [
        fis.plugin('local-deliver')
    ]
});
fis.media('prod').match('/tpl/**.{png,js,css}', {
    useHash: true,
    release: '/static/$0',
    domain: CDN_DOMAIN + '/' + CDN_PREFIX,
    deploy: CDN_DEPLOY
});
fis.media('prod').match('/static/**', {
    useHash: true,
    release: '/$0',
    domain: CDN_DOMAIN + '/' + CDN_PREFIX,
    deploy: CDN_DEPLOY
});