<template>
   <div class="upGradeRecordContainer" >
       <head-top head-title="财务中心" go-back='true'></head-top>
       <section class="topPanel">
            <div class="div1">总资产：{{financialInfo.sumRmbAmt}}RMB</div>
            <div class="div2">
                <span>交易币：{{financialInfo.tradeAmt}}JYB</span>
                <span style="margin-left:14%;">资产约：{{financialInfo.tradeRmbAmt}}RMB</span>
            </div>
            <div class="div2">
                <span>购物币：{{financialInfo.payAmt}}GWB</span>
                <span style="margin-left:12%;">资产约：{{financialInfo.payRmbAmt}}RMB</span>
            </div>
            <div class="div3">
                <span>瀚森股权：{{financialInfo.equityAmt}}HSS</span>
                <span style="margin-left:13%;">资产约：{{financialInfo.equityRmbAmt}}RMB</span>
            </div>
            <div class="div4">
                <span>待释放奖金：{{financialInfo.waitReleaseRmbAmt}}RMB</span>
            </div>
       </section>

       <!-- <section class="topPanel1">
            <table width="300" height="150" text-align="center">
                <tr>
                    <td width="25%"></td>
                    <td width="50%" style="font-size:18px;color:red;">收入</td>
                    <td width="25%" style="font-size:18px;color:green;">支出</td>
                </tr>
                <tr>
                    <td>交易币</td>
                    <td>{{financialInfo.tradeSumOutAmt}}</td>
                    <td>{{financialInfo.tradeSumInAmt}}</td>
                </tr>
                <tr>
                    <td>购物币</td>
                    <td>{{financialInfo.paySumOutAmt}}</td>
                    <td>{{financialInfo.paySumInAmt}}</td>
                </tr>
                <tr>
                    <td>翰森股权</td>
                    <td>{{financialInfo.equitySumOutAmt}}</td>
                    <td>{{financialInfo.equitySumInAmt}}</td>
                </tr>
            </table>
       </section> -->

       <section class="topPanel2">
            <div class="div1">奖金总金额：{{financialInfo.rewardSumAmt}}</div>
            <div class="div2">
                <span>静态奖：{{financialInfo.rewardStaticAmt}}</span>
                <span style="margin-left:25%;">推荐奖：{{financialInfo.rewardPushAmt}}</span>
            </div>
            <div class="div2">
                <span>管理奖：{{financialInfo.rewardManageAmt}}</span>
                <span style="margin-left:25%;">极差奖：{{financialInfo.rewardDifferAmt}}</span>
            </div>
            <div class="div4">
                <span style="margin-left:2%;">待释放：{{financialInfo.waitReleaseRmbAmt}}</span>
                <span style="margin-left:5%;">已释放：{{financialInfo.hasReleaseRmbAmt}}</span>
                <span style="margin-left:5%;">已冻结：{{financialInfo.frozenRmbAmt}}</span>
            </div>
       </section>

       <section class="coverpart" v-if="showLoading">
           <section class="cover-background"></section>
           <section class="cover-content">
               <loading></loading>
           </section>
       </section>
   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import alertTip from 'src/components/common/alertTip'
   import {mapState, mapMutations} from 'vuex'
   import {isLogin,formatDate} from 'src/config/env'
   import {codeTransfer,codeTransferList,getUser,financialInfo} from '../../service/getData'
   import payPwd from 'src/components/common/payPwd'
   import loading from 'src/components/common/loading'

   export default {
     data(){
           return{
              pageNo:1,
              pageSize:30,
              showAlert: false,
              alertText: null,
              showLoading:false,
              financialInfo:{
                // 人民币对交易币汇率
                tradeRate:0,
                //人民币对股权币汇率
                equityRate:0,
               //人民币对支付币汇率
                payRate:0,

               //总资产
                sumRmbAmt:0,
               //支付币数量
                payAmt:0,
               //股权币数量
                equityAmt:0,
               //交易币数量
                tradeAmt:0,
               //股权币数量人民币市值
                equityRmbAmt:0,
               //支付币数量人民币市值
                payRmbAmt:0,
               //交易币数量人民币市值
                tradeRmbAmt:0,
               //待释放奖金
                waitReleaseRmbAmt:0,


               //币总支出
               //支付币数量
                paySumOutAmt:0,
               //股权币数量
                equitySumOutAmt:0,
               //交易币数量
                tradeSumOutAmt:0,

               //币总收入
               //支付币数量
                paySumInAmt:0,
               //股权币数量
                equitySumInAmt:0,
               //交易币数量
                tradeSumInAmt:0,

               //奖金总额
                rewardSumAmt:0,
               //静态奖
                rewardStaticAmt:0,
               //推荐奖
                rewardPushAmt:0,
               //管理奖
                rewardManageAmt:0,
               //级差奖
                rewardDifferAmt:0,
               //已释放
                hasReleaseRmbAmt:0,
               //冻结
                frozenRmbAmt:0
              }
           }
       },
       mixins: [isLogin],
       components: {
           headTop,
           alertTip,
           payPwd,
           loading
       },
       mounted(){
         this.isLogin("/login");
         this.initData();
       },
       filters:{
         formatDate(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy-MM-dd');
         }
       },
       methods :{
         formatDateTime(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy-MM-dd');
         },
         closeTip(){
             this.showAlert = false;
             if(localStorage.getItem("token") == null){
               this.isLogin("/login");
             }else {
               //刷新页面
               location.reload();
             }
         },
        async initData(){
            this.showLoading = true;
            let reUser = await financialInfo();
            if(reUser.code == 200){
                this.showLoading = false;
                this.financialInfo = reUser.result;
            }else {
              this.showLoading = false;
              this.showAlert = true;
              this.alertText = reUser.msg;
              if(reUser.code==0 || reUser.code==-1){
                localStorage.clear();
              }
              return;
            }
         },
       }
   }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
   .upGradeRecordContainer{
       background-color:white;
       padding-top: 1.95rem;
       p, span, input{
           font-family: Helvetica Neue,Tahoma,Arial;
       }
   }

   .topPanel{
     font-size:14px;
     margin-top: 5%;
     background: $fc;
     width: 100%;
     height: 9rem;
     border-bottom:1px solid #B6C0C0;
     .div1{
        text-align: center;
        margin-bottom:2%;
        font-weight:700;
        font-size: 18px;
     }
     .div2{
        margin-top:5%;
        margin-left:11%;
     }
     .div3{
        margin-top:5%;
        margin-left:7%;
     }
     .div4{
        margin-top:5%;
        margin-left:4%;
     }
   }

   .topPanel1{
     font-size:14px;
     margin-top: 3%;
     padding-left:3%;
     background: $fc;
     width: 100%;
     height: 7.5rem;
     border-bottom:1px solid #B6C0C0;
     table{
       border-collapse: collapse;
       tr{
         text-align: center;
       }
     }

   }

   .topPanel2{
     font-size:14px;
     margin-top: 5%;
     background: $fc;
     width: 100%;
     height: 7.5rem;
     .div1{
        text-align: center;
        margin-bottom:3%;
        font-weight:500;
        font-size: 18px;
     }
     .div2{
        margin-top:5%;
        margin-left:8%;
     }
     .div3{
        margin-top:5%;
        margin-left:4%;
     }
     .div4{
        margin-top:5%;
        margin-left:4%;
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

</style>
