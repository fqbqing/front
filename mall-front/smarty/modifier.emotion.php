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
 * Name:     emotion<br>
 * Purpose:  convert String emotion to img mark 
 * 
 * @author lifayu@meifuzhi.com 
 * @return string 
 */
function str2url($match)
{
	$smileyPath = "http://image.iwanmei.com/smiley/";
	$keyMap = array(
		"微笑"	=>	"m_01.png",
		"偷笑"	=>	"m_02.png",
		"得意"	=>	"m_03.png",
		"害羞"	=>	"m_04.png",
		"呲笑"	=>	"m_05.png",
		"赞"	=>	"m_06.png",
		"yeah"	=>	"m_07.png",
		"发怒"	=>	"m_08.png",
		"咒骂"	=>	"m_09.png",
		"哼"	=>	"m_10.png",
		"差"	=>	"m_11.png",
		"尴尬"	=>	"m_12.png",
		"冷汗"	=>	"m_13.png",
		"囧"	=>	"m_14.png",
		"无语"	=>	"m_15.png",
		"衰"	=>	"m_16.png",
		"流泪"	=>	"m_17.png",
		"难过"	=>	"m_18.png",
		"可爱"	=>	"m_19.png",
		"色"	=>	"m_20.png",
		"调皮"	=>	"m_21.png",
		"亲亲"	=>	"m_22.png",
		"惊讶"	=>	"m_23.png",
		"惊恐"	=>	"m_24.png",
		"闭嘴"	=>	"m_25.png",
		"疑问"	=>	"m_26.png",
		"嘘"	=>	"m_27.png",
		"晕"	=>	"m_28.png",
		"白眼"	=>	"m_29.png",
		"睡"	=>	"m_30.png",
		"酷"	=>	"m_31.png",
		"发呆"	=>	"m_32.png",
	);
	$str = $match[1];
	if(isset($keyMap[$str])){
		return ' <img src="' . $smileyPath . $keyMap[$str] . '" title="' . $str . '" style="vertical-align:bottom;"/> ';
	}else{
		return "[$str]";
	}
}
function smarty_modifier_emotion($string)
{
	return preg_replace_callback("/\[([^\[\]]+)\]/u", 'str2url', $string);
} 

?>
