<template>
   <div class="rating_page">
       <head-top head-title="邀请会员" go-back='true'></head-top>
       <section class="profile-info">
             <section class="info-data">
                 <ul class="clear">
                     <router-link to="" tag="li" class="info-data-link">
                         <span class="info-data-top">微信扫一扫加入瀚森国际社区</span>
                         <div class="qrcode">
                            <img :src="qrcode" />
                         </div>
                         <span class="info-data-bottom">微信扫码注册</span>
                         <router-link to="/inviteUser" tag="li" class="info-data-link"><span class="info-data-bottom1">立即邀请注册新会员</span></router-link>
                     </router-link>
                 </ul>
             </section>
       </section>
       <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
       <section class="coverpart" v-if="showLoading">
           <section class="cover-background"></section>
           <section class="cover-content">
               <loading></loading>
           </section>
       </section>
   </div>
</template>

<script>
   import {mapMutations, mapState} from 'vuex'
   import headTop from 'src/components/header/head'
   import {getUser} from 'src/service/getData'
   import alertTip from 'src/components/common/alertTip'
   import {getImgPath} from 'src/components/common/mixin'
   import {isLogin,getLoginUserInfo,updateLocalUser} from 'src/config/env'
   import {removeStore} from 'src/config/mUtils'
   import {updateUserInfo,shareCode} from '../../service/getData'
   import loading from 'src/components/common/loading'

   export default {
       data(){
           return{
               showAlert: false,
               alertText: null,
               isUpimg:false,//是否更新头像
               showLoading: false, //显示加载动画
               qrcode:'',
           }
       },
       created(){
         this.isLogin("/login");
         this.initData();
       },
       mounted(){
       },
       mixins: [isLogin,getLoginUserInfo],
       beforeDestroy(){
           clearTimeout(this.timer)
       },
       components: {
           headTop,
           alertTip,
           loading,
       },
       computed:{
           ...mapState([
               'userInfo', 'imgPath'
           ]),
       },
       methods: {
           ...mapMutations([
               'OUT_LOGIN', 'SAVE_AVANDER'
           ]),
           async initData(){
               this.showLoading = true;
               let res = await shareCode();
               if(res.code == 200){
                   this.showLoading = false;
                   this.qrcode = res.result;
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
               if(this.isUpimg){
                 this.$router.push("/profile");
               }
           },
       },
       watch: {
           // userInfo: function (value) {
           //     if (value && value.user_id) {
           //         this.username = value.username;
           //         this.infotel = value.mobile;
           //         this.avatar = value.avatar;
           //     }
           // }
       }
   }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin.scss';

   .rating_page{
       position: absolute;
       width:100%;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       background-color: #3190E8;
       z-index: 202;
       padding-top: 1.95rem;
       p, span{
           font-family: Helvetica Neue,Tahoma,Arial;
       }
   }
   .profile-info{
       @include wh(100%,3.1rem);
   }
   .info-data{
        width:100%;
        background:#3190E8;
        box-sizing: border-box;
        ul{
            .info-data-link{
                float:left;
                width:100%;
                display:inline-block;
                span{
                    display:block;
                    width:100%;
                    text-align:center;
                }
                .vip22{
                  width:4rem;
                }
                .info-data-top{
                    @include sc(.85rem,#09223A);
                    margin-top: 20%;
                    font-weight:700;
                    font-family: cursive;
                    /*b{
                        display:inline-block;
                        @include sc(1rem,#f90);
                        font-weight:700;
                        line-height:5rem;
                        font-family: Helvetica Neue,Tahoma;
                    }*/
                }
                .qrcode{
                    margin-left: 11%;
                    /*border: 1px solid $fc;*/
                    width:12rem;
                    height:12rem;
                    text-align: center;
                    margin-bottom:1.5rem;
                    margin-top: 1rem;
                }
                .info-data-middle{
                    @include sc(0.55rem,#333);
                    padding-top:.253333rem;
                    text-align: left;
                    margin-left:4%;
                    b{
                        display:inline-block;
                        @include sc(0.55rem,#666);
                        font-weight:500;
                        line-height:0.5rem;
                        font-family: Helvetica Neue,Tahoma;
                        margin-left:9%;
                    }
                }
                .info-data-bottom{
                    @include sc(.67333rem,#09223A);
                    padding-top: .253333rem;
                    font-weight:700;
                }
                .info-data-bottom1{
                    @include sc(0.6rem,#F12B27);
                    margin-top:1.8rem;
                    font-weight:700;
                    text-decoration: underline;
                }

            }
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
