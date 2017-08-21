<template>
    <div class="upGradeContainer">
        <head-top :head-title="'邀请会员'" goBack="true"></head-top>
        <div class="selCardType">
          <span class="title">选择账户等级</span>
          <section class="info-data">
              <ul class="clear">
                  <li @click="selCard(0);" v-bind:class="{active:selCardType==0}" class="info-data-link">
                      <span class="info-data-top-right">
                        <img v-if="selCardType === 0" src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../images/vipCard.png" class="vip" /></span>
                      <span class="info-data-middle">铜卡</span>
                      <div class="info-data-bottom">1万</div>
                  </li>
                  <li to="" @click="selCard(1);" v-bind:class="{active:selCardType==1}" class="info-data-link">
                      <span class="info-data-top-right">
                        <img v-if="selCardType == 1" src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../images/vipCard.png" class="vip" /></span>
                      <span class="info-data-bottom">银卡</span>
                      <div class="info-data-bottom">1万</div>
                  </li>
                  <li to="" @click="selCard(2);" v-bind:class="{active:selCardType==2}" class="info-data-link">
                      <span class="info-data-top-right">
                        <img v-if="selCardType == 2" src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../images/vipCard.png" class="vip" /></span>
                      <span class="info-data-bottom">金卡</span>
                      <div class="info-data-bottom">1万</div>
                  </li>
                  <li to="" @click="selCard(3);" v-bind:class="{active:selCardType==3}" class="info-data-link">
                      <span class="info-data-top-right">
                        <img v-if="selCardType == 3" src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../images/vipCard.png" class="vip" /></span>
                      <span class="info-data-bottom">钻石卡</span>
                      <div class="info-data-bottom">1万</div>
                  </li>
              </ul>
          </section>
        </div>

        <div class="middle">
            <p>
              <span class="registerCode">
                  账户注册码：<b>{{registerCode}}</b>个
              </span>
              <span class="activeCode">
                  账户激活码：<b>{{registerCode}}</b>个
              </span>
            </p>

            <p>
              <span class="tradeAmt">
                  交易币：<b>{{tradeAmt}}</b>个
              </span>
              <span class="payAmt">
                  购物币：<b>{{payAmt}}</b>个
              </span>
            </p>
        </div>

        <div class="fillInformation">
            <span class="title">填写基本资料</span>
            <section class="input_container">
              <div>
                <span>手机号：</span>
                <input type="text" name="phone" v-model.lazy="phone">
              </div>
              <div>
                <span>邮箱：</span>
                <input type="text" name="email" v-model.lazy="email">
              </div>
              <div>
                <span>邀请人：</span>
                <input type="text" disabled="disabled" name="firstReferrer" v-model.lazy="firstReferrer">
              </div>
              <div>
                <span>接点人：</span>
                <input type="text" name="contactUserId" v-model.lazy="contactUserId">
              </div>
              <div>
                <span>登录密码：</span>
                <input type="text" name="password" v-model.lazy="password">
              </div>
              <div>
                <span>确认密码：</span>
                <input type="text" name="confirmPassword" v-model.lazy="confirmPassword">
              </div>
              <div>
                <span>高级密码：</span>
                <input type="text" name="payWord" v-model.lazy="payWord">
              </div>
              <div>
                <span>确认高级密码：</span>
                <input type="text" name="confirmPayWord" v-model.lazy="confirmPayWord">
              </div>
            </section>
            <div class="active_container" @click="upGradeAction">激活注册</div>
        </div>

        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <!-- <foot-guide></foot-guide> -->
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    // import footGuide from 'src/components/footer/footGuide'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                registerCode: 1, //注册码
                activeCode: 1, //激活码
                tradeAmt:500000,//交易币
                payAmt:300000,  //购物币
                selCardType: 0, //升级等级
                phone: "", //手机号
                email:"",//邮箱
                firstReferrer:"HS200016",//邀请人
                contactUserId:"",//接点人
                password:"",//登录密码
                confirmPassword:"",//确认登录密码
                payWord:"",//高级密码
                confirmPayWord:""//确认高级密码
            }
        },
        created(){
        },
        components: {
            headTop,
            alertTip,
            // footGuide,
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
            //升级
            async upGradeAction(){
                this.showAlert = true;
                this.alertText = '手机号码不正确';
                return
            },
            closeTip(){
                this.showAlert = false;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .selCardType{
      background-color:#fff;
      .title{
        font-size:0.70rem;
        font-family: "黑体", Verdana, Arial, Helvetica, sans-serif;
        padding:15px 20px;
      }
    }
    .info-data{
         width:100%;
         margin-top: 3%;
         box-sizing: border-box;
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
    .upGradeContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .active_container{
        margin: 0.5rem 0.5rem;
        @include sc(.7rem, #fff);
        background-color: #3b95e9;
        padding: .5rem 0.5rem;
        border: 1px;
        border-radius: 0.95rem;
        text-align: center;

        background: #3b95e9; /* Old browsers */
      	background: -moz-linear-gradient(top,  #3b95e9 0%, #39a0be 100%); /* FF3.6+ */
      	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3b95e9), color-stop(100%,#39a0be)); /* Chrome,Safari4+ */
      	background: -webkit-linear-gradient(top,  #3b95e9 0%,#39a0be 100%); /* Chrome10+,Safari5.1+ */
      	background: -o-linear-gradient(top,  #3b95e9 0%,#39a0be 100%); /* Opera 11.10+ */
      	background: -ms-linear-gradient(top,  #3b95e9 0%,#39a0be 100%); /* IE10+ */
      	background: linear-gradient(top,  #3b95e9 0%,#39a0be 100%);
    }
    .change_to_text{
        background-color: #4cd964;
    }

    .middle{
        background-color:#F5F5F5;
        margin-top: 3%;
        padding:10px 0px 10px;
        span, b{
            font-size: 17px;
            color: grey;
        }
        .registerCode{
          margin-left:7%;
        }
        .activeCode{
          position: absolute;
          margin-top: 1%;
          left:55%;
        }
        .tradeAmt{
          margin-left:7%;
        }
        .payAmt{
          position: absolute;
          margin-top: 1%;
          left:55%;
        }
    }

    .fillInformation{
        margin-top:3%;
        .title{
          font-size:0.80rem;
          font-family: "黑体", Verdana, Arial, Helvetica, sans-serif;
          padding:15px 20px;
        }
        .input_container{
            font-size: 0.75rem;
            font-weight:500;
            width:94%;
            display:block;
            div{
              padding: .15rem .15rem;
              text-align:right;
            }
            input{
                @include sc(0.85rem, #666);
                border:1px solid #dedede;
                width:9rem;
                height:1.45rem;
                font-size: 16px;
                text-align: center;
            }
            span{
              font-size:16px;
            }
        }

    }


</style>
