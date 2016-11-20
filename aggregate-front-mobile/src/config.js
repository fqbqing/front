/**
 * @file 路由配置
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    return [
        {path: '/404', action: 'common/notFound'},

        {path: '/index', action: 'site/groupon'},
        
        {path: '/site/tuan', action: 'site/tuan'},

        {path: '/s/tuan/:city', action: 'site/tuan'},

        {path: '/s/tuan/:city/:brand', action: 'site/tuan'},

        {path: '/components/city', action: 'components/city', cached: false},

        {path: '/site/groupon', action: 'site/groupon'},

        {path: '/s/groupon/:city', action: 'site/groupon'},

        {path: '/s/groupon/:city/:brand', action: 'site/groupon'}

    ];

});
