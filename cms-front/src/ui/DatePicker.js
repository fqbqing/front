/**
 * @file 日期选择器
 * @author lifayu@baidu.com
 */

define(function (require) {

    var u = require('underscore');
    var lib = require('esui/lib');
    var ui = require('esui/main');
    var InputControl = require('esui/InputControl');

    var paint = require('esui/painters');


    var moment = require('moment');
    var BSDatePicker = require('datepicker');

    function DatePicker() {
        InputControl.apply(this, arguments);
    }

    DatePicker.prototype = {
        constructor: DatePicker,
        type: 'DatePicker',
        initOptions: function (options) {
            var properties = {
                startDate: moment(),
                endDate: moment(),
                opens: 'right',
                buttonClasses: ['ui-button'],
                applyClass: 'skin-spring-button',
                cancelClass: 'btn-sm',
                format: 'YYYY-MM-DD HH:mm:00',
                timePicker: true,
                timePicker12Hour: false,
                timePickerSeconds: false,
                showDropdowns: true,
                timePickerIncrement: 1,
                singleDatePicker: true,
                locale: {
                    applyLabel: '确定',
                    cancelLabel: '取消',
                    fromLabel: '从',
                    toLabel: '到',
                    customRangeLabel: '自定义区间',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    firstDay: 1
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
                if (this.main.id) {
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
                // 把原来的`<input>`放进去
                this.main.appendChild(input);
            }
            else {
                this.inputId = this.helper.getId('input');
                var html = '<input type="text" id="' + this.inputId + '"';
                if (this.name) {
                    html += ' name="' + u.escape(this.name) + '"';
                }
                html += ' />';
                this.main.innerHTML = html;
            }
            if (this.rawValue) {
                var rawValue = +this.rawValue;
                if (rawValue < 1000000000000) {
                    rawValue *= 1000;
                }
                me.setProperties({
                    value: moment(rawValue).format(me.pickerConf.format)
                });
            }
            else {
                me.setProperties({
                    value: me.pickerConf.startDate.format(me.pickerConf.format)
                });
            }

            me.picker = new BSDatePicker(this.main.firstChild, me.pickerConf, function (start) {
                me.rawValue = start.format(me.pickerConf.format);
                me.setProperties({
                    value: me.rawValue
                });
                me.fire('change', {
                    value: start
                });
            });
        },
        repaint: paint.createRepaint(
            InputControl.prototype.repaint,
            {
                name: 'rawValue',
                paint: function (picker, value) {
                    if (typeof value !== 'undefined') {
                        picker.main.firstChild.value = value;
                    }
                }
            }
        ),
        dispose: function () {
            this.picker.remove();
            InputControl.prototype.dispose.apply(this);
        }
    };

    lib.inherits(DatePicker, InputControl);

    ui.register(DatePicker);

    return DatePicker;
});
