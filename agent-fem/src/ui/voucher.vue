<template>
    <div class="ui-voucher-container" :class="{'ui-voucher-tiny':mode=='tiny'}">
        <div class="ui-voucher">
            <div class="voucher-image" v-if="mode!='tiny'">
                <img :src="voucher.image_url|image-cdn '50w_50h_1c_1e_50-1ci.png'">
            </div>
            <div class="voucher-info">
                <h2 v-text="voucher.name"></h2>
                <p v-text="voucher.brief"></p>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .ui-voucher-container {
        overflow: hidden;
    }
    .ui-voucher {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 5px;
        background: #fffbfb;
        padding: 8px 14px;
        position: relative;
        border: 1px solid #eee;
        &:before, &:after {
           content: '';
           width: 20px;
           height: 20px;
           border-radius: 50%;
           background: #fff;
           border: 1px solid #eee;
           position: absolute;
           top: 50%;
           margin-top: -10px;
        }
        &:before {
            left: -12px;
        }
        &:after {
             right: -12px;
        }
    }

    .voucher-image {
        width: 60px;
    }
    .voucher-info {
        width: 100%;
        flex: 1;
        text-align: center;
        line-height: 1.2;
        h2 {
            margin: 4px 0;
            font-size: .8rem;
        }
        p {
            margin: 4px 0;
            font-size: .6rem;
        }
    }
    .ui-voucher-tiny {
        .voucher-info {
            text-align: left;
        }
    }
</style>
<script>
    module.exports = {
        props: {
            voucher: {
                type: Object,
                required: true
            },
            mode: {
                type: String,
                default: function () {
                    return 'normal';
                }
            }
        },
        methods: {
        }
    };
</script>
