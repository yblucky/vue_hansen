<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="升级记录" go-back='true'></head-top>
       <ul>
          <li class="page" v-for="item in upgradeRecordList">
              <div class="page-record">
                <span class="">{{item.createTime | formatDate}}</span>
                <div  class="page-record-bottom">
                  <span>{{item.historyGradeName}}</span>
                  <img src="../../images/rightLogo.png"/>
                  <span>{{item.currencyGradeName}}</span>
                </div>
              </div>
              <div>{{item.upGradeTypeName}}</div>
          </li>
       </ul>
       <foot-guide></foot-guide>
   </div>
</template>

<script>

    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import footGuide from 'src/components/footer/footGuide'
    import {localapi, proapi, imgBaseUrl,formatDate} from 'src/config/env'
    import {upGradeRecord,findUserCardGrade} from '../../service/getData'
    import {mapState, mapMutations} from 'vuex'


   export default {
     data(){
           return{
              upgradeRecordList:[],//升级记录
           }
       },
       created(){
         this.getUpGradeRecord();
       },
       components: {
           headTop,
           footGuide,
       },
       methods: {
        //获取会员升级记录
        async getUpGradeRecord () {
             //从后台获取记录
             let res = await upGradeRecord(1,100);
             this.upgradeRecordList = res.result.rows;
         },
       },
       filters:{
         formatDate(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy-MM-dd');
         }
       }
   }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
   .upGradeRecordContainer{
       background-color:white;
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
