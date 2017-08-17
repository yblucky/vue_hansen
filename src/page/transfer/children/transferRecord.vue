<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="升级记录" go-back='true'></head-top>
       <ul>
          <li class="page">
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
          </li>
          <li class="page">
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
       padding-top: 1.95rem;
       p, span, input{
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
