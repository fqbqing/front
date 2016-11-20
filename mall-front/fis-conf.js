// node_modules 默认被添加到了 ignore 列表中，所以不做处理也不会被发布
//require('fis3-smarty')(fis);

fis.match('*', {
    useHash: false, // md5 都关掉
    release: '/$0'
});
fis.match('/static/**', {
    useHash: true,
    release: '/$0'
});

fis.media('prod').match('/static/**', {
    useHash: true,
    release: '/static/$0',
    url: '/mall$0'
});

//fis.match('/static/libs/{**/*.js,*.js}', {
//    packTo: '/static/libs/lib.js'
//});

fis.match('*.less', {
    //parser: 'less2',
    parser: fis.plugin('less2', {
        autoprefix: {
            browsers: [
                'last 4 version'
            ]
        }
    }),
    rExt: '.css'
});

fis.media('test').match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});

fis.media('test').match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});

fis.media('test').match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    //  node v5下不兼容，暂时关闭
    //optimizer: fis.plugin('png-compressor')
});

// 清除其他配置，只保留如下配置
fis.media('prod').match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.media('prod').match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

fis.media('prod').match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  //  node v5下不兼容，暂时关闭
  //optimizer: fis.plugin('png-compressor')
});

fis.media('prod').match('/static/**', {
    domain: 'http://static.babamaiche.com'
});

fis.match('*.php', {
    release: '$0'
});

fis.match('/smarty/{*,**/*}', {
    release: '$0'
});

fis.match('tpl/(**)/(*.html)', {
    release: '/tpl/$1/$2'
});

fis.match('/admin/{*,**/*}', {
    release: '$0'
});

fis.match('/(widget/{*,**/*}.tpl)', {
    useMap: true,
    url: '$1' // 这个比较重要
});

fis.match('map.json', {
    release: '/config/$0'
});

fis.match(/.*\.partial\.js$/, {
    isMod: false
});

fis.match('/plugin/test/{*,**/*}', {
    release: false
});