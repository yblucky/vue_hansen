<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="动态奖金收益" go-back='true'></head-top>
       <section class="topPanel">
          <div class="activateDiv">奖金总额</div>
          <div class="activateCode"><b>{{totalReward}}</b></div>
       </section>
       <section class="info-data">
           <ul>
              <li class="page" v-for="item in staticRecordList">
                   <div v-if="item.linkImgPath == null" class="left_div">
                       <img src="../../hsimages/52.png" class="vip" />
                   </div>
                   <div v-else class="left_div">
                       <img src="item.linkImgPath" />
                   </div>
                   <div class="middle_div">
                       <p class="p1">
                           <h4 style="font-weight:bold">{{item.rewardType}}</h4>
                       </p>
                       <p class="p2">
                           <h6>{{item.remark}}</h6>
                       </p>
                   </div>
                   <div class="right_div">
                       <p class="p3">
                           <b style="font-size:16px;">{{item.createTime | formatDate}}</b>
                       </p>
                       <p class="p4">
                            <b>{{item.amt}}</b>
                       </p>
                   </div>
                </li>
           </ul>
       </section>
       <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
       <div v-if="staticRecordList == null || staticRecordList == ''">
          <nullData></nullData>
       </div>
   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import alertTip from 'src/components/common/alertTip'
   import {mapState, mapMutations} from 'vuex'
   import {localapi, proapi, imgBaseUrl,isLogin,getLoginUserInfo,formatDate} from 'src/config/env'
   import {rewardInfo} from '../../service/getData'
   import nullData from 'src/components/common/nullData'

   export default {
     data(){
           return{
             pageNo:1,
             pageSize:30,
             showAlert: false, //显示提示组件
             alertText: null, //提示的内容
             totalReward:0,
             staticRecordList:[],
             tradeOrderType:"",
           }
       },
       mixins: [isLogin,getLoginUserInfo],
       components: {
           headTop,
           alertTip,
           nullData,
       },
       created(){
         this.initData();
       },
       mounted(){
         this.isLogin("/login");
       },
       filters:{
         formatDate(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy年MM月dd日');
         }
       },
       methods :{
         closeTip(){
             this.showAlert = false;
             if(localStorage.getItem("token") == null){
               this.isLogin("/login");
             }else {
               //刷新页面
               location.reload();
             }
         },
         //获取奖金列表信息
         async initData(){
           //获取用户信息接口
           let res = await rewardInfo(this.tradeOrderType);
           if(res.code == 200){
              this.totalReward = res.result.extend.totalReward;
              if(res.result.rows == null){
                this.showLoading = false;
                return
              }
              this.staticRecordList = res.result.rows;
           }else {
             this.showAlert = true;
             this.alertText = res.msg;
             if(res.code==0 || res.code==-1){
               localStorage.clear();
             }
           }
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
   .upGradeRecordContainer{
       background-color:white;
       padding-top: 1.95rem;
       p, span, input{
           font-family: Helvetica Neue,Tahoma,Arial;
       }
   }

   .page{
      border-bottom: 0.1rem solid #eee;
      font-size: 0.75rem;
      width: 100%;
      height: 3.2rem;
      .left_div{
        float: left;
        margin-left:1%;
        margin-top: 3%;
        text-align: center;
        @include wh(12%,12%);
        .vip{
           width:2.2rem;
           algin:center;
        }
      }
      .middle_div{
        float: left;
        @include wh(45%,45%);
        margin-left:3%;
        margin-top: 3%;
        .p2{
            margin-top: 2%;
        }
      }
      .right_div{
        float: left;
        @include wh(35%,35%);
        margin-top: 3%;
        margin-left:4%;
        .p4{
            margin-top: 6%;
            b{
              display:inline-block;
              @include sc(0.8rem,#FF8F59);
              font-weight:700;
              font-family: Helvetica Neue,Tahoma;
            }
        }
      }
   }

</style>
