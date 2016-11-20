/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var Vue = require('vue');
    var $ = require('zepto');
    var exports = {};

    exports.template = require('./index.tpl.html');

    exports.templateMainTarget = 'TPL_refund_index';

    function ImageDraw(el) {

        var me = this;
        me.el = el;
        this.drawing = false;
        this.lastPos = {x: 0, y: 0};
        this.currentPos = {x: 0, y: 0};

        this.$canvas = $(el);
        this.canvas = this.$canvas[0];

        this.resize();

        // Set up mouse events
        this.$canvas.on('mousedown touchstart', function(e) {
            me.drawing = true;
            me.lastPos = me.currentPos = me._getPosition(e);
        });
        this.$canvas.on('mousemove touchmove', function(e) {
            me.currentPos = me._getPosition(e);
        });
        this.$canvas.on('mouseup touchend', function(e) {
            me.drawing = false;
        });
        // Prevent document scrolling when touching canvas
        $(document).on('touchstart.signature touchmove.signature touchend.signature', function(e) {
            if (e.target === me.canvas) {
                e.preventDefault();
            }
            //me.currentPos = me._getPosition(e);
        });
    }

    ImageDraw.prototype = {
        startDraw: function () {
            var me = this;
            me.drawable = true;
            // Start drawing
            (function drawLoop() {
                if (me.drawable) {
                    window.requestAnimFrame(drawLoop);
                    me._renderCanvas();
                }
            })();
        },
        stopDraw: function () {
            this.drawable = false;
        },
        dispose: function () {
            $(document).off('.signature');
        },
        // Get the position of the mouse/touch
        _getPosition: function(event) {
            var xPos, yPos, rect;
            rect = this.canvas.getBoundingClientRect();
            //event = event.originalEvent;
            // Touch event
            if (event.type.indexOf('touch') !== -1) { // event.constructor === TouchEvent
                xPos = event.touches[0].clientX - rect.left;
                yPos = event.touches[0].clientY - rect.top;
            }
            // Mouse event
            else {
                xPos = event.clientX - rect.left;
                yPos = event.clientY - rect.top;
            }
            return {
                x: xPos,
                y: yPos
            };
        },
        // Render the signature to the canvas
        _renderCanvas: function() {
            if (this.drawing) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
                this.ctx.lineTo(this.currentPos.x, this.currentPos.y);
                this.ctx.stroke();
                this.lastPos = this.currentPos;
            }
        },
        // Reset the canvas context
        resetCanvas: function() {
            this.ctx = this.canvas.getContext("2d");

            this.ctx.fillStyle = '#fff';
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.strokeStyle = '#222';
            this.ctx.lineWidth = 4;
        },
        // Clear the canvas
        clearCanvas: function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.resetCanvas();
        },
        // Get the content of the canvas as a base64 data URL
        getDataURL: function(orientation) {
            if (orientation === 'landscape') {
                var width = this.width;
                var height = this.height;
                var imageData = this.ctx.getImageData(0, 0, width, height);
                var newData = [];
                var odata = imageData.data;
                for (var i = 0; i < odata.length; i += 4) {
                    newData.push([odata[i], odata[i + 1], odata[i + 2], odata[i + 3]]);
                }
                var idata = [];
                var columns = [];
                for (var i = 0; i < newData.length; i++) {
                    var j = Math.floor(i / width);
                    idx = i % width;
                    if (columns[idx]) {
                        columns[idx][j] = newData[i];
                    }
                    else {
                        columns[idx] = [newData[i]];
                    }
                }
                columns = columns.reverse();
                for (var i = 0; i < columns.length; i++) {
                    for (var j = 0; j < columns[i].length; j++) {
                        [].push.apply(idata, columns[i][j]);
                    }
                }
                this.clearCanvas();
                this.$canvas.attr('width', height);
                this.$canvas.attr('height', width);
                this.$canvas.css({
                    width: height,
                    height: width
                });
                var newImageData = this.ctx.createImageData(height, width);
                for (var i = 0; i < idata.length; i++) {
                    newImageData.data[i] = idata[i];
                }
                this.ctx.putImageData(newImageData, 0, 0);
            }
            return this.canvas.toDataURL('image/jpeg', 90);
        },
        resize: function () {
            var $wrap = this.$canvas.parent();
            var width = $wrap.width();
            var height = $wrap.height();
            this.$canvas.attr('width', width);
            this.$canvas.attr('height', height);
            this.width = width;
            this.height = height;
            this.$canvas.css({
                width: width,
                height: height
            });
            this.resetCanvas();
        }
    };

    var Signature = Vue.extend({
        template: '<canvas class="vue-signature"></canvas>',
        data: function () {
            return {
            };
        },
        methods: {
            clear: function () {
                this.draw.clearCanvas();
            },
            getDataURL: function () {
                return this.draw.getDataURL();
            },
            resize: function () {
                this.draw.resize();
            }
        },
        ready: function () {
            this.draw = new ImageDraw(this.$el);
        },
        destroy: function () {
            this.draw.dispose();
        }
    });

    exports.domEvents = {
    };

    exports.events = {
        ready: function () {
            var me = this;
            var orientationEvent = 'onorientationchange' in window ? 'orientationchange.refund' : 'resize.refund';
            $(window).on(orientationEvent, function (e) {
                var $win = $(this);
                setTimeout(function () {
                    me.orientation = $win.width() > $win.height() ? 'landscape' : 'portrait';
                    me.vm.$refs.signature.resize();
                }, 300);
            });
        },
        leave: function () {
            $(window).off('.refund');
        }
    };

    exports.vueOptions = {
        data: {
            isSignature: false,
            signatureImage: '',
            rendered: false
        },
        watch: {
            isSignature: function (value) {
                if (value) {
                    this.$refs.signature.draw.startDraw();
                }
                else {
                    this.$refs.signature.draw.stopDraw();
                }
            }
        },
        methods: {
            showSignature: function () {
                if (this.refund.sign) {
                    return;
                }
                this.isSignature = true;
                this.$nextTick(function () {
                    if (!this.rendered) {
                        this.$refs.signature.resize();
                    }
                    // 每次都重新签名，和旋转冲突
                    //this.rendered = true;
                });
            },
            confirmSignature: function () {
                if (this.isSignature) {
                    this.signatureImage = this.$refs.signature.getDataURL(this.$view.orientation);
                }
                this.isSignature = false;
            },
            clear: function () {
                this.$refs.signature.clear();
            },
            submit: function () {
                this.$view.emit('UPDATE', this.signatureImage);
            }
        },
        ready: function () {
            this.signatureImage = this.refund.sign;
        },
        components: {
            signature: Signature
        }
    };

    return exports;
});
