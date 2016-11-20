<?php
/**
 * Smarty自定义函数库
 * 
 * @since 2012-05-07
 *
 */
/**
 * 包含文件，支持参数传递
 */
function smarty_function_urlrule($param, $template){

    $path = isset($param['prefix']) ? $param['prefix'] : '';
    if (isset($param['p1'])) {
        $path .= $param['p1'];
    }
    if (isset($param['p2'])) {
        $path .= '-' . $param['p2'];
    }
    if (isset($param['p3'])) {
        $path .= '-' .$param['p3'];
    }
    if (isset($param['p4'])) {
        $path .= '-' .$param['p4'];
    }
    $path .= isset($param['suffix']) ? $param['suffix'] : '';

    return $path;
}

