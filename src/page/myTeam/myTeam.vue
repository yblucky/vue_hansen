<template>
    <div class="restContainer">
        <head-top head-title="我的团队" goBack="true"></head-top>
        <transition name="router-fade">
            <section v-if="chooseType === 1">
              <section class="info-data">
                  <ul class="clear" v-for="(item,index) in teamList">
                      <li @click="getIndex(index,item.userId)" class="info-data-link">
                        <span class="info-data-center">{{item.nickName}}[{{item.uid}}]</span>
                        <span class="spaPer">{{item.performance}}</span>
                        <span class="info-data-right"><img src="../../hsimages/44.png" v-bind:class="{'showImg': turnRecord, 'closeImg' : !turnRecord }"/></span>
                      </li>
                      <transition name="router-fade">
                          <section v-if="index === turnOn " class="member-data">
                            <div v-for="ele in memberList">
                              <span class="showDate">{{ele.nickName}}[{{ele.uid}}]</span>
                              <span class="spaPer2">{{ele.performance}}</span>
                            </div>
                          </section>
                      </transition>
                  </ul>
              </section>
            </section>
        </transition>
        <div v-if="teamList == null || teamList == ''">
           <nullData></nullData>
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>

</template>

<script>
    import headTop from 'src/components/header/head'
    // import payPwd from '../../components/common/payPwd'
    import alertTip from 'src/components/common/alertTip'
    import {getUserInfo} from 'src/config/env'
    import {mobileCode, checkExsis, sendMobile, getcaptchas, myteam} from 'src/service/getData'
    import nullData from 'src/components/common/nullData'

    export default {
        data(){
            return {
                chooseType:1,     //选择方式
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                turnRecord:false,   //打开
                turnOn:0,
                teamList:[], //直代
                memberList:[],//二代
                gradeList:[],
                show:true,     //显示提示框
                isEnter:true,  //是否登录
                isLeave:false, //是否退出
                showHtml:"",
            }
        },
        components: {
            headTop,
            alertTip,
            nullData,
            // payPwd,
        },
        watch:{
        },
        created(){
        },
        mounted(){
            this.getMyTeam(1,3,getUserInfo("id"));
        },
        methods: {
            async getMyTeam(pageno,pageSize,parentUserId){
                let res = await myteam(pageno,pageSize,parentUserId);
                this.teamList = res.result.rows;
            },
            async getmemberList(pageNo,pageSize,parentUserId){
                let res = await myteam(pageNo,pageSize,parentUserId);
                if (res.code==200) {
                    this.memberList = res.result.rows;
                }else {
                    this.showAlert = true;
                    this.alertText = res.msg;
                    if (res.code==0 || res.code==-1) {
                       localStorage.clear();
                   }
                }
            },
            closeTip(){
                this.showAlert = false;
            },
            getIndex:function($index,parentUserId){
              this.getmemberList(1,3,parentUserId);
              if(this.turnOn === $index){
                this.turnOn = 0;
                this.turnRecord = false;
              }else {
                this.turnOn=$index;
                this.turnRecord = true;
              }
            },
            exitlogin(){
                this.show=true;
                this.isEnter=true;
                this.isLeave=false;
            },
            waitingThing(){
                //取消推出
                clearTimeout(this.timer)
                this.isEnter=false;
                this.isLeave=true;
                this.timer = setTimeout(() =>{
                    clearTimeout(this.timer)
                    this.show=false;
                },200)
            },
            //退出登录
            async outLogin(){
                this.OUT_LOGIN();
                this.waitingThing();
                this.$router.go(-1);
                removeStore('user_id')
                await signout();
            },
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
         .spaPer{
            text-align: right;
            position: absolute;
            right: 15%;
            color: red;
         }
         .info-data-center{
           font-size:16px;
           font-family:"微软雅黑",Courier New, Courier, monospace;
         }
      }

      .spaPer2{
         text-align: right;
         position: absolute;
         right: 15%;
         color: red;
         font-size: 0.85rem;
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
