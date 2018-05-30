<template>
    <div class="userUpload">
        <vue-html5-editor :content="content" :height="500"></vue-html5-editor>

        <div class="push push--fetch" @click="fetchModal = true">
            <i class="iconfont icon-dtzhuaqutupian"></i>
        </div>
        <div class="push push--upload" >
            <i class="iconfont icon-submit"></i>
        </div>
        <!--评论模态框-->
        <div v-transfer-dom>
            <confirm class="dm-modal dm-modal-textarea" v-model="fetchModal"
                     confirm-text="提交"
                     cancel-text="关闭"
                     title="待抓取网页Url"
                     :close-on-confirm="false"
                     @on-cancel="commentModal_onCancel"
                     @on-confirm="commentModal_onConfirm"
            >
                <group :gutter="0">
                    <x-textarea v-model="fetchUrl" placeholder="请输入你想填写的内容" :height="80"
                                :show-counter="true"
                                :max="255"></x-textarea>
                </group>
            </confirm>
        </div>
    </div>
</template>

<script>
    import {Confirm, XTextarea, TransferDomDirective as TransferDom, Group} from 'vux'
    export default {
        directives: {
            TransferDom
        },
        data() {
            return {
                fetchModal: false,
                fetchUrl: '',
                content: '<p>就啊啊哈哈哈</p>'
            }
        },
        components: {
            Confirm,
            XTextarea,
            TransferDom,
            Group
        },
        computed: {},
        methods: {
            commentModal_onCancel(){
                this.fetchModal = false
                this.$axios.post({
                    url: '/agent/article/services/fetchWxArticle',
                    data: {
                        url: this.fetchUrl
                    },
                    tips: true
                }).then(result => {
                    console.log(result)
                    this.content = result
                })
            },
            commentModal_onConfirm(){
                alert('提交fetch')
            }
        },
        mounted() {
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .userUpload {
        height: 100%;
        overflow: hidden;
        .vue-html5-editor {
            height: 100%;
            .toolbar {
                position: fixed;
                top: 0;
            }
            .content{
                margin-top: 73px;
                height: calc(~"100% - 73px");
                overflow-y: auto;

                img{
                    max-width: 100%;
                }
            }
        }
        .push{
            position: fixed;
            right: 30px;
            width: 44px;
            height: 44px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            background-color: rgb(7, 178, 246);
            color: #FFFFFF;
            border-radius: 50%;
            box-shadow: 0 0px 15px 0px #ccc;
            z-index: 999;
            &.push--fetch{
                bottom: 100px;
            }
            &.push--upload{
                bottom: 40px;
            }
            i.iconfont{
                font-size: 22px;
                font-weight: bold;
            }
        }
    }

</style>
