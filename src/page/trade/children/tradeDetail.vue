<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="交易币明细" go-back='true'></head-top>
       <ul>
          <!-- <li class="page">
              <div class="page-record">
                  <div class="coindiv">
                      充币
                  </div>
                  <div class="pdiv">
                      <p>
                          <span>
                              NO.4832798274
                          </span>
                      </p>
                      <p>
                          <span>
                              已完成
                          </span>
                      </p>
                  </div>

                  <div class="rightdiv">
                      <p>
                          <span>
                              2017-08-08
                          </span>
                      </p>
                      <p>
                          <span class="icon-mobile-number1">
                            +550.0 | -500
                          </span>
                      </p>
                  </div>
              </div>
          </li> -->

          <li class="page" v-for="item in  coinList">
              <div class="page-record">
                  <div class="coindiv">
                      提币
                  </div>
                  <div class="pdiv">
                      <p>
                          <span>
                            NO.4832798274
                          </span>
                      </p>
                      <p>
                          <span>
                              已完成
                          </span>
                      </p>
                  </div>

                  <div class="rightdiv">
                      <p>
                          <span>
                              2017-08-08
                          </span>
                      </p>
                      <p>
                          <span class="icon-mobile-number1">
                            +550.0 | -500
                          </span>
                      </p>
                  </div>
              </div>
          </li>
       </ul>
   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import alertTip from 'src/components/common/alertTip'
   import {mapState, mapMutations} from 'vuex'
   import {isLogin,getLoginUserInfo} from 'src/config/env'
   import {coinOuterTransferList} from '../../../service/getData'

   export default {
     data(){
           return{
                showAlert: false,
                alertText: null,
                nickName:"test01",
                headImgUrl:"",
                uid:0,
                coinType:0,
                coinList:[],
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
       methods: {
         async coinOuterTransferListAction(){
             let res = await coinOuterTransferList(this.pageNo, this.pageSize,this.orderType);

             if (res.code==200) {
               this.coinList=res.result.rows;
                console.log(" 交易币交易记录   "+JSON.stringify(this.coinList));
               this.showAlert = true;
               this.alertText = res.msg;
               this.coinList=res.result;
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
      .coindiv{
        float: left;
        margin-left:1%;
        margin-top: 3%;
      }
      .pdiv{
        float: left;
        margin-left:2%;
      }
      .rightdiv{
        float: right;
        margin-right:3%;
      }

      img{
        width: 2rem;
      }
   }
</style>
