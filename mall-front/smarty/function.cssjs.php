<?php
/**
 * 获取css/js路径
 * @since 2012-05-07
 */
function smarty_function_cssjs($param,$template){
	$version = "2.2.5";//time(); //"1.0.0.1";
	if (isset($param['src']) && isset($param['type'])) {
		//$path = "/resource/";
		$path = STATIC_URL . '/';
		
		$files = explode(",", $param['src']);
		
		$ret = "";
		if ($param['type'] == "css") {
			foreach ($files as $file) {
				$ret .= '<link type="text/css" href="' . $path . $file . '?v=' . $version . '" rel="stylesheet" charset="UTF-8"/>';
			}
		} else if ($param['type'] == "js") {
			foreach ($files as $file) {
				$ret .= '<script type="text/javascript" src="' . $path . $file . '?v=' . $version . '" charset="UTF-8"></script>';
			}
		}
		return $ret;
	}else{
		return "";
	}
}
