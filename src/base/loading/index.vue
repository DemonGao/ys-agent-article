<template>
    <div class="loading">
        <img width="64" height="64" src="./Spinner.gif" alt="">
        <p class="desc">{{title}}</p>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: '正在加载中...'
            }
        }
    }
</script>
<style lang="less" scoped>
    .loading{
        width: 100%;
        text-align: center;
        background-color: red;
        .desc {
            line-height: 20px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
        }
    }
</style>
