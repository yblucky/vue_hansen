<template>
    <div class="loginContainer">
        <head-top head-title="转账汇款" goBack="true">
            <div slot="changeLogin" class="change_login">
              <router-link to="/transfer/transfer" >转账记录</router-link>
            </div>
        </head-top>
        <div class="selCardType">
          <span class="title">选择汇款账户</span>
          <section class="info-data">
              <ul class="clear">
                  <li @click="selCard(0);" v-bind:class="{active:selCardType==0}" class="info-data-link">
                      <span class="info-data-top-right">
                        <img v-if="selCardType === 0" src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../hsimages/10.png" class="vip" /></span>
                      <span class="info-data-middle">支付币</span>
                      <span class="info-data-bottom"><b>{{parseFloat(payAmt).toFixed(6)}}</b></span>
                  </li>
                  <li to="" @click="selCard(1);" v-bind:class="{active:selCardType==1}" class="info-data-link">
                      <span class="info-data-top-right">
                        <img v-if="selCardType === 1" src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../hsimages/11.png" class="vip" /></span>
                      <span class="info-data-bottom">交易币</span>
                      <span class="info-data-bottom"><b>{{parseFloat(tradeAmt).toFixed(6)}}</b></span>
                  </li>
                  <li to="" @click="selCard(2);" v-bind:class="{active:selCardType==2}" class="info-data-link">
                      <span class="info-data-top-right">
                        <img v-if="selCardType === 2" src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../hsimages/12.png" class="vip" /></span>
                      <span class="info-data-bottom">翰森股权</span>
                      <span class="info-data-bottom"><b>{{parseFloat(equityAmt).toFixed(6)}}</b></span>
                  </li>
              </ul>
          </section>
        </div>
        <section class="input_container">
          <p>
            <span>收款账户：<input type="text" size="16" name="toUid" v-model.lazy="toUid"></span>
          </p>
          <p>
            <span>转币数量：<input type="text" size="16" name="amount" v-model.lazy="amount"></span>
          </p>
          <p>
            <span>高级密码：<input type="password" size="16" name="payPassWord"  v-model.lazy="payPassWord"></span>
          </p>
        </section>
        <div class="btn">
            <div class="login_container" @click="coinTransferAction">确认</div>
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <foot-guide></foot-guide>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import footGuide from 'src/components/footer/footGuide'
    import {localapi, proapi, imgBaseUrl,isLogin,getLoginUserInfo} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {coinTransfer} from '../../service/getData'


    export default {
        data(){
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                upWay: 0, //升级方式
                active: 1, //升级方式
                selCardType: 1, //升级等级

                payAmt:0,//购物币
                tradeAmt:0,//交易币
                equityAmt:0,//翰森股权
                toUid:'',//收款账户
                payPassWord:'',//高级密码


                amount:0,//支付个数
                walletOrderType:1, //1交易币内部转账  4 支付币内部转账  8股权币内部转账
            }
        },
        mounted(){
          this.isLogin("/login");
        },
        mixins: [isLogin,getLoginUserInfo],
        created(){
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
            async coinTransferAction(){
                if (!this.toUid) {
                  this.showAlert = true;
                  this.alertText = '收款账号不能为空';
                }
                if (!this.amount) {
                  this.showAlert = true;
                  this.alertText = '转币数量不能为空';
                }
                if (!this.payPassWord) {
                  console.log(this.payPassWord);
                  this.showAlert = true;
                  this.alertText = '支付密码不能为空';
                }
                console.log(this.amount);
                let res = await coinTransfer(this.toUid, parseFloat(this.amount) ,this.walletOrderType,this.payPassWord);
                if (res.code==200) {
                  this.showAlert = true;
                  this.alertText = res.msg;
                }else {
                  this.showAlert = true;
                  this.alertText = res.msg;
                }
            },
            toggleTabs (index,tabText) {
                 this.active = index;
             },
             selCard (index) {
                  this.selCardType = index;
                  console.log("indexdddddddddddd "+index);
                  if (index==0) {
                    this.walletOrderType=4;
                  }else  if (index==1) {
                    this.walletOrderType=1;
                  }else if (index==2) {
                    this.walletOrderType=8;
                  }
              },
            closeTip(){
                this.showAlert = false;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../../src/style/mixin.scss";

    .category_title{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 2rem;
        background-color: #fff;
        border-bottom: 0.1rem solid #eee;
        span{
            text-align: center;
            @include sc(.65rem, #333);
            padding-bottom: .2rem;
            border-bottom: 0.1rem solid #fff;
        }
        .choosed{
            border-bottom-color: $blue;
            color: $blue;
        }
    }
    .selCardType{
      background-color:#fff;
      /*.title{
        font-size:0.85rem;
        font-weight:500;
        padding:15px 20px;
        margin-bottom:20px;
      }*/
      .title{
        font-size:0.7rem;
        font-family: "黑体", Verdana, Arial, Helvetica, sans-serif;
        padding:15px 20px;
      }
    }
    .info-data{
         width:100%;
         margin-top: 5%;
         box-sizing: border-box;
         ul{
             .info-data-link{
                 float:left;
                 width:30%;
                 margin-left:.10rem;
                 margin-bottom: 3%;
                 display:inline-block;
                 border-right:1px solid #fcfcfc;
                 span{
                     display:block;
                     width:100%;
                     text-align:center;
                 }
                 .info-data-top-right{
                     @include sc(.55rem,#333);
                     text-align:right;
                     img{
                        width:0.65rem;
                     }
                 }
                 .info-data-top{
                     @include sc(.55rem,#333);
                     img{
                        width:2rem;
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
        margin-right:-15px;
        display:inline-block;
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
        margin-top: 5%;
        margin-left: 10%;
        width:80%;
        @include sc(.7rem, #fff);
        background-color: #3b95e9;
        padding: .5rem 0;
        border: 1px;
        border-radius: 1rem;
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
    .input_container{
        font-size: 0.75rem;
        margin-top: 5%;
        width:100%;
        text-align:center;
        display:block;
        input{
            @include sc(0.85rem, #666);
            border:1px solid #dedede;
        }
        p{
            text-align: center;
            margin-top:20px;
        }
    }

    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
