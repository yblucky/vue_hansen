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
                      <span class="info-data-middle">购物币</span>
                      <span class="info-data-bottom"><b>{{parseInt(balance).toFixed(2)}}</b>元</span>
                  </li>
                  <li to="" @click="selCard(1);" v-bind:class="{active:selCardType==1}" class="info-data-link">
                      <span class="info-data-top-right">
                        <img v-if="selCardType === 1" src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../hsimages/11.png" class="vip" /></span>
                      <span class="info-data-bottom">交易币</span>
                      <span class="info-data-bottom"><b>{{parseInt(count).toFixed(2)}}</b>元</span>
                  </li>
                  <li to="" @click="selCard(2);" v-bind:class="{active:selCardType==2}" class="info-data-link">
                      <span class="info-data-top-right">
                        <img v-if="selCardType === 2" src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../hsimages/12.png" class="vip" /></span>
                      <span class="info-data-bottom">翰森股权</span>
                      <span class="info-data-bottom"><b>{{parseInt(pointNumber).toFixed(2)}}</b>元</span>
                  </li>
              </ul>
          </section>
        </div>
        <section class="input_container">
          <p>
            <span>收款人账户：<input type="text" size="16" name="uid"></span>
          </p>
          <p>
            <span>&nbsp;&nbsp;&nbsp;高级密码：<input type="password" size="16" name="pwd"></span>
          </p>
        </section>
        <div class="login_container" @click="active=2">激活注册</div>
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
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                upWay: 0, //升级方式
                active: 1, //升级方式
                selCardType: 0, //升级等级
                balance:1000,//购物币
                count:1000,//交易币
                pointNumber:1000,//翰森股权
                uid:0,//收款账户
                pwd:0,//高级密码
            }
        },
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
