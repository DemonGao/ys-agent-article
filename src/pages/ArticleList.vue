<style rel="stylesheet/less" lang="less" scoped="scoped">
    .articleList {
        position: absolute;
        width: 100%;
        height: 100%;
        .articleList__hd {
            position: relative;
            height: 90px;
            .masker {
                position: absolute;
                height: 100%;
                width: 100%;
                opacity: .5;
            }
            .container {
                position: relative;
                height: 100%;
                display: flex;
                flex-flow: row nowrap;
                .logo {
                    margin: 15px;
                    width: 60px;
                    height: 60px;
                    text-align: center;
                    color: #ffffff;
                    -webkit-border-radius: 100% 100%;
                    -moz-border-radius: 100% 100%;
                    border-radius: 100% 100%;
                    i.iconfont {
                        font-size: 40px;
                    }
                }
                .content {
                    flex: 1;
                    margin: 15px 15px 15px 0;
                    color: #ffffff;
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: center;
                    h3 {
                        font-size: 16px;
                    }
                    font-size: 12px;
                }

            }
        }
        .articleList__bd {
            position: relative;
            height: calc(~"100% - 90px");
        }
    }
</style>
<template>
    <div class="articleList">
        <div class="articleList__hd">
            <div class="masker" :style="{'background-color': tag.colorcode}"></div>
            <div class="container">
                <div class="logo" :style="{'background-color': tag.colorcode}">
                    <i :class="['iconfont '+ tag.iconclass]"></i>
                </div>
                <div class="content">
                    <h3>{{tag.name}}</h3>
                    <div>
                        {{tag.description}}
                    </div>
                </div>
            </div>

        </div>
        <div class="articleList__bd">
            <scroller
                :on-refresh="refresh"
                :on-infinite="infinite"
                ref="dmscroller"
            >
                <template v-for="(item, index) in list">
                    <template v-for="(item, index) in list">
                        <DmPanel
                            class="article"
                            :class="['dm__panel', 'article', 'dm-border-b']"
                            headWidth='75px'
                            :lineClamp=2
                            :img="item.imgSrc"
                            :title='item.title'
                            @click.native="routerLink('Article',{articleid: item.id}, {title: item.title})"
                        >
                            {{item.shortcontent}}
                            <div slot="other" class="util">
                                <div class="item"><i class="iconfont icon-like"></i>{{item.thumbsupcount}}</div>
                                <div class="item"><i class="iconfont icon-comment"></i>{{item.commentcount}}</div>
                                <div class="item"><i class="iconfont icon-attentionfill"></i>{{item.readcount}}</div>
                            </div>
                        </DmPanel>
                    </template>
                </template>
            </scroller>
        </div>
        <!--立即分享 dialog-->
        <x-dialog
            class="articleDialog"
            v-model="articelDialogShow"
            :hide-on-blur="true"
        >
            <div class="head" :style="{'backgroundImage': 'url('+dialog.imgSrc +')'}">
                <div class="mask"></div>
                <i @click="articelDialogShow = !articelDialogShow" class="iconfont icon-close"></i>
                <div class="head_bd">
                    <h3 class="title">{{dialog.title}}</h3>
                    <div class="desc">{{dialog.shortcontent}}</div>
                </div>
            </div>
            <div class="content">
                <p class="recommendation">推荐话术</p>
                <p class="desc">{{dialog.description}}</p>
            </div>
            <box gap="10px 15px">
                <x-button
                    :link="'/article/' + dialog.id"
                    style="height: 35px;line-height: 35px; font-size: 14px;"
                    :gradients="['#1D62F0', '#19D5FD']"
                >立即分享
                </x-button>
            </box>
        </x-dialog>
    </div>
</template>
<script>
    import {Cell, Group, Confirm, Countup, TransferDomDirective as TransferDom, XDialog, XButton, Box} from 'vux'
    import DmPanel from '@/components/Dcomponents/DmPanel.vue'
    import ScrollerMixin from '@/mixins/ScrollerMixin.vue'
    import UtilMixin from '@/mixins/UtilMixin.vue'

    export default {
        directives: {
            TransferDom
        },
        mixins: [ScrollerMixin, UtilMixin],
        props: ['tagid'],
        components: {
            Cell,
            Group,
            DmPanel,
            Confirm,
            Countup,
            XDialog,
            XButton,
            Box
        },
        data() {
            return {
                tag: {
                    id: null,
                    name: null,
                    iconclass: null,
                    description: null,
                    colorcode: null
                },
                articelDialogShow: false,
                dialog: {
                    id: null,
                    title: null,
                    shortcontent: null,
                    description: null,
                    imgSrc: null
                }
            }
        },
        async created() {
            this.ajaxLoadArticleTagBytagid()
        },
        methods: {
            async refresh(done) {
                this.pageNo = 0
                let result = await this.ajaxPageDateByList()
                this.list = result.list
                this.pageCount = result.pageCount
                done()
            },
            // 提交给我的
            ajaxPageDateByList() {
                return new Promise((resolve, reject) => {
                    this.$axios.post({
                        url: '/agent/article/services/loadarticlesBytagid',
                        data: {
                            tagid: this.tagid,
                            pageNo: this.pageNo,
                            pageSize: this.pageSize
                        },
                        tips: true
                    })
                        .then(result => {
                            resolve(result)
//                            console.log(result)
                        })
                        .catch((code, msg) => {
                            reject(code, msg)
                        })
                })
            },
            openDialog(index) {
                this.articelDialogShow = !this.articelDialogShow
                this.dialog = this.list[index]
            },
            ajaxLoadArticleTagBytagid() {
                this.$axios.post({
                    url: '/agent/article/services/loadArticleTagBytagid',
                    data: {
                        tagid: this.tagid
                    },
                    tips: true
                }).then(result => {
                    this.tag = result
                })
            }
        }
    }
</script>
