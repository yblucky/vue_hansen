<template>
    <div class="restContainer">
        <head-top head-title="我的团队" goBack="true"></head-top>
        <section class="category_title">
            <span :class="{choosed: chooseType === 1}" @click="chooseType = 1">团队成员</span>
            <span :class="{choosed: chooseType === 2}" @click="chooseType = 2">部门业绩</span>
        </section>
        <transition name="router-fade">
            <section v-if="chooseType === 1">
              <section class="info-data">
                  <ul class="clear" v-for="(index, item) in teamList">
                      <li @click="getIndex(index)" class="info-data-link">
                        <span class="info-data-center">理财大神[HS10001]</span>
                        <span class="info-data-right"><img src="../../hsimages/44.png" v-bind:class="{'showImg': turnRecord, 'closeImg' : !turnRecord }"/></span>
                      </li>
                      <transition name="router-fade">
                          <section v-if="index === turnOn " class="member-data">
                            <div v-for="item in memberList">
                              <span class="showDate">理财大神[HS10001]</span>
                            </div>
                          </section>
                      </transition>
                  </ul>
              </section>
            </section>
        </transition>
        <transition name="router-fade">
            <section v-if="chooseType === 2" class="show-data">
              <div>
                <ul>
                   <li class="page">
                       <span class="">团队总业绩</span>
                       <div class="">9000</div>
                   </li>
                </ul>
              </div>
              <div v-for="(index,item) in gradeList">
                <ul>
                   <li class="page">
                       <span class="">第{{index}}部业绩</span>
                       <div class="">3000</div>
                   </li>
                </ul>
              </div>
            </section>
        </transition>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {mobileCode, checkExsis, sendMobile, getcaptchas, changePassword} from 'src/service/getData'

    export default {
        data(){
            return {
                chooseType:1,     //选择方式
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                turnRecord:false,   //打开
                turnOn:0,
                teamList:[1,2,3], //直代
                memberList:[1,2,3],//二代
                gradeList:[1,2,3],
            }
        },
        components: {
            headTop,
            alertTip,
        },
        created(){
        },
        methods: {
            closeTip(){
                this.showAlert = false;
            },
            getIndex:function($index){
              if(this.turnOn === $index){
                this.turnOn = 0;
                this.turnRecord = false;
              }else {
                this.turnOn=$index;
                this.turnRecord = true;
              }
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

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

    .restContainer{
        padding-top: 1.95rem;
    }

    .showImg{
      transform: rotate(90deg);
    }
    .closeImg{
      transform: rotate(270deg);
    }
    .info-data{
      .info-data-link{
         border-bottom: 0.1rem solid #eee;
         width: 100%;
         padding: 0.45rem;
         .info-data-right{
           text-align: right;
           position: absolute;
           right:5%;
           display: inline-block;
           img{
               width: 1rem;
           }
         }
         .info-data-center{
           font-size:16px;
           font-family:"微软雅黑",Courier New, Courier, monospace;
         }
      }
    }

    .show-data{
       background-color: #eee;
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
    .member-data{
      background-color: #eee;
      .showDate{
        font-family: Helvetica Neue,Tahoma,Arial;
        font-size: 0.7rem;
        font-weight: normal;
        color: darkgrey;
        padding: 3rem 3rem;
      }
    }
</style>
