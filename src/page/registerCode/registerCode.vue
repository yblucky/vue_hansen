<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="我的注册码" go-back='true'></head-top>
       <section class="topPanel">
          <div class="activateDiv">注册码剩余</div>
          <div class="activateCode"><b>10</b>个</div>
       </section>
       <section class="info-data">
           <ul class="clear">
               <li @click="turnCode=!turnCode,turnRecord=false" class="info-data-link">
                 <span class="info-data-left"><img src="../../hsimages/31.png" /></span>
                 <span class="info-data-center">转让注册码</span>
                 <span class="info-data-right"><img src="../../hsimages/44.png" v-bind:class="{'showImg': turnCode, 'closeImg' : !turnCode  }"/></span>
               </li>
               <transition name="router-fade">
                    <div class="transfer_div">
                      <section v-if="turnCode == true" class="transfer">
                          <div class="div1">
                            <span>会员账户：</span>
                            <input type="text" name="toUid" v-model.lazy="toUid">
                          </div>
                          <div>
                            <span>转让数量：</span>
                            <input type="text" name="transferNo" v-model.lazy="transferNo">
                          </div>
                          <div>
                            <span>交易密码：</span>
                            <input type="text" name="payword" v-model.lazy="payword">
                          </div>
                          <div class="btn">
                              <div class="active_container" @click="codeTransferAction">确认</div>
                          </div>
                      </section>
                    </div>
               </transition>

               <li @click="turnRecord=!turnRecord,turnCode=false" class="info-data-link">
                 <span class="info-data-left"><img src="../../hsimages/32.png" /></span>
                 <span class="info-data-center">转让/使用记录</span>
                 <span class="info-data-right"><img src="../../hsimages/44.png" v-bind:class="{'showImg': turnRecord, 'closeImg' : !turnRecord }"/></span>
               </li>
               <transition name="router-fade">
                   <section v-if="turnRecord == true" class="show-data">
                     <div v-for="item in activeCodeList">
                       <span class="showDate">2017-08-12</span>
                       <ul>
                          <li class="page">
                              <span class="">激活账户HS10000</span>
                              <div class="">-3</div>
                          </li>
                         <li class="page">
                             <span class="">会员HS10001转让注册码</span>
                             <div class="">+3</div>
                         </li>
                       </ul>
                     </div>
                   </section>
               </transition>
           </ul>
       </section>
   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import alertTip from 'src/components/common/alertTip'
   import {mapState, mapMutations} from 'vuex'
   import {localapi, proapi, imgBaseUrl,isLogin,getLoginUserInfo} from 'src/config/env'
   import {codeTransfer} from '../../service/getData'

   export default {
     data(){
           return{
             showAlert: false, //显示提示组件
             alertText: null, //提示的内容
             turnCode:false,
             turnRecord:false,
             toUid:"",
             transferNo:0,
             payword:"",
             activeCodeList:[1,2,3],//转让记录
             codeType:2,//注册码
             activeCodeNo:0
           }
       },
       mixins: [isLogin,getLoginUserInfo],
       components: {
           headTop,
           alertTip,
       },
       methods :{
         async codeTransferAction(){
             if (!this.toUid) {
               this.showAlert = true;
               this.alertText = '收款账号不能为空';
             }
             if (!this.transferNo) {
               this.showAlert = true;
               this.alertText = '注册码数量不能为空';
             }
             if (!this.payword) {
               console.log(this.payword);
               this.showAlert = true;
               this.alertText = '支付密码不能为空';
             }

             let res = await codeTransfer(this.toUid, parseInt(this.transferNo) ,this.codeType,this.payword);

             console.log(res);
             if (res.code==200) {
               this.showAlert = true;
               this.alertText = res.msg;
             }else {
               this.showAlert = true;
               this.alertText = res.msg;
             }
         },
         closeTip(){
             this.showAlert = false;
         },
         initData(){
            this.activeCodeNo=this.getLoginUserInfo("activeCodeNo");
            this.registerCodeNo=this.getLoginUserInfo("registerCodeNo");
         },
       }
   }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
   .topPanel{
     background: $blue;
     width: 100%;
     height: 7rem;
     .activateDiv{
       color: darkgrey;
       padding: 0.5rem;
       font-size: 0.65rem;
     }
     .activateCode{
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 0.65rem;
        color: #ccc;
        b{
          font-size: 3rem;
          color: white;
        }
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
        padding: 1rem;
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
        }
        .info-data-center{
          font-size:16px;
          font-family:"微软雅黑",Courier New, Courier, monospace;
        }
     }
   }

   .upGradeRecordContainer{
       background-color:white;
       padding-top: 1.95rem;
       p, span, input{
           font-family: Helvetica Neue,Tahoma,Arial;
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

   .transfer{

   }

   .transfer_div{
     width: 100%;
     background-color:#F5F5F5;
     text-align: center;
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

   .show-data{
      background-color: #eee;
      .showDate{
        font-family: Helvetica Neue,Tahoma,Arial;
        font-size: 0.65rem;
        font-weight: normal;
        color: darkgrey;
        padding: 0 0.55rem;
      }
      ul{
        background-color: white;
      }
     .page{
        border-bottom: 0.1rem solid #eee;
        font-family: Helvetica Neue,Tahoma,Arial;
        font-size: 0.75rem;
        font-weight: normal;;
        width: 100%;
        height: 2rem;
        span{
          padding:0 1rem;
          height: 100%;
          font-weight: bold;
          line-height: 2rem;
        }
        div{
          float: right;
          height: 100%;
          text-align: center;
          padding:0 0.75rem;
          line-height: 2rem;
          color: green;
        }
     }
   }


</style>
