<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="转账记录" go-back='true'></head-top>
       <ul>
          <li class="page"  v-for="item in coinList">
            <div class="left_div">
                <img v-if="item.orderType == 1 || item.orderType == 10 " src="../../../hsimages/39.png"  class="vip"/>
                <img v-if="item.orderType  == 4 || item.orderType == 11" src="../../../hsimages/40.png"  class="vip"/>
                <img v-if="item.orderType  == 8 || item.orderType == 12" src="../../../hsimages/41.png"  class="vip"/>
            </div>
            <div class="middle_div">
                <p class="p1">
                    <h4 v-if="item.amount>0" style="font-weight:400;color:red;">+{{item.amount}}</h4>
                    <h4 v-else style="font-weight:400;color:green;">{{item.amount}}</h4>
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
       <div v-if="coinList == null || coinList == ''">
           <nullData></nullData>
       </div>
       <!-- <foot-guide></foot-guide> -->
   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import {mapState, mapMutations} from 'vuex'
   import footGuide from 'src/components/footer/footGuide'
   import {isLogin,getLoginUserInfo,formatDate} from 'src/config/env'
   import {coinInnerTransferList} from '../../../service/getData'
   import nullData from 'src/components/common/nullData'

   export default {
     data(){
           return{
                coinType:0,
                id:"",
                uid:0,
                coinList:[],
                pageNo:1,
                pageSize:30,
                orderType:[1,4,8,10,11,12]
           }
       },
       components: {
           headTop,
           nullData,
           footGuide,
       },
       mounted(){
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
             let res = await coinInnerTransferList(this.pageNo, this.pageSize,this.orderType);
             if (res.code==200) {
                this.coinList=res.result.rows;
                // console.log(" 交易币交易记录   "+JSON.stringify(this.coinList));
                // for (var i = 0; i < this.coinList.length; i++) {
                //   if (this.coinList[i].sendUserId==this.id) {
                //       // this.coinList[i].amountStr="+"+this.coinList[i].amount;
                //   }else if (this.coinList[i].receviceUserId==this.id) {
                //       // this.coinList[i].amountStr="-"+this.coinList[i].amount;
                //   }
                // }
               this.showAlert = true;
               this.alertText = res.msg;
             }else {
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
         }
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
        margin-left:5%;
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
        margin-top:1%;
        margin-left: 55%;
        @include wh(55%,25%);
        .p1{
            /*margin-top: 35%;*/
        }
      }
   }
</style>
