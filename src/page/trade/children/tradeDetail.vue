<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="交易币明细" go-back='true'></head-top>
       <ul>
          <li class="page" v-for="item in coinList">
                <div class="left_div">
                    <img src="../../../hsimages/39.png"  class="vip"/>
                </div>
                <!-- <div class="middle_div">
                    <p class="p1">
                        <h4 style="font-weight:bold">提币</h4>
                    </p>

                </div> -->
                <div class="middle_div">
                    <p class="p1">
                        <h4 v-if="item.amount>0" style="font-weight:400;color:red;">{{item.amount}}</h4>
                        <h4 v-else style="font-weight:400;color:green;">{{item.amount}}</h4>
                    </p>
                </div>
                <div class="middle_div1">
                    <p class="p3">
                        <h5>{{item.message}}</h5>
                    </p>
                </div>
                <div class="middle_div2">
                  <p class="p1">
                      <h5>{{item.createTime|formatDate}}</h5>
                  </p>
                </div>


          </li>
       </ul>
   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import alertTip from 'src/components/common/alertTip'
   import {mapState, mapMutations} from 'vuex'
   import {isLogin,getLoginUserInfo,formatDate} from 'src/config/env'
   import {coinOuterTransferList} from '../../../service/getData'

   export default {
     data(){
           return{
                showAlert: false,
                alertText: null,
                nickName:"",
                headImgUrl:"",
                uid:0,
                coinType:0,
                coinList:null,
                pageNo:1,
                pageSize:30,
                orderType:[2,3]
           }
       },
       components: {
           headTop,
           alertTip,
       },
       mounted(){
         this.isLogin("/login");
         this.coinOuterTransferListAction();
       },
      mixins: [isLogin,getLoginUserInfo],
       components: {
           headTop,
           alertTip,
       },
       computed: {

       },
       filters:{
         formatDate(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy-MM-dd');
         }
       },
       methods: {
         async coinOuterTransferListAction(){
             let res = await coinOuterTransferList(this.pageNo, this.pageSize,this.orderType);
             if (res.code==200) {
               if (res.result.rows.length>0) {
                  this.coinList=res.result.rows;
               }
             }else {
               this.showAlert = true;
               this.alertText = res.msg;
               if (res.code==0 || res.code==-1) {
                  localStorage.clear();
               }
             }
         },
         initData(){
            this.uid=this.getLoginUserInfo("uid");
            this.nickName=this.getLoginUserInfo("nickName");
            this.headImgUrl=this.getLoginUserInfo("headImgUrl");
         },
       }
   }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
   .upGradeRecordContainer{
       /*padding-top: 1.95rem;
       p, span, input{
           font-family: Helvetica Neue,Tahoma,Arial;
       }*/
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding-top: 1.95rem;
        z-index: 203;
        background-color: #fff;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
   }

   .page{
      border-bottom: 0.1rem solid #eee;
      font-size: 0.75rem;
      width: 100%;
      height: 2.3rem;
      .left_div{
        float: left;
        margin-left:3%;
        margin-right:5%;
        margin-top: 3%;
        text-align: center;
        @include wh(10%,10%);
        .vip{
           width:1.5rem;
           algin:center;
        }
      }
      .middle_div{
        float: left;
        @include wh(10%,10%);
        text-align: center;
        margin-left:4%;
        .p1{
            margin-top: 40%;
            /*margin-left:10%;*/
        }
      }
      .middle_div1{
        float: left;
        margin-left: 20%;
        @include wh(15%,10%);
        .p3{
            margin-top: 35%;
        }
      }

      .middle_div2{
        float: left;
        margin-top:1%;
        margin-left: 75%;
        @include wh(25%,25%);
        .p1{
            /*margin-top: 35%;*/
        }
      }

   }
</style>
