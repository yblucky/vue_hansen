<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="升级记录" go-back='true'></head-top>
       <ul>
          <li class="page">
              <div class="page-record">
                <span class="">2017-08-15</span>
                <div  class="page-record-bottom">
                  <span>2017-08-15</span>
                  <img src="../../images/rightLogo.png"/>
                  <span>343434</span>
                </div>
              </div>
              <div>原点升级</div>
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
      div{
        float: left;
      }
      div:nth-of-type(1){
          width: 75%;
      }
      div:nth-of-type(2){
          width: 25%;
          height: 100%;
          text-align: center;
          line-height: 3rem;
      }
      .page-record{
        padding: 0.5rem 0.5rem;
        width: 100%;
      }
      .page-record-bottom{
        float: none;
      }
      img{
        width: 1.5rem;
      }
   }
</style>
