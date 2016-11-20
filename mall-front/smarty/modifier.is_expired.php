<?php
/**
 * Smarty plugin
 * @package Smarty
 * @subpackage PluginsModifier
 */

/**
 * Smarty cdn modifier plugin
 * 
 * Type:     modifier<br>
 * Name:     cdn<br>
 */
function smarty_modifier_is_expired($time)
{
    if ($time == '0') {
        return '0';
    }

    return time() > (int)$time ? '1' : '0';
}

?>
