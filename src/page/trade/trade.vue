<template>
 <div class="page">
       <head-top head-title="交易币钱包" go-back='true'>
         <div slot="changeLogin" class="change_login">
           <router-link to="/benefit/benefitDetail" ><b>明细</b></router-link>
         </div>
       </head-top>
       <section class="topPanel">
         <div class="activateDiv">交易币余额</div>
         <div class="activateCode"><b>{{tradeAmt}}</b></div>
         <div class="explain">1交易币约2000元</div>
       </section>
       <section class="info-data">
           <ul class="clear">
             <li class="info-data-link">
               <span class="info-data-left"><img src="../../hsimages/5.png" /></span>
               <span class="info-data-center">充值交易币</span>
             </li>
             <li @click="turnType=!turnType" class="info-data-link">
               <span class="info-data-left"><img src="../../hsimages/3.png" /></span>
               <span class="info-data-center">交易币提取</span>
               <span class="info-data-right"><img src="../../hsimages/44.png" v-bind:class="{'showImg': turnType, 'closeImg' : !turnType  }"/></span>
             </li>
             <transition name="router-fade">
                  <div class="transfer_div">
                    <section v-if="turnType == true" class="transfer">
                        <div class="div1">
                          <span class="shi">提币地址：{{outTradeAddress}}</span>
                          <input type="hidden" name="coinAddr" v-model.lazy="coinAddr">
                        </div>
                        <div>
                          <span class="shi">提币数量：</span>
                          <input type="text" name="count" v-model.lazy="count">
                        </div>
                        <div>
                          <span class="wu">提币手续费：</span>
                          <input type="text" name="fee" v-model.lazy="fee">
                        </div>
                        <div>
                          <span class="wu">实际需支付：</span>
                          <input type="text" name="currency" v-model.lazy="currency">
                        </div>
                        <div>
                          <span class="shi">交易密码：</span>
                          <input type="text" name="payWord" v-model.lazy="payWord">
                        </div>
                        <div class="btn">
                            <div class="active_container" @click="upGradeAction">确认</div>
                        </div>
                    </section>
                  </div>
             </transition>
             <li @click="" class="info-data-link">
               <span class="info-data-left"><img src="../../hsimages/7.png" /></span>
               <span class="info-data-center">我的提币地址</span>
               <span class="info-data-right"><b>添加</b></span>
             </li>
           </ul>
       </section>
       <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
       <transition name="router-slid" mode="out-in">
           <router-view></router-view>
       </transition>
   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import alertTip from 'src/components/common/alertTip'
   import {isLogin,getLoginUserInfo} from 'src/config/env'

   export default {
     data(){
           return{
               showAlert: false,
               alertText: null,
               turnType:false,
               coinAddr:"",
               count:"",
               fee:"",
               currency:"",
               payWord:"",


               id:"A085DEB2E34941B046CDA5107DB24BFD",
               uid:100000,
               loginName:"test01",
               phone:"",
               userName:null,
               nickName:"test01",
               sex:1,
               headImgUrl:"",
               createTime:1503493225000,
               remark:null,
               grade:0,
               cardGrade:0,
               releaseTime:null,
               equityAmt:0,
               payAmt:0,
               tradeAmt:0,
               insuranceAmt:0,
               maxProfits:0,
               sumProfits:0,
               cashOutProfits:0,
               contactUserId:"0.0000",
               activeCodeNo:0,
               registerCodeNo:0,
               remainTaskNo:0,
               forzenPayAmt:0,
               forzenTradeAmt:0,
               forzenEquityAmt:0,
               inPayAddress:'',
               inTradeAddress:'',
               inEquityAddress:'',
               outPayAddress:'',
               outEquityAddress:'',
               outTradeAddress:''
           }
       },
       mounted(){
         this.isLogin("/login");
         this.initData();
       },
      mixins: [isLogin,getLoginUserInfo],
       components: {
           headTop,
           alertTip,
       },
       computed: {

       },
       methods: {
         async upGradeAction(){
             this.showAlert = true;
             this.alertText = '手机号码不正确';
             return
         },
         initData(){
            console.log(this.getLoginUserInfo("token"));
            console.log(this.getLoginUserInfo("id"));
            console.log(this.getLoginUserInfo("nickName"));

            this.id=this.getLoginUserInfo("id");
            this.phone=this.getLoginUserInfo("phone");
            this.uid=this.getLoginUserInfo("uid");
            this.loginName=this.getLoginUserInfo("loginName");
            this.userName=this.getLoginUserInfo("userName");
            this.nickName=this.getLoginUserInfo("nickName");
            this.sex=this.getLoginUserInfo("sex");
            this.headImgUrl=this.getLoginUserInfo("headImgUrl");
            this.createTime=this.getLoginUserInfo("createTime");
            this.remark=this.getLoginUserInfo("remark");
            this.grade=this.getLoginUserInfo("grade");
            this.cardGrade=this.getLoginUserInfo("cardGrade");
            this.releaseTime=this.getLoginUserInfo("releaseTime");
            this.equityAmt=this.getLoginUserInfo("equityAmt");
            this.payAmt=this.getLoginUserInfo("payAmt")
            this.tradeAmt=this.getLoginUserInfo("tradeAmt");
            this.insuranceAmt=this.getLoginUserInfo("insuranceAmt");
            this.maxProfits=this.getLoginUserInfo("maxProfits");
            this.sumProfits=this.getLoginUserInfo("sumProfits");
            this.cashOutProfits=this.getLoginUserInfo("cashOutProfits");
            this.contactUserId=this.getLoginUserInfo("contactUserId");
            this.activeCodeNo=this.getLoginUserInfo("activeCodeNo");
            this.registerCodeNo=this.getLoginUserInfo("registerCodeNo");
            this.remainTaskNo=this.getLoginUserInfo("remainTaskNo");
            this.forzenPayAmt=this.getLoginUserInfo("forzenPayAmt");
            this.forzenTradeAmt=this.getLoginUserInfo("forzenTradeAmt");
            this.forzenEquityAmt=this.getLoginUserInfo("forzenEquityAmt");
            this.inPayAddress=this.getLoginUserInfo("inPayAddress");
            this.inTradeAddress=this.getLoginUserInfo("inTradeAddress");
            this.inEquityAddress=this.getLoginUserInfo("inEquityAddress");
            this.outPayAddress=this.getLoginUserInfo("outPayAddress");
            this.outEquityAddress=this.getLoginUserInfo("outEquityAddress");
            this.outTradeAddress=this.getLoginUserInfo("outTradeAddress");
             // if (this.userInfo && this.userInfo.user_id) {
             //     this.tradeAmt = this.userInfo.avatar;
             //     this.username = '理财大神';
             //     this.mobile = this.userInfo.mobile || 'HS10000';
             //     this.balance = this.userInfo.balance;
             //     this.count = this.userInfo.gift_amount;
             //     this.pointNumber = this.userInfo.point;
             // }else{
             //     this.username = '登录/注册';
             //     this.mobile = '13680334542';
             // }
         },
       }
   }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';

   .page{
       padding-top: 1.95rem;
       p, span{
           font-family: Helvetica Neue,Tahoma,Arial;
       }
   }

   .topPanel{
     background: $blue;
     width: 100%;
     height: 7rem;
     .activateDiv{
       color: darkgrey;
       padding-left:5%;
       font-size: 0.65rem;
     }
     .activateCode{
        width: 100%;
        padding-left:10%;
        font-size: 0.65rem;
        color: #ccc;
        b{
          font-size: 3rem;
          color: white;
        }
     }
     .explain{
       width:100%;
       color: darkgrey;
       font-size: 0.65rem;
       padding-left:5%;
     }
   }

   .router-slid-enter-active, .router-slid-leave-active {
       transition: all .4s;
   }
   .router-slid-enter, .router-slid-leave-active {
       transform: translate3d(2rem, 0, 0);
       opacity: 0;
   }

   .change_login{
       position: absolute;
       @include ct;
       right: 0.75rem;
       @include sc(.7rem, #fff);
       b{
         color:white;
       }
   }

   .showImg{
     transform: rotate(90deg);
   }
   .closeImg{
     transform: rotate(270deg);
   }

   .info-data{
     .info-data-link{
        border-bottom: 0.1rem solid #eee;
        width: 100%;
        padding: 0.75rem;
        .info-data-left img{
          width: 1rem;
        }
        .info-data-right{
          text-align: right;
          position: absolute;
          right:5%;
          display: inline-block;
          img{
              width: 1rem;
          }
          b{
            font-size: 16px;
            color: blue;
          }
        }
        .info-data-center{
          font-size:16px;
          font-family:"微软雅黑",Courier New, Courier, monospace;
        }
     }
   }

   .transfer_div{
     width: 100%;
     background-color:#F5F5F5;
     span{
       font-size: 18px;
       font-family: "黑体", Verdana, Arial, Helvetica, sans-serif;
     }
     .div1{
       padding-top: 3%;
     }
     .btn{
       padding-bottom:1%;
     }
     .shi{
       margin-left:12%;
     }
     .wu{
        margin-left:7%;
     }
     input{
         @include sc(0.85rem, #666);
         border:1px solid #dedede;
         width:9rem;
         height:1.45rem;
         font-size: 16px;
         text-align: center;
         margin-bottom:5px;
     }
   }

   .active_container{
       margin: 0.35rem 5rem;
       @include sc(.5rem, #fff);
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
</style>
