<template>
    <div class="loginContainer">
        <head-top :head-title="'普卡用户升级'" goBack="true">
            <div slot="changeLogin" class="change_login">
              <router-link to="/upgrade/upgradeRecord" >升级记录</router-link>
            </div>
        </head-top>
        <section class="category_title">
            <span :class="{choosed: active === 1}" @click="active = 1">原点升级</span>
            <span :class="{choosed: active === 2}" @click="active = 2">覆盖升级</span>
        </section>
        <div class="selCardType">
          <span class="title">选择账户等级</span>
          <section class="info-data">
              <ul class="clear">
                  <li @click="selCard(0);" v-bind:class="{active:selCardType==0}" class="info-data-link">
                      <span class="info-data-top-right"><img src="../../images/34.png" /></span>
                      <span class="info-data-top"><img src="../../images/33.png" class="vip" /></span>
                      <span class="info-data-middle">铜卡</span>
                      <div class="info-data-bottom">1万</div>
                  </li>
                  <li to="" @click="selCard(1);" v-bind:class="{active:selCardType==1}" class="info-data-link">
                      <span class="info-data-top-right"><img src="../../images/34.png" /></span>
                      <span class="info-data-top"><img src="../../images/33.png" class="vip" /></span>
                      <span class="info-data-bottom">银卡</span>
                      <div class="info-data-bottom">1万</div>
                  </li>
                  <li to="" @click="selCard(2);" v-bind:class="{active:selCardType==2}" class="info-data-link">
                      <span class="info-data-top-right"><img src="../../images/34.png" /></span>
                      <span class="info-data-top"><img src="../../images/33.png" class="vip" /></span>
                      <span class="info-data-bottom">金卡</span>
                      <div class="info-data-bottom">1万</div>
                  </li>
                  <li to="" @click="selCard(3);" v-bind:class="{active:selCardType==3}" class="info-data-link">
                      <span class="info-data-top-right"><img src="../../images/34.png" /></span>
                      <span class="info-data-top"><img src="../../images/33.png" class="vip" /></span>
                      <span class="info-data-bottom">钻石卡</span>
                      <div class="info-data-bottom">1万</div>
                  </li>
              </ul>
          </section>
        </div>
        <section class="input_container">
          <span>最大收益：<input type="text" placeholder="最大收益" v-model.lazy="needActiveNum"></span>
        
        </section>
        <div class="login_container" @click="active=2">激活注册</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <foot-guide></foot-guide>
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
                cardMaxproft: 0, //最大收益
                needActiveNum:0,//需要补充激活码数量
                needBuyNum:0,//需要补充购物币数量
                needChangeNum:0,//需要补充交易数量

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
    @import '../../style/mixin';

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
      .title{
        font-size:0.85rem;
        font-weight:500;
        padding:15px 20px;
      }
    }
    .active{

    }
    .info-data{
         width:100%;
         box-sizing: border-box;
         border-bottom:1px solid #b3abab;
         ul{
             .info-data-link{
                 float:left;
                 width:24.9%;
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
        margin: 0 .5rem 1rem;
        @include sc(.7rem, #fff);
        background-color: #3b95e9;
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
    .input_container{
        font-size: 0.75rem;
        font-weight:500;
        width:100%;
        text-align:center;
        display:block;
        background-color:#eee;
        input{
            @include sc(0.85rem, #666);
            border:1px solid #dedede;
        }
    }
</style>
