<template>
    <nav class="bar bar-tab g-tabbar">
        <!--<a class="tab-item" v-link="{path:'/', activeClass:'active', exact:true}">-->
            <!--<span class="icon icon-home"></span>-->
            <!--<span class="tab-label">主页</span>-->
        <!--</a>-->
        <a class="tab-item" v-link="{path:'/award/cash', activeClass:'active'}">
            <span class="icon icon-c-award"></span>
            <span class="icon iconactive icon-c-award-active"></span>
            <span class="tab-label">收益</span>
        </a>
        <a class="tab-item" v-link="{path:'/order/list', activeClass:'active'}">
            <span class="icon icon-c-order"></span>
            <span class="icon iconactive icon-c-order-active"></span>
            <span class="tab-label">订单</span>
        </a>
        <a class="tab-item" v-link="{path:'/activity/list', activeClass:'active'}">
            <span class="icon icon-c-activity"></span>
            <span class="icon iconactive icon-c-activity-active"></span>
            <span class="tab-label">活动</span>
        </a>
        <a class="tab-item" v-link="{path:'/my', activeClass:'active'}">
            <span class="icon icon-c-my"></span>
            <span class="icon iconactive icon-c-my-active"></span>
            <span class="tab-label">我</span>
        </a>
    </nav>
</template>
<style lang="less">
.g-tabbar {
    .tab-item .icon ~ .tab-label {
        top: 0;
    }
    .tab-item .icon {
        display: inline-block;
        padding-top: 4px;
    }
    .tab-item .iconactive {
        display: none;
    }
    .active .icon {
        display: none;
    }
    .active .iconactive {
        display: inline-block;
    }
}
</style>