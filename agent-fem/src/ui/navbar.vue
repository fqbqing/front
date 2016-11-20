<template>
    <header class="bar bar-nav" v-cloak>
        <i class="icon pull-left icon-left-open-big" v-if="canBack" @click="backPressed"></i>
        <slot></slot>
        <h1 class="title" v-text="title"></h1>
    </header>
</template>
<script>
    module.exports = {
        props: {
            canBack: {
                type: Boolean,
                default: function () {
                    return true;
                }
            },
            title: {
                type: String,
                required: true
            }
        },
        methods: {
            backPressed: function () {
                window.history.back();
            }
        }
    };
</script>
