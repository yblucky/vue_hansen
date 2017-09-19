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
         <div class="explain">1TQT 约{{tradeConverRmbScale}}元</div>
       </section>
       <section class="info-data">
           <ul class="clear">
             <li class="info-data-link">
               <span class="info-data-left"><img src="../../hsimages/5.png" class="privateImage" /></span>
               <span class="info-data-center">充值交易币地址</span><div class="login_container" @click="fuzhi()">复制</div>
               <div class="info-data-center" style="margin-left:14%;padding-top:1%;"><input id="fuzhi" size="64" type="text" readonly="true" name="inTradeAddress" v-model.lazy="inTradeAddress"></div>
             </li>
             <li @click="turnType=!turnType,isShowOutTradeAddress=false" class="info-data-link">
               <span class="info-data-left"><img src="../../hsimages/3.png" class="privateImage" /></span>
               <span class="info-data-center">交易币提取</span>
               <span class="info-data-right"><img src="../../hsimages/44.png" v-bind:class="{'showImg': turnType, 'closeImg' : !turnType  }"/></span>
             </li>
             <transition name="router-fade">
                  <div class="transfer_div">
                    <section v-if="turnType == true" class="transfer">
                      <div class="div1">
                        <span class="shi">地址：<span class="address">{{outTradeAddress}}</span></span>
                        <!-- <input type="hidden" name="outTradeAddress" v-model.lazy="outTradeAddress"> -->
                      </div>
                        <div style="margin-top:3%;">
                          <span class="shi">提币数量：</span>
                          <input type="text" name="coinOutAmt" v-model.lazy="coinOutAmt" @change="calcAmount">
                          <span style="font-size:10px;color:red;">提币手续费：{{tradeCoinOutScale}}</span>
                        </div>
                        <!-- <div>
                          <span class="wu">提币手续费：</span>
                          <input type="text" name="tradeCoinOutScale" v-model.lazy="tradeCoinOutScale">
                        </div> -->
                        <div>
                          <span class="wu">实际到账：</span>
                          <input type="text" name="amount" readOnly="true" v-model.lazy="amount">
                        </div>
                        <div class="pay_display">
                          <span class="shi">交易密码：</span>
                          <input type="text" name="payPassWord" v-model.lazy="payPassWord">
                        </div>
                        <div class="btn">
                            <div class="active_container" @click="showPayPwd()">确认提币</div>
                        </div>
                    </section>
                  </div>
             </transition>
           </ul>
       </section>
       <div class="transfer_div">
         <section class="info-data">
               <li @click="" class="info-data-link">
                 <span class="info-data-left"><img src="../../hsimages/7.png" class="privateImage" /></span>
                 <span class="info-data-center">我的提币地址</span>
                 <span class="info-data-right" @click="addOutAddressAction" style="margin-top:2%;">
                   <b v-if="outTradeAddress == null || outTradeAddress == ''">添加</b>
                   <b v-else>修改</b>
                 </span>
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
       <payPwd @pwdCompleted="coninOut($event)" v-if="showPwd" :showHide="showPwd" @closePwd='closePwd'></payPwd>
       <transition name="router-slid" mode="out-in">
           <router-view></router-view>
       </transition>
   </div>

</template>

<script>
   import headTop from 'src/components/header/head'
   import alertTip from 'src/components/common/alertTip'
   import {isLogin,getLoginUserInfo} from 'src/config/env'
   import payPwd from 'src/components/common/payPwd'
   import {cointOut,updateUserInfoOutAddress,getUser} from '../../service/getData'

   export default {
     data(){
           return{
               showAlert: false,
               alertText: null,
               turnType:false,
               inTradeAddress:"",
               outTradeAddress:"",
               tradeAmt:0,
               coinOutAmt:0,//需要提币支付个数
               amount:0,//实际支付个数
               tradeCoinOutScale:0,
               payPassWord:"",
               walletOrderType:2, //交易币提币 2
               loginName:"",
               phone:"",
               userName:null,
               nickName:"",
               sex:1,
               headImgUrl:"",
               grade:0,
               cardGrade:0,
               uid:0,
               addOutTradeAddress:"",
               isShowOutTradeAddress:false,
               showPwd:false,
               tradeConverRmbScale:0,
               tradeCoinOutScale:0,
           }
       },
       created(){
           this.isLogin("/login");
           //初始化信息
           this.initData();
       },
       mounted(){
         this.isLogin("/login");
         this.initData();
       },
      mixins: [isLogin,getLoginUserInfo],
       components: {
           headTop,
           alertTip,
           payPwd
       },
       computed: {

       },
       methods: {
           fuzhi(){
             var url = document.getElementById('fuzhi');
             url.select(); // 选取input元素的内容
             var succeeded;
             try {
                 // 将选区内容复制到剪贴板
                 succeeded = document.execCommand("copy");
               } catch (e) {
                 succeeded = false;
               }
               if (succeeded) {
                 // 复制成功
                 this.showAlert = true;
                 this.alertText = "复制成功";
               } else {
                 // 复制失败
                 this.showAlert = true;
                 this.alertText = "复制失败";
               }
           },
         addOutAddressAction(){
            this.isShowOutTradeAddress=!this.isShowOutTradeAddress;
            this.turnType=false;
         },
      async updateUserInfoAction(){
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
               this.outTradeAddress=this.addOutTradeAddress;
               this.turnType=false;
               //刷新页面
               location.reload();
             }else {
               this.showAlert = true;
               this.alertText = res.msg;
             }
         },
         calcAmount(){
            this.amount = this.coinOutAmt - (this.coinOutAmt * this.tradeCoinOutScale);
         },
         async coninOut(pwd){
             this.payPassWord=pwd;
             this.closePwd();
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
             let res = await cointOut(this.outTradeAddress, parseFloat(this.coinOutAmt) ,this.walletOrderType,this.payPassWord);
             if (res.code==200) {
               this.showAlert = true;
               this.alertText = res.msg;
               //刷新页面
               location.reload();
             }else {
               this.showAlert = true;
               this.alertText = res.msg;
               if (res.code==0 || res.code==-1) {
                  localStorage.clear();
               }
             }
         },
         async initData(){
           let res = await getUser();
           if(res.code == 200){
               this.tradeAmt=res.result.tradeAmt;
               this.inTradeAddress=res.result.inTradeAddress;
               this.outTradeAddress=res.result.outTradeAddress;
               this.tradeConverRmbScale=res.result.tradeConverRmbScale;
               this.tradeCoinOutScale = res.result.tradeCoinOutScale;
           }else {
             this.showAlert = true;
             this.alertText = res.msg;
             if(res.code==0 || res.code==-1){
               localStorage.clear();
             }
           }
         },
         closePwd(){
             this.showPwd = false;
         },
         showPayPwd(){
           this.turnType = false;
           this.showPwd=true;
         }
       }
   }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';

   .page{
       padding-top: 1.95rem;
       overflow-x:hidden;
       p, span{
           font-family: Helvetica Neue,Tahoma,Arial;
       }
   }

   .topPanel{
     background: $blue;
     width: 100%;
     height: 7rem;
     .activateDiv{
       color: Silver;
       padding-top:3%;
       margin-left:5%;
       font-size: 0.65rem;
     }
     .activateCode{
        width: 100%;
        text-align: center;
        font-size: 0.65rem;
        color: #ccc;
        b{
          font-size: 3rem;
          color: white;
        }
     }
     .explain{
       width:100%;
       color: Silver;
       font-size: 0.65rem;
       margin-left:5%;
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
       right: 0.65rem;
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
        padding: 0.35rem;
        background-color: white;
        .info-data-left{
           margin-left: 3%;
            .privateImage{
              display:inline-block;
              width: 1.5rem;
              vertical-align:middle;
            }
         }
        .info-data-right{
          text-align: right;
          position: absolute;
          right:5%;
          margin-top: 2%;
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
          font-weight: 500;
          font-family:"微软雅黑",Courier New, Courier, monospace;
        }

        .login_container{
            display:inline-block;
            vertical-align:middle;
            margin-left: 22%;
            width:20%;
            @include sc(.3rem, #fff);
            background-color: #3b95e9;
            padding: .3rem 0;
            border: 1px;
            border-radius: 1rem;
            text-align: center;
        }
     }
   }

   .transfer_div{
     width: 100%;
     background-color:#F5F5F5;
     span{
       font-size: 15px;
       font-family: "黑体", Verdana, Arial, Helvetica, sans-serif;
     }
     .div1{
       padding-top: 1%;
       background-color: white;
       padding-bottom: 3%;
     }
     .div2{
       background-color: white;
       margin-bottom: 14px;
       padding-bottom: 3%;
     }
     .btn{
       padding-bottom:1%;
     }
     .backcolor{
       background-color: white;
     }
     .address{
       /*margin-left:15%;*/
       font-size: 0.55rem;
       background-color: white;
     }
     .shi{
       margin-left:15%;
       font-size: 15px;
     }
     .wu{
        margin-left:15%;
        font-size: 15px;
     }
     .pay_display{
        display: none;
      }
     input{
         @include sc(0.85rem, #666);
         border:1px solid #dedede;
         width:5rem;
         height:1.45rem;
         font-size: 16px;
         text-align: center;
         margin-bottom:5px;
     }
     .addAddress{
       width: 100%;
       margin-top: 3%;
       font-size: 0.6em;
     }
   }

   .active_container{
       margin: 0.35rem 5rem;
       width: 43%;
       margin-top: 4%;
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
</style>
