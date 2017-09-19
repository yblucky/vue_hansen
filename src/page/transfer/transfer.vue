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
                      <span class="info-data-middle" style="padding-top:3%;padding-left:10%;">购物币</span>
                      <span class="info-data-bottom" style="padding-top:3%;padding-left:10%;"><b>{{parseFloat(payAmt).toFixed(2)}}</b></span>
                  </li>
                  <li to="" @click="selCard(1);" v-bind:class="{active:selCardType==1}" class="info-data-link">
                      <span class="info-data-top-right">
                        <img v-if="selCardType === 1" src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../hsimages/11.png" class="vip" /></span>
                      <span class="info-data-bottom" style="padding-top:3%;padding-left:13%;">交易币</span>
                      <span class="info-data-bottom" style="padding-top:3%;padding-left:13%;"><b>{{parseFloat(tradeAmt).toFixed(2)}}</b></span>
                  </li>
                  <!-- 没有用到，暂时不显示 -->
                  <!-- @click="selCard(2);" -->
                  <li to="" @click="selCard2" v-bind:class="{active:selCardType==2}" class="info-data-link">
                      <span class="info-data-top-right">
                        <img v-if="selCardType === 2" src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../hsimages/12.png" class="vip" /></span>
                      <span class="info-data-bottom" style="padding-top:3%;padding-left:18%;">瀚森股权</span>
                      <span class="info-data-bottom" style="padding-top:3%;padding-left:18%;"><b>{{parseFloat(equityAmt).toFixed(2)}}</b></span>
                  </li>
              </ul>
          </section>
        </div>
        <section class="input_container">
          <p>
            <span>收款用户：<input type="number" size="16" name="toUid" placeholder="请输入用户uid" v-model.lazy="toUid"></span>
          </p>
          <p>
            <span>转币数量：<input type="number" size="16" name="amount" placeholder="0.00" v-model.lazy="amount"></span>
          </p>
          <p class="pay_display">
            <span>高级密码：<input type="password" size="16" name="payPassWord"  v-model.lazy="payPassWord"></span>
          </p>
        </section>
        <div class="btn">
            <div class="login_container" @click="showPayPwd()">确认</div>
        </div>

        <section class="coverpart" v-if="showLoading">
            <section class="cover-background"></section>
            <section class="cover-content">
                <loading></loading>
            </section>
        </section>

        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <payPwd @pwdCompleted="coinTransferAction($event)" v-if="showPwd" :showHide="showPwd" @closePwd='closePwd'></payPwd>
        <!-- <foot-guide></foot-guide> -->
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    // import footGuide from 'src/components/footer/footGuide'
    import {localapi, proapi, imgBaseUrl,isLogin,getLoginUserInfo} from 'src/config/env'
    import payPwd from 'src/components/common/payPwd'
    import {mapState, mapMutations} from 'vuex'
    import {coinTransfer,getUser} from '../../service/getData'
    import loading from 'src/components/common/loading'



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
                equityAmt:0,//瀚森股权
                toUid:'',//收款账户
                payPassWord:'',//高级密码

                amount:'',//支付个数
                walletOrderType:1, //1交易币内部转账  4 支付币内部转账  8股权币内部转账
                showPwd:false,
                showLoading:false,

            }
        },
        mounted(){
          this.isLogin("/login");
        },
        mixins: [isLogin,getLoginUserInfo],
        created(){
            this.initData();
        },
        components: {
            headTop,
            alertTip,
            // footGuide,
            payPwd,
            loading,
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
            async initData(){
              let res = await getUser();

              if(res.code == 200){
                this.equityAmt=res.result.equityAmt;
                this.payAmt=res.result.payAmt;
                this.tradeAmt=res.result.tradeAmt;
              }else {
                this.showAlert = true;
                this.alertText = res.msg;
                if(res.code==0 || res.code==-1){
                  localStorage.clear();
                }
              }
            },
            async coinTransferAction(pwd){
                this.payPassWord=pwd;
                if (!this.payPassWord) {
                  this.showAlert = true;
                  this.alertText = '支付密码不能为空';
                  return;
                }
                //隐藏密码框
                this.showPwd=false;
                //弹出加载页
                this.showLoading=true;
                if(this.showLoading){
                    let res = await coinTransfer(this.toUid, parseFloat(this.amount) ,this.walletOrderType,this.payPassWord);
                    if (res.code==200) {
                      this.showLoading=false;
                      this.showAlert = true;
                      this.alertText = res.msg;
                      //刷新页面

                    }else {
                      this.showLoading=false;
                      this.showAlert = true;
                      this.alertText = res.msg;
                      if (res.code==0 || res.code==-1) {
                         localStorage.clear();
                      }
                      if(localStorage.getItem("token") == null){
                        this.isLogin("/login");
                      }else {
                        //刷新页面
                        // location.reload();
                      }
                    }
                }
                //不管成功失败，重新输入
                this.toUid = '';
                this.amount = '';
            },
            toggleTabs (index,tabText) {
                 this.active = index;
             },
             selCard (index) {
                  this.selCardType = index;
                  if (index==0) {
                    this.walletOrderType=4;
                  }else  if (index==1) {
                    this.walletOrderType=1;
                  }else if (index==2) {
                    this.walletOrderType=8;
                  }
              },
            selCard2(){
              this.showAlert = true;
              this.alertText = '瀚森股权暂不支持转账';
            },
            closeTip(){
                this.showAlert = false;
                location.reload();
            },
            closePwd(){
                this.showPwd = false;
            },
            showPayPwd(){
              if (!this.toUid) {
                this.showAlert = true;
                this.alertText = '收款账号不能为空';
                return;
              }
              if (this.amount <= 0) {
                this.showAlert = true;
                this.alertText = '转币数量不能为空';
                return;
              }
              // this.turnType = false;
              this.showPwd=true;
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
                     b{
                         display:inline-block;
                         @include sc(0.6rem,#f90);
                         font-weight:700;
                         line-height:0.5rem;
                         font-family: Helvetica Neue,Tahoma;
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
            @include sc(1rem, #666);
            border:1px solid #dedede;
            border-radius: 0.3rem;
            text-align: center;
            font-family:cursive;
            width: 45%;
        }
        p{
            text-align: center;
            margin-top:20px;
        }
        .pay_display{
          display: none;
        }
    }

    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }

    .coverpart{
        @include wh(100%,100%);
        @include allcover;
        .cover-background{
            @include wh(100%,105%);
            @include allcover;
            background:#000;
            z-index:100;
            opacity:.2;
        }
        .cover-content{
            width:94%;
            z-index:1000;
            .redbao{
              position: absolute;
              top: 15%;
              left: 4%;
              vertical-align:middle;
              display:inline-block;
              width:15rem;
              z-index:1010;
            }
            .redbao_button{
              position: absolute;
              top: 71%;
              left: 19%;
              vertical-align:middle;
              display:inline-block;
              width:10rem;
              z-index:1010;
            }
            .redbao_text{
              position: absolute;
              top: 0;
              left: 0;
              z-index:1020;
              font-size: 30px;
              text-align: center;
              width: 60%;
              height: 50px;
              line-height: 50px;
              color: #DA4E3F;
              margin: 40% 20% 0 20%;
            }
        }
    }

    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
     /* WebKit browsers */
        color: #666;
        font-size:15px;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
        color: #666;
        font-size:15px;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
     /* Mozilla Firefox 19+ */
        color: #666;
        font-size:15px;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
     /* Internet Explorer 10+ */
        color: #666;
        font-size:15px;
    }
</style>
