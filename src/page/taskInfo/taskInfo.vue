<template>
   <div class="staticContainer">
       <head-top head-title="任务列表" go-back='true'>
           <div slot="changeLogin" class="change_login">
             <router-link to="/myReward" >释放明细</router-link>
           </div>
       </head-top>
       <div class="count_shuju">
          <span>累计次数：<b class="b1">{{compelteTaskCount}}</b> 次</span>
          <span>奖励：<b class="b2">{{parseInt(signCount).toFixed(2)}}</b></span>
       </div>
       <ul>
          <li class="page" v-for="item in staticRecordList">
                <div class="left_div">
                    <img src="../../hsimages/53.png" class="vip" />
                </div>
                <!-- <div v-if="item.linkImgPath == null" class="left_div">
                    <img src="../../hsimages/32.png" class="vip" />
                </div>
                <div v-else class="left_div">
                    <img src="item.linkImgPath" />
                </div> -->
                <div class="middle_div">
                    <p class="p1">
                        <h5 v-if="item.title.length > 8" style="font-weight:bold">{{item.title | subStr}}...</h5>
                        <h5 v-else style="font-weight:bold">{{item.title}}</h5>
                    </p>
                    <p class="p2">
                        <h6>{{item.assignTaskTime | formatDate}}</h6>
                    </p>
                </div>
                <div class="right_div">
                    <!-- <div v-if="item.status == 1" class="login_container" @click="doTask(item.id,item.taskId)">做任务领取奖励</div> -->
                    <div v-if="item.status == 1" class="login_container" @click="showTask(item.title,item.linkImgPath,item.link,item.discription,item.taskType,item.remark,item.id,item.status)">做任务领取奖励</div>
                    <div v-if="item.status == 2" class="complent_container">已完成</div>
                </div>
          </li>
       </ul>

       <!-- 显示任务页面 -->
       <section class="coverpart_active" v-if="show_task">
           <section class="cover-background"></section>
           <section class="cover-content">
             <div class="close">
                <img src="../../hsimages/close.png" @click="closeActive" />
             </div>
             <div class="middle">
                 <!-- <p style="padding-left:7%;"><span style="font-size:10px;">购物币地址：{{inPayAddress}}</span></p>
                 <p style="padding-left:7%;padding-top:2%;"><span style="font-size:10px;">交易币地址：{{inTradeAddress}}</span></p>
                 <p style="padding-left:7%;padding-top:2%;"><span style="font-size:10px;">需充值购物币数量：<b>{{parseFloat(needBuyPayAmt).toFixed(2)}}</b><b style="padding-left:5%;">1GWC</b><b style="padding-left:5%;">约{{parseFloat(payConverRmbScale).toFixed(2)}}元</b></span></p>
                 <p style="padding-left:7%;padding-top:2%;"><b style="font-size:15px;font-weight:bold;">购物币余额：{{parseFloat(payAmt).toFixed(2)}}</b></p>
                 <p style="padding-left:7%;padding-top:2%;"><span style="font-size:10px;">需充值交易币数量：<b>{{parseFloat(needBuyTradeAmt).toFixed(2)}}</b><b style="padding-left:5%;">1JYC</b><b style="padding-left:5%;">约{{parseFloat(tradeConverRmbScale).toFixed(2)}}元</b></span></p>
                 <p style="padding-left:7%;padding-top:2%;"><b style="font-size:15px;font-weight:bold;">交易币余额：{{parseFloat(tradeAmt).toFixed(2)}}</b></p> -->
                 <div class="showImg">
                    <img :src="params.linkImgPath" />
                 </div>
                 <div class="showTitle">
                    <h4>---{{params.title}}---</h4>
                 </div>
                 <div class="showTaskType">
                    <h6>{{params.remark}}</h6>
                 </div>
                 <div class="showDiscription">
                    <b>{{params.discription}}</b>
                 </div>

             </div>
             <div class="active_container" @click="skipTask()">前往任务</div>
           </section>
       </section>

       <section class="coverpart" v-if="showLoading">
           <section class="cover-background"></section>
           <section class="cover-content">
               <loading></loading>
           </section>
       </section>

       <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
       <div v-if="staticRecordList == null || staticRecordList == ''">
          <nullData></nullData>
       </div>
       <!-- <foot-guide></foot-guide> -->
   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import {mapState, mapMutations} from 'vuex'
   import {isLogin,formatDate,subStr} from 'src/config/env'
   import {getTaskInfo,doTask} from '../../service/getData'
   import nullData from 'src/components/common/nullData'
   import alertTip from 'src/components/common/alertTip'
   import loading from 'src/components/common/loading'
  //  import footGuide from 'src/components/footer/footGuide'

   export default {
     data(){
           return{
              staticRecordList:[],    //任务列表
              // show:0,
              taskId:'',
              showAlert: false, //显示提示组件
              alertText: null, //提示的内容
              showLoading:false,
              compelteTaskCount:0,  //完成任务数量
              signCount:0,        //领取任务奖励
              show_task:false,      //显示任务页面窗
              // title:"",   //任务标题
              // linkImgPath:"", //任务图片  测试图片：https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2672143417,2386537397&fm=27&gp=0.jpg
              // link:"",
              // discription:"",//任务描述
              // taskType:"",//任务类型
              // userTaskId:"",//用户关联任务id
              params:{
                title:"",
                linkImgPath:"",
                link:"",
                discription:"",//任务描述
                taskType:"",//任务类型
                userTaskId:"",//用户关联任务id
                remark:"",
                status:"",    //任务状态
              },
           }
       },
       created(){
         this.getTaskInfo();
       },
       mixins: [isLogin],
       components: {
           headTop,
           nullData,
           alertTip,
           loading,
          //  footGuide,
       },
       methods: {
        //获取会员升级记录
        async getTaskInfo () {
            //显示刷新
            this.showLoading = true;
             //从后台获取记录
             let res = await getTaskInfo(1,100);
             if(res.code==200){
               //不管成功失败，隐藏loading
               this.showLoading = false;
               this.compelteTaskCount = res.result.extend.compelteTaskCount;
               this.signCount = res.result.extend.signCount;
               if(res.result.rows != null && res.result.rows !=''){
                 this.staticRecordList = res.result.rows;
               }
             }else {
               //不管成功失败，隐藏loading
               this.showLoading = false;
               if (res.code==0 || res.code==-1) {
                  this.showAlert = true;
                  this.alertText = res.msg;
                  localStorage.clear();
               }
             }
         },
         async doTask (userTaskId,link) {
              // this.showAlert = true;
              // this.alertText = userTaskId,taskId;
              // return;
              //显示刷新
              this.showLoading = true;
              //从后台获取记录
              let res = await doTask(userTaskId);
              if(res.code==200){
                  console.error("任务地址:"+link);
                  //领取成功，隐藏刷新
                  this.showLoading = false;
                  this.showAlert = true;
                  this.alertText = "领取成功";
                  //跳转页面
                  // window.location="https://www.baidu.com";
                  window.open(link);
              }else {
                //不管成功失败，都得关闭
                this.showLoading = false;
                this.showAlert = true;
                this.alertText = res.msg;
                if (res.code==0 || res.code==-1) {
                   localStorage.clear();
                }
              }
          },
          //跳转做任务页面
          skipTask(){
            //隐藏弹框
            this.show_task=false;
            // this.doTask(userTaskId,link);
            this.$router.push({
                path:'/doTask',
                query: {
                    title: this.params.title,
                    linkImgPath: this.params.linkImgPath,
                    link: this.params.link,
                    discription: this.params.discription,
                    taskType: this.params.taskType,
                    userTaskId: this.params.userTaskId,
                    status:this.params.status,
                }
            })
          },
          closeTip(){
              this.showAlert = false;
              if(localStorage.getItem("token") == null){
                this.isLogin("/login");
              }else {
                //刷新页面
                location.reload();
              }
          },
          //关闭任务弹窗
            closeActive(){
            this.show_task = false;
          },
          //显示任务详情窗 item.title,item.linkImgPath,item.link,item.discription,item.taskType
          showTask(title,linkImgPath,link,discription,taskType,remark,userTaskId,status){
            // console.error("userTaskId:"+userTaskId);
              this.show_task = false;
              this.params.title = title;
              if(linkImgPath == null || linkImgPath ==""){
                this.params.linkImgPath = "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2672143417,2386537397&fm=27&gp=0.jpg";
              }else {
                this.params.linkImgPath = linkImgPath;
              }

              this.params.link = link;
              this.params.discription = discription;
              this.params.userTaskId = userTaskId;
              this.params.taskType = taskType;
              this.params.remark = remark;
              this.params.status = status;
              this.skipTask();
          },
       },
       filters:{
         formatDate(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy年MM月dd日');
         },
         subStr(str){
           return subStr(str,0,8);
         }
       },
      //  watch: {
      //      staticRecordList: function (value){
      //          this.getTaskInfo();
      //      }
      //  }
   }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
   .staticContainer{
       background-color: white;
       padding-top: 1.95rem;
       p, span, input{
           font-family: Helvetica Neue,Tahoma,Arial;
       }
   }
   .change_login{
       position: absolute;
       @include ct;
       right: 0.75rem;
       @include sc(.7rem, #fff);
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
            @include sc(0.6rem,red);
            font-weight:700;
            line-height:0.5rem;
            font-family: Helvetica Neue,Tahoma;
        }
        .b2{
            display:inline-block;
            @include sc(0.6rem,#f90);
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
        margin-top: 3%;
        text-align: center;
        @include wh(15%,15%);
        .vip{
           width:2rem;
           algin:center;
        }
      }
      .middle_div{
        float: left;
        @include wh(35%,35%);
        margin-left:3%;
        margin-top: 3%;
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
            margin-top: -12%;
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

   .coverpart_active{
       top:0%; /**遮罩全屏top,left都为0,width,height为100%**/
       left:0%;
       height: auto;
       @include wh(100%,100%);
       @include allcover;
       .cover-background{
           height: auto;
           @include wh(100%,100%);
           @include allcover;
           position:fixed;
           background:#000;
           z-index:100;
           opacity:.2;
       }
       .cover-content{
           width:94%;
           background:$fc;
           padding-bottom:5%;
           position:fixed;
           top:20%;
           left:3%;
           z-index:1000;
           @include borderRadius(5px);
           /*关闭图片*/
           .close{
             position: absolute;
             top:-5%;
             left:94%;
             z-index:1000;
             img{
               width: 1.5rem;
             }
           }

          .middle{
            .showImg{
              img{
                width: 100%;   /*350px*/
                height:100%;   /*170px;*/
              }
            }
            .showTaskType{
              padding-top: 2%;
              margin-left: 75%;
            }
            .showDiscription{
              padding-top: 2%;
              padding-left:3%;
              font-size:16px;
              text-indent:20px;
            }
            .showTitle{
              text-align: center;
            }
          }

           .active_container{
               margin-top: 7%;
               margin-left: 29%;
               margin-bottom: 3%;
               width:40%;
               @include sc(.7rem, #fff);
               background-color: #3b95e9;
               padding: .5rem 0;
               border: 1px;
               border-radius: 0.3rem;
               text-align: center;
           }

       }
   }

   body .coverpart_active .cover-animate{
       transition:all 1s;
       animation:bounceIn .6s;
   }
   body .coverpart_active .cover-animate-leave{
       animation:zoomOut .4s;
   }

   .coverpart{
       @include wh(100%,100%);
       @include allcover;
       .cover-background{
           @include wh(100%,105%);
           @include allcover;
           background:#000;
           z-index:100;
           opacity:.2;
       }
       .cover-content{
           width:94%;
           z-index:1000;
           .redbao{
             position: absolute;
             top: 15%;
             left: 4%;
             vertical-align:middle;
             display:inline-block;
             width:15rem;
             z-index:1010;
           }
           .redbao_button{
             position: absolute;
             top: 71%;
             left: 19%;
             vertical-align:middle;
             display:inline-block;
             width:10rem;
             z-index:1010;
           }
           .redbao_text{
             position: absolute;
             top: 0;
             left: 0;
             z-index:1020;
             font-size: 30px;
             text-align: center;
             width: 60%;
             height: 50px;
             line-height: 50px;
             color: #DA4E3F;
             margin: 40% 20% 0 20%;
           }
       }
   }
</style>
