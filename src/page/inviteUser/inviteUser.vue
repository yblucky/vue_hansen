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

        <div class="middle">
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
        </div>

        <div class="fillInformation">
            <span class="title">填写基本资料</span>
            <section class="input_container">
              <div>
                <span>手机号：</span>
                <input type="text" name="phone" v-model.lazy="phone">
              </div>
              <div>
                <span>邮箱：</span>
                <input type="text" name="email" v-model.lazy="email">
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
                <input type="text" name="password" v-model.lazy="password">
              </div>
              <div>
                <span>确认密码：</span>
                <input type="text" name="confirmPassword" v-model.lazy="confirmPassword">
              </div>
              <div>
                <span>高级密码：</span>
                <input type="text" name="payword" v-model.lazy="payword">
              </div>
              <div>
                <span>确认高级密码：</span>
                <input type="text" name="confirmPayWord" v-model.lazy="confirmPayWord">
              </div>
            </section>
            <div class="active_container" @click="innerCreateUserAction">注册</div>
        </div>

        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <!-- <foot-guide></foot-guide> -->
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {isLogin,getLoginUserInfo} from 'src/config/env'
    import {findCardGrade,findCardGradeList,innerCreateUser} from '../../service/getData'

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
               console.log(index);
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
                if (!this.email) {
                  this.showAlert = true;
                  this.alertText = '邮箱不能为空';
                  return;
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
                  this.alertText = '两次登录密码不能为空';
                  return;
                }
                if (!this.payword) {
                  this.showAlert = true;
                  this.alertText = '支付密码不能为空';
                  return;
                }
                if (!this.confirmPayWord) {
                  this.showAlert = true;
                  this.alertText = '确认支付密码不能为空';
                  return;
                }
                if (this.confirmPayWord!=this.payword) {
                  this.showAlert = true;
                  this.alertText = '两次支付密码不能为空';
                  return;
                }
                let res = await innerCreateUser(this.phone,this.phone,this.email,this.cardGrade,this.password,this.confirmPassword,this.payword,this.confirmPayWord,parseInt(this.firstReferrer),this.contactUserId);
                if (res.code==200) {
                  this.showAlert = true;
                  this.alertText = res.msg;
                }else {
                  this.showAlert = true;
                  this.alertText = res.msg;
                }
            },
            async initData(){
               this.cardGrade=1;
               this.id=this.getLoginUserInfo("id");
               this.phone=this.getLoginUserInfo("phone");
               this.uid=this.getLoginUserInfo("uid");
               this.headImgUrl=this.getLoginUserInfo("headImgUrl");
               this.firstReferrer=this.uid;
               this.contactUserId=this.uid;
               console.log(this.cardGrade);
               this.findCardGrade();
               this.findCardGradeList();
               console.log(this.cardGrade);
            },
            async  findCardGradeList(){
              let res =  await findCardGradeList();
              if (res.code==200) {
                console.log(res);
                this.cardGradeList= res.result;
              }else {
                this.showAlert = true;
                this.alertText = res.msg;
              }
            },
            async  findCardGrade(){
              let res =  await findCardGrade(this.cardGrade);
              if (res.code==200) {
                console.log(res);
                this.registerCodeNo= res.result.registerCodeNo; //注册码
                this.activeCodeNo= res.result.activeCodeNo; //激活码
                this.tradeAmt=res.result.tradeAmt;//交易币
                this.payAmt=res.result.payAmt;  //购物币
                this.insuranceAmt=res.result.insuranceAmt;
                this.outMultiple=res.result.outMultiple;
              }else {
                this.showAlert = true;
                this.alertText = res.msg;
              }
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

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
    .upGradeContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .active_container{
        margin: 0.5rem 0.5rem;
        @include sc(.7rem, #fff);
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
          margin-left: 36%;
          font-size:0.80rem;
          font-family: "黑体", Verdana, Arial, Helvetica, sans-serif;
          padding:15px 20px;
        }
        .input_container{
            margin-top: 20px;
            font-size: 0.75rem;
            font-weight:500;
            width:89.5%;
            display:block;
            div{
              padding: .15rem .15rem;
              text-align:right;
            }
            input{
                @include sc(0.85rem, #666);
                border:1px solid #dedede;
                width:9rem;
                height:1.45rem;
                font-size: 16px;
                text-align: center;
            }
            span{
              font-size:16px;
            }
        }

    }


</style>
