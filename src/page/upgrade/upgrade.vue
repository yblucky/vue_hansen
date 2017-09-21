<template>
    <div class="upGradeContainer">
        <head-top :head-title="'普卡用户升级'" goBack="true">
            <div slot="changeLogin" class="jumpRecord">
              <router-link to="/upgradeRecord" >升级记录</router-link>
            </div>
        </head-top>
        <section class="category_title">
            <span :class="{choosed: active === 2}" @click="selUpWay(2)">补差升级</span>
            <span :class="{choosed: active === 3}" @click="selUpWay(3)">覆盖升级</span>
        </section>

        <div class="selCardType">
          <span class="title">选择账户等级</span>
          <section class="info-data">
              <ul class="clear">
                  <!-- <li @click="selCard(item.grade)"   class="info-data-link" v-for="(item,index) in cardGradeList"> -->
                    <li @click=""   class="info-data-link" v-for="(item,index) in cardGradeList">
                      <span class="info-data-top-right">
                        <img v-if='selCardType==item.grade' src="../../images/check.png"/>
                        <img v-else src="../../images/uncheck.png"/>
                      </span>
                      <span class="info-data-top"><img src="../../images/vipCard.png" class="vip" /></span>
                      <span class="info-data-middle">{{item.remark}}</span>
                      <!-- <div class="info-data-bottom">{{item.insuranceAmt}}</div> -->
                  </li>
              </ul>
          </section>
        </div>

        <section class="input_container">
          <div>
            <span>最大收益：</span>
            <input type="text" readOnly="true" placeholder="最大收益" v-model.lazy="cardMaxproft">
          </div>
          <div style="padding-left:5.5%;">
            <span>消费码：</span>
            <input type="text" readOnly="true" placeholder="补充消费码：" v-model.lazy="needActiveNum">
          </div>
          <div style="padding-left:5.5%;">
            <span>购物币：</span>
            <input type="text" readOnly="true" placeholder="补充购物币：" v-model.lazy="needBuyNum">
          </div>
          <div style="padding-left:5.5%;">
            <span>交易币：</span>
            <input type="text" readOnly="true" placeholder="补充交易币：" v-model.lazy="needChangeNum">
          </div>
        </section>
        <div class="active_container" @click="">暂不开启</div>
        <!-- <div class="active_container" @click="doUpgrade()">升级</div> -->

        <section class="coverpart" v-if="showLoading">
            <section class="cover-background"></section>
            <section class="cover-content">
                <loading></loading>
            </section>
        </section>

        <payPwd @pwdCompleted="upGradeAction($event)" v-if="showPwd" :showHide="showPwd" @closePwd='closePwd'></payPwd>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <!-- <foot-guide></foot-guide> -->
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import payPwd from 'src/components/common/payPwd'
    import footGuide from 'src/components/footer/footGuide'
    import {localapi, proapi, imgBaseUrl,getUserInfo} from 'src/config/env'
    import {memberUpgrade,findCardGradeList,findCardGrade,findDifferInfoCardGrade,getUser} from '../../service/getData'
    import {mapState, mapMutations} from 'vuex'
    import loading from 'src/components/common/loading'

    export default {
        data(){
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                active:2, //升级方式
                selCardType: 1, //升级等级
                cardMaxproft: 0, //最大收益
                needActiveNum:0,//需要补充激活码数量
                needBuyNum:0,//需要补充购物币数量
                needChangeNum:0,//需要补充交易数量
                password:'',//密码
                isUpgrade:false,
                showPwd:false,
                cardGradeList:[],
                userActiveCodeNo:0,
                userPayAmt:0,
                userTradeAmt:0,
                userMaxProfits:0,
                cardGrade:0,
                showLoading:false,
            }
        },
        //初始化数据
        created(){
          this.initData();
          this.findCardGradeList();
        },
        components: {
            headTop,
            alertTip,
            footGuide,
            payPwd,
            loading,
        },
        computed: {
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1\d{10}$/gi.test(this.phoneNumber)
            },

        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            toggleTabs (index,tabText) {
                 this.active = index;
             },
             async findCardGradeList(){
               let res =  await findCardGradeList();
               if (res.code==200) {
                //  console.log(res);
                 this.cardGradeList= res.result;
               }else {
                 this.showAlert = true;
                 this.alertText = res.msg;
               }
             },
             //获取会员等级信息
             async selCard (index) {
                  if(this.cardGrade >= index){
                    this.showAlert = true;
                    this.alertText = "选择账户等级不能小于当前用户等级";
                    return;
                  }

                  //显示loading
                  this.showLoading = true;
                  let res;
                  //从后台获取等级信息
                  if (this.active==2) {
                     //选择哪个就升级到哪个
                    res= await findDifferInfoCardGrade(index);
                  }else if (this.active==3) {
                    //补足差额
					          res= await findCardGrade(index);
                  }
                  this.selCardType = index;

                  if(res.code == 200){
                    this.showLoading = false;
                    this.cardMaxproft=res.result.maxProfits; //最大收益
                    this.needActiveNum=res.result.activeCodeNo//需要补充激活码数量
                    this.needBuyNum=res.result.payAmt//需要补充购物币数量
                    this.needChangeNum=res.result.tradeAmt//需要补充交易数量
                  }else {
                    this.showLoading = false;
                    this.showAlert = true;
                    this.alertText = res.msg;
                    if(res.code==0 || res.code==-1){
                      localStorage.clear();
                    }
                  }
              },
              //选择升级方式
              selUpWay(index){
                this.active = index;
                this.selCard(this.cardGrade+1);
              },
              //是否弹出密码框
              doUpgrade(){
                if(this.needActiveNum>this.userActiveCodeNo){
                  this.showAlert = true;
                  this.alertText = "您的激活码不足，请先充值激活码";
                  return;
                }
                if(this.needBuyNum>this.userPayAmt){
                  this.showAlert = true;
                  this.alertText = "您的购物币不足，请先充值购物币";
                  return;
                }
                if(this.needBuyNum>this.userTradeAmt){
                  this.showAlert = true;
                  this.alertText = "您的交易币不足，请先充值交易币";
                  return;
                }
                if(this.cardGrade >= this.selCardType && this.active == 2){
                    this.showAlert = true;
                    this.alertText = "原点升级的卡片等级不能小于已有等级";
                    return;
                }
                this.showPwd=true;
              },
            //升级
            async upGradeAction(pwd){
                this.closePwd();
                //显示刷新
                this.showLoading=true;
                //触发会员升级方法
                let rs = await memberUpgrade(this.active,this.selCardType,pwd);
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (rs.code == 200) {
                    this.showLoading = false;
                    this.showAlert = true;
                    this.alertText = '升级成功';
                    this.isUpgrade=true;
                }else{
                  this.showLoading = false;
                  this.showAlert = true;
                  this.alertText = rs.msg;
                  if (res.code==0 || res.code==-1) {
                     localStorage.clear();
                  }
                  //刷新页面
                  if(localStorage.getItem("token") == null){
                    this.isLogin("/login");
                    //刷新页面
                    location.reload();
                  }
                }
            },
            async initData(){
              this.showLoading = true;
              //获取用户信息接口
              let res = await getUser();
              if(res.code == 200){
                  this.showLoading = false;
                  this.userActiveCodeNo=res.result.activeCodeNo;
                  this.userPayAmt=res.result.payAmt;
                  this.userTradeAmt=res.result.tradeAmt;
                  this.userMaxProfits=res.result.maxProfits;
                  this.cardGrade=res.result.cardGrade;
                  this.selCard(this.cardGrade+1);
              }else {
                this.showLoading = false;
                this.showAlert = true;
                this.alertText = res.msg;
                if(res.code==0 || res.code==-1){
                  localStorage.clear();
                }
              }
            },
            closeTip(){
                this.showAlert = false;
                if(this.isUpgrade){
                  this.$router.push("/profile");
                }
            },
            closePwd(){
                this.showPwd = false;
            },
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
    .jumpRecord{
        position: absolute;
        @include ct;
        right: 0.75rem;
        @include sc(.7rem, #fff);
    }
    .selCardType{
      background-color:#fff;
      border-bottom: 2px solid #eee;
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
                     margin-bottom: 25%;
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
        border-radius: 0.15rem;
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
    .input_container{
        font-size: 0.75rem;
        font-weight:500;
        margin-top: 5%;
        width:100%;
        text-align:center;
        display:block;
        /*background-color: rgba(210, 215, 218, 0.32);*/
        background-color: $fc;
        div{
          padding: .15rem .15rem;
        }
        input{
            @include sc(0.85rem, #666);
            border:1px solid #dedede;
            width:8rem;
            height:1.45rem;
            text-align: center;
            border-radius: 0.6rem;
        }
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
