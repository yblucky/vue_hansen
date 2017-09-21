<template>
    <div class="restContainer">
        <head-top head-title="我的团队" goBack="true"></head-top>
        <section class="category_title">
            <span :class="{choosed: chooseType === 1}" @click="chooseType = 1">团队成员</span>
            <span :class="{choosed: chooseType === 2}" @click="getMyDepartmentList(1,100)">部门业绩</span>
        </section>
        <transition name="router-fade">
            <section v-if="chooseType === 1">
              <section class="info-data">
                  <ul class="clear" v-for="(item,index) in teamList">
                      <li @click="getIndex(index,item.userId)" class="info-data-link">
                        <span class="info-data-center">{{item.nickName}}[{{item.uid}}]</span>
                        <span class="spaPer">{{item.teamPerformance}}</span>
                        <span class="spaPerGrade">{{item.remark}}</span>
                        <span class="info-data-right"><img src="../../hsimages/44.png" v-bind:class="{'showImg': turnRecord, 'closeImg' : !turnRecord }"/></span>
                      </li>
                      <transition name="router-fade">
                          <section v-if="index === turnOn " class="member-data">
                            <div v-for="ele in memberList">
                              <span class="showDate">{{ele.nickName}}[{{ele.uid}}]</span>
                              <span class="spaPer2Grade">{{item.remark}}</span>
                              <span class="spaPer2">{{ele.teamPerformance}}</span>
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
                       <span style="font-weight:bold;">部门总业绩</span>
                       <div style="font-weight:bold;">{{sumDeparmentPerformance}}</div>
                   </li>
                </ul>
              </div>
              <div v-for="(item,index) in departmentList">
                <ul>
                   <li class="page">
                       <span class="">第{{index+1}}部业绩</span>
                       <div class="">{{item.performance}}</div>
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
    import {getUserInfo} from 'src/config/env'
    import {myteam} from 'src/service/getData'
    export default {
        data(){
            return {
                pageNo:1,
                pageSize:100,
                id:"",
                chooseType:1,     //选择方式
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                turnRecord:false,   //打开
                turnOn:-1,
                sumDeparmentPerformance:0,
                teamList:[], //直代
                memberList:[],//二代
                departmentList:[],//二代
            }
        },
        components: {
            headTop,
            alertTip,
        },
        created(){
          this.id=getUserInfo("id");
          this.getMyTeam(1,3,this.id);
        },
        methods: {
            closeTip(){
                this.showAlert = false;
            },
            getIndex:function($index,parentUserId){
              if(this.turnOn == $index){
                this.turnOn = -1;
                this.turnRecord = false;
              }else {
                this.getmemberList(1,3,parentUserId);
                this.turnOn=$index;
                this.turnRecord = true;
              }
            },
            async getMyTeam(pageNo,pageSize,parentUserId){
                let res = await myteam(pageNo,pageSize,parentUserId);
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
            async getMyDepartmentList(pageNo,pageSize){
                this.chooseType = 2;
                let res = await myteam(pageNo,pageSize,this.id);
                if (res.code==200) {
                    this.departmentList = res.result.rows;
                    this.sumDeparmentPerformance = res.result.extend.sumDeparmentPerformance;
                }else {
                    this.showAlert = true;
                    this.alertText = res.msg;
                    if (res.code==0 || res.code==-1) {
                       localStorage.clear();
                   }
                }
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
         padding: 0.25rem;
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
             right: 20%;
             color: #7979cc;
          }
          .spaPerGrade{
              position: absolute;
              padding: 0.25rem;
              right: 49%;
              color: red;
              font-size:13px;
           }
         .info-data-center{
           margin-left: 2%;
           font-size:16px;
           font-family:"微软雅黑",Courier New, Courier, monospace;
         }
      }
      .spaPer2{
         text-align: right;
         position: absolute;
         right: 20%;
         color: #7979cc;
         font-size: 0.85rem;
      }
      .spaPer2Grade{
          position: absolute;
          padding: 0.45rem;
          right: 50%;
          color: red;
          font-size:12px;
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
           font-weight: 500;
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
        padding: 3rem 1.5rem;
      }
    }
</style>
