<template>
    <div class="restContainer">
        <head-top head-title="密码修改" goBack="true"></head-top>
        <section class="category_title">
            <span :class="{choosed: pwdType === 1}" @click="pwdType = 1">登录密码修改</span>
            <span :class="{choosed: pwdType === 2}" @click="pwdType = 2">支付密码修改</span>
        </section>
        <transition name="router-fade">
            <section v-if="pwdType === 1">
              <form class="restForm">
                   <section class="input_container">
                      <input type="text" placeholder="旧密码" name="oldPassWord" v-model="oldPassWord">
                  </section>
                  <section class="input_container">
                      <input type="text" placeholder="请输入新密码" name="newPassWord" v-model="newPassWord">
                  </section>
                  <section class="input_container">
                      <input type="text" placeholder="请确认密码" name="confirmPassWord" v-model="confirmPassWord">
                  </section>
                  <!-- <section class="input_container captcha_code_container">
                      <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
                      <div class="img_change_img">
                          <img v-show="captchaCodeImg" :src="captchaCodeImg">
                          <div class="change_img" @click="getCaptchaCode">
                              <p>看不清</p>
                              <p>换一张</p>
                          </div>
                      </div>
                  </section> -->
              </form>
            </section>
        </transition>
        <transition name="router-fade">
            <section v-if="pwdType === 2" class="voucher_container">
                <form class="restForm">
                     <section class="input_container">
                        <input type="text" placeholder="旧密码" name="oldPassWord" v-model="oldPassWord">
                    </section>
                    <section class="input_container">
                        <input type="text" placeholder="请输入新密码" name="newPassWord" v-model="newPassWord">
                    </section>
                    <section class="input_container">
                        <input type="text" placeholder="请确认密码" name="confirmPassWord" v-model="confirmPassWord">
                    </section>
                    <!-- <section class="input_container captcha_code_container">
                        <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
                        <div class="img_change_img">
                            <img v-show="captchaCodeImg" :src="captchaCodeImg">
                            <div class="change_img" @click="getCaptchaCode">
                                <p>看不清</p>
                                <p>换一张</p>
                            </div>
                        </div>
                    </section> -->
                </form>
            </section>
        </transition>
        <div class="login_container" @click="resetButton">确认修改</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {mobileCode, checkExsis, sendMobile, getcaptchas, changePassword} from 'src/service/getData'
    import {isLogin} from 'src/config/env'

    export default {
        data(){
            return {
                oldPassWord: null,
                newPassWord: null, //新密码
                confirmPassWord: null, //确认密码
                pwdType:1,     //选择方式
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                captchaCodeImg: null,
            }
        },
        components: {
            headTop,
            alertTip,
        },
        mixins: [isLogin],
        created(){
            // this.getCaptchaCode()
        },
        methods: {
            //获取图片验证吗
            // async getCaptchaCode(){
            //     let res = await getcaptchas();
            //     this.captchaCodeImg = res.code;
            // },

            //重置密码
            async resetButton(){
                if(!this.oldPassWord){
                    this.showAlert = true;
                    this.alertText = '请输入旧密码';
                    return
                }else if(!this.newPassWord){
                    this.showAlert = true;
                    this.alertText = '请输入新密码';
                    return
                }else if(!this.confirmPassWord){
                    this.showAlert = true;
                    this.alertText = '请输确认密码';
                    return
                }else if(this.newPassWord !== this.confirmPassWord){
                    this.showAlert = true;
                    this.alertText = '两次输入的密码不一致';
                    return
                }
                // 发送重置信息
                let res = await changePassword(this.oldPassWord, this.newPassWord, this.confirmPassWord, this.pwdType);

                if (res.code == 200) {
                    this.showAlert = true;
                    this.alertText = '密码修改成功';
                }else{
                  this.showAlert = true;
                  this.alertText = res.msg;
                  if (res.code==0 || res.code==-1) {
                    localStorage.clear();
                  }
                  //刷新页面
                  if(localStorage.getItem("token") == null){
                    this.isLogin("/login");
                  }else {
                    //刷新页面
                    location.reload();
                  }
                }
            },
            closeTip(){
                this.showAlert = false;
            },
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

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

    .restContainer{
        padding-top: 1.95rem;
    }
    .restForm{
        background-color: #fff;
        margin-top: .6rem;
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input{
                @include sc(.7rem, #666);
            }
            button{
                @include sc(.65rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem .4rem;
                border: 1px;
                border-radius: 0.15rem;
            }
            .right_phone_number{
                background-color: #4cd964;
            }
        }
        .phone_number{
            padding: .3rem .8rem;
        }
        .captcha_code_container{
            height: 2.2rem;
            .img_change_img{
                display: flex;
                align-items: center;
                img{
                    @include wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img{
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p{
                        @include sc(.55rem, #666);
                    }
                    p:nth-of-type(2){
                        color: #3b95e9;
                        margin-top: .2rem;
                    }
                }
            }
        }
    }
    .captcha_code_container{
        height: 2.2rem;
        .img_change_img{
            display: flex;
            align-items: center;
            img{
                @include wh(3.5rem, 1.5rem);
                margin-right: .2rem;
            }
            .change_img{
                display: flex;
                flex-direction: 'column';
                flex-wrap: wrap;
                width: 2rem;
                justify-content: center;
                p{
                    @include sc(.55rem, #666);
                }
                p:nth-of-type(2){
                    color: #3b95e9;
                    margin-top: .2rem;
                }
            }
        }
    }
    .login_container{
        margin: 1rem .5rem;
        @include sc(.7rem, #fff);
        background-color: #3b95e9;
        padding: .5rem 0;
        border: 1px;
        border-radius: 1rem;
        text-align: center;
    }
</style>
