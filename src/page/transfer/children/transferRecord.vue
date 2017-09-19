<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="转账记录" go-back='true'></head-top>
       <ul>
          <li class="page"  v-for="item in coinList">
            <div class="left_div">
              <!-- <img v-if="item.orderType == 1 || item.orderType == 10" src="../../../hsimages/39.png"  class="vip"/>
              <img v-if="item.orderType  == 4 || item.orderType == 11" src="../../../hsimages/40.png"  class="vip"/>
              <img v-if="item.orderType  == 8 || item.orderType == 12" src="../../../hsimages/41.png"  class="vip"/>
               -->
                <!-- <img v-if="item.orderType == 1 || item.orderType == 10" src="../../static/img/10.png"  class="vip"/>
                <img v-if="item.orderType  == 4 || item.orderType == 11" src="../../../static/img/11.png"  class="vip"/>
                <img v-if="item.orderType  == 8 || item.orderType == 12" src="../../../static/img/12.png"  class="vip"/> -->

                <span v-if="item.sendUserId == id && (item.orderType==13 || item.orderType==14) && item.receviceUid==99999">激活</span>
                <span v-if="item.sendUserId == id && (item.orderType==15 || item.orderType==16)  && item.receviceUid==99999">升级</span>
                <span v-if="item.sendUserId == id && item.receviceUid!=99999">转出{{item.receviceUid}}</span>
                <span v-if="item.sendUserId == id && item.receviceUid==99999">转出</span>
                <span v-if="item.receviceUserId == id">{{item.receviceUid}}转入</span>
            </div>
            <div class="middle_div">
                <p class="p1">
                    <h4 v-if="item.sendUserId == id" style="font-weight:400;color:green;">{{item.amount}}</h4>
                    <h4 v-if="item.receviceUserId == id" style="font-weight:400;color:red;">{{-item.amount}}</h4>
                </p>
            </div>
            <!-- <div class="middle_div1">
                <p class="p3">
                    <h5>转账</h5>
                </p>
            </div> -->
            <div class="middle_div2">
              <p class="p1">
                  <h5>{{item.createTime|formatDate}}</h5>
              </p>
            </div>
          </li>
       </ul>

       <section class="coverpart" v-if="showLoading">
           <section class="cover-background"></section>
           <section class="cover-content">
               <loading></loading>
           </section>
       </section>

       <div v-if="coinList == null || coinList == ''">
           <nullData></nullData>
       </div>

       <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
       <!-- <foot-guide></foot-guide> -->
   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import alertTip from 'src/components/common/alertTip'
   import {mapState, mapMutations} from 'vuex'
   import {isLogin,getLoginUserInfo,formatDate} from 'src/config/env'
   import {coinInnerTransferList} from '../../../service/getData'
   import nullData from 'src/components/common/nullData'
   import loading from 'src/components/common/loading'

   export default {
     data(){
           return{
               showAlert: false,
               alertText: null,
               showLoading:false,
                coinType:0,
                id:"",
                uid:0,
                coinList:null,
                pageNo:1,
                pageSize:30,
                orderType:[1,4,8,10,11,12,13,14,15,16],
           }
       },
       components: {
           headTop,
           nullData,
           loading,
           alertTip,
       },
       created(){
         this.isLogin("/login");
         this.initData();
         this.coinInnerTransferListAction();
       },
       mixins: [isLogin,getLoginUserInfo],
       filters:{
         formatDate(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy-MM-dd hh:mm:ss');
         }
       },
       methods: {
         async coinInnerTransferListAction(){
             //请求接口前调用刷新
             this.showLoading = true;
             let res = await coinInnerTransferList(this.pageNo, this.pageSize,this.orderType);
             if (res.code==200) {
               //不管成功失败，都关闭刷新
               this.showLoading = false;
                if(res.result.rows != null || res.result.rows != ''){
                  this.coinList=res.result.rows;
                }
             }else {
               //不管成功失败，都关闭刷新
               this.showLoading = false;
               this.showAlert = true;
               this.alertText = res.msg;
               if (res.code==0 || res.code==-1) {
                  localStorage.clear();
               }
             }
         },
         initData(){
            this.id=this.getLoginUserInfo("id");
            this.uid=this.getLoginUserInfo("uid");
            this.nickName=this.getLoginUserInfo("nickName");
            this.headImgUrl=this.getLoginUserInfo("headImgUrl");
         },
         closeTip(){
           this.showAlert = false;
           if(localStorage.getItem("token") == null){
             this.isLogin("/login");
           }
         },
       }
   }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
   .upGradeRecordContainer{
       position: absolute;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       padding-top: 1.95rem;
       z-index: 203;
       background-color: white;
       p, span{
           font-family: Helvetica Neue,Tahoma,Arial;
       }
   }
   .page{
      border-bottom: 0.1rem solid #eee;
      font-size: 0.60rem;
      width: 100%;
      height: 2.3rem;
      .left_div{
        float: left;
        margin-left:1%;
        margin-right:1%;
        margin-top: 4%;
        text-align: center;
        font-family: cursive;
        @include wh(30%,10%);
        .vip{
           width:1.5rem;
           algin:center;
        }
      }
      .middle_div{
        float: left;
        @include wh(10%,10%);
        text-align: center;
        margin-left:5%;
        .p1{
            margin-top: 42%;
            /*margin-left:10%;*/
        }
      }
      .middle_div1{
        float: left;
        margin-left: 35%;
        @include wh(25%,10%);
        .p3{
            margin-top: 35%;
        }
      }

      .middle_div2{
        float: left;
        margin-top:-0.5%;
        margin-left: 55%;
        @include wh(55%,25%);
        .p1{
            /*margin-top: 35%;*/
        }
      }
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
