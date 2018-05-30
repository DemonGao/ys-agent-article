// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueClipboard from 'vue-clipboard2'

Vue.use(Vuex)
import {sync} from 'vuex-router-sync'
import {AjaxPlugin, WechatPlugin, ToastPlugin, LoadingPlugin, BusPlugin, ConfirmPlugin} from 'vux'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import 'vue2-animate/dist/vue2-animate.min.css'
import VueScroller from 'vue-scroller'
import axiosUtil from './axios/index'

import VueHtml5Editor from 'vue-html5-editor'
Vue.use(VueHtml5Editor, {
    // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效
    // global component name
    name: 'vue-html5-editor',
    // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
    // if set true,will append module name to toolbar after icon
    showModuleName: false,
    // 自定义各个图标的class，默认使用的是font-awesome提供的图标
    // custom icon class of built-in modules,default using font-awesome
    icons: {
        text: 'fa fa-pencil',
        color: 'fa fa-paint-brush',
        font: 'fa fa-font',
        align: 'fa fa-align-justify',
        list: 'fa fa-list',
        link: 'fa fa-chain',
        unlink: 'fa fa-chain-broken',
        tabulation: 'fa fa-table',
        image: 'fa fa-file-image-o',
        hr: 'fa fa-minus',
        eraser: 'fa fa-eraser',
        undo: 'fa-undo fa',
        'full-screen': 'fa fa-arrows-alt',
        info: 'fa fa-info'
    },
    // 配置图片模块
    // config image module
    image: {
        // 文件最大体积，单位字节  max file size
        sizeLimit: 512 * 1024,
        // 上传参数,默认把图片转为base64而不上传
        // upload config,default null and convert image to base64
        upload: {
            url: null,
            headers: {},
            params: {},
            fieldName: {}
        },
        // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
        // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
        // set null to disable compression
        compress: {
            width: 1600,
            height: 1600,
            quality: 80
        },
        // 响应数据处理,最终返回图片链接
        // handle response data，return image url
        uploadHandler(responseText){
            // default accept json data like  {ok:false,msg:'unexpected'} or {ok:true,data:'image url'}
            let json = JSON.parse(responseText)
            if (!json.ok) {
                alert(json.msg)
            } else {
                return json.data
            }
        }
    },
    // 语言，内建的有英文（en-us）和中文（zh-cn）
    // default en-us, en-us and zh-cn are built-in
    language: 'zh-cn',
    // 自定义语言
    i18n: {
        // specify your language here
        'zh-cn': {
            'align': '对齐方式',
            'image': '图片',
            'list': '列表',
            'link': '链接',
            'unlink': '去除链接',
            'table': '表格',
            'font': '文字',
            'full screen': '全屏',
            'text': '排版',
            'eraser': '格式清除',
            'info': '关于',
            'color': '颜色',
            'please enter a url': '请输入地址',
            'create link': '创建链接',
            'bold': '加粗',
            'italic': '倾斜',
            'underline': '下划线',
            'strike through': '删除线',
            'subscript': '上标',
            'superscript': '下标',
            'heading': '标题',
            'font name': '字体',
            'font size': '文字大小',
            'left justify': '左对齐',
            'center justify': '居中',
            'right justify': '右对齐',
            'ordered list': '有序列表',
            'unordered list': '无序列表',
            'fore color': '前景色',
            'background color': '背景色',
            'row count': '行数',
            'column count': '列数',
            'save': '确定',
            'upload': '上传',
            'progress': '进度',
            'unknown': '未知',
            'please wait': '请稍等',
            'error': '错误',
            'abort': '中断',
            'reset': '重置'
        }
    },
    // 隐藏不想要显示出来的模块
    // the modules you don't want
    hiddenModules: [],
    // 自定义要显示的模块，并控制顺序
    // keep only the modules you want and customize the order.
    // can be used with hiddenModules together
    visibleModules: [
        'text',
        'color',
        'font',
        'align',
        'list',
        'link',
        'unlink',
        'tabulation',
        'image',
        'hr',
        'eraser',
        'undo',
        'full-screen',
        'info'
    ],
    // 扩展模块，具体可以参考examples或查看源码
    // extended modules
    modules: {
        // omit,reference to source code of build-in modules
    }
})

import 'babel-polyfill'


let store = new Vuex.Store({
    modules: {}
})

Vue.use(store)
sync(store, router)
store.registerModule('vux', {
    state: {
        isLoading: false,
        direction: 'forward',
        userInfo: null,
        myVisitingRecordTabIndex: 0
    },
    mutations: {
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        },
        updateDirection(state, payload) {
            state.direction = payload.direction
        },
        updateUserInfo(state, payload) {
            state.userInfo = payload.userInfo
        },
        updateMyVisitingRecordTabIndex(state, payload) {
            state.userInfo = payload.myVisitingRecordTabIndex
        }
    },
    actions: {
        updateUserInfo({commit}, userInfo) {
            commit({type: 'updateUserInfo', userInfo: userInfo})
        },
        updateMyVisitingRecordTabIndex({commit}, myVisitingRecordTabIndex) {
            alert(myVisitingRecordTabIndex)
            commit({type: 'updateMyVisitingRecordTabIndex', myVisitingRecordTabIndex: myVisitingRecordTabIndex})
        }
    }
})

require('es6-promise').polyfill()
FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(AjaxPlugin)
Vue.use(ConfirmPlugin)
Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(VueScroller)
Vue.use(BusPlugin)
Vue.use(VueClipboard)
Vue.prototype.$axios = axiosUtil

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']
document.addEventListener('touchend', () => {
    endTime = Date.now()
})
methods.forEach(key => {
    let method = router[key].bind(router)
    router[key] = function (...args) {
        isPush = true
        method.apply(null, args)
    }
})
router.beforeEach((to, from, next) => {
    to.meta && to.meta.title ? window.document.title = to.meta.title : ''
    store.commit('updateLoadingStatus', {isLoading: true})

    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)

    if (toIndex) {
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
            store.commit('updateDirection', {direction: 'forward'})
        } else {
            // 判断是否是ios左滑返回
            if (!isPush && (Date.now() - endTime) < 377) {
                store.commit('updateDirection', {direction: ''})
            } else {
                store.commit('updateDirection', { direction: 'reverse' })
            }
        }
    } else {
        ++historyCount
        history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.path, historyCount)
        store.commit('updateDirection', {direction: 'forward'})
    }
    next()
})
router.afterEach(function (to) {
    isPush = false
    store.commit('updateLoadingStatus', {isLoading: false})
})
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app-box')
