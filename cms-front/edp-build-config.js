exports.input = __dirname;

var path = require('path');
var fs = require('fs');
exports.output = path.resolve(__dirname, 'output');

// var CDN_DOMAIN = '//static.cn';
// var PREFIX = 'cms-front/v/1';

// var AliOss = require('edp-build-alioss');

// var moduleEntries = 'html,htm,phtml,tpl,vm,js';
// var pageEntries = 'html,htm,phtml,tpl,vm';

exports.getProcessors = function () {
    var lessProcessor = new LessCompiler({
        files: [
            'src/cms/main.less',
            'src/profile/main.less'
        ],
        pageFiles: [
            'entry/cms.html',
            'entry/login.html',
            'entry/profile.html'
        ]
    });

    // var alioss = new AliOss({
    //     files: [
    //         'src/*',
    //         'src/**/*',
    //         'dep/*',
    //         'dep/**/*'
    //     ],
    //     bucket: '',
    //     prefix: PREFIX,
    //     region: ''
    // });

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
        outputPath: 'src/cms/template.js',
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

    var tplMergeProcessorProfile = new TplMerge({
        pluginIds: ['bat-ria/tpl'],
        outputPluginId: 'bat-ria/tpl',
        outputType: 'js',
        outputPath: 'src/profile/template.js',
        html2jsOptions: {
            mode: 'default'
        },
        files: [
            'src/**/*.js',
            //'dep/bat-ria/**/*.js',
            '!src/cms/**/*.js'
        ]
    });

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
            'entry/cms.html',
            'entry/login.html',
            'entry/profile.html'
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
            'entry/cms.html',
            'entry/login.html',
            'entry/profile.html'
        ],
        process: function (file, processContext, callback) {
            var fileData = file.data;

            fileData = fileData.replace(
                /\[__version__\]/g, new Date().getTime());
            // 设置根目录
            //fileData = fileData.replace(/\[__HOME__\]/g, '/web');
            //var baseUrl = CDN_DOMAIN + '/' + PREFIX + '/asset';
            //fileData = fileData.replace(/\.\.\/src/g, baseUrl);

            file.setData(fileData);
            callback();
        }
    };

    return {
        'debug': [
            // alioss
        ],
        'default': [
            lessProcessor,
            moduleProcessor,
            pathMapperProcessor,
            stringReplacer,
            // alioss
        ],
        'test': [
            lessProcessor,
            cssProcessor,
            moduleProcessor,
            tplMergeProcessorCommon,
            tplMergeProcessor,
            //tplMergeProcessorProfile,
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
            // alioss
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
