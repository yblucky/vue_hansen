<template>
<div class="page">
<head-top head-title="红包说明" go-back='true'></head-top>
<section id="scroll_section" class="scroll_container">
<div class="markdown">
<h3 id="q1-">Q1: 怎么获得红包？</h3>
<ul>
<li>通过邀请好友获得</li>
<li>在下单返红包的商家下单获得</li>
<li>抢微信朋友分享的红包获得</li>
</ul>
<h3 id="q2-">Q2: 红包可以做什么？</h3>
<p>可以抵扣在线支付时的实际支付金额。</p>
<h3 id="q3-">Q3: 红包的门槛金额按照什么金额计算？</h3>
<p>红包的的门槛金额按照（选购菜品折后价＋餐盒费）的金额作为计算门槛，即购物车显示的金额（7.3以上版本）。假设红包满30可用，只要选购的菜品现价（折后价）＋餐盒费超过30，就可以使用红包。</p>
<h3 id="q4-">Q4: 一个红包能拆开多次使用吗？</h3>
<p>不能，一个红包只能一次性使用，不能分开使用。</p>
<h3 id="q5-">Q5: 下单的时候使用了红包，但是后来订单取消了，红包还会返还吗？</h3>
<p>会的，订单无效后红包会自动返还到您的账户里。</p>
<h3 id="q6-">Q6: 红包兑换码怎样兑换成红包，怎样查看红包？</h3>
<p>在个人中心 &gt; 我的红包 &gt; 兑换红包，输入兑换码进行兑换。</p>
<h3 id="q7-">Q7: 邀请好友了，为什么没获得红包？</h3>
<p>先检查下您是否在同一设备上进行的邀请？或者被邀请人是否通过您发给对方的链接进行注册？而非自己复制链接注册的。同一设备上邀请或没有按照点击发送的链接邀请都是无效邀请。如果您是正常邀请没获得红包，可以致电客服进行查实。</p>
<h3 id="q8-">Q8: 预订早餐、预订午餐的红包怎么使用？在哪里查询？</h3>
<ul>
<li>预订早餐、预订午餐的红包暂时不支持直接点外卖使用，并且当前点外卖的红包也暂时不支持在预订早餐、预订午餐时使用。</li>
<li>预订早餐、预订午餐的红包从APP首页点击“预订早餐”按钮进入后在右上角的个人中心中查找预订早餐、预订午餐的红包。</li>
</ul>
<h3 id="q9-">Q9: 互斥红包怎么使用？</h3>
<ul>
<li>互斥红包不与其他优惠活动（包含但不限于：新用户专享、满X元减X元、满X元赠XX）同时使用。</li>
</ul>
<h3 id="q10-">Q10: 返红包活动， 红包领取规则是什么?</h3>
<ul>
<li>同一个手机号一天限领取三个。</li>
<li>同一注册用户一天限领取三个。</li>
<li>注册用户红包直接发送至用户账户里。</li>
<li>非注册用户红包以兑换码短信的形式发送至用户手机，注册后凭兑换码兑换即可。</li>
<li>红包的使用周期为1周，自红包发放的第2天开始计算。</li>
<li>同一个手机号一天最多使用两个红包。</li>
<li>未收到红包短信的用户注意查看手机里的拦截短信。</li>
<li>有任何问题请拨打客服电话：10105757。</li>
</ul>
</div>
</section>
</div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import footGuide from 'src/components/footer/footGuide'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                upWay: 0, //升级方式
                active: 0, //升级方式
                selCardType: 0, //升级等级
                cardMaxproft: 0, //最大收益
                needActiveNum:0,//需要补充激活码数量
                needBuyNum:0,//需要补充购物币数量
                needChangeNum:0,//需要补充交易数量

            }
        },
        created(){
            this.getCaptchaCode();
        },
        components: {
            headTop,
            alertTip,
            footGuide,
        },
        computed: {
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1\d{10}$/gi.test(this.phoneNumber)
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            toggleTabs (index,tabText) {
                 this.active = index;
             },
             selCard (index) {
                  this.selCardType = index;
              },
            closeTip(){
                this.showAlert = false;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    nav{
        width:100%;
        background:#eeeeee;
        padding:0 0px;
        font-size: initial;
        a{
            text-decoration: none;
            color:#000;
            display: inline-block;
            width:49%;
            text-align:center;
            padding:5px;
        }
    }
    .selTitle{
      font-size: initial;
    }
    .active{
        background-color:#ffffff
    }
    .info-data{
         width:100%;
         background:#eeeeee;
         box-sizing: border-box;
         border-bottom:1px solid #b3abab;
         ul{
             .info-data-link{
                 float:left;
                 width:24.9%;
                 display:inline-block;
                 border-right:1px solid #f1f1f1;
                 span{
                     display:block;
                     width:100%;
                     text-align:center;
                 }
                 .info-data-top{
                     @include sc(.55rem,#333);
                     padding: .853333rem 0 .453333rem;
                     b{
                         display:inline-block;
                         @include sc(1.2rem,#f90);
                         font-weight:700;
                         line-height:1rem;
                         font-family: Helvetica Neue,Tahoma;
                     }
                 }
                 .info-data-middle{
                     @include sc(.57333rem,#666);
                     font-weight:400;

                 }
                 .info-data-bottom{
                     @include sc(.57333rem,#666);
                     font-weight:400;
                     text-align:center;
                     img{
                         padding:0 10;
                         text-align:left;
                     }
                 }
             }
             .info-data-link:nth-of-type(4){
                 border:0;
             }
         }
    }
    .vip{
        text-align:center;
        display:inline-block;
    }
    .maxPorfit{
        font-size: large;
        padding:0 25%;
        text-align:center;
        display:inline-block;
        b{
          color:red;
        }
    }
    .needPay{
        font-size: large;
        width:100%;
        text-align:center;
        display:inline-block;
        span{
            padding:5 5;
            display:block;
            text-align:left;
        }
    }

    .loginContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .change_login{
        position: absolute;
        @include ct;
        right: 0.75rem;
        @include sc(.7rem, #fff);
    }

    .login_tips{
        @include sc(.5rem, red);
        padding: .4rem .6rem;
        line-height: .5rem;
        a{
            color: #3b95e9;
        }
    }
    .login_container{
        margin: 0 .5rem 1rem;
        @include sc(.7rem, #fff);
        background-color: #4cd964;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
    .change_to_text{
        background-color: #4cd964;
    }
    .to_forget{
        float: right;
        @include sc(.6rem, #3b95e9);
        margin-right: .3rem;
    }
</style>
