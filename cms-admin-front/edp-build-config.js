exports.input = __dirname;

var path = require('path');
exports.output = path.resolve(__dirname, 'output');

var co = require('co');
var OSS = require('ali-oss');

// var CDN_DOMAIN = '//static.cn';
// var PREFIX = 'cms-admin-front/v/1';

// var moduleEntries = 'html,htm,phtml,tpl,vm,js';
// var pageEntries = 'html,htm,phtml,tpl,vm';

exports.getProcessors = function () {
    var lessProcessor = new LessCompiler({
        files: [
            'src/main/main.less'
        ],
        pageFiles: [
            'entry/main.html'
        ]
    });

    var ossUploader = {
        name: 'OssUploader',
        files: [
            'src/*',
            'src/**/*',
            'dep/*',
            'dep/**/*'
            //'*.js', '*.css', '*.html',
            //'*.eot', '*.svg', '*.ttf', '*.woff',
            //'*.png', '*.jpg', '*.gif', '*.jpeg', '*.bmp', '*.swf'
        ],
        ak: '',
        sk: '',
        bucket: '',
        prefix: PREFIX,
        region: '',
        process: function (file, processContext, callback) {
            var me = this;
            if (!file.outputPath) {
                callback();
                return;
            }
            var client = new OSS({
                region: this.region,
                accessKeyId: this.ak,
                accessKeySecret: this.sk
            });

            co(function* () {
                client.useBucket(me.bucket);
                var objectName = path.join(me.prefix, file.outputPath);
                var result = yield client.put(objectName, new Buffer(file.data));
                callback(null);
            }).catch(function (err) {
                console.log(err);
                callback(err);
            });
        }
    };

    var cssProcessor = new CssCompressor();

    var moduleProcessor = new ModuleCompiler({
        files: [
            'dep/**/*.js',
            'src/**/*.js',
            '!customShim.js',
            '!dep/ueditor/**',
            '!dep/webuploader/**'
        ],
        getCombineConfig: require('./buildconfig')
    });

    //var tplMergeProcessor = new TplMerge({
    //    pluginIds: [
    //        'bat-ria/tpl', '../tpl'
    //    ],
    //    files: [
    //        'src/**/*.js',
    //        'dep/bat-ria/**/*.js'
    //    ]
    //});

    var tplMergeProcessor = new TplMerge({
        pluginIds: ['bat-ria/tpl'],
        outputPluginId: 'bat-ria/tpl',
        outputType: 'js',
        outputPath: 'src/main/template.js',
        html2jsOptions: {
            mode: 'default'
        },
        files: [
            'src/**/*.js',
            //'dep/bat-ria/**/*.js',
            '!src/profile/**/*.js'
        ]
    });

    var tplMergeProcessorCommon = new TplMerge({
        pluginIds: ['bat-ria/tpl'],
        outputPluginId: 'bat-ria/tpl',
        outputType: 'js',
        outputPath: 'src/common/template.js',
        html2jsOptions: {
            mode: 'default'
        },
        files: [
            'dep/bat-ria/**/*.js'
        ]
    });
    //
    //var tplMergeProcessorProfile = new TplMerge({
    //    pluginIds: ['bat-ria/tpl'],
    //    outputPluginId: 'bat-ria/tpl',
    //    outputType: 'js',
    //    outputPath: 'src/profile/template.js',
    //    html2jsOptions: {
    //        mode: 'default'
    //    },
    //    files: [
    //        'src/**/*.js',
    //        //'dep/bat-ria/**/*.js',
    //        '!src/cms/**/*.js'
    //    ]
    //});

    var jsProcessor = new JsCompressor();

    var pathMapperProcessor = new PathMapper({
        mapper: function (value) {
            return value.replace(/entry\/([a-zA-Z0-9_]+)\.html/g, 'tpl/$1.html').replace('src', 'asset');
        }
    });

    var stringReplacer = new StringReplace({
        files: [
            //'main.html',
            //'index.html',
            'entry/*.html',
            '**/*.js'
        ],
        replacements: [
            {from: /entry\/([a-zA-Z0-9_]+)\.html/g, to: 'tpl/$1.html'},
            {from: /src\/common\/img/g, to: 'asset/common/img'}
        ]
    });

    var indexPageCompiler = {
        name: 'IndexPageCompiler',
        files: [
            'entry/main.html',
            'entry/login.html'
        ],
        process: function (file, processContext, callback) {
            var fileData = file.data;

            fileData = fileData.replace(
                /\[__version__\]/g, new Date().getTime());
            // 设置根目录
            //fileData = fileData.replace(/\[__HOME__\]/g, '/web');
            var baseUrl = CDN_DOMAIN + '/' + PREFIX + '/asset';
            fileData = fileData.replace(/\.\.\/src/g, baseUrl);

            file.setData(fileData);
            callback();
        }
    };
    var testIndexPageCompiler = {
        name: 'IndexPageCompiler',
        files: [
            'entry/main.html',
            'entry/login.html'
        ],
        process: function (file, processContext, callback) {
            var fileData = file.data;

            fileData = fileData.replace(
                /\[__version__\]/g, new Date().getTime());
            file.setData(fileData);
            callback();
        }
    };

    return {
        'debug': [
            lessProcessor
        ],
        'default': [
            lessProcessor,
            moduleProcessor,
            pathMapperProcessor,
            stringReplacer,
            ossUploader
        ],
        'test': [
            lessProcessor,
            cssProcessor,
            moduleProcessor,
            tplMergeProcessorCommon,
            tplMergeProcessor,
            testIndexPageCompiler,
            jsProcessor,
            pathMapperProcessor,
            stringReplacer
        ],
        'release': [
            lessProcessor,
            cssProcessor,
            moduleProcessor,
            tplMergeProcessorCommon,
            tplMergeProcessor,
            //tplMergeProcessorProfile,
            indexPageCompiler,
            jsProcessor,
            pathMapperProcessor,
            stringReplacer,
            ossUploader
        ]
    };
};

exports.exclude = [
    'doc',
    'test',
    'module.conf',
    'node_modules',
    'mockup',
    'dep/packages.manifest',
    'dep/*/*/test',
    'dep/*/*/doc',
    'dep/*/*/demo',
    'dep/*/*/*.md',
    'dep/*/*/package.json',
    'edp-*',
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
    '*.swp',
    'GIT_COMMIT',
    'Gruntfile.js'
];

exports.injectProcessor = function (processors) {
    for (var key in processors) {
        global[key] = processors[key];
    }
};
