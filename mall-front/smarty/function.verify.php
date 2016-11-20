<?php
/**
 * Smarty自定义函数库
 * 
 * @since 2012-10-31
 */
/**
 * 加V认证
 */
function smarty_function_verify($param,$template){
	
	$v = $param['v'];
	$name = isset($param['name']) && !empty($param['name']) ? $param['name'] : "";
	$str = "";
	if(empty($v) || $v == 0){
		$str = "";
	}else if($v == 1){
		$str = "<a href='javascript:;' title='" . $name ."' data-original-title='" . $name . "'><span class='ico-v'></span></a>";
	}
	return $str;
}

