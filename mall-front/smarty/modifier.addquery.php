<?php
/**
 * Smarty plugin
 * @package Smarty
 * @subpackage PluginsModifier
 */

/**
 * Smarty addquery modifier plugin
 * 
 * Type:     modifier<br>
 * Name:     cdn<br>
 */
function smarty_modifier_addquery($url, $query)
{
    $separator = '&';
    if (!strpos($url, "?")) {
        $separator = '?';
    }

	return $url . $separator . $query;
}

?>
