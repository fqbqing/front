/**
 * @file tpl加载插件
 * @author lifayu
 */
define(function (require) {
    var ajax = require('saber-ajax');
    var etpl = require('etpl');
    var template = etpl;
    /**
     * 模板加载插件
     * @class tpl
     */
    var plugin = {
        /**
         * 设置模板引擎实例，可通过此方法来使用非默认引擎实例
         *
         * @param {etpl.Engine} engine 引擎的实例
         */
        setupTemplateEngine: function (engine) {
            template = engine || etpl;
        },

        /**
         * 加载模板，AMD插件对象暴露的方法
         *
         * @param {string} resourceId 模板资源id
         * @param {function} parentRequire 父级`require`函数
         * @param {function} load 加载完成后调用
         */
        load: function (resourceId, parentRequire, load) {
            function addTemplate(text) {
                template.parse(text);

                load(text);
            }

            if (/\.html?$/.test(resourceId)) {

                var url = parentRequire.toUrl(resourceId);
                var options = {
                    method: 'GET',
                    cache: true,
                    dataType: 'text'
                };
                ajax.request(url, options).then(addTemplate);
            }
            else {
                require([resourceId], addTemplate);
            }
        }

    };

    return plugin;
});
