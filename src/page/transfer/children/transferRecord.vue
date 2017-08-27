<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="转账记录" go-back='true'></head-top>
       <ul>
          <li class="page"  v-for="item in coinList">
              <div class="page-record">
                  <div class="imgdiv">
                    <img v-if="item.orderType == 1" src="../../../hsimages/39.png"  class="privateImage"/>
                    <img v-if="item.orderType  == 4" src="../../../hsimages/40.png"  class="privateImage"/>
                    <img v-if="item.orderType  == 8" src="../../../hsimages/41.png"  class="privateImage"/>
                  </div>
                  <div class="pdiv">
                      <p>
                          <span class="icon-mobile-number">
                              {{uid}}
                          </span>
                      </p>
                      <p>
                          <span class="icon-mobile-number" v-if="item.orderType == 1"> 交易币 </span>
                          <span class="icon-mobile-number" v-if="item.orderType == 4"> 支付币 </span>
                          <span class="icon-mobile-number" v-if="item.orderType == 8"> 股权币 </span>
                      </p>
                  </div>

                  <div class="rightdiv">
                      <p>
                          <span class="icon-mobile-number">
                               {{item.createTime | formatDate}}

                          </span>
                      </p>
                      <p>
                          <span class="icon-mobile-number1">
                             {{item.amountStr  }}
                          </span>
                      </p>
                  </div>
              </div>
          </li>
          <!-- <li class="page">
              <div class="page-record">
                <div class="imgdiv">
                  <img v-if="coinType === 0" src="../../../hsimages/39.png"  class="privateImage"/>
                  <img v-if="coinType === 1" src="../../../hsimages/40.png"  class="privateImage"/>
                  <img v-if="coinType === 2" src="../../../hsimages/41.png"  class="privateImage"/>
                </div>
                  <div class="pdiv">
                      <p>
                          <span class="icon-mobile-number">
                              HS12000
                          </span>
                      </p>
                      <p>
                          <span class="icon-mobile-number">
                              购物币
                          </span>
                      </p>
                  </div>

                  <div class="rightdiv">
                      <p>
                          <span class="icon-mobile-number">
                              2017-08-08
                          </span>
                      </p>
                      <p>
                          <span class="icon-mobile-number1">
                              -500
                          </span>
                      </p>
                  </div>
              </div>
          </li> -->
       </ul>
       <foot-guide></foot-guide>
   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import {mapState, mapMutations} from 'vuex'
   import footGuide from 'src/components/footer/footGuide'
   import {isLogin,getLoginUserInfo,formatDate} from 'src/config/env'
   import {coinInnerTransferList} from '../../../service/getData'

   export default {
     data(){
           return{
                coinType:0,
                id:"",
                uid:0,
                coinList:[],
                pageNo:1,
                pageSize:30,
                orderType:[1,4,8]
           }
       },
       components: {
           headTop,
           footGuide,
       },
       mounted(){
         this.isLogin("/login");
         this.coinInnerTransferListAction();
         this.initData();
       },
       mixins: [isLogin,getLoginUserInfo],
       filters:{
         formatDate(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy-MM-dd');
         }
       },
       methods: {
         async coinInnerTransferListAction(){
             let res = await coinInnerTransferList(this.pageNo, this.pageSize,this.orderType);
             if (res.code==200) {
                this.coinList=res.result.rows;
                console.log(" 交易币交易记录   "+JSON.stringify(this.coinList));
                for (var i = 0; i < this.coinList.length; i++) {
                  if (this.coinList[i].sendUserId==this.id) {
                      this.coinList[i].amountStr="+"+this.coinList[i].amount;
                  }else if (this.coinList[i].receviceUserId==this.id) {
                      this.coinList[i].amountStr="-"+this.coinList[i].amount;
                  }
                }
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
      font-family: Helvetica Neue,Tahoma,Arial;
      font-size: 0.75rem;
      font-weight: normal;;
      width: 100%;
      height: 3rem;
      div,span,li{
        color: darkgrey;
      }
      .page-record{
        padding: 0.5rem 0.5rem;
      }
      .imgdiv{
        float: left;
      }
      .pdiv{
        float: left;
        margin-left:4%;
      }
      .rightdiv{
        float: right;
        margin-right:2%;
        .icon-mobile-number1{
          margin-left:60%;
        }
      }

      img{
        width: 2rem;
      }
   }
</style>
