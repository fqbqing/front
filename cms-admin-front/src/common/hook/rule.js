/**
 * UB RIA Base
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file UI组件模块扩展
 * @author otakustay
 */
define(
    function (require) {
        require('../../ui/validator/CustomRule');
        require('../../ui/validator/MaxFileCountRule');
        require('../../ui/validator/MaxFileSizeRule');
        require('../../ui/validator/MinFileSizeRule');
        require('../../ui/validator/MultiPatternRule');
        require('../../ui/validator/NationalIdNumberRule');
        require('../../ui/validator/UniqueFileRule');
        require('../../ui/validator/NumberRule');
        require('../../ui/validator/PhoneRule');
        require('../../ui/validator/RelRule');
        require('../../ui/validator/DollarsRule');
        require('../../ui/validator/ValidateurlRule');
        require('../../ui/validator/MinDateRule');

    }
);
