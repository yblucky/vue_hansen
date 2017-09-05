<template>
   <div class="staticContainer">
       <head-top head-title="任务列表" go-back='true'></head-top>
       <div class="count_shuju">
          <span>累计次数：<b class="b1">{{compelteTaskCount}}</b> 次</span>
          <span>奖励：<b class="b2">{{parseInt(signCount).toFixed(2)}}</b></span>
       </div>
       <ul>
          <li class="page" v-for="item in staticRecordList">
                <div v-if="item.linkImgPath == null" class="left_div">
                    <img src="../../hsimages/32.png" class="vip" />
                </div>
                <div v-else class="left_div">
                    <img src="item.linkImgPath" class="vip" />
                </div>
                <div class="middle_div">
                    <p class="p1">
                        <h4 style="font-weight:bold">{{item.title}}</h4>
                    </p>
                    <p class="p2">
                        <h6>{{item.assignTaskTime | formatDate}}</h6>
                    </p>
                </div>
                <div class="right_div">
                    <div v-if="item.status == 1" class="login_container" @click="doTask(item.id,item.taskId)">做任务领取奖励</div>
                    <div v-if="item.status == 2" class="complent_container">已完成</div>
                </div>
          </li>
       </ul>

       <!-- 显示激活页面 -->
       <section class="coverpart_active" v-if="show_task">
           <section class="cover-background"></section>
           <section class="cover-content">
             <div class="close">
                <img src="../../hsimages/close1.png" @click="closeActive" />
             </div>
             <div class="middle">
                 <!-- <p style="padding-left:7%;"><span style="font-size:10px;">购物币地址：{{inPayAddress}}</span></p>
                 <p style="padding-left:7%;padding-top:2%;"><span style="font-size:10px;">交易币地址：{{inTradeAddress}}</span></p>
                 <p style="padding-left:7%;padding-top:2%;"><span style="font-size:10px;">需充值购物币数量：<b>{{parseFloat(needBuyPayAmt).toFixed(2)}}</b><b style="padding-left:5%;">1GWC</b><b style="padding-left:5%;">约{{parseFloat(payConverRmbScale).toFixed(2)}}元</b></span></p>
                 <p style="padding-left:7%;padding-top:2%;"><b style="font-size:15px;font-weight:bold;">购物币余额：{{parseFloat(payAmt).toFixed(2)}}</b></p>
                 <p style="padding-left:7%;padding-top:2%;"><span style="font-size:10px;">需充值交易币数量：<b>{{parseFloat(needBuyTradeAmt).toFixed(2)}}</b><b style="padding-left:5%;">1JYC</b><b style="padding-left:5%;">约{{parseFloat(tradeConverRmbScale).toFixed(2)}}元</b></span></p>
                 <p style="padding-left:7%;padding-top:2%;"><b style="font-size:15px;font-weight:bold;">交易币余额：{{parseFloat(tradeAmt).toFixed(2)}}</b></p> -->
             </div>
             <div class="active_container" @click="closeActive">前往任务</div>
           </section>
           <span class="close" @click="closeActive">×</span>
       </section>

       <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
       <div v-if="staticRecordList == null || staticRecordList == ''">
          <nullData></nullData>
       </div>
       <!-- <foot-guide></foot-guide> -->
   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import {mapState, mapMutations} from 'vuex'
   import {isLogin,formatDate} from 'src/config/env'
   import {getTaskInfo,doTask} from '../../service/getData'
   import nullData from 'src/components/common/nullData'
   import alertTip from 'src/components/common/alertTip'
  //  import footGuide from 'src/components/footer/footGuide'

   export default {
     data(){
           return{
              staticRecordList:[],    //任务列表
              // show:0,
              taskId:'',
              showAlert: false, //显示提示组件
              alertText: null, //提示的内容
              compelteTaskCount:0,  //完成任务数量
              signCount:0,        //领取任务奖励
              show_task:true,      //显示任务页面窗
              title:"",   //任务标题
           }
       },
       created(){
         this.getTaskInfo();
       },
       mixins: [isLogin],
       components: {
           headTop,
           nullData,
           alertTip,
          //  footGuide,
       },
       methods: {
        //获取会员升级记录
        async getTaskInfo () {
             //从后台获取记录
             let res = await getTaskInfo(1,100);
             if(res.code==200){
               this.staticRecordList = res.result.rows;
               this.compelteTaskCount = res.result.extend.compelteTaskCount;
               this.signCount = res.result.extend.signCount;
             }else {
               if (res.code==0 || res.code==-1) {
                  this.showAlert = true;
                  this.alertText = res.msg;
                  localStorage.clear();
               }
             }
         },
         async doTask (userTaskId,taskId) {
              // this.showAlert = true;
              // this.alertText = userTaskId,taskId;
              // return;
              //从后台获取记录
              let res = await doTask(userTaskId,taskId);
              if(res.code==200){
                  this.showAlert = true;
                  this.alertText = "领取成功";
              }else {
                this.showAlert = true;
                this.alertText = res.msg;
                if (res.code==0 || res.code==-1) {
                   localStorage.clear();
                }
              }
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
          //关闭任务弹窗
          closeActive(){
            this.show_task = false;
          },
       },
       filters:{
         formatDate(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy年MM月dd日');
         }
       },
      //  watch: {
      //      staticRecordList: function (value){
      //          this.getTaskInfo();
      //      }
      //  }
   }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
   .staticContainer{
       background-color: white;
       padding-top: 1.95rem;
       p, span, input{
           font-family: Helvetica Neue,Tahoma,Arial;
       }
   }
   .count_shuju{
     margin-top:5%;
     width: 100%;
     height: 1.8rem;
     font-size: 0.75rem;
     border-bottom: 0.1rem solid #eee;
     span{
        padding-left: 8%;
        .b1{
            display:inline-block;
            @include sc(0.6rem,red);
            font-weight:700;
            line-height:0.5rem;
            font-family: Helvetica Neue,Tahoma;
        }
        .b2{
            display:inline-block;
            @include sc(0.6rem,#f90);
            font-weight:700;
            line-height:0.5rem;
            font-family: Helvetica Neue,Tahoma;
        }
     }
   }
   .page{
      border-bottom: 0.1rem solid #eee;
      font-size: 0.75rem;
      width: 100%;
      height: 3rem;
      .left_div{
        float: left;
        margin-left:3%;
        margin-top: 3%;
        text-align: center;
        @include wh(15%,15%);
        .vip{
           width:2rem;
           algin:center;
        }
      }
      .middle_div{
        float: left;
        @include wh(35%,35%);
        margin-left:3%;
        margin-top: 3%;
        .p2{
            margin-top: 5%;
        }
      }
      .right_div{
        clear: both;
        float: right;
        @include wh(40%,40%);
        margin-right:1%;
        .login_container{
            margin-top: -12%;
            margin-left: 15%;
            width:80%;
            @include sc(.6rem, #fff);
            background-color: #3b95e9;
            border: 1px;
            padding: .3rem 0;
            border-radius: 0.3rem;
            text-align: center;
        }
        .complent_container{
            margin-top: -13%;
            margin-left: 15%;
            width:80%;
            @include sc(.6rem, #fff);
            background-color:#C7C7C7;
            border: 1px;
            padding: .3rem 0;
            border-radius: 0.3rem;
            text-align: center;
        }
      }
   }

   .coverpart_active{
       top:0%; /**遮罩全屏top,left都为0,width,height为100%**/
       left:0%;
       height: auto;
       @include wh(100%,100%);
       @include allcover;
       .cover-background{
           height: auto;
           @include wh(100%,100%);
           @include allcover;
           position:fixed;
           background:#000;
           z-index:100;
           opacity:.2;
       }
       .cover-content{
           width:94%;
           background:$fc;
           padding-top:3%;
           padding-bottom:5%;
           position:fixed;
           top:20%;
           left:3%;
           z-index:1000;
           @include borderRadius(5px);

           .close{
             position: absolute;
             top:-2%;
             left:90%;
             z-index:1000;
             img{
               width: 1.5rem;
             }
           }

           .active_container{
               margin-top: 7%;
               margin-left: 29%;
               margin-bottom: 3%;
               width:40%;
               @include sc(.7rem, #fff);
               background-color: #3b95e9;
               padding: .5rem 0;
               border: 1px;
               border-radius: 0.3rem;
               text-align: center;
           }

       }
   }

   body .coverpart_active .cover-animate{
       transition:all 1s;
       animation:bounceIn .6s;
   }
   body .coverpart_active .cover-animate-leave{
       animation:zoomOut .4s;
   }
</style>
