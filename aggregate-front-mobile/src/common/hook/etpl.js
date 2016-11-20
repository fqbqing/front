/**
 * Created by lifayu on 15/1/1.
 */
define(function (require) {
    var etpl = require('etpl');

    etpl.addFilter('static', function (path) {
        return require.toUrl(path);
    });
    etpl.addFilter('dft', function (value, dft) {
        return value || dft;
    });
});
