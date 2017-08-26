<template>
    <div class="profile_page">
        <head-top :head-title="profiletitle" style="background-color:white;">
            <div slot="changeLogin" class="change_login">
              <router-link to="/message" >
                  <img v-if="messageCount === 0" src="../../hsimages/26.png" />
                  <img v-else src="../../hsimages/27.png" />
              </router-link>
            </div>
            <div slot="changeLogin" class="message_count">
              <span v-if="messageCount">{{messageCount}}</span>
            </div>
        </head-top>
        <section>
            <section class="profile-number">
                <ul class="profile-link">
                    <!--<img :src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo&&userInfo.user_id">-->
                  <img src="../../hsimages/1.png" class="privateImage" />
                  <!--  <span class="privateImage" v-else>
                        <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>-->
                    <div class="user-info">
                        <p class="nickName">
                            <b>{{nickName}} </b>
                        </p>
                        <!-- <p>
                            <span class="icon-mobile-number"><b></b></span>
                        </p> -->
                        <p>
                          <img src="../../hsimages/22.png" class="vip22" algin="middle" />
                          <span class="icon-mobile-number2">普通会员</span>
                        </p>
                    </div>

                    <div class="rightdiv">
                      <b>普卡账户</b>
                      <span class="icon-mobile-number1">
                           <router-link to="/upgrade" class="info-data-link">
                                <img src="../../hsimages/23.png" class="vip22" algin="middle" />
                           </router-link>
                      </span>
                    </div>

                    <!-- <div class="bottomdiv">
                        <progress></progress>
                    </div> -->

                    <!-- <span class="arrow">
                        <svg class="arrow-svg" fill="#fff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span> -->
                </ul>
            </section>
            <section class="info-data">
                <ul class="clear">
                    <router-link to="/pay" tag="li" class="info-data-link">
                        <img src="../../hsimages/36.png" class="vip22" />
                        <span class="info-data-middle"><b>{{parseInt(payAmt).toFixed(2)}}</b></span>
                        <span class="info-data-bottom">购物币</span>
                    </router-link>
                    <router-link to="/trade" tag="li" class="info-data-link">
                        <img src="../../hsimages/37.png" class="vip22" />
                        <span class="info-data-middle"><b>{{parseInt(tradeAmt).toFixed(2)}}</b></span>
                        <span class="info-data-bottom">交易币</span>
                    </router-link>
                    <router-link to="/equity" tag="li" class="info-data-link">
                        <img src="../../hsimages/38.png" class="vip22" />
                        <span class="info-data-middle"><b>{{parseInt(equityAmt).toFixed(2)}}</b></span>
                        <span class="info-data-bottom">翰森股权</span>
                    </router-link>
                </ul>
            </section>

            <section class="profile-1reTe">
                <ul class="clear">
                    <router-link to="/transfer" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <img src="../../hsimages/13.png" class="vip" />
                        </span>
                        <span class="info-data-bottom">转账汇款</span>
                    </router-link>
                    <router-link to="/myReward" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../hsimages/14.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">任务奖励</span>
                    </router-link>
                    <router-link to="/staticProfit" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../hsimages/15.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">静态分红</span>
                    </router-link>
                </ul>

                <ul class="clear">
                    <router-link to="/activateCode" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <img src="../../hsimages/16.png" class="vip" />
                        </span>
                        <span class="info-data-bottom">我的激活码</span>
                    </router-link>
                    <router-link to="/registerCode" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../hsimages/17.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">我的注册码</span>
                    </router-link>
                    <router-link to="/inviteUser" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../hsimages/18.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">邀请会员</span>
                    </router-link>
                </ul>

                <ul class="clear">
                    <router-link to="/profile/info" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <img src="../../hsimages/19.png" class="vip" />
                        </span>
                        <span class="info-data-bottom">资料修改</span>
                    </router-link>
                    <router-link to="/forget" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../hsimages/20.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">修改密码</span>
                    </router-link>
                    <router-link to="/myTeam" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../hsimages/21.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">我的团队</span>
                    </router-link>
                </ul>
            </section>
        </section>

        <section class="coverpart" v-if="show">
            <section class="cover-background"></section>
            <section class="cover-content">
                <span class="redbao_text">{{parseFloat(showMoney).toFixed(2)}}</span>
                <img src="../../hsimages/46.png" class="redbao" />
                <img src="../../hsimages/47.png" class="redbao_button" @click="closeRedBao" />
            </section>
        </section>

        <div class="login_container" @click="exitlogin">退出登录</div>
        <!-- <foot-guide></foot-guide> -->
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
import alertTip from '../../components/common/alertTip'
// import footGuide from 'src/components/footer/footGuide'
import progress from 'src/components/progressBar/progress'
import {mapState, mapMutations} from 'vuex'
import {imgBaseUrl,token,setToken,isLogin,getLoginUserInfo} from 'src/config/env'
import {getImgPath} from 'src/components/common/mixin'
import {rewardsign} from '../../service/getData'

export default {
    data(){
        return{
            profiletitle: '翰森国际理财计划',
            username: '',           //用户名
            resetname: '',
            mobile: 'HS10000',             //电话号码
            balance: 0,            //我的余额
            count : 0,             //优惠券个数
            pointNumber : 0,       //积分数
            avatar: '',             //头像地址
            imgBaseUrl,
            messageCount:10,           //消息个数
            token,
            show:false,             //是否显示红包
            showMoney:0.00,         //显示红包金额
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容

            id:"A085DEB2E34941B046CDA5107DB24BFD",
            uid:100000,
            loginName:"test01",
            phone:"",
            userName:null,
            nickName:"test01",
            sex:1,
            headImgUrl:"",
            createTime:1503493225000,
            remark:null,
            grade:0,
            cardGrade:0,
            releaseTime:null,
            equityAmt:0,
            payAmt:0,
            tradeAmt:0,
            insuranceAmt:0,
            maxProfits:0,
            sumProfits:0,
            cashOutProfits:0,
            contactUserId:"0.0000",
            activeCodeNo:0,
            registerCodeNo:0,
            remainTaskNo:0,
            forzenPayAmt:0,
            forzenTradeAmt:0,
            forzenEquityAmt:0,
            inPayAddress:'',
            inTradeAddress:'',
            inEquityAddress:'',
            outPayAddress:'',
            outEquityAddress:'',
            outTradeAddress:''
        }
    },
    created(){
        this.showRedBao();
    },
    mounted(){
      this.isLogin("/login");
      this.initData();
    },
    mixins: [getImgPath,setToken,isLogin,getLoginUserInfo],
    components:{
        headTop,
        alertTip,
        // footGuide,
    },

    computed:{
        ...mapState([
            'userInfo',
        ]),
        //后台会返回两种头像地址格式，分别处理
        imgpath:function () {
            let path;
            if(this.avatar.indexOf('/') !==-1){
                path = imgBaseUrl +　this.avatar;
            }else{
                path = this.getImgPath(this.avatar)
            }
            this.SAVE_AVANDER(path);
            return path;
        }
    },
    methods:{
        ...mapMutations([
            'SAVE_AVANDER'
        ]),
        async showRedBao(){
            //调用领取红包接口
            let res = await rewardsign();
            if(res.code == 200){
                //判断红包是否可以打开
                if(res.result.isCanSign){
                  //如果是true，就弹出红包，并将金额覆盖
                  this.show = true;
                  this.showMoney = res.result.amt;
                }
                // this.showAlert = true;
                // this.alertText = res.result.amt;
            }else {
              this.showAlert = true;
              this.alertText = res.msg;
            }

        },
        initData(){
          //  console.log(this.getLoginUserInfo("token"));
          //  console.log(this.getLoginUserInfo("id"));
          //  console.log(this.getLoginUserInfo("nickName"));

           this.id=this.getLoginUserInfo("id");
           this.phone=this.getLoginUserInfo("phone");
           this.uid=this.getLoginUserInfo("uid");
           this.loginName=this.getLoginUserInfo("loginName");
           this.userName=this.getLoginUserInfo("userName");
           this.nickName=this.getLoginUserInfo("nickName");
           this.sex=this.getLoginUserInfo("sex");
           this.headImgUrl=this.getLoginUserInfo("headImgUrl");
           this.createTime=this.getLoginUserInfo("createTime");
           this.remark=this.getLoginUserInfo("remark");
           this.grade=this.getLoginUserInfo("grade");
           this.cardGrade=this.getLoginUserInfo("cardGrade");
           this.releaseTime=this.getLoginUserInfo("releaseTime");
           this.equityAmt=this.getLoginUserInfo("equityAmt");
           this.payAmt=this.getLoginUserInfo("payAmt")
           this.tradeAmt=this.getLoginUserInfo("tradeAmt");
           this.insuranceAmt=this.getLoginUserInfo("insuranceAmt");
           this.maxProfits=this.getLoginUserInfo("maxProfits");
           this.sumProfits=this.getLoginUserInfo("sumProfits");
           this.cashOutProfits=this.getLoginUserInfo("cashOutProfits");
           this.contactUserId=this.getLoginUserInfo("contactUserId");
           this.activeCodeNo=this.getLoginUserInfo("activeCodeNo");
           this.registerCodeNo=this.getLoginUserInfo("registerCodeNo");
           this.remainTaskNo=this.getLoginUserInfo("remainTaskNo");
           this.forzenPayAmt=this.getLoginUserInfo("forzenPayAmt");
           this.forzenTradeAmt=this.getLoginUserInfo("forzenTradeAmt");
           this.forzenEquityAmt=this.getLoginUserInfo("forzenEquityAmt");
           this.inPayAddress=this.getLoginUserInfo("inPayAddress");
           this.inTradeAddress=this.getLoginUserInfo("inTradeAddress");
           this.inEquityAddress=this.getLoginUserInfo("inEquityAddress");
           this.outPayAddress=this.getLoginUserInfo("outPayAddress");
           this.outEquityAddress=this.getLoginUserInfo("outEquityAddress");
           this.outTradeAddress=this.getLoginUserInfo("outTradeAddress");
            // if (this.userInfo && this.userInfo.user_id) {
            //     this.tradeAmt = this.userInfo.avatar;
            //     this.username = '理财大神';
            //     this.mobile = this.userInfo.mobile || 'HS10000';
            //     this.balance = this.userInfo.balance;
            //     this.count = this.userInfo.gift_amount;
            //     this.pointNumber = this.userInfo.point;
            // }else{
            //     this.username = '登录/注册';
            //     this.mobile = '13680334542';
            // }
        },
        exitlogin(){
          localStorage.removeItem("token");
          localStorage.removeItem("loginUserInfo");
          this.$router.push("/login");
        },
        //关闭红包
        closeRedBao(){
          this.show = false;
        },
        closeTip(){
            this.showAlert = false;
        }
    },
    watch: {
        userInfo: function (value){
            this.initData()
        }
    }
}

</script>

<style lang="scss" scoped>
  @import "../../../src/style/mixin.scss";

    .profile_page{
        background-color: white;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
   .profile-number{
        padding-top:1.95rem;
        .profile-link{
            display:block;
            display:flex;
            box-align: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            background:white;
            padding: .666667rem .6rem;
            .privateImage{
                display:inline-block;
                @include wh(3.5rem,3.5rem);
                border-radius:50%;
                vertical-align:middle;
                .privateImage-svg{
                    background:$fc;
                    border-radius:50%;
                    @include wh(2.5rem,2.5rem);
                }
            }
            .user-info{
                margin-left:.88rem;
                -webkit-box-flex: 1;
                -ms-flex-positive: 1;
                flex-grow: 1;
                .nickName{
                  position: absolute;
                  top: 10.5%;
                  left: 31%;
                }
                p{
                    font-weight:700;
                    @include sc(.8rem,$fc);
                    .user-icon{
                        @include wh(0.5rem,0.75rem);
                        display:inline-block;
                        vertical-align:middle;
                        line-height:0.75rem;
                        .icon-mobile{
                            @include wh(100%,100%);
                        }
                    }
                    .icon-mobile-number{
                        display:inline-block;
                        @include sc(.87333rem,$fc);

                    }
                    .icon-mobile-number2{
                        display:inline-block;
                        @include sc(.57333rem,$fc);
                        position: absolute;
                        top: 15.2%;
                        left: 36.9%;
                        color: #919191;

                    }
                    .icon-mobile-number1{
                        margin-left:20%;
                        @include sc(.57333rem,$fc);

                    }
                    .vip{
                        vertical-align:middle;
                        display:inline-block;
                    }
                    .vip22{
                      position: absolute;
                      top: 15%;
                      left: 31%;
                      vertical-align:middle;
                      display:inline-block;
                      width:3.5rem;
                    }
                    b{
                      color: #6E6E6E;
                      font-weight:600;
                    }
                }

            }
            .arrow{
                @include wh(.46667rem,.98rem);
                display:inline-block;
                svg{
                   @include wh(100%,100%);
                }
            }
            .rightdiv{
              position: absolute;
              top: 10%;
              left:75%;
              .vip22{
                vertical-align:middle;
                display:inline-block;
                width:3rem;
              }
              b{
                font-size: 17px;
                color: #8A8A8A;
              }
            }
        }
   }
   .info-data{
        width:100%;
        background:$fc;
        box-sizing: border-box;
        border-top:1px solid #f1f1f1;
        ul{
            .info-data-link{
                float:left;
                width:33.33%;
                display:inline-block;
                border-right:1px solid #f1f1f1;
                span{
                    display:block;
                    width:100%;
                    text-align:center;
                }
                .vip22{
                  margin-top:15%;
                  margin-left: 23%;
                  vertical-align:bottom;
                  width:2.5rem;
                }
                .info-data-top{
                    @include sc(.55rem,#333);
                    padding: .853333rem 0 .453333rem;
                    b{
                        display:inline-block;
                        @include sc(1.2rem,#f90);
                        font-weight:700;
                        line-height:1rem;
                        font-family: Helvetica Neue,Tahoma;
                    }
                }
                .info-data-middle{
                    @include sc(.55rem,#333);
                    padding: .553333rem 0 .453333rem;
                    b{
                        display:inline-block;
                        @include sc(0.8rem,#f90);
                        font-weight:700;
                        line-height:0.5rem;
                        font-family: Helvetica Neue,Tahoma;
                    }
                }
                .info-data-bottom{
                    @include sc(.57333rem,#666);
                    font-weight:700;
                    padding-bottom:.453333rem;

                }

            }
            .info-data-link:nth-of-type(2){
                .info-data-top{
                    b{
                        color:#ff5f3e;
                    }
                }

            }
            .info-data-link:nth-of-type(3){
                border:0;
                .info-data-top{
                    b{
                        color:#6ac20b;
                    }
                }
            }
        }
   }

   .profile-1reTe{
        border-top: 1px solid #f1f1f1;
        /*margin-top:.9rem;*/
        /*background:#F0F0F0;*/
        background:white;
        ul{

            .info-data-link{
                float:left;
                margin-left: 6%;
                width:27.33%;
                display:inline-block;
                span{
                    display:block;
                    width:100%;
                    text-align:center;
                    background-color:white;
                }
                .info-data-top{
                    @include sc(.55rem,#333);
                    padding: .853333rem 0 .453333rem;
                }
                .info-data-bottom{
                    @include sc(.57333rem,#666);
                    font-weight:400;
                    padding-bottom:.453333rem;

                }
                img{
                  width:1.8rem;
                }
            }

            .info-data-link:nth-of-type(1){
                margin-left:3%;
            }
        }
    }

    .change_login{
        position: absolute;
        @include ct;
        top:1.1rem;
        right: 0.65rem;
        @include sc(.8rem, #fff);
    }
    .message_count{
      position: absolute;
      @include ct;
      top:0.5rem;
      right: 0.85rem;
      @include sc(.7rem, #fff);
      span{
        color: white;
      }
    }

    .login_container{
        margin-top: 5%;
        margin-left: 10%;
        margin-bottom: 2%;
        width:80%;
        @include sc(.7rem, #fff);
        background-color: #3b95e9;
        padding: .5rem 0;
        border: 1px;
        border-radius: 1rem;
        text-align: center;
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

    body .coverpart .cover-animate{
        transition:all 1s;
        animation:bounceIn .6s;
    }
    body .coverpart .cover-animate-leave{
        animation:zoomOut .4s;
    }

</style>
