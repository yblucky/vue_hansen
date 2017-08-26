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
                      <input type="password"   placeholder="请输入新密码" name="newPassWord" v-model="newPassWord">
                  </section>
                  <section class="input_container">
                      <input type="password" placeholder="请确认密码" name="confirmPassWord" v-model="confirmPassWord">
                  </section>
                  <section class="input_container captcha_code_container">
                      <input type="text" placeholder="验证码" name="mobileCode" maxlength="4" v-model="mobileCode">
                      <div class="img_change_img">
                          <img v-show="captchaCodeImg" :src="captchaCodeImg">
                          <div class="change_img" @click="getCaptchaCode">
                              <p>看不清</p>
                              <p>换一张</p>
                          </div>
                      </div>
                  </section>
              </form>
            </section>
        </transition>
        <transition name="router-fade">
            <section v-if="pwdType === 2" class="voucher_container">
                <form class="restForm">
                     <section class="input_container">
                        <input type="text" placeholder="旧密码" name="oldPayWord" v-model="oldPayWord">
                    </section>
                    <section class="input_container">
                        <input type="password" placeholder="请输入新密码" name="newPayWord" v-model="newPayWord">
                    </section>
                    <section class="input_container">
                        <input type="password" placeholder="请确认密码" name="confirmPayWord" v-model="confirmPayWord">
                    </section>
                    <section class="input_container captcha_code_container">
                        <input type="text" placeholder="验证码" name="mobileCode" maxlength="4" v-model="mobileCode">
                        <div class="img_change_img">
                            <img v-show="captchaCodeImg" :src="captchaCodeImg">
                            <div class="change_img" @click="getCaptchaCode">
                                <p>看不清</p>
                                <p>换一张</p>
                            </div>
                        </div>
                    </section>
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
    import {mobileCode, checkExsis, sendMobile, getcaptchas, updatePwd} from 'src/service/getData'

    export default {
        data(){
            return {
                phoneNumber: null, //电话号码
                oldPassWord: null,
                newPassWord: null, //新密码
                confirmPassWord: null, //确认密码
                pwdType:1,     //选择方式
                oldPayWord: null,//支付密码
                newPayWord: null, //新支付密码
                confirmPayWord: null, //确认支付密码
                rightPhoneNumber: false, //输入的手机号码是否符合要求
                captchaCodeImg: null, //验证码地址
                captchaCodeImgKey: null, //验证码key
                mobileCode: null, //短信验证码
                computedTime: 0, //倒数记时
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                accountType: 'mobile',//注册方式
                isUpdate:false,//是否更新成功
            }
        },
        components: {
            headTop,
            alertTip,
        },
        created(){
            this.getCaptchaCode()
        },
        methods: {
             async getCaptchaCode(){
                let res = await getcaptchas();
                this.captchaCodeImg = res.result.picCode;
                this.captchaCodeImgKey = res.result.key;
            },
            //重置密码
            async resetButton(){
                if(this.pwdType == 1){
                  if(!this.oldPassWord){
                      this.showAlert = true;
                      this.alertText = '请输入旧登录密码';
                      return
                  }else if(!this.newPassWord){
                      this.showAlert = true;
                      this.alertText = '请输入新登录密码';
                      return
                  }else if(!this.confirmPassWord){
                      this.showAlert = true;
                      this.alertText = '请输确认登录密码';
                      return
                  }else if(this.newPassWord !== this.confirmPassWord){
                      this.showAlert = true;
                      this.alertText = '两次输入的登录密码不一致';
                      return
                  }else if(!this.mobileCode){
                      this.showAlert = true;
                      this.alertText = '请输验证码';
                      return
                  }
                }else if(this.pwdType == 2){
                    if(!this.oldPayWord){
                        this.showAlert = true;
                        this.alertText = '请输入旧支付密码';
                        return
                    }else if(!this.newPayWord){
                        this.showAlert = true;
                        this.alertText = '请输入新支付密码';
                        return
                    }else if(!this.confirmPayWord){
                        this.showAlert = true;
                        this.alertText = '请输确认支付密码';
                        return
                    }else if(this.newPayWord !== this.confirmPayWord){
                        this.showAlert = true;
                        this.alertText = '两次输入的支付密码不一致';
                        return
                    }else if(!this.mobileCode){
                        this.showAlert = true;
                        this.alertText = '请输验证码';
                        return
                    }
                }
                // 发送重置信息
                let res = await updatePwd(this.pwdType, this.oldPassWord, this.newPassWord, this.confirmPassWord, this.oldPayWord, this.newPayWord, this.confirmPayWord,this.mobileCode,this.captchaCodeImgKey);
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (res.code == 200) {
                    this.showAlert = true;
                    this.alertText = '密码修改成功';
                    this.isUpdate = true;
                }else{
                  this.showAlert = true;
                  this.alertText = res.msg;
                  this.getCaptchaCode();
                }
            },
            closeTip(){
                this.showAlert = false;
                if(this.isUpdate){
                  this.$router.push("/profile");
                }

            }
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
        background-color: #4cd964;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
</style>
