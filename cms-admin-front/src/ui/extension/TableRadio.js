/**
 * ESUI (Enterprise Simple UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 表格行内单选框
 * @author jianling(zhaochengyang@baidu.com)
 */
define(
    function (require) {
        var Extension = require('esui/Extension');
        var lib = require('esui/lib');
        // var helper = require('esui/controlHelper');
        var main = require('esui/main');
        var Table = require('esui/Table');
        // var ui = require('esui');
        var $ = require('jquery');
        var u = require('underscore');

        /**
         * 表格行内编辑扩展
         *
         * @class extension.TableRadio
         * @extends Extension
         * @constructor
         */
        function TableRadio() {
            Extension.apply(this, arguments);
        }

        /**
         * 指定扩展类型，始终为`"TableRadio"`
         *
         * @type {string}
         */
        TableRadio.prototype.type = 'TableRadio';

        function setAllWrite(){
            var selectedItems = this.getSelectedItems();
            var selectedNames = [];

            // 取出所有被选中行的name
            for(var i=0; i<selectedItems.length; i++){
                selectedNames.push(selectedItems[i].name);
            }

            for(var i=0; i<this.datasource.length; i++){
                var $row = $(this.getRow(i));
                // 被选中的行
                if( u.indexOf(selectedNames, this.datasource[i].name) >= 0 ){
                    $row.find('input[type="radio"]').eq(1).prop('checked', true);
                    this.datasource[i].authType = 'readWrite';
                }
            }
        }

        function setAllRead(){
            var selectedItems = this.getSelectedItems();
            var selectedNames = [];

            // 取出所有被选中行的name
            for(var i=0; i<selectedItems.length; i++){
                selectedNames.push(selectedItems[i].name);
            }

            for(var i=0; i<this.datasource.length; i++){
                var $row = $(this.getRow(i));
                // 被选中的行
                if( u.indexOf(selectedNames, this.datasource[i].name) >= 0 ){
                    $row.find('input[type="radio"]').eq(0).prop('checked', true);
                    this.datasource[i].authType = 'readOnly';
                }
            }
        }

        // for account edit module
        function setCurrentAccountPrivileges(accountName){
            for(var i = 0; i < this.datasource.length; i++){
                var accountPrivileges = this.datasource[i].accountPrivileges;
                for(var j = 0; j < accountPrivileges.length; j++){
                    if(accountPrivileges[j].accountName === accountName){
                        var $row = $(this.getRow(i));
                        $row.find('input[value="' + accountPrivileges[j].authType + '"]').attr('checked', true);
                        this.setRowSelected(i, true);
                    }
                }
            }
        }

        /**
         * 激活扩展
         *
         * @override
         */
        TableRadio.prototype.activate = function () {
            var target = this.target;
            // 只对`Table`控件生效
            if (!(target instanceof Table)) {
                return;
            }


            target.setAllRead = setAllRead;
            target.setAllWrite = setAllWrite;
            target.setCurrentAccountPrivileges = setCurrentAccountPrivileges;

            target.on('bodyChange', function(e){
                $(target.main).on('click', 'input[type="radio"]', function(e){
                    var $target = $(e.target);
                    var name = $target.attr('name');

                    for(var i=0; i<target.datasource.length; i++){
                        if(target.datasource[i].name == name){
                            target.setRowSelected(i, true);
                        }
                    }
                });
            });

            target.on('select', function(e){
                var selectedItems = target.getSelectedItems();
                var selectedNames = [];

                // 取出所有被选中行的name
                for(var i=0; i<selectedItems.length; i++){
                    selectedNames.push(selectedItems[i].name);
                }

                // 行被选中：如果此行中还没有被选的radio，按照默认值勾选对应的radio；如果已有选中的radio，忽略
                // 行被取消选中：取消此行中被选中的radio
                u.each(target.datasource, function(item, i){
                    var $row = $(target.getRow(i));
                    // 被取消选中
                    if( u.indexOf(selectedNames, item.name) < 0 ){
                        $row.find('input[type="radio"]').attr('checked', false);
                        delete item.authType;
                    }else{  // 被选中

                        if( !$row.find('input[type="radio"]').eq(0).prop('checked') &&
                            !$row.find('input[type="radio"]').eq(1).prop('checked') ){
                            $row.find('input[type="radio"]').eq(0).prop('checked', true);
                        }

                        // 将选中的状态放到表格数据项中
                        if( $row.find('input[type="radio"]').eq(0).prop('checked') ){
                            item.authType = 'readOnly';
                        }else{
                            item.authType = 'readWrite';
                        }
                    }
                });
            });


            Extension.prototype.activate.apply(this, arguments);
        };

        /**
         * 取消扩展的激活状态
         *
         * @override
         */
        TableRadio.prototype.inactivate = function () {
            var target = this.target;
            // 只对`Table`控件生效
            if (!(target instanceof Table)) {
                return;
            }

            Extension.prototype.inactivate.apply(this, arguments);
        };

        lib.inherits(TableRadio, Extension);
        main.registerExtension(TableRadio);

        return TableRadio;
    }
);
