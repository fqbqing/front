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
function smarty_function_include($param,$template){
	
	$smarty = Yii::app()->viewRenderer->getSmarty();
	$smarty->assign("param",$param);
	$smarty->display($param['file']);
}

