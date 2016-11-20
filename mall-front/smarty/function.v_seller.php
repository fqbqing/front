<?php
/**
 * Smarty自定义函数库
 * 
 * @since 2016-05-21
 */
/**
 * 基于活动ID，查询关联的卖方渠道信息
 * 如果有`source`，则展示该组织下的当前source的信息，否则展示组织信息
 * @param file 展示页面
 * @param activityId 活动ID
 */
use \app\models\Channel;
use \app\models\Activity;
function smarty_function_v_seller($param) {

    $activityId = $param['activityId'];
    $organization = Activity::getOrganizationByActivityId($activityId);

    $channelId = isset($param['channelId']) ? $param['channelId'] : '';
    if ($channelId == '') {
        $channelId = Yii::$app->request->get('source');
        // 转换为店内渠道
        $channelId = Channel::restoreChannel($channelId, $organization->group_id, 2)->code;
    }
//    $channel = Channel::getChannelShowInfo($channelId, $organization->group_id);
    $channel = Channel::getChannelByCode($channelId);

//    print_r($channel);

//    $data = array(
//        'name' => 'x',
//        'phone' => '18611081833'
//    );

    return Yii::$app->view->render($param['file'], array(
        'data' => $channel
    ));
}

