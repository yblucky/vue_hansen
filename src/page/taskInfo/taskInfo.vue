<template>
   <div class="staticContainer">
       <head-top head-title="任务列表" go-back='true'></head-top>
       <div class="count_shuju">
          <span>累计次数：<b class="b1">100</b> 次</span>
          <span>奖励：<b class="b2">100.00</b></span>
       </div>
       <ul>
          <li class="page" v-for="item in staticRecordList">
                <div class="left_div">
                    <img src="../../hsimages/32.png" class="vip" />
                </div>
                <div class="middle_div">
                    <p class="p1">
                        <h4>V店下载任务</h4>
                    </p>
                    <p class="p2">
                        <h6>2017年8月27日</h6>
                    </p>
                </div>
                <div class="right_div">
                    <div v-if="show == 1" class="login_container">做任务领取奖励</div>
                    <div v-if="show == 0" class="complent_container">已完成</div>
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

   export default {
     data(){
           return{
              staticRecordList:[1,2,3,4,5,6,7,8,9],
              show:0,
           }
       },
       components: {
           headTop,
          //  footGuide,
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
   .count_shuju{
     margin-top:5%;
     width: 100%;
     height: 1.8rem;
     font-size: 0.75rem;
     border-bottom: 0.1rem solid #eee;
     span{
        padding-left: 8%;
        .b1{
            display:inline-block;
            @include sc(1rem,red);
            font-weight:700;
            line-height:0.5rem;
            font-family: Helvetica Neue,Tahoma;
        }
        .b2{
            display:inline-block;
            @include sc(1rem,#f90);
            font-weight:700;
            line-height:0.5rem;
            font-family: Helvetica Neue,Tahoma;
        }
     }
   }
   .page{
      border-bottom: 0.1rem solid #eee;
      font-size: 0.75rem;
      width: 100%;
      height: 3rem;
      .left_div{
        float: left;
        margin-left:3%;
        margin-top: 4%;
        text-align: center;
        @include wh(15%,15%);

      }
      .middle_div{
        float: left;
        @include wh(35%,35%);
        margin-left:3%;
        margin-top: 4%;
        .p1{
          font-weight: bold;
        }
        .p2{
            margin-top: 5%;
        }
      }
      .right_div{
        clear: both;
        float: right;
        @include wh(40%,40%);
        margin-right:1%;
        .login_container{
            margin-top: -13%;
            margin-left: 15%;
            width:80%;
            @include sc(.6rem, #fff);
            background-color: #3b95e9;
            border: 1px;
            padding: .3rem 0;
            border-radius: 0.3rem;
            text-align: center;
        }
        .complent_container{
            margin-top: -13%;
            margin-left: 15%;
            width:80%;
            @include sc(.6rem, #fff);
            background-color:#C7C7C7;
            border: 1px;
            padding: .3rem 0;
            border-radius: 0.3rem;
            text-align: center;
        }
      }
   }
</style>
