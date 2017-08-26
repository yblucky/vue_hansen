<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="消息中心" go-back='true'>
           <div slot="changeLogin" class="jumpRecord">
             <router-link to="/setMessage" >反馈</router-link>
           </div>
       </head-top>
       <ul>
          <li class="page" v-for="item in msgList">
              <div class="page-record">
                  <div class="imgdiv">
                    <img src="../../hsimages/6.png"  class="privateImage"/>
                  </div>
                  <div class="rightContent">
                      <div class="top">
                          <span class="spanLeft">{{item.title}}</span>
                          <span class="spanRight">{{item.createTime | formatDate}}</span>
                      </div>
                      <div class="bottom">
                          {{item.detail}}
                      </div>
                  </div>
              </div>
          </li>
       </ul>
       <!-- <foot-guide></foot-guide> -->
   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import {mapState, mapMutations} from 'vuex'
  //  import footGuide from 'src/components/footer/footGuide'
   import {formatDate, proapi, imgBaseUrl,token,setToken} from 'src/config/env'
   import {feedbacklist} from '../../service/getData'

   export default {
     data(){
           return{
             msgList:[],
           }
       },
       created(){
         this.getfeedbacklist();
       },
       components: {
           headTop,
          //  footGuide,
       },
       methods: {
        //获取会员升级记录
        async getfeedbacklist () {
             //从后台获取记录
             let res = await feedbacklist(1,100);
             this.msgList = res.result.rows;
         },
       },
       filters:{
         formatDate(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy年MM月dd日');
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
   .jumpRecord{
       position: absolute;
       @include ct;
       right: 0.75rem;
       @include sc(.7rem, #fff);
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
        width: 100%;
        padding: 0.5rem 0.5rem;
      }
      .imgdiv{
        float: left;
        width: 20%;
      }
      .rightContent{
          font-size: 0.55rem;
          float: left;
          width:80%;
          display: block;
          div,span{
            color: black;
          }
          .top{
            width: 100%;
            .spanRight{
              padding: 0 0 0 4rem;
            }
          }
          .bottom{
            width: 100%;
            height: 1.5rem;
            word-wrap:break-word;
            overflow:hidden;
          }
      }
      img{
        width: 2rem;
      }
   }
</style>
