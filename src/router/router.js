import App from '../App'

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const setusername = r => require.ensure([], () => r(require('../page/profile/children/setusername')), 'setusername')
const pay = r => require.ensure([], () => r(require('../page/pay/pay')), 'pay')
const payDetail = r => require.ensure([], () => r(require('../page/pay/children/payDetail')), 'payDetail')
const trade = r => require.ensure([], () => r(require('../page/trade/trade')), 'trade')
const tradeDetail = r => require.ensure([], () => r(require('../page/trade/children/tradeDetail')), 'tradeDetail')
const equity = r => require.ensure([], () => r(require('../page/equity/equity')), 'equity')
const equityDetail = r => require.ensure([], () => r(require('../page/equity/children/equityDetail')), 'equityDetail')
const service = r => require.ensure([], () => r(require('../page/service/service')), 'service')
const questionDetail = r => require.ensure([], () => r(require('../page/service/children/questionDetail')), 'questionDetail')
const setphone = r => require.ensure([], () => r(require('../page/profile/children/setphone')), 'setphone')
const setmail = r => require.ensure([], () => r(require('../page/profile/children/setmail')), 'setmail')
const setbankcard = r => require.ensure([], () => r(require('../page/profile/children/setbankcard')), 'setbankcard')
const setaddress = r => require.ensure([], () => r(require('../page/profile/children/setaddress')), 'setaddress')
const transfer = r => require.ensure([], () => r(require('../page/transfer/transfer')), 'transfer')
const upgrade = r => require.ensure([], () => r(require('../page/upgrade/upgrade')), 'upgrade')
const upgradeRecord = r => require.ensure([], () => r(require('../page/upgrade/upgradeRecord')), 'upgradeRecord')
const staticProfit = r => require.ensure([], () => r(require('../page/profit/staticProfit')), 'staticProfit')
const dynamicProfit = r => require.ensure([], () => r(require('../page/profit/dynamicProfit')), 'dynamicProfit')
const transferRecord = r => require.ensure([], () => r(require('../page/transfer/children/transferRecord')), 'transferRecord')
const inviteUser = r => require.ensure([], () => r(require('../page/inviteUser/inviteUser')), 'inviteUser')
const inviteQrcode = r => require.ensure([], () => r(require('../page/inviteUser/inviteQrcode')), 'inviteQrcode')
const activateCode = r => require.ensure([], () => r(require('../page/activateCode/activateCode')), 'activateCode')
const registerCode = r => require.ensure([], () => r(require('../page/registerCode/registerCode')), 'registerCode')
const myTeam = r => require.ensure([], () => r(require('../page/myTeam/myTeam')), 'myTeam')
const message = r => require.ensure([], () => r(require('../page/message/message')), 'message')
const setMessage = r => require.ensure([], () => r(require('../page/message/setMessage')), 'setMessage')
const myReward = r => require.ensure([], () => r(require('../page/reward/myReward')), 'myReward')
const forgetPwd = r => require.ensure([], () => r(require('../page/forgetPwd/forgetPwd')), 'forgetPwd')
const taskInfo = r => require.ensure([], () => r(require('../page/taskInfo/taskInfo')), 'taskInfo')
const doTask = r => require.ensure([], () => r(require('../page/taskInfo/doTask')), 'doTask')
const digitalAsset = r => require.ensure([], () => r(require('../page/digitalAsset/digitalAsset')), 'digitalAsset')
const financial = r => require.ensure([], () => r(require('../page/financial/financial')), 'financial')
const chooseUserCardGrade = r => require.ensure([], () => r(require('../page/upgrade/chooseUserCardGrade')), 'chooseUserCardGrade')
const chooseUserCardGradeAgain = r => require.ensure([], () => r(require('../page/upgrade/chooseUserCardGradeAgain')), 'chooseUserCardGradeAgain')



export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/login'
        },
        //登录注册页
        {
            path: '/login',
            component: login
        },
        //个人信息页
        {
            path: '/profile',
            component: profile,
            children: [{
                path: 'info', //个人信息详情页
                component: info
            },
            {
                path: 'setusername',
                component: setusername,
            },
            {
                path: 'setphone',
                component: setphone,
            },
            {
                path: 'setmail',
                component: setmail,
            },
            {
                path: 'setbankcard',
                component: setbankcard,
            },
            {
                path: 'setaddress',
                component: setaddress,
            },
            {
                path: 'service', //服务中心
                component: service,
            },]
        },
        //修改密码页
        {
            path: '/forget',
            component: forget
        },
        //发现页
        {
            path: '/find',
            component: find
        },
        //服务中心
        {
            path: '/service',
            component: service,
             children: [{
                path: 'questionDetail', //订单详情页
                component: questionDetail,
            }, ]
        },
        //购物币
        {
            path: 'pay',
            component: pay,
            children: [{
                path: 'detail', //余额说明
                component: payDetail,
            }, ]
        },
        //我的优惠页
        {
            path: 'trade',
            component: trade,
            children: [{
                path: 'tradeDetail', //代金券说明
                component: tradeDetail,
            },]
        },
        //我的积分页
        {
            path: 'equity',
            component: equity,
            children: [{
                path: 'detail', //积分说明
                component: equityDetail,
            }, ]
        },
        //转账汇款
        {
            path: 'transfer',
            component: transfer,
            children: [{
                path: 'transfer', //转账记录
                component: transferRecord,
            }, ]
        },
        //会员升级页
        {
          path: '/upgrade',
          component: upgrade
        },
        //会员升级记录页
        {
          path: '/upgradeRecord',
          component: upgradeRecord
        },
        //静态收益页
        {
          path: '/staticProfit',
          component: staticProfit
        },
        //动态收益页
        {
          path: '/dynamicProfit',
          component: dynamicProfit
        },
        //邀请会员
        {
          path: '/inviteUser',
          component: inviteUser
        },
        //邀请会员二维码
        {
          path: '/inviteQrcode',
          component: inviteQrcode
        },
        //我的激活码
        {
          path: '/activateCode',
          component: activateCode
        },
        //我的注册码
        {
          path: '/registerCode',
          component: registerCode
        },
        //我的团队
        {
          path: '/myTeam',
          component: myTeam
        },
        //消息中心
        {
          path: '/message',
          component: message
        },
        //新增反馈信息
        {
          path: '/setMessage',
          component: setMessage
        },
        //任务奖励红包
        {
          path: '/myReward',
          component: myReward
        },
        //忘记密码
        {
          path: '/forgetPwd',
          component: forgetPwd
        },
        //任务列表
        {
          path: '/taskInfo',
          component: taskInfo
        },
        //做任务页面
        {
          path: '/doTask',
          component: doTask
        },
        //数字资产钱包
        {
          path: '/digitalAsset',
          component: digitalAsset
        },
        //财务中心
        {
          path: '/financial',
          component: financial
        },
        //新用户选择等级激活
        {
          path: '/chooseUserCardGrade',
          component: chooseUserCardGrade
        },
        //保单出局选择等级激活
        {
          path: '/chooseUserCardGradeAgain',
          component: chooseUserCardGradeAgain
        },
    ]
}]
