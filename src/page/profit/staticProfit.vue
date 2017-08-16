<template>
   <div class="staticContainer">
       <head-top head-title="静态收益" go-back='true'></head-top>
       <ul>
          <li class="page" v-for="item in staticRecordList">
              <span class="">2017-08-15</span>
              <div class="">+100</div>
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
              staticRecordList:[1,2,3,4,5,6,7,8,9],
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
   .staticContainer{
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
      height: 2rem;
      span{
        padding:0 1rem;
        height: 100%;
        line-height: 2rem;
        color: darkgrey;
      }
      div{
        float: right;
        height: 100%;
        text-align: center;
        padding:0 0.75rem;
        line-height: 2rem;
        color: green;
      }
   }
</style>
