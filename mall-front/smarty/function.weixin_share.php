<?php
/**
 * Smarty自定义函数库
 * 
 * @since 2016-05-21
 */
/**
 * 微信分享
 */
use app\components\Weixin;
use \app\models\Channel;
use \app\models\Activity;
use app\components\StringUtil;

function isWeixin() {
    $ua = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    if (preg_match('/MicroMessenger\/([\d.]+)/', $ua, $match)) {
        return floatval($match[1]);
    } else {
        return false;
    }
}

function smarty_function_weixin_share($param) {

    if(!isWeixin()) {
        return '';
    }

    if (!(isset($param['activityId']) && isset($param['title']) && isset($param['desc']) && isset($param['link']) && isset($param['imgUrl']))) {
        return '';
    }

    $type = isset($param['type']) ? $param['type'] : 'activity';

    $title = $param['title'];
    $desc = $param['desc'];
    $link = $param['link'];
    $imgUrl = $param['imgUrl'];

    $activityId = $param['activityId'];
    $channelId = Yii::$app->request->get('source');
    $organization = Activity::getOrganizationByActivityId($activityId);
    $channelId = Channel::restoreChannel($channelId, $organization->group_id, 1)->code;
//    $channel = Channel::getChannelShowInfo($channelId, $organization->group_id);
    $channel = Channel::getChannelByCode($channelId);
    // 对title进行修正
//    $title = $channel['name'] . '邀请您参加“' . $title . '”';
    if (isset($param['titleFormat'])) {
        $title = StringUtil::format($param['titleFormat'], $channel['name'], $title);
    }

    if (isset($param['descFormat'])) {
        $desc = StringUtil::format($param['descFormat'], $channel['name'], $desc);
    }

    // 对link进行修正
    if (strpos($link, 'http://') !== 0 && strpos($link, 'https://') !== 0) {
        $link = Yii::$app->request->getHostInfo() . $link;
    }
    if (strpos($link, '?')) {
        $link .= '&source=' . $channelId;
    }
    else {
        $link .= '?source=' . $channelId;
    }

    $jsParams = Weixin::getJsParams([
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'scanQRCode'
    ]);

    $shareInfo = array(
        'title' => $title,
        'desc' => $desc,
        'link' => $link,
        'imgUrl' => $imgUrl
    );

    $str = '';
    $str .= '<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>';
    $str .= '<script>';
    $str .= 'wx.config(' . json_encode($jsParams) . ');';
    $str .= 'var _share_info = '. json_encode($shareInfo) . ';';
    $str .= 'wx.ready(function(){';
    $str .= '   wx.onMenuShareTimeline(_share_info);';
    $str .= '   wx.onMenuShareAppMessage(_share_info);';
    $str .= '   wx.onMenuShareQQ(_share_info);';
    $str .= '   wx.onMenuShareWeibo(_share_info);';
    $str .= '   wx.onMenuShareQZone(_share_info);';
    $str .= '});';
    $str .= '</script>';

    return $str;
}

