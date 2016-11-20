<?php
/**
 * Smarty自定义函数库
 * 
 * @since 2012-05-07
 */
/**
 * 分页组件
 * @param pageCount 总页数
 * @param curPage 当前页码
 * @param itemCount 总记录数
 * @param url 分页url模板：如 /list?page={page}
 */

function smarty_function_pager($param,$template){

	if(!isset($param['pageCount']) || !isset($param['curPage'])){
		return "Error Params: pageCount and curPage is need!";
	}
	//总页数
	$pageCount = (int)$param['pageCount'];
	
	if($pageCount < 2) return "";
	//当前页码
	$curPage = (int)$param['curPage'];
	//最大页码数
	$totalItemCount = (int)isset($param['totalItemCount']) ? $param['totalItemCount'] : 9;
	//左边页数
	$leftItemCount = (int)isset($param['leftItemCount']) ? $param['leftItemCount'] : 4;
	
	$url = isset($param['url'])?$param['url']:$_SERVER['REQUEST_URI'] . "?p={page}";
	
	$startPoint = 1;
	$endPoint = $totalItemCount;
	
	if($curPage > $leftItemCount){
		$startPoint = $curPage - $leftItemCount;
		$endPoint = $startPoint + $totalItemCount - 1;
	}
	
	if($endPoint > $pageCount){
		$startPoint = $pageCount - $totalItemCount + 1;
		$endPoint = $pageCount;
	}
	
	if($startPoint < 1){
		$startPoint = 1;
	}
	$htm = "<div class='pager'>";
	$pattern = "/(\{page\})/i";
	if($curPage > $startPoint){
		//$htm .= "<a href='". preg_replace($pattern, "$token=1" , $url) ."'>首页</a>";
		$htm .= "<a href='". preg_replace($pattern, ($curPage -1) , $url) ."'>上一页</a>";
	}else{
		$htm .= "<a class='pgEmpty' href='javascript:void(0);'>上一页</a>";
	}
	if($startPoint > 1){
		$htm .= "<a href='". preg_replace($pattern, 1 , $url) ."'>1</a>";
		if($startPoint > 2){
			$htm .= "...";
		}
	}
	for($page = $startPoint; $page <= $endPoint; $page++){
		if($page == $curPage){
			$htm .= "<a class='cur' href='javascript:void(0);'>$page</a>";
		}else{
			$htm .= "<a href='". preg_replace($pattern, $page , $url) ."'>$page</a>";
		}
	}
	if($endPoint < $pageCount - 1){
		$htm .= "...";
	}
	if($endPoint < $pageCount){
		$htm .= "<a href='". preg_replace($pattern, $pageCount , $url) ."'>$pageCount</a>";
	}
	if($curPage < $endPoint){
		$htm .= "<a href='". preg_replace($pattern, ($curPage + 1) , $url) ."'>下一页</a>";
		//$htm .= "<a href='". preg_replace($pattern, "$token=" . $pageCount , $url) ."'>尾页</a>";
	}else{
		$htm .= "<a class='pgEmpty' href='javascript:void(0);'>下一页</a>";
	}
	$htm .= $curPage . "/" . $pageCount;
	
	if(isset($param['itemCount'])){
		$count = $param['itemCount'];
		$htm .= " 共" .$count . "条";
	}
	
	return $htm . "</div>";
}
