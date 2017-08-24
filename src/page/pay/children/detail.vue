<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="购物币明细" go-back='true'></head-top>
       <ul>
          <li class="page">
              <div class="page-record">
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

          <li class="page">
              <div class="page-record">
                  <div class="pdiv">
                      <p>
                          <span>
                              NO.4832798274
                          </span>
                      </p>
                      <p>
                          <span>
                              待审核
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
       <foot-guide></foot-guide>
   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import {mapState, mapMutations} from 'vuex'
   import footGuide from 'src/components/footer/footGuide'

   export default {
     data(){
           return{
                coinType:0,
           }
       },
       components: {
           headTop,
           footGuide,
       },
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
      .pdiv{
        float: left;
        margin-left:2%;
      }
      .rightdiv{
        float: right;
        margin-right:2%;
      }

      img{
        width: 2rem;
      }
   }
</style>
