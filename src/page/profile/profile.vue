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

                        <p>
                            <b>{{username}} test {{token}}</b>
                        </p>
                        <p>
                            <span class="icon-mobile-number"><b>{{mobile}}</b></span>
                        </p>
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
                    <router-link to="/balance" tag="li" class="info-data-link">
                        <img src="../../hsimages/36.png" class="vip22" />
                        <span class="info-data-middle"><b>{{parseInt(balance).toFixed(2)}}</b></span>
                        <span class="info-data-bottom">购物币</span>
                    </router-link>
                    <router-link to="/benefit" tag="li" class="info-data-link">
                        <img src="../../hsimages/37.png" class="vip22" />
                        <span class="info-data-middle"><b>{{parseInt(count).toFixed(2)}}</b></span>
                        <span class="info-data-bottom">交易币</span>
                    </router-link>
                    <router-link to="/points" tag="li" class="info-data-link">
                        <img src="../../hsimages/38.png" class="vip22" />
                        <span class="info-data-middle"><b>{{parseInt(pointNumber).toFixed(2)}}</b></span>
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
        <div class="login_container" @click="active=2">退出登录</div>
        <!-- <foot-guide></foot-guide> -->
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
// import footGuide from 'src/components/footer/footGuide'
import progress from 'src/components/progressBar/progress'
import {mapState, mapMutations} from 'vuex'
import {imgBaseUrl,token,setToken} from 'src/config/env'
import {getImgPath} from 'src/components/common/mixin'

export default {
    data(){
        return{
            profiletitle: '翰森国际理财计划',
            username: '',           //用户名
            resetname: '',
            mobile: 'HS10000',             //电话号码
            balance: 342,            //我的余额
            count : 432,             //优惠券个数
            pointNumber : 4343,       //积分数
            avatar: '',             //头像地址
            imgBaseUrl,
            messageCount:10,           //消息个数
            token,
        }
    },
    mounted(){
        this.initData();
    },
    mixins: [getImgPath,setToken],
    components:{
        headTop,
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
        initData(){
            this.token=localStorage.getItem("token");
            if (!this.token) {
              this.$router.push("/login");
            }
            if (this.userInfo && this.userInfo.user_id) {
                this.avatar = this.userInfo.avatar;
                this.username = '理财大神';
                this.mobile = this.userInfo.mobile || 'HS10000';
                this.balance = this.userInfo.balance;
                this.count = this.userInfo.gift_amount;
                this.pointNumber = this.userInfo.point;
            }else{
                this.username = '登录/注册';
                this.mobile = '13680334542';
            }
        },
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
                        top: 18.3%;
                        left: 37.5%;
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

</style>
