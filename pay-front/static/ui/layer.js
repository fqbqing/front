
(function ($) {

    var layer = {};

    layer.alert = function (title, content) {
        if (!content) {
            content = title;
            title = '提示信息';
        }
        var htm = [
            '<div class="modal modal-alert fade" tabindex="-1" role="dialog">',
            '   <div class="modal-dialog modal-sm" role="document">',
            '       <div class="modal-content">',
            '           <div class="modal-header">',
            '               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
            '               <h4 class="modal-title">', title, '</h4>',
            '           </div>',
            '           <div class="modal-body">', content, '</div>',
            '           <div class="modal-footer">',
            '               <button type="button" class="btn btn-ok btn-main" data-dismiss="modal">确定</button>',
            '           </div>',
            '       </div>',
            '   </div>',
            '</div>'
        ];
        var $el = $(htm.join(''));
        $el.appendTo($('body'));
        var deferred = $.Deferred();
        $el.modal({
            backdrop: 'static',
            show: true
        });
        $el.on('hide.bs.modal', function() {
            $el.remove();
            deferred.resolve();
        });
        return deferred;
    };

    layer.confirm = function (title, content) {
        if (!content) {
            content = title;
            title = '提示信息';
        }
        var htm = [
            '<div class="modal modal-alert fade" tabindex="-1" role="dialog">',
            '   <div class="modal-dialog modal-sm" role="document">',
            '       <div class="modal-content">',
            '           <div class="modal-header">',
            '               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
            '               <h4 class="modal-title">', title, '</h4>',
            '           </div>',
            '           <div class="modal-body">', content, '</div>',
            '           <div class="modal-footer">',
            '               <button type="button" class="btn btn-ok btn-main">确定</button>',
            '               <button type="button" class="btn btn-cancel" data-dismiss="modal">取消</button>',
            '           </div>',
            '       </div>',
            '   </div>',
            '</div>'
        ];
        var $el = $(htm.join(''));
        $el.appendTo($('body'));
        var deferred = $.Deferred();
        $el.modal({
            backdrop: 'static',
            show: true
        });
        $el.on('hide.bs.modal', function() {
            $el.remove();
        });
        $el.on('click', '.btn-ok', function () {
            $el.modal('hide');
            deferred.resolve();
        });
        $el.on('click', '.btn-cancel', function () {
            $el.modal('hide');
            deferred.reject();
        });
        return deferred;
    };

    window.YJ = window.YJ || {};

    YJ.layer = layer;

})(jQuery);
