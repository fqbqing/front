<?php
/**
 * Smarty plugin
 * @package Smarty
 * @subpackage PluginsModifier
 */

/**
 * Smarty emotion modifier plugin
 * 
 * Type:     modifier<br>
 * Name:     htmlsafe<br>
 *
 * @return string
 */
function htmlsafe($match)
{
	// TODO
//	return
}
function smarty_modifier_htmlsafe($string)
{
//	return preg_replace_callback("/\[([^\[\]]+)\]/u", 'htmlsafe', $string);
    return $string;
} 

?>
