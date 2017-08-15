<template>
    <div class="profile_page">
        <head-top :head-title="profiletitle"></head-top>
        <section>
            <section class="profile-number">
                <ul class="profile-link">
                    <!--<img :src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo&&userInfo.user_id">-->
                  <img :src="imgBaseUrl" class="privateImage"  >
                  <!--  <span class="privateImage" v-else>
                        <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>-->
                    <div class="user-info">
                        <p>昵称：{{username}}</p>
                        <p>
                            <span class="icon-mobile-number">账户：{{mobile}}</span>
                            <span class="icon-mobile-number1">
                                普卡账户 <router-link to="/upgrade" class="info-data-link">升级</router-link>
                            </span>
                        </p>
                        <p>
                          <img src="../../images/vip.png" class="vip" algin="middle" />
                          <span class="icon-mobile-number" style="background-color:burlywood">普通会员</span>
                        </p>
                        <p>
                          <div>
                              <progress></progress>
                          </div>
                        </p>
                    </div>
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
                        <span class="info-data-top"><b>{{parseInt(balance).toFixed(2)}}</b>元</span>
                        <span class="info-data-bottom">购物币</span>
                    </router-link>
                    <router-link to="/benefit" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{count}}</b>个</span>
                        <span class="info-data-bottom">交易币</span>
                    </router-link>
                    <router-link to="/points" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{pointNumber}}</b>分</span>
                        <span class="info-data-bottom">翰森股权</span>
                    </router-link>
                </ul>
            </section>

            <section class="profile-1reTe">
                <ul class="clear">
                    <router-link to="/transfer" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <img src="../../images/transfer.png" class="vip" />
                        </span>
                        <span class="info-data-bottom">转账汇款</span>
                    </router-link>
                    <router-link to="/login" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../images/income.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">动态收益</span>
                    </router-link>
                    <router-link to="/login" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../images/dividend.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">静态分红</span>
                    </router-link>
                </ul>

                <ul class="clear">
                    <router-link to="/login" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <img src="../../images/activecode.png" class="vip" />
                        </span>
                        <span class="info-data-bottom">我的激活码</span>
                    </router-link>
                    <router-link to="/login" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../images/registercode.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">我的注册码</span>
                    </router-link>
                    <router-link to="/login" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../images/inviteUser.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">邀请会员</span>
                    </router-link>
                </ul>

                <ul class="clear">
                    <router-link to="/profile/info" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <img src="../../images/updateUser.png" class="vip" />
                        </span>
                        <span class="info-data-bottom">修改资料</span>
                    </router-link>
                    <router-link to="/forget" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../images/updatepwd.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">修改密码</span>
                    </router-link>
                    <router-link to="/login" tag="li" class="info-data-link">
                      <span class="info-data-top">
                          <img src="../../images/myteam.png" class="vip" />
                      </span>
                        <span class="info-data-bottom">我的团队</span>
                    </router-link>
                </ul>
            </section>
        </section>
        <foot-guide></foot-guide>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import progress from 'src/components/progressBar/progress'
import {mapState, mapMutations} from 'vuex'
import {imgBaseUrl} from 'src/config/env'
import {getImgPath} from 'src/components/common/mixin'

export default {
    data(){
        return{
            profiletitle: '翰森国际理财计划',
            username: '登录/注册',           //用户名
            resetname: '',
            mobile: '13680334542',             //电话号码
            balance: 0,            //我的余额
            count : 0,             //优惠券个数
            pointNumber : 0,       //积分数
            avatar: '',             //头像地址
            imgBaseUrl,
        }
    },
    mounted(){
        this.initData();
    },
    mixins: [getImgPath],
    components:{
        headTop,
        footGuide,
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
            if (this.userInfo && this.userInfo.user_id) {
                this.avatar = this.userInfo.avatar;
                this.username = this.userInfo.username;
                this.mobile = this.userInfo.mobile || '13680334542';
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
        background-color: #F0F0F0;
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
            background:$blue;
            padding: .666667rem .6rem;
            .privateImage{
                display:inline-block;
                @include wh(2.5rem,2.5rem);
                border-radius:50%;
                vertical-align:middle;
                .privateImage-svg{
                    background:$fc;
                    border-radius:50%;
                    @include wh(2.5rem,2.5rem);
                }
            }
            .user-info{
                margin-left:.48rem;
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
                        @include sc(.57333rem,$fc);

                    }
                    .icon-mobile-number1{
                        display:inline-block;
                        margin-left:.99rem;
                        @include sc(.57333rem,$fc);

                    }
                    .vip{
                        vertical-align:middle;
                        display:inline-block;
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
        }
   }
   .info-data{
        width:100%;
        background:$fc;
        box-sizing: border-box;
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
                .info-data-bottom{
                    @include sc(.57333rem,#666);
                    font-weight:400;
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
        margin-top:.9rem;
        background:#F0F0F0;
        ul{
            margin-top: .9rem;
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
            }

            .info-data-link:nth-of-type(1){
                margin-left:3%;
            }
        }
    }
</style>
