/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    // require template
    require('bat-ria/tpl!./list.tpl.html');

    var ListView = require('bat-ria/mvc/ListView');

    var user = require('bat-ria/system/user');

    var utils = require('common/utils');
    var u = require('underscore');
    /**
     * [Please Input View Description]
     *
     * @constructor
     */
    function OrganizationListView() {
        ListView.apply(this, arguments);
    }
    OrganizationListView.prototype.enableVue = true;

    /**
     * @inheritDoc
     */
    OrganizationListView.prototype.template = 'TPL_organization_list';

    var tableFields = [

         {
             field: 'group_id',
             title: 'ID',
             stable: true,
             width: 50,
             content: 'group_id'
         },
         {
             field: 'name',
             title: '4S店名称',
             content: 'name'
         },
         {
             field: 'address',
             title: '4S店地址',
             content: 'address'
         },
        {
            field: 'phone',
            title: '4S店电话',
            stable: true,
            width: 100,
            content: 'phone'
        },
        {
            field: 'manager_name',
            title: '管理员姓名',
            stable: true,
            width: 100,
            content: 'manager_name'
        },
        {
            field: 'manager_title',
            title: '管理员职位',
            stable: true,
            width: 100,
            content: 'manager_title'
        },
        {
            field: 'manager_phone',
            title: '管理员手机号',
            stable: true,
            width: 100,
            content: 'manager_phone'
        },
        {
            field: 'staff_name',
            title: '车大卖联系人',
            stable: true,
            width: 100,
            content: function (item) {
                var name = item.staff ? item.staff.name : '无';
                return '<a href="#/organization/list~staff_id='+ item.staff_id +'">'+name+'</a>';
            }
        },
        {
            field: 'created_time',
            title: '创建时间',
            sortable: true,
            stable: true,
            width: 140,
            content: function (item) {
                return utils.dateFormat(item.created_time);
            }
        },
        {
            field: 'action',
            title: '操作',
            align: 'center',
            stable: true,
            width: 100,
            content: function (item) {
                var str = '';
                str += '<a href="#/organization/detail~organization_id='+ item.group_id +'">查看</a>';
                return str;
            }
        }
    ];

    /**
     * @inheritDoc
     */
    OrganizationListView.prototype.uiProperties = {

        table: {
            fields: tableFields,
            sortable: true,
            //select: 'multi',
            columnResizable: true,
            noDataHtml: '<p style="margin:0;">还没有加盟店</p>'
        }

    };

    OrganizationListView.prototype.getVueOptions = function () {
        var me = this;
        return {
            data: {
                selectedBrandsData: function () {
                    var selectedBrands = [];

                    if(me.model.get('brand_id')){
                        brand_id = me.model.get('brand_id').split(',');

                    }
                    return selectedBrands;
                }
            },
            ready: function () {
                var vue = this;
                var selectedBrandsData = [];
                if(me.model.get('brand_id')){
                    brand_id = me.model.get('brand_id').split(',');
                    var result = u.flatten(u.pluck(vue.brands, 'brands'));
                    selectedBrandsData = u.filter(result, function (item) {
                        return u.indexOf(brand_id,item.id.toString()) !== -1;
                    });
                }
                this.$set('selectedBrandsData',selectedBrandsData);
            },
            methods: {
                removeBrands: function (id) {
                    var vue = this;

                    u.each(vue.brands, function (item, i) {
                        u.each(item.brands, function (b, j) {
                            if (b.id == id) {
                                b.selected = false;
                            }
                        });
                    });

                    var filter = me.get('filter');
                    if (filter) {
                        // 多条件查询
                        var args = u.extend(me.getExtraSearchArgs(),me.getSearchArgs());
                        me.fire('search', {args: args});
                    }
                }
            },
            events: {
                'brandchange': function (brand) {
                    var filter = me.get('filter');
                    if (filter) {
                        // 多条件查询
                        var args = u.extend(me.getExtraSearchArgs(),me.getSearchArgs());
                        me.fire('search', {args: args});
                    }
                }
            }
        };
    };

    OrganizationListView.prototype.getExtraSearchArgs = function () {
        var args = {};
        var name = this.get('searchbox').getValue();
        if (name) {
            args.name = name;
        }
        var brands = this.vue.$refs.brands;
        var selectedBrands = brands.getSelectedBrands();
        if (selectedBrands && selectedBrands.length) {
            //拿到item回填ID，name
            var ids = u.pluck(selectedBrands, 'id');
            args.brand_id = ids;
        }

        return args;
    };

    /**
     * @inheritDoc
     */
    OrganizationListView.prototype.uiEvents = {
        'searchbox:search': function (e) {
            this.submitSearch(e);
        },
        'provinceSelect:change': function (e) {
            this.submitSearch(e);
        }
    };

    require('er/util').inherits(OrganizationListView, ListView);
    return OrganizationListView;
});
