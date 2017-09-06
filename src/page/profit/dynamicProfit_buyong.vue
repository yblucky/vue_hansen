<template>
    <div class="upGradeContainer">
        <head-top :head-title="'动态收益'" goBack="true"></head-top>
        <section class="category_title">
            <span :class="{choosed: active === 1}" @click="active = 1">推荐奖</span>
            <span :class="{choosed: active === 2}" @click="active = 2">管理奖</span>
            <span :class="{choosed: active === 3}" @click="active = 3">级差奖</span>
        </section>
        <section class="show-data" v-if="active === 1">
          <div v-for="item in pushRecordList">
            <span class="showDate">2017-08-12</span>
            <ul>
               <li class="page">
                   <span class="">一级管理奖励</span>
                   <div class="">+100</div>
               </li>
              <li class="page">
                  <span class="">二级管理奖励</span>
                  <div class="">+100</div>
              </li>
            </ul>
          </div>
        </section>
        <section class="show-data" v-else-if="active === 2">
          <div v-for="item in manageRecordList">
            <span class="showDate">2017-08-12</span>
            <ul>
               <li class="page">
                   <span class="">一星奖金</span>
                   <div class="">+100</div>
               </li>
              <li class="page">
                  <span class="">二星奖金</span>
                  <div class="">+100</div>
              </li>
            </ul>
          </div>
        </section>
        <section class="push-data" v-else="active === 2">
          <div v-for="item in diffRecordList">
            <ul>
               <li class="page">
                   <div class="page-left">
                     <span class="">一级推荐奖金</span>
                     <div  class="page-record-bottom">
                       推荐会员HS100注册激活奖金
                     </div>
                   </div>
                   <div class="page-right">
                     <span class="">2017-08-15</span>
                     <div  class="">
                       +100
                     </div>
                   </div>
               </li>
            </ul>
          </div>
        </section>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import footGuide from 'src/components/footer/footGuide'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                active: 1, //切换tab查看不同的记录
                manageRecordList:[1,2,3],//管理奖记录
                pushRecordList:[1,2,3],//管理奖记录
                diffRecordList:[1,2,3],//管理奖记录

            }
        },
        created(){
        },
        components: {
            headTop,
            alertTip,
            footGuide,
        },
        computed: {
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1\d{10}$/gi.test(this.phoneNumber)
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            toggleTabs (index,tabText) {
                 this.active = index;
             },
             selCard (index) {
                  this.selCardType = index;
              },
            closeTip(){
                this.showAlert = false;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .category_title{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 2rem;
        background-color: #fff;
        border-bottom: 0.1rem solid #eee;
        span{
            text-align: center;
            @include sc(.65rem, #333);
            padding-bottom: .2rem;
            border-bottom: 0.1rem solid #fff;
        }
        .choosed{
            border-bottom-color: $blue;
            color: $blue;
        }
    }
    .show-data{
       background-color: #eee;
       .showDate{
         font-family: Helvetica Neue,Tahoma,Arial;
         font-size: 0.65rem;
         font-weight: normal;;
         color: darkgrey;
         padding: 0 0.25rem;
       }
       ul{
         background-color: white;
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
           font-weight: bold;
           line-height: 2rem;
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
    }

    .push-data{
      .page{
         border-bottom: 0.1rem solid #eee;
         font-family: Helvetica Neue,Tahoma,Arial;
         font-size: 0.65rem;
         font-weight: normal;;
         background-color: white;
         width: 100%;
         height: 3rem;
         .page-left,.page-right{
           float: left;
         }
         .page-left{
             width: 70%;
             padding:0.35rem 1rem;
             span{
               font-weight: bold;
             }
         }
         .page-right{
             width: 30%;
             height: 100%;
             text-align: right;
             padding:0.35rem 0.65rem;
             span{
               color:darkgrey;
             }
             div{
               color: green;
               padding: 0.25rem 0rem;
             }
         }
         .page-record-bottom{
           float: none;
           width: 100%;
           font-size: 0.55rem;
           padding: 0.25rem 0rem;
           color:darkgrey;
         }
      }

    }

    .change_login{
        position: absolute;
        @include ct;
        right: 0.75rem;
        @include sc(.7rem, #fff);
    }
    .upGradeContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .active_container{
        margin: 0 .5rem 1rem;
        @include sc(.7rem, #fff);
        background-color: #3b95e9;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
    .change_to_text{
        background-color: #4cd964;
    }
</style>
