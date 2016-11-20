/**
 * @file build配置
 * @author edpx-mobile
 */

var cwd = process.cwd();
var path = require('path');
var fs = require('fs');
var vueify = require('vueify');
var u = require('underscore');
var Imagemin = require('imagemin');

var AliOss = require('edp-build-alioss');

var CDN_DOMAIN = '//static.chedamai.cn';
var PREFIX = 'agent-front/v/[oss_version]';

/**
 * 输入目录
 *
 * @type {string}
 */
exports.input = cwd;

/**
 * 输出目录
 *
 * @type {string}
 */
exports.output = path.resolve(cwd, './output');

process.env.NODE_ENV = 'production';
/**
 * 获取构建processors的方法
 *
 * @return {Array}
 */
exports.getProcessors = function () {
    var cssProcessor = new CssCompressor();
    var lessProcessor = new LessCompiler({
        files: [
            'src/biz.less'
        ],
        pageFiles: [
            'index.html'
        ]
    });

    var imageMinProcessor = {
        name: 'ImageminProcessor',
        files:[
            '*.jpg',
            '*.gif',
            '*.png',
            '*.svg'
        ],
        process: function (file, processContext, callback) {
            new Imagemin()
                .src(file.fullPath)
                //.dest('build/images')
                .use(Imagemin.jpegtran({progressive: true}))
                .use(Imagemin.optipng({optimizationLevel: 3}))
                .run(function (err, files) {
                    //console.log(files[0]);
                    // => {path: 'build/images/foo.jpg', contents: <Buffer 89 50 4e ...>}
                    file.setData(files[0].contents);
                    callback();
                });
        }
    };

    var vueCompiler = {
        name: 'VueCompiler',
        files: [
            '*.vue'
        ],
        process: function (file, context, callback) {
            var content = fs.readFileSync(file.fullPath, 'utf8');
            vueify.compiler.compile(content, file.fullPath, function (err, result) {
                if (!err) {
                    var content = 'define(function(require, exports, module){\n' + result + '\n});';
                    file.outputPath += '.js';
                    file.extname = 'js';
                    file.setData(content);
                    context.addFileLink(file.path, file.outputPath);
                    callback();
                }
                else {
                    console.log(err);
                    process.exit(1);
                }
            });
        }
    };

    var moduleProcessor = new ModuleCompiler({
        files: [
            'dep/**/*.js',
            'src/**/*.js',
            'src/*.js'
        ],
        getCombineConfig: require('./buildconfig')
    });
    var jsProcessor = new JsCompressor({
        files: [
            '*.js',
            '!*.min.js'
        ]
    });
    var pathMapperProcessor = new PathMapper();
    var htmlImagePathMapperProcessor = new PathMapper({
        replacements: [
            { type: 'html', tag: 'img', attribute: 'src', files: ['*.html'] }
        ]
    });
    var html2jsPorcessor = new Html2JsCompiler({
        files: [
            'src/*.tpl.html',
            'src/**/*.tpl.html'
        ],
        extnames: ['html'],
        combine: true
    });
    var addCopyright = new AddCopyright();

    var alioss = new AliOss({
        files: [
            'src/*',
            'src/**/*',
            'dep/*',
            'dep/**/*',
            'esl.js',
            'apple-touch-icon.png'
        ],
        bucket: '',
        prefix: PREFIX,
        region: ''
    });

    var indexPageCompiler = {
        name: 'IndexPageCompiler',
        files: ['index.html'],
        process: function (file, processContext, callback) {

            var baseUrl = CDN_DOMAIN + '/' + PREFIX;
            var fileData = file.data.replace(/\[__version__\]/g, new Date().getTime())
                //.replace(/\[__CDN__\]/g, 'http://127.0.0.1:8088');
                .replace(/\[__CDN__\]/g, baseUrl);
            file.setData(fileData);
            callback();
        }
    };

    var testIndexPageCompiler = {
        name: 'IndexPageCompiler',
        files: ['index.html'],
        process: function (file, processContext, callback) {

            var baseUrl = '';
            var fileData = file.data.replace(/\[__version__\]/g, new Date().getTime())
                //.replace(/\[__CDN__\]/g, 'http://127.0.0.1:8088');
                .replace(/\[__CDN__\]/g, baseUrl);
            file.setData(fileData);
            callback();
        }
    };

    return {
        debug: [
            lessProcessor,
            cssProcessor,
            vueCompiler,
            html2jsPorcessor,
            moduleProcessor
        ],
        test: [
            lessProcessor,
            cssProcessor,
            vueCompiler,
            html2jsPorcessor,
            moduleProcessor,
            jsProcessor,
            imageMinProcessor,
            htmlImagePathMapperProcessor,
            pathMapperProcessor,
            testIndexPageCompiler,
            addCopyright
        ],
        release: [
            lessProcessor,
            cssProcessor,
            vueCompiler,
            html2jsPorcessor,
            moduleProcessor,
            jsProcessor,
            imageMinProcessor,
            htmlImagePathMapperProcessor,
            pathMapperProcessor,
            indexPageCompiler,
            addCopyright,
            alioss
        ]
    };
};

exports.moduleEntries = 'html,htm,phtml,tpl,vm,js';
exports.pageEntries = 'html,htm,phtml,tpl,vm';


/**
 * 排除文件pattern列表
 *
 * @type {Array}
 */
exports.exclude = [
    'tool',
    'doc',
    'test',
    'mockup',
    'module.conf',
    'dep/packages.manifest',
    'dep/*/*/test',
    'dep/*/*/doc',
    'dep/*/*/demo',
    'dep/*/*/tool',
    'dep/*/*/*.md',
    'dep/*/*/package.json',
    'edp-*',
    'node_modules',
    'buildconfig.js',
    '.edpproj',
    '.svn',
    '.git',
    '.gitignore',
    '.idea',
    '.project',
    'Desktop.ini',
    'Thumbs.db',
    '.DS_Store',
    '*.tmp',
    '*.bak',
    '*.swp'
];

/**
 * builder主模块注入processor构造器的方法
 *
 * @param {Object} processors
 */
exports.injectProcessor = function (processors) {
    for (var key in processors) {
        global[key] = processors[key];
    }
};
