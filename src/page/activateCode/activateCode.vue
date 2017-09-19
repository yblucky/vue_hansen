<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="我的消费码" go-back='true'></head-top>
       <section class="topPanel">
          <div class="activateDiv">消费码剩余</div>
          <div class="activateCode"><b>{{activeCodeNo}}</b>个</div>
       </section>
       <section class="info-data">
           <ul class="clear">
               <li @click="turnCode=!turnCode,turnRecord=false" class="info-data-link">
                 <span class="info-data-left"><img src="../../hsimages/31.png" class="privateImage" /></span>
                 <span class="info-data-center">转让消费码</span>
                 <span class="info-data-right"><img src="../../hsimages/44.png" v-bind:class="{'showImg': turnCode, 'closeImg' : !turnCode  }"/></span>
               </li>
               <transition name="router-fade">
                    <div class="transfer_div">
                      <section v-if="turnCode == true" class="transfer">
                          <div class="div1">
                            <span>会员账户：</span>
                            <input type="text" name="toUid" placeholder="请输入用户uid" v-model.lazy="toUid">
                          </div>
                          <div>
                            <span>转让数量：</span>
                            <input type="text" name="transferNo" placeholder="转让数量只能是整数哦" v-model.lazy="transferNo">
                          </div>
                          <div class="pay_display">
                            <span>交易密码：</span>
                            <input type="text" name="payword" v-model.lazy="payword">
                          </div>
                          <div class="btn">
                              <div class="active_container" @click="showPayPwd()">确认</div>
                          </div>
                      </section>
                      <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
                      <payPwd @pwdCompleted="codeTransferAction($event)" v-if="showPwd" :showHide="showPwd" @closePwd='closePwd'></payPwd>
                    </div>
               </transition>

               <li @click="turnRecord=!turnRecord,turnCode=false" class="info-data-link">
                 <span class="info-data-left"><img src="../../hsimages/32.png" class="privateImage" /></span>
                 <span class="info-data-center">转让/使用记录</span>
                 <span class="info-data-right"><img src="../../hsimages/44.png" v-bind:class="{'showImg': turnRecord, 'closeImg' : !turnRecord }"/></span>
               </li>
               <transition name="router-fade">
                   <section v-if="turnRecord == true" class="show-data">
                     <div v-for="item in activeCodeList">
                       <span  v-if="item.isShowNextPage" class="showDate">{{item.createTime|formatDate}}</span>
                       <ul>
                         <li  class="page">
                            <!-- <span class="">{{item.sendUserNick}}</span> -->
                             <span class="">{{item.remark}}</span>
                             <div v-if="item.sendUserId == id" style="font-weight:400;color:green;"  class="">{{item.transferNo}}</div>
                              <div v-if="item.receviceUserId == id" style="font-weight:400;color:red;"  class="">{{-item.transferNo}}</div>
                         </li>
                       </ul>
                     </div>
                   </section>
               </transition>
           </ul>
       </section>

       <section class="coverpart" v-if="showLoading">
           <section class="cover-background"></section>
           <section class="cover-content">
               <loading></loading>
           </section>
       </section>

   </div>
</template>

<script>
   import headTop from 'src/components/header/head'
   import alertTip from 'src/components/common/alertTip'
   import {mapState, mapMutations} from 'vuex'
   import {isLogin,getLoginUserInfo,formatDate} from 'src/config/env'
   import {codeTransfer,codeTransferList,getUser} from '../../service/getData'
   import payPwd from 'src/components/common/payPwd'
   import loading from 'src/components/common/loading'

   export default {
     data(){
           return{
              pageNo:1,
              pageSize:30,
              showAlert: false, //显示提示组件
              alertText: null, //提示的内容
              turnCode:false,
              turnRecord:false,
              toUid:"",
              transferNo:'',
              payword:"",
              activeCodeList:[],//转让记录
              codeType:1,//激活码
              activeCodeNo:0,
              id:"",
              nickName:"",
              showPwd:false,
              isShowNextPage:true,
              showLoading:false,
           }
       },
       created(){
           //初始化信息
           this.initData();
       },
       mixins: [isLogin,getLoginUserInfo],
       components: {
           headTop,
           alertTip,
           payPwd,
           loading,
       },
       mounted(){
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
         async codeTransferAction(pwd){
             this.payword=pwd;
             if (!this.payword) {
               this.showAlert = true;
               this.alertText = '支付密码不能为空';
               return;
             }
             var reg = /^[0-9]+$/;
             if (!reg.test(this.transferNo)) {
               this.showAlert = true;
               this.alertText = '转账数量只能是正整数';
               return;
             }


             //隐藏密码框
             this.showPwd=false;
             this.showLoading = true;
             let res = await codeTransfer(this.toUid, parseInt(this.transferNo) ,this.codeType,this.payword);
             if (res.code==200) {
               this.showLoading = false;
               this.showAlert = true;
               this.alertText = res.msg;
             }else {
               this.showLoading = false;
               this.showAlert = true;
               this.alertText = res.msg;
               if (res.code==0 || res.code==-1) {
                 localStorage.clear();
               }
             }
             //不管成功失败，重新输入
             this.toUid = '';
             this.transferNo = '';
         },
         closeTip(){
             this.showAlert = false;
             if(localStorage.getItem("token") == null){
               this.isLogin("/login");
             }
             location.reload();
         },
        async initData(){
            this.showLoading = true;
            let reUser = await getUser();
            if(reUser.code == 200){
                this.showLoading = false;
                this.id=reUser.result.id;
                this.nickName=reUser.result.nickName;
                this.activeCodeNo=reUser.result.activeCodeNo;
            }else {
              this.showLoading = false;
              this.showAlert = true;
              this.alertText = reUser.msg;
              if(reUser.code==0 || reUser.code==-1){
                localStorage.clear();
              }
              return;
            }

            let res =  await codeTransferList(this.pageNo,this.pageSize,this.codeType);
            if (res.code==200) {
              this.activeCodeList=res.result.rows;
              let flag=true;
              let time="";
              if (this.activeCodeList) {
                for (var i = 0; i < this.activeCodeList.length; i++) {
                  let nextTime=this.formatDateTime(this.activeCodeList[i].createTime,"yyyy-MM-dd");
                  if (nextTime==time) {
                    flag=false;
                  }else {
                    time=nextTime;
                  }
                  this.activeCodeList[i].isShowNextPage=flag;
                  if (this.activeCodeList[i].sendUserId==this.id) {
                      this.activeCodeList[i].transferNoStr=""+this.activeCodeList[i].transferNo;
                      this.activeCodeList[i].remarkStr="会员"+this.nickName+"使用消费码";
                  }else {
                      this.activeCodeList[i].transferNoStr="+"+this.activeCodeList[i].transferNo;
                      this.activeCodeList[i].remarkStr="会员"+this.nickName+"获赠消费码";
                  }
                }
              }
            }else {
              this.showAlert = true;
              this.alertText = res.msg;
              if (res.code==0 || res.code==-1) {
                localStorage.clear();
              }
            }
         },
         closePwd(){
             this.showPwd = false;
         },
         showPayPwd(){
           if (!this.toUid) {
             this.showAlert = true;
             this.alertText = '会员账户不能为空';
             return;
           }
           if (this.transferNo <= 0) {
             this.showAlert = true;
             this.alertText = '消费码数量不能为空';
             return;
           }
          //  this.turnType = false;
           this.showPwd=true;
         }
       }
   }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
   .topPanel{
     background: $blue;
     width: 100%;
     height: 7rem;
     .activateDiv{
       color: Silver;
       padding: 0.5rem;
       font-size: 0.65rem;
     }
     .activateCode{
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 0.65rem;
        color: #ccc;
        b{
          font-size: 3rem;
          color: white;
        }
     }
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
        padding: 0.35rem;
        .info-data-left{
           padding-left:3%;
            .privateImage{
              display:inline-block;
              width: 1.5rem;
              vertical-align:middle;
            }
         }
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

   .upGradeRecordContainer{
       background-color:white;
       padding-top: 1.95rem;
       p, span, input{
           font-family: Helvetica Neue,Tahoma,Arial;
       }
   }

   .active_container{
       margin: 0.35rem 5rem;
       @include sc(.5rem, #fff);
       background-color: #3b95e9;
       padding: .5rem 0.5rem;
       border: 1px;
       border-radius: 0.95rem;
       text-align: center;

      background: #3b95e9; /* Old browsers */
      background: -moz-linear-gradient(top,  #3b95e9 0%, #39a0be 100%); /* FF3.6+ */
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3b95e9), color-stop(100%,#39a0be)); /* Chrome,Safari4+ */
      background: -webkit-linear-gradient(top,  #3b95e9 0%,#39a0be 100%); /* Chrome10+,Safari5.1+ */
      background: -o-linear-gradient(top,  #3b95e9 0%,#39a0be 100%); /* Opera 11.10+ */
      background: -ms-linear-gradient(top,  #3b95e9 0%,#39a0be 100%); /* IE10+ */
      background: linear-gradient(top,  #3b95e9 0%,#39a0be 100%);
   }

   .transfer_div{
     width: 100%;
     background-color:#F5F5F5;
     text-align: center;
     span{
       font-size: 18px;
       font-family: "黑体", Verdana, Arial, Helvetica, sans-serif;
     }
     .div1{
       padding-top: 3%;
     }
     .btn{
       padding-bottom:1%;
     }
     input{
         @include sc(1rem, #666);
         border:1px solid #dedede;
         width:9rem;
         height:1.45rem;
         text-align: center;
         border-radius: 0.5rem;
         margin-top: 2%;
         margin-bottom:3%;
         font-family:cursive;
     }
     .pay_display{
          display: none;
     }
   }

   .show-data{
      background-color: #eee;
      .showDate{
        font-family: Helvetica Neue,Tahoma,Arial;
        font-size: 0.65rem;
        font-weight: normal;
        color: darkgrey;
        padding: 0 0.55rem;

      }
      ul{
        background-color: white;
      }
     .page{
        border-bottom: 0.1rem solid #eee;
        font-family: Helvetica Neue,Tahoma,Arial;
        font-size: 0.45rem;
        font-weight: normal;;
        width: 100%;
        height: 2rem;
        span{
          padding:0 0.5rem;
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
