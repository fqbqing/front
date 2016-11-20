/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseAction = require('bat-ria/mvc/BaseAction');
    var u = require('underscore');

    /**
     * Action构造函数
     *
     * @constructor
     */
    function StaffIndex() {
        BaseAction.apply(this, arguments);
    }

    StaffIndex.prototype.modelType = require('./IndexModel');
    StaffIndex.prototype.viewType = require('./IndexView');


    function forwardToPage(e) {
        var me = this;
        var query = {
            group_id: e.group_id,
            pageNo : e.page,
            pageSize : e.pageSize
        };
        return me.model.getStaff(query).then(function (page) {
            me.view.refresh(page);
        });
    }

    function getGroupStaff(e) {
        var me = this;
        return me.model.getGroupStaff({
            group_id: e.group_id
        }).then(function (page) {
            me.view.refresh(page);
        });
    }
    function deleteGroup(e) {
        var me = this;
        me.view.waitConfirm('确定要删除选中的员工组吗？').then(function () {
            me.model.deleteGroup({
                id: e.model.id
            }).then(function (data) {
                //当前组的子组中删除一项
                var result = u.filter(me.view.vue.selectedGroup.children, function(element, index){
                    return element.id != e.model.id;
                });
                me.view.vue.$set('selectedGroup.children',result);
            });
        });

    }
    function deleteGroupStaff(e) {
        var ids = e.ids;
        var me = this;
        if (ids.length > 0) {
            me.view.waitConfirm('确定要删除选中的人员吗？').then(function () {
                me.model.deleteGroupStaff(ids.join(',')).then(function (page) {
                    var pager = me.view.get('pager');
                    me.view.fire('pageSizeChange', {
                        group_id: me.view.vue.selectedGroup.id,
                        page: pager.page,
                        pageSize: pager.pageSize
                    });
                });
            });
        }
        else {
            this.view.alert('请选择要删除的人员');
        }
    }
    function addGroup() {
        var me = this;
        var selectedGroup = me.view.vue.selectedGroup;
        me.view.waitActionDialog({
            title: '添加组到 - ' + me.view.vue.selectedGroup.name,
            width: 500,
            needFoot: true,
            url: '/staff/group/add',
            actionOptions: {
                selectedGroup: me.view.vue.selectedGroup
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            var action = dialog.getAction();
            action.redirectAfterSubmit = function (result) {
                var children = {
                    id: result.id,
                    name: result.name,
                    parent_id: selectedGroup.id
                };
                if(!selectedGroup.children) {
                    me.view.vue.$set('selectedGroup.children', []);
                    selectedGroup.children.push(children);
                    me.view.vue.selectedGroupItem.open = true;
                }
                else {
                    selectedGroup.children.push(children);
                }
                dialog.dispose();
            };
            dialog.getFoot().getChild('btnOk').on('click', function () {
                action.submitEdit();
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }
    function updateGroup() {
        var me = this;
        var selectedGroup = me.view.vue.selectedGroup;
        me.view.waitActionDialog({
            title: '修改组',
            width: 500,
            needFoot: true,
            url: '/staff/group/edit~id=' + selectedGroup.id,
            actionOptions: {
                selectedGroup: me.view.vue.selectedGroup
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            var action = dialog.getAction();
            action.redirectAfterSubmit = function (result) {
                me.view.vue.$set('selectedGroup.name', result.name);
                dialog.dispose();
            };
            dialog.getFoot().getChild('btnOk').on('click', function () {
                action.submitEdit();
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }
    function addGroupStaff() {
        var me = this;
        me.view.waitActionDialog({
            title: '添加员工到 - ' + me.view.vue.selectedGroup.name,
            width: 500,
            needFoot: true,
            url: '/staff/add',
            actionOptions: {
                selectedGroup: me.view.vue.selectedGroup
            }
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            var action = dialog.getAction();
            action.redirectAfterSubmit = function (result) {
                var data = {
                    group_id: me.view.vue.selectedGroup.id
                };
                me.view.fire('getGroupStaff',data);
                dialog.dispose();
            };
            dialog.getFoot().getChild('btnOk').on('click', function () {
                action.submitEdit();
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }
    function updateGroupStaff(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '修改组内员工',
            width: 500,
            needFoot: true,
            url: '/staff/edit~id=' + e.id
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            var action = dialog.getAction();
            action.redirectAfterSubmit = function (result) {
                var pager = me.view.get('pager');
                me.view.fire('pageSizeChange', {
                    group_id: me.view.vue.selectedGroup.id,
                    page: pager.page,
                    pageSize: pager.pageSize
                });
                dialog.dispose();
            };
            dialog.getFoot().getChild('btnOk').on('click', function () {
                action.submitEdit();
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }
    function updateGroupRole(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '给'+e.model.name+'分配角色',
            width: 800,
            needFoot: true,
            url: '/staff/role/distribute/group~id=' + e.model.id

        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            var action = dialog.getAction();
            action.on('afterSaveRole', function () {
                dialog.dispose();
            });
            dialog.getFoot().getChild('btnOk').on('click', function () {
                action.view.fire('saveRole');
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }
    function updateUserRole(e) {
        var me = this;
        me.view.waitActionDialog({
            title: '给'+e.name+'分配角色',
            width: 800,
            needFoot: true,
            url: '/staff/role/distribute/user~id=' + e.id
        }).then(function (event) {
            var dialog = event.target;
            dialog.resize();
            var action = dialog.getAction();
            action.on('afterSaveRole', function () {
                dialog.dispose();
            });
            dialog.getFoot().getChild('btnOk').on('click', function () {
                action.view.fire('saveRole');
            });
            dialog.getFoot().getChild('btnCancel').on('click', function () {
                dialog.dispose();
            });
        });
    }

    /**
     * @protected
     * @override
     */
    StaffIndex.prototype.initBehavior = function () {
        BaseAction.prototype.initBehavior.apply(this, arguments);

        // bind event handlers here
        this.view.on('pageChange', forwardToPage, this);
        this.view.on('pageSizeChange', forwardToPage, this);
        this.view.on('getGroupStaff', getGroupStaff, this);
        this.view.on('deleteGroupStaff', deleteGroupStaff, this);
        this.view.on('addGroup', addGroup, this);
        this.view.on('addGroupStaff', addGroupStaff, this);
        this.view.on('deleteGroup', deleteGroup, this);
        this.view.on('updateGroup', updateGroup, this);
        this.view.on('updateGroupStaff', updateGroupStaff, this);
        this.view.on('updateGroupRole', updateGroupRole, this);
        this.view.on('updateUserRole', updateUserRole, this);
    };

    require('er/util').inherits(StaffIndex, BaseAction);
    return StaffIndex;
});
