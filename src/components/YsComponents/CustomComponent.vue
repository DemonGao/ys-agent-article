<style lang="less" rel="stylesheet/less" scoped="scoped">
    .customComponent {
        & > div {
            margin-top: 15px;
        }

        .headTitle {
            margin: 0 15px 5px;
            font-size: 14px;
            color: #666;
            position: relative;
            padding-left: 10px;
            &:before {
                content: '';
                top: 3px;
                bottom: 3px;
                left: 0;
                width: 2px;
                position: absolute;
                background-color: #4aa1f0;
                border-radius: 2px;
            }
        }
        /*理财师名片*/
        .fpCard {
            .realname {
                font-size: 16px;
                font-weight: 600;
            }
            .coprname, .mobile {
                font-size: 12px;
                color: #969696;
            }
            .tel, .ewm {
                display: inline-block;
                text-align: center;
                padding: 5px;
            }
            .tel {
                i.iconfont {
                    font-size: 20px;
                    color: #4aa1f0;
                }
            }
            .ewm {
                i.iconfont {
                    font-size: 21px;
                    color: #09bb07;
                }
            }
        }
        /*文章列表*/
        .articleCellBox, .videoCellBox {
            .title {
                font-size: 14px;
                line-height: 22px;
                color: #333;
                font-weight: 300;
                .typeIcon {
                    font-size: 12px;
                    border-radius: 10px;
                    padding: 0 5px;
                    border: 1px solid #4aa1f0;
                    color: #4aa1f0;
                    margin-right: 5px;
                }
            }

        }
        .activityCellBox, .productCellBox {
            background: #FFFFFF;
            padding: 10px 15px;
        }
        /*微信二维码*/
        .wxewm {
            box-sizing: border-box;
            /*border-radius: 10px;*/
            /*background-color: #ffffff;*/
            /*box-shadow: 0 0 10px -6px #000;*/
            background: #FFFFFF;
            .img {
                display: block;
                margin: 0 auto;
                padding: 10px 15px;
                img {
                    display: block;
                    margin: 0 auto;
                    max-width: 100%;
                    border-radius: 2px;
                }
            }
        }
        /*微信二维码预览*/
        .wxewmPopup {
            .content {
                width: 100%;
                height: 100%;
                line-height: 0;
            }
        }
    }
</style>
<template>
    <div class="customComponent">
        <template v-if="sort && sort.length!==0" v-for="(item, index) in sort">
            <!--理财师名片-->
            <template v-if="item === 'fpCard' && fpCard">
                <fp-card
                    class="fpCard"
                    :img="fpCard.headurl"
                >
                    <template slot="content">
                        <p class="realname">{{fpCard.realname}}</p>
                        <p class="coprname">{{fpCard.corpname}} {{fpCard.mobile}}</p>
                        <!--<p class="mobile"></p>-->
                    </template>
                    <template slot="util">
                        <a class="ewm" @click="wxewmPopup = !wxewmPopup">
                            <i class="iconfont icon-yingdaicon04"></i>
                        </a>
                        <a class="tel" :href="'tel:' + fpCard.mobile">
                            <i class="iconfont icon-dianhua"></i>
                        </a>
                    </template>
                </fp-card>
                <!--预览二维码-->
                <x-dialog
                    v-model="wxewmPopup"
                    :hide-on-blur="true"
                    class="wxewmPopup"
                >
                    <div class="content">
                        <img width="100%" :src="fpCard.wx_ewm" alt="二维码加载失败">
                    </div>
                </x-dialog>
            </template>
            <!--推荐文章列表-->
            <template v-if="item === 'articleList' && articleList && articleList.length !== 0">
                <div class="articleCellBox">
                    <p class="headTitle">文章推荐</p>
                    <article-cell
                        v-for="(item, index) in articleList" :key="'articleCell' + index"
                        :url="host + '/agent/article/index?id='+item.id+'#/article/' + item.id"
                        :img="item.imgSrc"
                        class="cellItem"
                    >
                        <div class="title" slot="title">
                            {{item.title}}
                        </div>
                        <!--<template slot="data">-->
                            <!--<span>阅读: {{item.readcount}}</span>-->
                            <!--<span>点赞: {{item.thumbsupcount}}</span>-->
                            <!--<span>转发: {{item.sharedcount ? item.sharedcount : 0}}</span>-->
                            <!--<span>评论: {{item.commentcount}}</span>-->
                        <!--</template>-->
                        <div slot="data" class="util" style="justify-content: flex-start">
                            <div class="item"><i class="iconfont icon-attentionfill"></i>{{item.readcount}}</div>
                            <div class="item"><i class="iconfont icon-like"></i>{{item.thumbsupcount}}</div>
                            <div class="item"><i class="iconfont icon-forward"></i>{{item.sharedcount ? item.sharedcount : 0}}</div>
                            <div class="item"><i class="iconfont icon-comment"></i>{{item.commentcount}}</div>
                        </div>
                    </article-cell>
                </div>
            </template>
            <!--视频列表-->
            <template v-if="item === 'videoList' && videoList && videoList.length !== 0">
                <div class="videoCellBox">
                    <p class="headTitle">视频推荐</p>
                    <video-cell
                        v-for="(item, index) in articleList" :key="'articleCell' + index"
                        :url="host + '/agent/video/index?id='+item.id+'#/video-detail/' + item.id"
                        :img="item.imgSrc"
                    >
                        <div class="title" slot="title">
                            <span class="typeIcon">{{item.sourcename}}</span>
                            {{item.title}}
                        </div>
                        <template slot="data">
                            <span>阅读: {{item.readcount}}</span>
                            <span>点赞: {{item.thumbsupcount}}</span>
                            <span>评论: {{item.commentcount}}</span>
                        </template>
                    </video-cell>
                </div>
            </template>
            <!--活动列表-->
            <template v-if="item === 'activityList' && activityList && activityList.length !== 0">
                <div>
                    <p class="headTitle">活动推荐</p>
                    <div class="activityCellBox">
                        <activity-cell
                            v-for="(item, index) in activityList" :key="index"
                            :params="item"
                            :url="'/agent/activity/index?id='+item.id+'#/activityIframe/' + item.id"
                        >
                        </activity-cell>
                    </div>
                </div>
            </template>
            <!--产品列表-->
            <template v-if="item === 'productList' && productList && productList.length !== 0">
                <div>
                    <p class="headTitle">产品推荐</p>
                    <div class="productCellBox">
                        <product-cell
                            v-for="(item, index) in productList" :key="index"
                            :params="item"
                            :url="'/agent/product/index?id='+item.id+'#/productIframe/' + item.id"
                        >
                        </product-cell>
                    </div>
                </div>
            </template>
            <!--代理人二维码-->
            <template v-if="item === 'fpUserEWM' && fpUserEWM && fpUserEWM.url">
                <div>
                    <p class="headTitle">长按识别下方二维码加我微信好友</p>
                    <div class="wxewm">
                        <div class="img">
                            <img :src="fpUserEWM.url" alt="二维码加载失败">
                        </div>
                    </div>
                </div>
            </template>
            <!--视频名片-->
            <template v-if="item === 'videoCard' && videoCard">
                <div>
                    <p class="headTitle">视频名片</p>
                    <video-card
                        style="padding: 10px 15px;box-sizing: border-box;background-color: #ffffff;"
                        :file_id="videoCard && videoCard.fileid"
                        :app_id="app_id"
                        width="100%"
                        height="auto"
                    ></video-card>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    import VideoCard from '@/components/YsComponents/VideoCard'
    import UtilMixin from '@/mixins/UtilMixin.vue'
    import ArticleCell from '@/components/YsComponents/ArticleCell'
    import ActivityCell from '@/components/YsComponents/ActivityCell'
    import ProductCell from '@/components/YsComponents/ProductCell'
    import VideoCell from '@/components/YsComponents/VideoCell'
    import FpCard from '@/components/YsComponents/FpCard'
    import {TransferDomDirective as TransferDom, XDialog} from 'vux'

    export default {
        directives: {
            TransferDom
        },
        mixins: [UtilMixin],
        props: {
            pageId: {
                type: [Number, String],
                default: 0
            }
        },
        data() {
            return {
                wxewmPopup: false,
                app_id: window.YS_TENCENTCLOUD_APPID,
                host: window.location.origin,
                sort: null,
                articleList: null,
                videoList: null,
                activityList: null,
                productList: null,
                fpCard: null,
                fpUserEWM: null,
                videoCard: null
            }
        },
        components: {
            XDialog,
            ArticleCell,
            FpCard,
            VideoCell,
            ActivityCell,
            ProductCell,
            VideoCard
        },
        computed: {},
        methods: {},
        mounted() {
            if (window.YS_CUSTOMCOMPONENT_LIST[this.pageId] !== null) {
                this.sort = window.YS_CUSTOMCOMPONENT_LIST[this.pageId].sort ? window.YS_CUSTOMCOMPONENT_LIST[this.pageId].sort : []
                this.articleList = window.YS_CUSTOMCOMPONENT_LIST[this.pageId].articleList ? window.YS_CUSTOMCOMPONENT_LIST[this.pageId].articleList : []
                this.videoList = window.YS_CUSTOMCOMPONENT_LIST[this.pageId].videoList ? window.YS_CUSTOMCOMPONENT_LIST[this.pageId].videoList : []
                this.activityList = window.YS_CUSTOMCOMPONENT_LIST[this.pageId].activityList ? window.YS_CUSTOMCOMPONENT_LIST[this.pageId].activityList : []
                this.productList = window.YS_CUSTOMCOMPONENT_LIST[this.pageId].productList ? window.YS_CUSTOMCOMPONENT_LIST[this.pageId].productList : []
                this.fpCard = window.YS_CUSTOMCOMPONENT_LIST[this.pageId].fpCard ? window.YS_CUSTOMCOMPONENT_LIST[this.pageId].fpCard : null
                this.fpUserEWM = window.YS_CUSTOMCOMPONENT_LIST[this.pageId].fpUserEWM ? window.YS_CUSTOMCOMPONENT_LIST[this.pageId].fpUserEWM : null
                this.videoCard = window.YS_CUSTOMCOMPONENT_LIST[this.pageId].videoCard ? window.YS_CUSTOMCOMPONENT_LIST[this.pageId].videoCard : null
            }
        }
    }
</script>
