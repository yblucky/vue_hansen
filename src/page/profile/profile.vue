<template>
    <div class="profile_page">
        <head-top :head-title="profiletitle" style="background-color:white;">
            <div slot="changeLogin" class="change_login">
              <router-link to="/message" >
                  <img v-if="messageCount != 0" src="../../hsimages/26.png" />
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
                  <span v-if="headImgUrl == null"><img src="../../hsimages/1.png" class="privateImage" /></span>
                  <span v-else><img :src="headImgUrl" class="privateImage" /></span>
                    <div class="user-info">
                        <p class="nickName">
                            <b>{{uid}} </b><span style="font-size:14px;font-weight:700;">(uid)</span>
                        </p>
                        <!-- <p>
                            <span class="icon-mobile-number"><b></b></span>
                        </p> -->
                        <p>
                          <img src="../../hsimages/22.png" class="vip22" algin="middle" />
                          <span v-if="this.grade == 0" class="icon-mobile-number2">{{gradeName}}</span>
                          <span v-else class="icon-mobile-number3">{{gradeName}}</span>
                        </p>
                    </div>

                    <div class="rightdiv">
                      <b>{{cardName}}</b>
                      <span class="icon-mobile-number1">
                           <router-link to="/upgrade" class="info-data-link">
                                <!-- <img v-if="this.status != 3" src="../../hsimages/23.png" class="vip22" algin="middle" /> -->
                                <img v-if="status == 3 && cardGrade != 5" src="../../hsimages/23.png" class="vip22" algin="middle" />
                           </router-link>
                           <img v-if="status == 5" @click="intervalActicePage" src="../../hsimages/51.png" class="vip23" algin="middle" />
                      </span>
                    </div>
                </ul>
            </section>
            <section class="info-data">
                <ul class="clear">
                    <router-link to="" tag="li" class="info-data-link">
                        <!-- <img src="../../hsimages/10.png" class="vip22" /> -->
                        <span class="info-data-bottom">最大收益</span>
                        <span class="info-data-middle"><b>{{parseFloat(maxProfits).toFixed(2)}}</b></span>
                    </router-link>
                    <router-link to="" tag="li" class="info-data-link">
                        <!-- <img src="../../hsimages/11.png" class="vip22" /> -->
                        <span class="info-data-bottom">动态奖金</span>
                        <span class="info-data-middle"><b>{{parseFloat(dynamicProfits).toFixed(2)}}</b></span>
                    </router-link>
                    <router-link to="" tag="li" class="info-data-link">
                        <!-- <img src="../../hsimages/11.png" class="vip22" /> -->
                        <span class="info-data-bottom">冻结收益</span>
                        <span class="info-data-middle"><b>{{parseFloat(sumFrozenProfits).toFixed(2)}}</b></span>
                    </router-link>
                    <router-link to="" tag="li" class="info-data-link">
                        <!-- <img src="../../hsimages/12.png" class="vip22" /> -->
                        <span class="info-data-bottom">释放奖金</span>
                        <span class="info-data-middle"><b>{{parseFloat(sumProfits).toFixed(2)}}</b></span>
                    </router-link>
                    <div class="bottomdiv" v-if="progressText > 0.001">
                        <!-- <progressbar :value="progressText"  animate="animate"></progressbar> -->
                        <progressbar :value="progressText"  animate="animate"></progressbar>
                    </div>
                </ul>
            </section>
            <section class="profile-1reTe">
                <ul class="clear">
                    <router-link to="/digitalAsset" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <img src="../../hsimages/13.png" class="vip" />
                        </span>
                        <span class="info-data-bottom">数字资产</span>
                    </router-link>
                    <router-link to="/dynamicProfit" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../hsimages/14.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">奖金列表</span>
                    </router-link>
                    <router-link to="/taskInfo" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../hsimages/15.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">任务列表</span>
                    </router-link>
                </ul>

                <ul class="clear">
                    <router-link to="/activateCode" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <img src="../../hsimages/16.png" class="vip" />
                        </span>
                        <span class="info-data-bottom">我的消费码</span>
                    </router-link>
                    <router-link to="/financial" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../hsimages/17.png" class="vip" />
                      </span>
                        <!-- <span class="info-data-bottom">我的注册码</span> -->
                        <span class="info-data-bottom">财务中心</span>
                    </router-link>
                    <router-link to="/inviteQrcode" tag="li" class="info-data-link">
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
                        <!-- <span class="info-data-bottom">财务中心</span> -->
                        <span class="info-data-bottom">密码修改</span>
                    </router-link>
                    <router-link to="/myTeam" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../hsimages/21.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">我的团队</span>
                    </router-link>
                </ul>
                <!-- <ul class="clear">
                    <router-link to="/profile/info" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <img src="../../hsimages/19.png" class="vip" />
                        </span>
                        <span class="info-data-bottom">财务中心</span>
                    </router-link>
                </ul> -->
            </section>
        </section>

        <!-- 显示红包 -->
        <section class="coverpart" v-if="show">
            <section class="cover-background"></section>
            <section class="cover-content">
                <span class="redbao_text">{{parseFloat(showMoney).toFixed(2)}}</span>
                <img src="../../hsimages/46.png" class="redbao" />
                <img src="../../hsimages/47.png" class="redbao_button" @click="closeRedBao" />
            </section>
        </section>

        <!-- 显示激活页面 -->
        <section class="coverpart_active" v-if="show_active">
            <section class="cover-background"></section>
            <section class="cover-content">
              <div class="head">
                  <span class="close" @click="closeActive">×</span>
                  <h4>账户激活</h4>
              </div>
              <div class="middle">
                  <p style="padding-left:7%;"><span style="font-size:10px;">购物币地址：{{inPayAddress}}</span></p>
                  <p style="padding-left:7%;padding-top:2%;"><span style="font-size:10px;">交易币地址：{{inTradeAddress}}</span></p>
                  <p style="padding-left:7%;padding-top:2%;"><span style="font-size:10px;">需充值购物币数量：<b>{{parseFloat(needBuyPayAmt).toFixed(4)}}</b><b style="padding-left:5%;">1GWC</b><b style="padding-left:5%;">约{{parseFloat(payConverRmbScale).toFixed(2)}}元</b></span></p>
                  <p style="padding-left:7%;padding-top:2%;"><b style="font-size:15px;font-weight:bold;">购物币余额：{{parseFloat(payAmt).toFixed(4)}}</b></p>
                  <p style="padding-left:7%;padding-top:2%;"><span style="font-size:10px;">需充值交易币数量：<b>{{parseFloat(needBuyTradeAmt).toFixed(4)}}</b><b style="padding-left:5%;">1JYC</b><b style="padding-left:5%;">约{{parseFloat(tradeConverRmbScale).toFixed(2)}}元</b></span></p>
                  <p style="padding-left:7%;padding-top:2%;"><b style="font-size:15px;font-weight:bold;">交易币余额：{{parseFloat(tradeAmt).toFixed(4)}}</b></p>
              </div>
              <div class="active_container" @click="active">激活</div>
            </section>
        </section>

        <!-- 激活码已过期，显示激活页面 -->
        <section class="coverpart_active" v-if="show_expire">
            <section class="cover-background"></section>
            <section class="cover-content">
              <div class="head">
                  <span class="close" @click="closeExpire">×</span>
                  <h4>消费码已过期</h4>
              </div>
              <div class="middle">
                  <p style="text-align:center;padding-top:2%;"><b style="font-size:20px;font-weight:bold;">账户消费码：{{activeCodeNo}}</b><span v-if="activeCodeNo < weekActiveCode" style="font-size:13px;margin-left:5%;">(余额不足)</span></p>
                  <p style="text-align:center;padding-top:2%;"><b style="font-size:18px;font-weight:bold;color:red;">激活账户需要{{weekActiveCode}}个消费码</b></p>
              </div>
              <div class="active_container" @click="intervalActice">立即激活</div>
            </section>
        </section>

        <section class="coverpart" v-if="showLoading">
            <section class="cover-background"></section>
            <section class="cover-content">
                <loading></loading>
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
import progressbar from 'src/components/progressBar/progressbar'
import loading from 'src/components/common/loading'
import {mapState, mapMutations} from 'vuex'
import {getImgPath} from 'src/components/common/mixin'
import {rewardsign,activeInfo,activeUser,getUser,intervalActice} from '../../service/getData'
import {isLogin} from 'src/config/env'

export default {
    data(){
        return{
            profiletitle: '瀚森国际社区',
            username: '',           //用户名
            resetname: '',
            mobile: '',             //电话号码
            balance: 0,            //我的余额
            count : 0,             //优惠券个数
            pointNumber : 0,       //积分数
            avatar: '',             //头像地址
            messageCount:10,           //消息个数
            show:false,             //是否显示红包
            showMoney:0.00,         //显示红包金额
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            cardName:null,            //卡的名称
            gradeName:null,         //用户等级
            show_active:false,     //注册成功后的激活页面
            show_expire:false,     //显示激活码过期后的激活页面
            showLoading:false,

            //用户信息
            id:"",
            uid:'',
            loginName:"",
            phone:"",
            userName:null,
            nickName:"",
            sex:1,
            headImgUrl:"",
            createTime:null,
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
            outTradeAddress:'',
            status:0,
            weekActiveCode:0,         //每周激活码
            dynamicProfits:0,         //动态奖金
            sumFrozenProfits:0,       //冻结奖金

            //激活信息
            tradeConverRmbScale:0,    //交易币兑换人民币汇率
            payConverRmbScale:0,      //支付币兑换人民币汇率
            payAmount:0,              //需要支付币的总金额
            tradeAmount:0,            //需要交易币的总金额
            needActiveNum:0,          //需要补充激活码数量
            needBuyTradeAmt:0,        //需要补充交易币数量
            needBuyPayAmt:0,          //需要补充购物币数量
            cardMaxproft:0,           //最大收益
            activeStatus:'',          //激活状态

            //任务列表
            userTaskParams:{
              title:"",
              linkImgPath:"",
              link:"",
              discription:"",//任务描述
              taskType:"",//任务类型
              userTaskId:"",//用户关联任务id
              remark:"",
              status:"",    //任务状态
            },

            //进度条
            progressText:0,
        }
    },
    created(){
        //获取激活信息
        // this.initData();
        // this.activeInfo();
        // this.showRedBao();
        // this.showMessageCount();
    },
    mounted(){

      // this.isLogin("/login");
      //初始化信息
      // this.initData();
      //初始化信息
      //this.initData();
      //获取激活信息
      this.initData();
      this.activeInfo();
      this.showRedBao();
    },
    mixins: [isLogin],
    components:{
        headTop,
        alertTip,
        loading,
        progressbar,
        // footGuide,
    },

    computed:{
        //后台会返回两种头像地址格式，分别处理
        // imgpath:function () {
        //     let path;
        //     if(this.avatar.indexOf('/') !==-1){
        //         path = imgBaseUrl +　this.avatar;
        //     }else{
        //         path = this.getImgPath(this.avatar)
        //     }
        //     this.SAVE_AVANDER(path);
        //     return path;
        // }
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
                if (res.code==0 || res.code==-1) {
                    this.showAlert = true;
                    this.alertText = res.msg;
                    localStorage.clear();
                }
            }

        },
        async initData(){
          //获取用户信息接口
          let res = await getUser();
          if(res.code == 200){
            this.id=res.result.id;
            this.phone=res.result.phone;
            this.uid=res.result.uid;
            this.loginName=res.result.loginName;
            this.userName=res.result.userName;
            this.nickName=res.result.nickName;
            this.sex=res.result.sex;
            this.headImgUrl=res.result.headImgUrl;
            this.createTime=res.result.createTime;
            this.remark=res.result.remark;
            this.grade=res.result.grade;
            this.cardGrade=res.result.cardGrade;
            this.releaseTime=res.result.releaseTime;
            this.equityAmt=res.result.equityAmt;
            this.payAmt=res.result.payAmt;
            this.tradeAmt=res.result.tradeAmt;
            this.insuranceAmt=res.result.insuranceAmt;
            this.maxProfits=res.result.maxProfits;
            this.sumProfits=res.result.sumProfits;
            this.dynamicProfits = res.result.dynamicProfits;
            this.sumFrozenProfits = res.result.sumFrozenProfits;
            this.cashOutProfits=res.result.cashOutProfits;
            this.contactUserId=res.result.contactUserId;
            this.activeCodeNo=res.result.activeCodeNo;
            this.registerCodeNo=res.result.registerCodeNo;
            this.remainTaskNo=res.result.remainTaskNo;
            this.forzenPayAmt=res.result.forzenPayAmt;
            this.forzenTradeAmt=res.result.forzenTradeAmt;
            this.forzenEquityAmt=res.result.forzenEquityAmt;
            this.status=res.result.status;
            this.inPayAddress=res.result.inPayAddress;
            this.inTradeAddress=res.result.inTradeAddress;
            this.inEquityAddress=res.result.inEquityAddress;
            this.outPayAddress=res.result.outPayAddress;
            this.outEquityAddress=res.result.outEquityAddress;
            this.outTradeAddress=res.result.outTradeAddress;
            this.weekActiveCode = res.result.cardGrade;

            //计算进度条
            if(this.maxProfits > 0){
              this.progressText = (this.sumProfits / this.maxProfits * 100);
            }

            //用户卡等级
            if(this.status == 3){
                if(this.cardGrade == 1){
                  this.cardName = "普卡用户";
                  // this.weekActiveCode = 1;
                }else if(this.cardGrade == 2){
                    this.cardName = "铜卡用户";
                    // this.weekActiveCode = 2;
                }else if (this.cardGrade == 3 ) {
                  this.cardName = "银卡用户";
                  // this.weekActiveCode = 3;
                }else if (this.cardGrade == 4 ) {
                  this.cardName = "金卡用户";
                  // this.weekActiveCode = 4;
                }else if (this.cardGrade == 5 ) {
                  this.cardName = "钻石用户";
                  // this.weekActiveCode = 5;
                }
            }else if(this.status == 4){
                this.cardName = "处理中"
            }else if(this.status == 2){
              this.cardName = "未激活";
            }else if(this.status == 5){
              this.show_expire = true;
            }else if(this.status == 1){
              //跳转页面
              this.$router.push("/chooseUserCardGrade");
            }else if(this.status == 6){
              //跳转保单出局后选择卡等级页面
              this.$router.push("/chooseUserCardGradeAgain");
            }else {
              this.cardName = "";
            }

              //用户等级
             if(this.grade == 0){
               this.gradeName = "普通用户";
             }else if (this.grade == 1) {
                this.gradeName = "专员";
             }else if (this.grade == 2) {
                this.gradeName = "主任";
             }else if (this.grade == 3) {
                this.gradeName = "经理";
             }else if (this.grade == 4) {
                this.gradeName = "区代";
             }else if (this.grade == 5) {
                this.gradeName = "县代";
             }else if (this.grade == 6) {
                this.gradeName = "市代";
             }else if (this.grade == 7) {
                this.gradeName = "省代";
             }else if (this.grade == 8) {
                this.gradeName = "董事";
             }

             //判断是否需要跳转任务页面
             if(this.status == 3){
               if(res.result.userTask != null){
                  //不为空，跳转任务页面
                  this.$router.push({
                      path:'/doTask',
                      query: {
                          title: res.result.userTask.title,
                          linkImgPath: res.result.userTask.linkImgPath,
                          link: res.result.userTask.link,
                          discription: res.result.userTask.discription,
                          taskType: res.result.userTask.taskType,
                          userTaskId: res.result.userTask.id,
                          status:res.result.userTask.status,
                      }
                  })
               }
             }

          }else {
            this.showAlert = true;
            this.alertText = res.msg;
            if(res.code==0 || res.code==-1){
              localStorage.clear();
            }
          }
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
            if(localStorage.getItem("token") == null){
              this.isLogin("/login");
            }else {
              //刷新页面
              location.reload();
            }
        },
        closeActive(){
          this.show_active = false;
        },
        closeExpire(){
          this.show_expire = false;
        },
        //调用获取激活信息的接口
        async activeInfo(){
          //调用获取用户接口
          let res = await activeInfo();
          if(res.code == 200){
              //判断激活是否可以打开
              if(res.result.status == 2){
                //如果是true，就弹出激活信息框，并让用户进行激活
                this.show_active = true;
                this.tradeConverRmbScale=res.result.tradeConverRmbScale;
                this.payConverRmbScale=res.result.payConverRmbScale;
                this.payAmount=res.result.payAmount;
                this.tradeAmount=res.result.tradeAmount;
                this.needActiveNum=res.result.needActiveNum;
                this.needBuyTradeAmt=res.result.needBuyTradeAmt;
                this.needBuyPayAmt=res.result.needBuyPayAmt;
                this.cardMaxproft=res.result.cardMaxproft;
                this.inPayAddress=res.result.inPayAddress;
                this.inTradeAddress=res.result.inTradeAddress;
              }
              this.activeStatus=res.result.status;
          }else {

              if(res.code == 8888){

                this.showAlert = true;
                this.alertText = res.msg;
              }
              if (res.code==0 || res.code==-1) {
                  this.showAlert = true;
                  this.alertText = res.msg;
                  localStorage.clear();
             }
           }
        },
        //激活接口
        async active(){
          //调用接口前，加载数据
          this.showLoading = true;
          if(this.showLoading){
            //调用获取用户接口
            let res = await activeUser();
            if(res.code == 200){
              //成功后关闭
              this.showLoading = false;
              //关闭
              this.show_active = false;
              this.showAlert = true;
              this.alertText = "用户激活成功,等待保单结算";
              //刷新页面
              // location.reload();
            }else {
                this.showLoading = false;
                this.show_active = false;
                this.showAlert = true;
                this.alertText = res.msg;
                if (res.code==0 || res.code==-1) {
                   localStorage.clear();
               }
             }
          }
        },//激活接口
        async intervalActice(){
          //调用接口前，加载数据
          this.showLoading = true;
          if(this.showLoading){
            let res = await intervalActice();
            if(res.code == 200){
              this.show_expire=false;
              //成功后关闭
              this.showLoading = false;
              this.showAlert = true;
              this.alertText = "用户激活成功";
              //刷新页面
              // location.reload();
            }else {
                this.show_expire = false;
                this.showLoading = false;
                this.showAlert = true;
                this.alertText = res.msg;
                if (res.code==0 || res.code==-1) {
                   localStorage.clear();
               }
             }
          }
        },
        intervalActicePage(){
          this.show_expire = true;
        },
        //测试刷新
        // test(){
        //   location.reload();
        // }
    },
    watch: {
        // userInfo: function (value){
        //     this.initData()
        // }
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
                        left: 37.5%;
                        color: #919191;

                    }
                    .icon-mobile-number3{
                        display:inline-block;
                        @include sc(.57333rem,$fc);
                        position: absolute;
                        top: 15.2%;
                        left: 40.5%;
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
                width:2.5rem;
              }
              .vip23{
                vertical-align:middle;
                display:inline-block;
                width:2.5rem;
              }
              b{
                font-family: cursive;
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
                width:24.95%;
                display:inline-block;
                border-right:1px solid #f1f1f1;
                span{
                    display:block;
                    width:100%;
                    text-align:center;
                }
                .vip22{
                  margin-top:8%;
                  margin-left: 35%;
                  vertical-align:bottom;
                  width:1.5rem;
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
                    padding: .353333rem 0 .453333rem;
                    b{
                        display:inline-block;
                        @include sc(0.65rem,#f90);
                        font-weight:700;
                        line-height:0.5rem;
                        font-family: Helvetica Neue,Tahoma;
                    }
                }
                .info-data-bottom{
                    @include sc(.57333rem,#666);
                    padding-top: .553333rem;
                    font-weight:700;

                }

            }
            .info-data-link:nth-of-type(2){
                .info-data-top{
                    b{
                        color:#ff5f3e;
                    }
                }

            }
            .info-data-link:nth-of-type(4){
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
        img{
          width:1.5rem;
        }
    }
    .message_count{
      position: absolute;
      @include ct;
      top:0.71rem;
      right: 0.74rem;
      @include sc(.6rem, #fff);
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
            z-index:100;
            opacity:.2;
        }
        .cover-content{
            width:94%;
            background:$fc;
            padding-top:3%;
            padding-bottom:5%;
            position:absolute;
            top:20%;
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

</style>
