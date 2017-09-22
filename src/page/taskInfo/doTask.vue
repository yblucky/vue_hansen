<template>
   <div class="upGradeRecordContainer" >
       <head-top :head-title="title"></head-top>
       <section>
           <div class="videoPanel" v-if="isVdoShow">
             <!-- controls 是否显示控制器 -->
             <!-- autoplay 是否自动播放 -->
             <video id="vdo" width="100%" webkit-playsinline playsinline autoplay="autoplay"   controls :src="videoUrl"></video>
             <!-- <img id="poster" v-show="isPosterShow" :src="posterUrl" alt=""> -->
             <!-- <img id="loading" v-show="isLoadingShow" src="https://hybrid.xiaoying.tv/web/active/krFAQ/static/imgs/load.gif" alt=""> -->
             <!-- <img @click="play()" id="playBtn" v-show="isPlayBtnShow" src="https://hybrid.xiaoying.tv/web/active/krFAQ/static/imgs/playBtn.png" alt=""> -->
           </div>

           <div class="imgPanel" v-else>
             <img :src="linkImgPath" />
           </div>
       </section>

       <section>
          <div class="discriptionPanel">
              {{discription}}
          </div>
       </section>

       <section class="timer_section">
         <div v-show="code_state" class="timer_div">
            距离任务结束还剩{{computedTime}}秒
         </div>
         <div v-show="code_btn" class="btn_div" @click="openActive">
            任务已完成，点击完成任务
         </div>
       </section>

       <section class="coverpart" v-if="showLoading">
           <section class="cover-background"></section>
           <section class="cover-content">
               <loading></loading>
           </section>
       </section>

       <!-- 显示任务页面 -->
       <section class="coverpart_active" v-if="show_task">
           <section class="cover-background"></section>
           <section class="cover-content">
             <div class="head">
                 <span class="close" @click="closeActive">×</span>
                 <h4>任务已完成</h4>
             </div>
             <div class="middle">
                 <div class="showImg">
                    <img src="../../hsimages/gou.png" />
                 </div>
             </div>
             <div class="active_container" @click="doTask">退出任务</div>
           </section>
       </section>

       <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>

   </div>

</template>

<script>
   import headTop from 'src/components/header/head'
   import alertTip from 'src/components/common/alertTip'
   import {mapState, mapMutations} from 'vuex'
   import {isLogin,formatDate} from 'src/config/env'
   import {codeTransfer,codeTransferList,getUser,doTask} from '../../service/getData'
   import payPwd from 'src/components/common/payPwd'
   import loading from 'src/components/common/loading'

   export default {
     data(){
       return{
          title:"任务标题",
          showAlert: false,
          alertText: null,
          showLoading:false,
          isVdoShow: false,
          // isPosterShow: true,
          // isLoadingShow: false,
          // isPlayBtnShow: true,
          videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
          linkImgPath:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2672143417,2386537397&fm=27&gp=0.jpg", //任务图片
          discription:"",
          userTaskId:"",  //任务关联id
          link:"",        //任务跳转链接
          status:"",      //任务状态
          timer:null,   //到计时
          computedTime:0, //秒数
          taskTime:0,
          code_state:true,//是否显示距离任务时间
          show_task:false,   //显示任务
          code_btn:false, //是否显示任务已完成
        }
      },
       mixins: [isLogin],
       components: {
           headTop,
           alertTip,
           payPwd,
           loading,
       },
       mounted(){
         this.isLogin("/login");
         this.initData();
       },
       filters:{
         formatDate(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy-MM-dd');
         }
       },
       methods :{
         formatDateTime(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy-MM-dd');
         },
         closeTip(){
             this.showAlert = false;
             if(localStorage.getItem("token") == null){
               this.isLogin("/login");
             }
         },
         //关闭任务弹窗
         closeActive(){
           this.show_task = false;
           this.code_btn = true;
         },
         //打开任务弹窗
         openActive(){
           this.show_task = true;
           this.code_btn = false;
         },
        async initData(){
            // this.params = this.$route.query.params;
            if(this.$route.query.taskType == 2){
              //显示图片
              this.linkImgPath = this.$route.query.linkImgPath;
              this.isVdoShow = false;
            }else if(this.$route.query.taskType == 3) {
              this.videoUrl = this.$route.query.linkImgPath;
              this.isVdoShow = true;
            }

            this.title = this.$route.query.title;
            this.discription = this.$route.query.discription;
            this.link = this.$route.query.link;
            this.userTaskId = this.$route.query.userTaskId;
            this.status = this.$route.query.status;
            //调用倒计时
            this.countDown();
         },
         //到计时
         countDown(){
           if(this.status != 1){
             this.showAlert = true;
             this.alertText = "已完成任务,5秒后自动退出任务";
             //任务已完成
             this.code_state = false;
             //启动到计时
             this.taskTime = 5;
             //倒计时
             this.timer = setInterval(() => {
                 this.taskTime --;
                 if (this.taskTime == 0) {
                     clearInterval(this.timer)
                     this.$router.go(-1);
                 }
             }, 1000)
             return;
           }
           //启动到计时
           this.computedTime = 30;
           //倒计时
           this.timer = setInterval(() => {
               this.computedTime --;
               if (this.computedTime == 0) {
                   clearInterval(this.timer)
                   this.show_task = true;
                   this.code_state = false;
               }
           }, 1000)
         },
         async doTask () {
          //显示刷新
          this.showLoading = true;
          //从后台获取记录
          let res = await doTask(this.userTaskId);
          if(res.code==200){
              //领取成功，隐藏刷新
              this.show_task = false;
              this.code_state = false;
              this.code_btn = false;
              this.showLoading = false;

              //任务成功,返回上一页面
              this.$router.go(-1);

              // this.showAlert = true;
              // this.alertText = "完成任务,5秒后自动退出任务";
              //启动到计时
              // this.taskTime = 5;
              // //倒计时
              // this.timer = setInterval(() => {
              //     this.taskTime --;
              //     if (this.taskTime == 0) {
              //         clearInterval(this.timer)
              //         this.$router.go(-1);
              //     }
              // }, 1000)
              //跳转页面
              // window.location="https://www.baidu.com";
              // window.open(this.link);
          }else {
            //不管成功失败，都得关闭
            this.show_task = false;
            this.showLoading = false;
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
   .upGradeRecordContainer{
       background-color:white;
       p, span, input{
           font-family: Helvetica Neue,Tahoma,Arial;
       }
   }
   .timer_section{
     .timer_div{
         position: fixed;
         top:95%;
         width: 100%;
         padding-top:2%;
         height: 2rem;
         text-align: center;
         @include sc(.7rem, #fff);
         background-color:#FAE8E8;
         z-index:202;
         color:#F62A0A;
         font-family: cursive;
      }

      .btn_div{
          position: fixed;
          top:95%;
          width: 100%;
          padding-top:2%;
          height: 2rem;
          text-align: center;
          @include sc(.7rem, #fff);
          background-color:#FAE8E8;
          z-index:202;
          color:#F62A0A;
          font-family: cursive;
       }

   }

   .videoPanel{
     padding-top:14%;
     background: #000000;
     /*height: 7rem;*/
     /*border-bottom:1px solid #B6C0C0;*/
   }

   .imgPanel{
     padding-top:15%;
     background: $fc;
     height: 12rem;
     /*border-bottom:1px solid #B6C0C0;*/
     padding-bottom:2%;
     img{
       width: 100%;
       height: 100%;
     }
   }

   .discriptionPanel{
     padding-top:3%;
     padding-left:3%;
     background: $fc;
     text-indent:32px;
     line-height:1.2rem;
     width:98%;
     font-size: 16px;
     padding-bottom:2%;
     font-family: cursive;
   }

   .coverpart{
       @include wh(100%,100%);
       @include allcover;
       .cover-background{
           @include wh(100%,105%);
           @include allcover;
           background:#000;
           z-index:1010;
           opacity:.2;
       }
       .cover-content{
           /*width:100%;*/
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
           background:#000;
           z-index:990;
           opacity:.2;
       }
       .cover-content{
           width:94%;
           background:$fc;
           padding-top:3%;
           padding-bottom:5%;
           position:absolute;
           top:30%;
           left:3%;
           z-index:1000;
           @include borderRadius(5px);
           .head{
               width: 100%;
               border-bottom: 1px solid #87CEFA;
               margin-bottom:4%;
               h4{
                   text-align:center;
                   @include sc(20px,#575757);
                   font-weight:700;
                   margin-bottom:4%;
               }
               .close{
                 position: absolute;
                 top: 10px;
                 left: 10px;
                 font-size: 30px;
                 width: 16px;
                 height: 100%;
                 line-height: 30px;
                 color: #ccc;
               }
           }

           .middle{
             .showImg{
               text-align: center;
               img{
                 width:3rem;   /*350px*/
               }
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

   input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    /* WebKit browsers */
       color: #666;
       font-size:15px;
   }
   input:-moz-placeholder, textarea:-moz-placeholder {
   /* Mozilla Firefox 4 to 18 */
       color: #666;
       font-size:15px;
   }
   input::-moz-placeholder, textarea::-moz-placeholder {
    /* Mozilla Firefox 19+ */
       color: #666;
       font-size:15px;
   }
   input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    /* Internet Explorer 10+ */
       color: #666;
       font-size:15px;
   }

</style>
