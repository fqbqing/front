/**
 * @file src/ui/SearchField.js ~ 2014/05/29 21:58:22
 * @author leeight(liyubei@baidu.com)
 **/
define(function( require ) {
    require( 'esui/Button' );
    require( 'esui/TextBox' );

    // var u = require( 'underscore' );
    var lib = require( 'esui/lib' );
    var paint = require( 'esui/painters' );
    var Control = require( 'esui/Control' );


    /**
     * SearchField控件
     *
     * @extends Control
     * @constructor
     */
    function SearchField( options ) {
        Control.apply( this, arguments );
    }
    lib.inherits( SearchField, Control );

    /**
     * 控件类型，始终为`"SearchField"`
     *
     * @type {string}
     * @readonly
     * @override
     */
    SearchField.prototype.type = 'SearchField';

    function getMainHTML( sf ) {
        var tpl =
            // '<label id="${labelId}"></label>' +
            '<input ' +
                'data-ui-id="${inputId}" ' +
                'data-ui-child-name="input" ' +
                'data-ui-type="TextBox" ' +
                'type="text" />' +
            '<button ' +
                'data-ui-id="${btnId}" ' +
                'data-ui-child-name="btn" ' +
                'data-ui-type="Button"></button>';
        var html = lib.format( tpl, {
            labelId: sf.helper.getId( 'label' ),
            inputId: sf.helper.getId( 'input' ),
            btnId: sf.helper.getId( 'btn' )
        });

        return html;
    }

    SearchField.prototype.initStructure = function() {
        this.main.innerHTML = getMainHTML( this );
        this.initChildren( this.main );
    };

    SearchField.prototype.repaint =
        paint.createRepaint(
            Control.prototype.repaint,
            {
                name: [ 'label', 'placeholder', 'btnText' ],
                paint: function( sf, label, placeholder, btnText ) {
                    var btn = sf.getChild( 'btn' );
                    btn.setProperties( { content: btnText } );

                    var input = sf.getChild( 'input' );
                    input.setProperties( { placeholder: placeholder });

                    // lib.g( sf.helper.getId( 'label' ) ).innerHTML = label;
                }
            }
        );

    require( 'esui' ).register( SearchField );

    return SearchField;
});










/* vim: set ts=4 sw=4 sts=4 tw=120: */
