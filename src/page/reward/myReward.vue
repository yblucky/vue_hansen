<template>
    <div class="upGradeContainer">
        <head-top :head-title="'任务奖励红包'" goBack="true"></head-top>
        <section class="show-data">
          <div v-for="item in pushRecordList">
            <div class="showLine">
              <span class="showDate">2017-08-12</span>
              <span class="showAmount">￥999</span>
            </div>
            <ul>
               <li class="page">
                   <span class=""><img  src="../../images/add_address.png"/>交易币<b>1JYB 约1000元</b></span>
                   <div class="">+100</div>
               </li>
              <li class="page">
                  <span class=""><img  src="../../images/add_address.png"/>购物币<b>1GWB 约1000元</b></span>
                  <div class="">+100</div>
              </li>
             <li class="page">
                 <span class=""><img  src="../../images/add_address.png"/>股权币<b>1GQB 约1000元</b></span>
                 <div class="">+100</div>
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
       .showLine{
         width: 100%;
         .showDate{
           font-family: Helvetica Neue,Tahoma,Arial;
           font-size: 0.65rem;
           font-weight: normal;
           color: darkgrey;
           padding: 0 0.25rem;
         }
         .showAmount{
           width: 100%;
           padding: 0 0 0 8.5rem;
         }
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
           b{
            padding:0.35rem;
            font-size:0.35rem;
           }
           img{
             width: 1rem;
             text-align: center;
             vertical-align: middle;
           }
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
