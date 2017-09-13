<template>
   <div class="rating_page">
       <head-top head-title="数字资产钱包" go-back='true'>
          <div slot="changeLogin" class="change_login">
            <router-link to="/transfer">转账汇款</router-link>
          </div>
       </head-top>
       <section class="profile-info">
             <section class="info-data">
                 <ul class="clear">
                     <router-link to="/trade" tag="li" class="info-data-link">
                         <img src="../../hsimages/11.png" class="vip22" />
                         <span class="info-data-bottom">交易币</span>
                         <span class="info-data-middle">当前价格：1JYB 约{{parseFloat(tradeConverRmbScale).toFixed(4)}}RMB<b>资产：{{parseFloat(tradeRmb).toFixed(4)}}RMB</b></span>
                         <span class="info-data-bottom1">{{parseFloat(tradeAmt).toFixed(4)}}</span>
                     </router-link>
                 </ul>
             </section>

             <section class="info-data">
                 <ul class="clear">
                     <router-link to="/pay" tag="li" class="info-data-link">
                         <img src="../../hsimages/10.png" class="vip22" />
                         <span class="info-data-bottom">购物币</span>
                         <span class="info-data-middle">当前价格：1GWB 约{{parseFloat(payConverRmbScale).toFixed(4)}}RMB<b>资产：{{parseFloat(payRmb).toFixed(4)}}RMB</b></span>
                         <span class="info-data-bottom1">{{parseFloat(payAmt).toFixed(4)}}</span>
                     </router-link>
                 </ul>
             </section>

             <section class="info-data">
                 <ul class="clear">
                     <router-link to="" tag="li" class="info-data-link">
                         <img src="../../hsimages/12.png" class="vip22" />
                         <span class="info-data-bottom">股权币</span>
                         <span class="info-data-middle">当前价格：1HSS 约{{parseFloat(equityConverRmbScale).toFixed(4)}}RMB<b>资产：{{parseFloat(equityRmb).toFixed(4)}}RMB</b></span>
                         <span class="info-data-bottom1">{{parseFloat(equityAmt).toFixed(4)}}</span>
                     </router-link>
                 </ul>
             </section>

       </section>
       <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
      <loading v-show="showLoading"></loading>
   </div>
</template>

<script>
   import {mapMutations, mapState} from 'vuex'
   import headTop from 'src/components/header/head'
   import {getUser} from 'src/service/getData'
   import alertTip from 'src/components/common/alertTip'
   import {getImgPath} from 'src/components/common/mixin'
   import {isLogin,getLoginUserInfo,updateLocalUser} from 'src/config/env'
   import {removeStore} from 'src/config/mUtils'
   import {updateUserInfo} from '../../service/getData'
   import loading from 'src/components/common/loading'
   export default {
       data(){
           return{
               showAlert: false,
               alertText: null,
               isUpimg:false,//是否更新头像
               showLoading: false, //显示加载动画

               equityAmt:0,
               payAmt:0,
               tradeAmt:0,
               tradeConverRmbScale:0,    //交易币兑换人民币汇率
               payConverRmbScale:0,      //支付币兑换人民币汇率
               equityConverRmbScale:1,      //支付币兑换人民币汇率

               tradeRmb:0,          //交易币兑换人民币资产
               payRmb:0,            //购物币兑换人民币资产
               equityRmb:0,         //股权币兑换人民币资产
           }
       },
       created(){
         this.isLogin("/login");
         this.initData();
       },
       mounted(){
       },
       mixins: [isLogin,getLoginUserInfo],
       components: {
           headTop,
           alertTip,
           loading,
       },
       computed:{
           ...mapState([
               'userInfo', 'imgPath'
           ]),
       },
       methods: {
           ...mapMutations([
               'OUT_LOGIN', 'SAVE_AVANDER'
           ]),
           async initData(){
               let res = await getUser();
               if(res.code == 200){
                 this.equityAmt=res.result.equityAmt;
                 this.payAmt=res.result.payAmt;
                 this.tradeAmt=res.result.tradeAmt;
                 this.tradeConverRmbScale=res.result.tradeConverRmbScale;
                 this.payConverRmbScale=res.result.payConverRmbScale;
                 this.tradeRmb=(res.result.tradeConverRmbScale * res.result.tradeAmt);
                 this.payRmb=(res.result.payConverRmbScale * res.result.payAmt);
                 this.equityRmb = res.result.equityAmt;
               }else {
                 this.showAlert = true;
                 this.alertText = res.msg;
                 if(res.code==0 || res.code==-1){
                   localStorage.clear();
                 }
               }
           },
           closeTip(){
               this.showAlert = false;
               if(this.isUpimg){
                 this.$router.push("/profile");
               }
           },
       },
       watch: {
           // userInfo: function (value) {
           //     if (value && value.user_id) {
           //         this.username = value.username;
           //         this.infotel = value.mobile;
           //         this.avatar = value.avatar;
           //     }
           // }
       }
   }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin.scss';

   .rating_page{
       position: absolute;
       width:96%;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       background-color: #f2f2f2;
       z-index: 202;
       padding-top: 1.95rem;
       p, span{
           font-family: Helvetica Neue,Tahoma,Arial;
       }
   }
   .change_login{
       position: absolute;
       @include ct;
       right: 0.75rem;
       @include sc(.7rem, #fff);
   }
   .profile-info{
       @include wh(100%,3.1rem);
       .headportrait{
           margin-top:.8rem;
           /*padding:.5rem .4rem;*/
           @include fj(space-between);
           border-top:1px solid #ddd;
           background:#fff;
       }
   }
   .info-data{
        width:100%;
        background:$fc;
        box-sizing: border-box;
        border-top:1px solid #f1f1f1;
        ul{
            .info-data-link{
                float:left;
                width:100%;
                display:inline-block;
                span{
                    display:block;
                    width:100%;
                    text-align:center;
                }
                .vip22{
                  margin-top:4.85%;
                  margin-left: 37%;
                  vertical-align:bottom;
                  width:4rem;
                }
                .info-data-top{
                    @include sc(.55rem,#333);
                    padding-top:.453333rem;
                    b{
                        display:inline-block;
                        @include sc(1rem,#f90);
                        font-weight:700;
                        line-height:1rem;
                        font-family: Helvetica Neue,Tahoma;
                    }
                }
                .info-data-middle{
                    @include sc(0.55rem,#333);
                    padding-top:.453333rem;
                    text-align: left;
                    margin-left:4%;
                    b{
                        display:inline-block;
                        @include sc(0.55rem,#666);
                        font-weight:500;
                        line-height:0.5rem;
                        font-family: Helvetica Neue,Tahoma;
                        margin-left:9%;
                    }
                }
                .info-data-bottom{
                    @include sc(.67333rem,#666);
                    padding-top: .253333rem;
                    font-weight:700;
                }
                .info-data-bottom1{
                    @include sc(1rem,#f90);
                    padding-top:0.15rem;
                    padding-bottom: .353333rem;
                    font-weight:700;
                }

            }
        }
   }
</style>
