/**
 * @file 日期区间选择器
 * @author lifayu@baidu.com
 */

define(function (require) {

    var u = require('underscore');
    var lib = require('esui/lib');
    var ui = require('esui/main');
    var Control = require('esui/InputControl');

    var paint = require('esui/painters');


    var moment = require('moment');
    var BSDatePicker = require('datepicker');

    function getRangeValue(value) {
        if (typeof value === 'function') {
            return value.call();
        }
        return value;
    }

    function DateRangePicker() {
        Control.apply(this, arguments);
    }

    DateRangePicker.prototype = {
        constructor: DateRangePicker,
        type: 'DateRangePicker',
        initOptions: function (options) {
            var properties = {
                startDate: moment().startOf('day'),
                endDate: moment(),
                opens: 'right',
                buttonClasses: ['btn btn-default'],
                applyClass: 'btn-sm btn-primary',
                cancelClass: 'btn-sm',
                format: 'YYYY-MM-DD HH:mm:00',
                timePicker: true,
                timePicker12Hour: false,
                timePickerSeconds: false,
                showDropdowns: true,
                timePickerIncrement: 1,
                singleDatePicker: false,
                chosenLabel: '今天',
                locale: {
                    applyLabel: '确定',
                    cancelLabel: '取消',
                    fromLabel: '从',
                    toLabel: '到',
                    customRangeLabel: '自定义',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    firstDay: 1
                },
                ranges: {
                    '今天': [moment().startOf('days'), function () {
                        return moment();
                    }],
                    '昨天': [
                        moment().startOf('days').subtract(1, 'days'),
                        moment().endOf('days').subtract(1, 'days')
                    ],
                    '7天': [moment().subtract(6, 'days'), function () {
                        return moment();
                    }],
                    '30天': [moment().subtract(29, 'days'), function () {
                        return moment();
                    }],
                    '本月': [moment().startOf('month'), moment().endOf('month')],
                    '上月': [
                        moment().subtract(1, 'month').startOf('month'),
                        moment().subtract(1, 'month').endOf('month')
                    ]
                }
            };

            u.extend(properties, options);
            this.setProperties(properties);
            this.pickerConf = properties;
        },
        initStructure: function () {
            var me = this;
            if (lib.isInput(this.main)) {
                var main = this.helper.replaceMain();
                lib.removeAttribute(this.main, 'tabindex');
                // `replaceMain`会复制`id`属性，但`TextBox`是特殊的，`id`要保留下来
                this.inputId = main.id || this.helper.getId('input');
                if (!this.main.id) {
                    this.main.id = this.helper.getId();
                }
                // TextBox上会有`maxlength`之类的属性，因此不能直接丢掉，
                // 但保留下来就不能加`data-ctrl-id`属性，
                // 不加又会导致`main.init`重复创建控件，
                // 因此这里需要复制一个用，好在`cloneNode(false)`没兼容问题
                var input = main.cloneNode(false);
                // `helper.replaceMain`会给加上`data-ctrl-id`，要重新去掉
                lib.removeAttribute(
                    input, ui.getConfig('instanceAttr'));
                input.id = this.inputId;

                this.main.appendChild(document.createElement('div'));
                // 把原来的`<input>`放进去
                this.main.appendChild(input);
            }
            else {
                this.inputId = this.helper.getId('input');
//                var html = '<input type="text" id="' + this.inputId + '"';
//                if (this.name) {
//                    html += ' name="' + u.escape(this.name) + '"';
//                }
//                html += ' />';
                var html = '<div id="' + this.inputId + '"></div>';

                this.main.innerHTML = html;
            }
            if (!this.getRawValue()) {
                me.setProperties({
                    value: me.pickerConf.startDate.format(me.pickerConf.format) + ' - '
                    + me.pickerConf.endDate.format(me.pickerConf.format)
                });
            }
            me.picker = new BSDatePicker(this.main.firstChild, me.pickerConf, function (start, end, label) {
                var rawValue = start.format(me.pickerConf.format) + ' - '
                    + end.format(me.pickerConf.format);
                me.setProperties({
                    value: rawValue,
                    chosenLabel: label
                });

                me.fire('change', {
                    start: start,
                    end: end,
                    label: label
                });
            });
        },
        /**
         * 将值从原始格式转换成字符串，复杂类型的输入控件需要重写此接口
         *
         * @param {Mixed} rawValue 原始值
         * @return {string}
         * @protected
         */
        stringifyValue: function (rawValue) {
            if (rawValue !== null) {
                var arr = rawValue.split(' - ');
                return {
                    start: arr[0],
                    end: arr[1]
                };
            }
            return '';
        },

        /**
         * 获取输入控件的原始值，原始值的格式由控件自身决定
         *
         * @return {Mixed}
         */
        getRawValue: function () {
            /**
             * @property {Mixed} rawValue
             *
             * 输入控件的原始值，其格式由控件自身决定
             */
            var me = this;
            if (me.picker) {
                var range = me.picker.ranges[me.chosenLabel];
                if (range) {
                    me.picker.startTime = getRangeValue(range[0]);
                    me.picker.endTime = getRangeValue(range[1]);

                    var start = me.picker.startTime.format(me.picker.format);
                    var end = me.picker.endTime.format(me.picker.format);
                    return start + ' - ' + end;
                }
            }
            return this.rawValue;
        },

        /**
         * 将字符串类型的值转换成原始格式，复杂类型的输入控件需要重写此接口
         *
         * @param {string} value 字符串值
         * @return {Mixed}
         * @protected
         */
        parseValue: function (value) {
            if (typeof value === 'string') {
                return value;
            }
            return value.start + ' - ' + value.end;
        },
        changeFormat: function (format) {
            var me = this;
            me.pickerConf.format = format;
            me.picker.notify();
        },
        repaint: paint.createRepaint(
            Control.prototype.repaint,
            {
                name: 'rawValue',
                paint: function (picker, value) {
                    if (typeof value !== 'undefined') {
                        var dom = picker.main.firstChild;
//                        picker.main.firstChild.value = value;
                        if (dom.tagName.toLowerCase() === 'input') {
                            dom.value = value;
                        }
                        else {
                            dom.innerHTML = value;
                        }
                    }
                }
            },
            {
                name: 'chosenLabel',
                paint: function (picker, value) {
                    if (typeof value !== 'undefined') {
                        var dom = picker.main.firstChild;
//                        picker.main.firstChild.value = value;
                        if (dom.tagName.toLowerCase() === 'input') {
                        }
                        else if (value !== '自定义') {
                            dom.innerHTML = '<span style="padding: 0 10px;">' + value + '</span>';
                        }
                    }
                }
            }
        ),
        dispose: function () {
            this.picker.remove();
            Control.prototype.dispose.apply(this);
        }
    };


    lib.inherits(DateRangePicker, Control);
    ui.register(DateRangePicker);

    return DateRangePicker;
});
