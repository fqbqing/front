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
function smarty_modifier_cdn($path)
{
    if (strpos($path, 'http://') === 0 || strpos($path, 'https://') === 0) {
        return $path;
    }

	return Yii::$app->params['CDN_DOMAIN'] . $path;
}

?>
