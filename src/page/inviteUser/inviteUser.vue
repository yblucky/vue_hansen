<template>
    <div class="upGradeContainer">
        <head-top :head-title="'邀请会员'" goBack="true"></head-top>
        <div class="selCardType">
          <span class="title">选择账户等级</span>
          <section class="info-data">
              <ul class="clear">
                  <li   @click="selCard(item.grade)"   class="info-data-link" v-for="(item,index) in cardGradeList">
                      <span class="info-data-top-right">
                        <img v-if='selCardType==item.grade' src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../images/vipCard.png" class="vip" /></span>
                      <span class="info-data-middle">{{item.remark}}</span>
                      <div class="info-data-bottom">{{item.insuranceAmt}}</div>
                  </li>
                    <!-- <li to="" @click="selCard(2);" v-bind:class="{active:selCardType==2}" class="info-data-link">
                      <span class="info-data-top-right">
                        <img v-if="selCardType == 2" src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../images/vipCard.png" class="vip" /></span>
                      <span class="info-data-bottom">铜卡</span>
                      <div class="info-data-bottom">{{insuranceAmt}}</div>
                  </li> -->
              </ul>
          </section>
        </div>

        <!-- <div class="middle">
            <p>
              <span class="registerCode">
                  账户注册码：<b>{{registerCodeNo}}</b>个
              </span>
              <span class="activeCode">
                  账户激活码：<b>{{registerCodeNo}}</b>个
              </span>
            </p>

            <p>
              <span class="tradeAmt">
                  交易币：<b>{{tradeAmt}}</b>个
              </span>
              <span class="payAmt">
                  购物币：<b>{{payAmt}}</b>个
              </span>
            </p>
        </div> -->

        <div class="fillInformation">
            <span class="title">填写基本资料</span>
            <section class="input_container">
              <div>
                <span>手机号：</span>
                <input type="text" name="phone" placeholder="手机号" v-model.lazy="phone">
              </div>
              <div>
                <span>邮箱：</span>
                <input type="text" name="email" placeholder="邮箱" v-model.lazy="email">
              </div>
              <div>
                <span>邀请人：</span>
                <input type="text" disabled="disabled" name="firstReferrer" v-model.lazy="firstReferrer">
              </div>
              <div>
                <span>接点人：</span>
                <input type="text" name="contactUserId" v-model.lazy="contactUserId">
              </div>
              <div>
                <span>登录密码：</span>
                <input type="password" name="password" placeholder="登录密码" v-model.lazy="password">
              </div>
              <div>
                <span>确认密码：</span>
                <input type="password" name="confirmPassword" placeholder="确认登录密码" v-model.lazy="confirmPassword">
              </div>
              <div>
                <span>支付密码：</span>
                <input type="password" name="payword" placeholder="请输入6位数字" v-model.lazy="payword">
              </div>
              <div>
                <span>确认密码：</span>
                <input type="password" name="confirmPayWord" placeholder="确认支付密码" v-model.lazy="confirmPayWord">
              </div>
            </section>
            <div class="active_container" @click="innerCreateUserAction">注册</div>
        </div>

        <!-- 显示邀请成功后显示的页面 -->
        <section class="coverpart_active" v-if="show_invite">
            <section class="cover-background"></section>
            <section class="cover-content">
              <div class="head">
                  <span class="close" @click="closeActive">×</span>
                  <h4>注册成功</h4>
              </div>
              <div class="middle_invite">
                  <p style="text-align:center;padding-top:2%;"><b style="font-size:15px;font-weight:bold;">uid：{{inviteUid}}</b></p>
                  <p style="text-align:center;padding-top:2%;"><b style="font-size:15px;font-weight:bold;">手机号：{{invitePhone}}</b></p>
              </div>
              <div class="active_container" @click="closeActive">确定</div>
            </section>
        </section>

        <section class="coverpart" v-if="showLoading">
            <section class="cover-background"></section>
            <section class="cover-content">
                <loading></loading>
            </section>
        </section>

        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <!-- <foot-guide></foot-guide> -->
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {mapState, mapMutations} from 'vuex'
    import {isLogin,getLoginUserInfo} from 'src/config/env'
    import {findCardGrade,findCardGradeList,innerCreateUser} from '../../service/getData'
    import loading from 'src/components/common/loading'

    export default {
        data(){
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                registerCodeNo: "", //注册码
                activeCodeNo: "", //激活码
                tradeAmt:"",//交易币
                payAmt:"",  //购物币
                insuranceAmt:"",
                outMultiple:"",
                selCardType: 1, //升级等级
                phone: "", //手机号
                email:"",//邮箱
                firstReferrer:"",//邀请人
                contactUserId:"",//接点人
                password:"",//登录密码
                confirmPassword:"",//确认登录密码
                payword:"",//高级密码
                confirmPayWord:"",//确认高级密码
                cardGrade:1,
                cardGradeList:[],
                uid:"",
                id:"",
                showLoading:false,
                show_invite:false,
                invitePhone:"",
                inviteUid:"",
            }
        },
        mounted(){
          this.isLogin("/login");
          this.initData();
        },
       mixins: [isLogin,getLoginUserInfo],
        created(){
        },
        components: {
            headTop,
            alertTip,
            loading,
            // footGuide,
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
              //  console.log(index);
                  this.selCardType =  index;
                  this.cardGrade=index;
                  this.findCardGrade();
              },
            closeTip(){
                this.showAlert = false;
            },
            async innerCreateUserAction(){
                if (!this.phone) {
                  this.showAlert = true;
                  this.alertText = '手机号不能为空';
                  return;
                }
                if(!/^1\d{10}$/gi.test(this.phone)){
                    this.showAlert = true;
                    this.alertText = "请输入正确的手机号码";
                    return
                }
                if (!this.email) {
                  this.showAlert = true;
                  this.alertText = '邮箱不能为空';
                  return;
                }
                if(!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/gi.test(this.email)){
                  this.showAlert = true;
                  this.alertText = "邮箱不正确";
                  return
                }
                if (!this.cardGrade) {
                  this.showAlert = true;
                  this.alertText = '开卡等级不能为空';
                  return;
                }
                if (!this.password) {
                  this.showAlert = true;
                  this.alertText = '登录密码不能为空';
                  return;
                }
                if (!this.confirmPassword) {
                  this.showAlert = true;
                  this.alertText = '确认登录密码不能为空';
                  return;
                }
                if (this.confirmPassword!=this.password) {
                  this.showAlert = true;
                  this.alertText = '两次登录密码不一致';
                  return;
                }
                if (!this.payword) {
                  this.showAlert = true;
                  this.alertText = '支付密码不能为空';
                  return;
                }
                if(!/^\d{6}$/gi.test(this.payword)){
                  this.showAlert = true;
                  this.alertText = "支付密码是6位数的数字";
                  return
                }
                if (!this.confirmPayWord) {
                  this.showAlert = true;
                  this.alertText = '确认支付密码不能为空';
                  return;
                }
                if (this.confirmPayWord!=this.payword) {
                  this.showAlert = true;
                  this.alertText = '两次支付密码不一致';
                  return;
                }
                this.showLoading = true;
                if(this.showLoading){
                  let res = await innerCreateUser(this.phone,this.phone,this.email,this.cardGrade,this.password,this.confirmPassword,this.payword,this.confirmPayWord,parseInt(this.firstReferrer),this.contactUserId);
                  if (res.code==200) {
                    this.showLoading = false;
                    //注册成功，弹出页面
                    this.inviteUid = res.result.uid;
                    this.invitePhone = res.result.phone;
                    this.show_invite = true;
                  }else {
                    this.showLoading = false;
                    this.showAlert = true;
                    this.alertText = res.msg;
                    if (res.code==0 || res.code==-1) {
                      localStorage.clear();
                    }

                    if(localStorage.getItem("token") == null){
                      this.isLogin("/login");
                    }
                    else {
                      //刷新页面
                      location.reload();
                    }
                  }
                }
            },
            async initData(){
               this.cardGrade=1;
               this.id=this.getLoginUserInfo("id");
               this.uid=this.getLoginUserInfo("uid");
               this.headImgUrl=this.getLoginUserInfo("headImgUrl");
               this.firstReferrer=this.uid;
               this.contactUserId=this.uid;
              //  console.log(this.cardGrade);
               this.findCardGrade();
               this.findCardGradeList();
              //  console.log(this.cardGrade);
            },
            async  findCardGradeList(){
              let res =  await findCardGradeList();
              if (res.code==200) {
                // console.log(res);
                this.cardGradeList= res.result;
              }else {
                this.showAlert = true;
                this.alertText = res.msg;
                if (res.code==0 || res.code==-1) {
                  localStorage.clear();
                }
              }
            },
            async  findCardGrade(){
              let res =  await findCardGrade(this.cardGrade);
              if (res.code==200) {
                // console.log(res);
                this.registerCodeNo= res.result.registerCodeNo; //注册码
                this.activeCodeNo= res.result.activeCodeNo; //激活码
                this.tradeAmt=res.result.tradeAmt;//交易币
                this.payAmt=res.result.payAmt;  //购物币
                this.insuranceAmt=res.result.insuranceAmt;
                this.outMultiple=res.result.outMultiple;
              }else {
                this.showAlert = true;
                this.alertText = res.msg;
                if (res.code==0 || res.code==-1) {
                  localStorage.clear();
                }
              }
            },
            closeActive(){
              this.show_invite = false;
            },
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .upGradeContainer{
        background-color:white;
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .selCardType{
      background-color:#fff;
      .title{
        font-size:0.70rem;
        font-family: "黑体", Verdana, Arial, Helvetica, sans-serif;
        padding:15px 20px;
      }
    }
    .info-data{
         width:98%;
         margin-top: 3%;
         box-sizing: border-box;
         ul{
             .info-data-link{
                 float:left;
                 width:19.9%;
                 display:inline-block;
                 border-right:1px solid #fcfcfc;
                 span{
                     display:block;
                     width:100%;
                     text-align:center;
                 }
                 .info-data-top-right{
                     @include sc(.55rem,#333);
                     text-align:right;
                     img{
                        width:0.65rem;
                     }
                 }
                 .info-data-top{
                     @include sc(.55rem,#333);
                     img{
                        width:2rem;
                     }
                 }
                 .info-data-middle{
                     @include sc(.57333rem,#666);
                     font-weight:400;

                 }
                 .info-data-bottom{
                     @include sc(.57333rem,#666);
                     font-weight:400;
                     text-align:center;
                     img{
                         padding:0 10;
                         text-align:left;
                     }
                 }
             }
             .info-data-link:nth-of-type(4){
                 border:0;
             }
         }
    }
    .active_container{
        margin: 0.5rem 0.5rem;
        @include sc(.7rem, #fff);
        background-color: #3b95e9;
        padding: .5rem 0.5rem;
        border: 1px;
        margin-bottom: 2%;
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
    .change_to_text{
        background-color: #4cd964;
    }

    .middle{
        background-color:#F5F5F5;
        margin-top: 3%;
        padding:10px 0px 10px;
        span, b{
            font-size: 17px;
            color: grey;
        }
        .registerCode{
          margin-left:7%;
        }
        .activeCode{
          position: absolute;
          margin-top: 1%;
          left:55%;
        }
        .tradeAmt{
          margin-left:7%;
        }
        .payAmt{
          position: absolute;
          margin-top: 1%;
          left:55%;
        }
    }

    .fillInformation{
        margin-top:3%;
        .title{
          margin-left: 30%;
          font-size:0.80rem;
          font-family: "黑体", Verdana, Arial, Helvetica, sans-serif;
          padding:15px 20px;
        }
        .input_container{
            margin-top: 20px;
            font-size: 0.75rem;
            font-weight:500;
            width:90.5%;
            display:block;
            div{
              padding: .15rem .15rem;
              text-align:right;
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
            span{
              font-size:14px;
            }
        }
    }

    .coverpart{
        @include wh(100%,100%);
        @include allcover;
        .cover-background{
            @include wh(100%,132%);
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
            padding-top:3%;
            padding-bottom:5%;
            position:fixed;
            top:35%;
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
                  top: 0;
                  left: 10px;
                  font-size: 30px;
                  width: 16px;
                  height: 100%;
                  line-height: 30px;
                  color: #ccc;
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
