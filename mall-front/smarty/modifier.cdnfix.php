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
function smarty_modifier_cdnfix($path)
{
    if (strpos($path, 'http://') === 0 || strpos($path, 'https://') === 0) {
        return preg_replace('/^http[s]?:\/\//', 'http://', $path);
    }

    if ($path == '') {
        return '';
    }

	return Yii::$app->params['CDN_DOMAIN'] . $path;
}

?>
