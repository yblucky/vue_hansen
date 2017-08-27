<template>
 <div class="page">
       <head-top head-title="交易币钱包" go-back='true'>
         <div slot="changeLogin" class="change_login">
           <router-link to="/trade/tradeDetail" ><b>明细</b></router-link>
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
             <li @click="turnType=!turnType,isShowOutTradeAddress=false" class="info-data-link">
               <span class="info-data-left"><img src="../../hsimages/3.png" /></span>
               <span class="info-data-center">交易币提取</span>
               <span class="info-data-right"><img src="../../hsimages/44.png" v-bind:class="{'showImg': turnType, 'closeImg' : !turnType  }"/></span>
             </li>
             <transition name="router-fade">
                  <div class="transfer_div">
                    <section v-if="turnType == true" class="transfer">
                      <div class="div1">
                        <span class="shi">提币地址</span>
                        <!-- <input type="hidden" name="outTradeAddress" v-model.lazy="outTradeAddress"> -->
                      </div>
                        <div class="div2">
                          <span class="address">{{outTradeAddress}}</span>
                          <!-- <input type="hidden" name="outTradeAddress" v-model.lazy="outTradeAddress"> -->
                        </div>
                        <div>
                          <span class="shi">提币数量：</span>
                          <input type="text" name="coinOutAmt" v-model.lazy="coinOutAmt" @change="calcAmount">
                        </div>
                        <div>
                          <span class="wu">提币手续费：</span>
                          <input type="text" name="tradeCoinOutScale" v-model.lazy="tradeCoinOutScale">
                        </div>
                        <div>
                          <span class="wu">实际需支付：</span>
                          <input type="text" name="amount" v-model.lazy="amount">
                        </div>
                        <div>
                          <span class="shi">交易密码：</span>
                          <input type="text" name="payPassWord" v-model.lazy="payPassWord">
                        </div>
                        <div class="btn">
                            <div class="active_container" @click="coninOut">确认</div>
                        </div>
                    </section>
                  </div>
             </transition>
           </ul>
       </section>
       <div class="transfer_div">
         <section class="info-data">
               <li @click="" class="info-data-link">
                 <span class="info-data-left"><img src="../../hsimages/7.png" /></span>
                 <span class="info-data-center">我的提币地址</span>
                 <span class="info-data-right" @click="addOutAddressAction"><b>添加</b></span>
               </li>
             </ul>
         </section>
         <section v-if="isShowOutTradeAddress" class=" ">
             <input type="text"class="addAddress" name="addOutTradeAddress" v-model.lazy="addOutTradeAddress">
             <div class="btn">
                 <div class="active_container" @click="updateUserInfoAction">保存</div>
             </div>
         </section>
      </div>
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
   import {cointOut,updateUserInfoOutAddress} from '../../service/getData'

   export default {
     data(){
           return{
               showAlert: false,
               alertText: null,
               turnType:false,
               outTradeAddress:"",
               tradeAmt:0,
               coinOutAmt:110,//需要提币支付个数
               amount:0,//实际支付个数
               tradeCoinOutScale:0,
               payPassWord:"",
               walletOrderType:2, //交易币提币 2
               loginName:"test01",
               phone:"",
               userName:null,
               nickName:"test01",
               sex:1,
               headImgUrl:"",
               grade:0,
               cardGrade:0,
               uid:0,
               addOutTradeAddress:"121",
               isShowOutTradeAddress:false
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
         addOutAddressAction(){
            this.isShowOutTradeAddress=!this.isShowOutTradeAddress;
         },
      async   updateUserInfoAction(){
            this.isShowOutTradeAddress=true;
            if (!this.addOutTradeAddress) {
              this.showAlert = true;
              this.alertText = '交易币提币地址不能为空';
              return;
            }
            if (this.addOutTradeAddress.length<28 || this.addOutTradeAddress.length>64) {
              this.showAlert = true;
              this.alertText = '不是有效的提币地址';
              return;
            }
             let res = await updateUserInfoOutAddress("", "",this.addOutTradeAddress);
             if (res.code==200) {
               this.showAlert = true;
               this.alertText = res.msg;
               this.isShowOutTradeAddress=!this.isShowOutTradeAddress;
             }else {
               this.showAlert = true;
               this.alertText = res.msg;
             }
         },
         calcAmount(){
           this.amount=parseFloat(this.coinOutAmt).toFixed(6)/(1-0.5);
         },
         async coninOut(){
             if (!this.outTradeAddress) {
               this.showAlert = true;
               this.alertText = '提币地址不能为空';
               return;
             }
             if (!this.amount) {
               this.showAlert = true;
               this.alertText = '提币地址数量不能为空';
               return;
             }
             if (!this.walletOrderType) {
               this.showAlert = true;
               this.alertText = '提币地址类型不能为空';
               return;
             }
             if (!this.payPassWord) {
               this.showAlert = true;
               this.alertText = '支付密码不能为空';
               return;
             }
             let res = await cointOut(this.outTradeAddress, parseFloat(this.amount) ,this.walletOrderType,this.payPassWord);
             if (res.code==200) {
               this.showAlert = true;
               this.alertText = res.msg;
             }else {
               this.showAlert = true;
               this.alertText = res.msg;
             }
         },
         initData(){
            this.phone=this.getLoginUserInfo("phone");
            this.uid=this.getLoginUserInfo("uid");
            this.loginName=this.getLoginUserInfo("loginName");
            this.userName=this.getLoginUserInfo("userName");
            this.nickName=this.getLoginUserInfo("nickName");
            this.sex=this.getLoginUserInfo("sex");
            this.headImgUrl=this.getLoginUserInfo("headImgUrl");
            this.grade=this.getLoginUserInfo("grade");
            this.cardGrade=this.getLoginUserInfo("cardGrade");
            this.outTradeAddress=this.getLoginUserInfo("outTradeAddress");
            this.amount=parseFloat(this.coinOutAmt).toFixed(6)/(1-0.5);
            this.tradeAmt=this.getLoginUserInfo("tradeAmt");

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
       padding-top:3%;
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
        background-color: white;
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
       padding-top: 2%;
       background-color: white;
       padding-bottom: -2%;
     }
     .div2{
       padding-top: 2%;
       background-color: white;
       margin-bottom: 14px;
       padding-bottom: 6%;
     }
     .btn{
       padding-bottom:1%;
     }
     .backcolor{
       background-color: white;
     }
     .address{
       margin-left:10.1%;
       font-size: 0.7em;
       background-color: white;
     }
     .shi{
       margin-left:10.1%;
       font-size: 11px;
     }
     .wu{
        margin-left:7%;
        font-size: 11px;
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
     .addAddress{
       width: 100%;
       margin-top: 3%;
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
