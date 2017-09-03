<template>
    <div class="restContainer">
        <head-top head-title="忘记密码" goBack="true"></head-top>
        <section>
          <form class="restForm">
              <section class="input_container">
                  <input type="text" placeholder="手机号" name="phoneNumber" v-model="phoneNumber">
                  <div class="code" v-if="code_state" @click="getVerifyCode">获取验证码</div>
                  <div class="code_time" v-else="!code_state">{{computedTime}}</div>
              </section>
              <section class="input_container">
                  <input type="password" placeholder="新密码" name="newPassWord" v-model="newPassWord">
              </section>
              <section class="input_container">
                  <input type="password" placeholder="确认新密码" name="confirmPassWord" v-model="confirmPassWord">
              </section>
              <section class="input_container">
                  <input type="text" placeholder="输入验证码" name="phoneCode" v-model="phoneCode">
              </section>
          </form>
        </section>
        <div class="login_container" @click="resetButton">完成</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {mobileCode,  sendMobile, getcaptchas,forgetPwd} from 'src/service/getData'
    import {isLogin} from 'src/config/env'

    export default {
        data(){
            return {
                phoneNumber: null, //电话号码
                phoneCode: null,  //短信验证码
                newPassWord: null, //新密码
                rightPhoneNumber: false, //输入的手机号码是否符合要求
                confirmPassWord: null, //确认密码
                computedTime: 0, //倒数记时
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                accountType: 'mobile',//注册方式
                code_state:true,
                timer:null,
                successCode:0,
            }
        },
        mixins: [isLogin],
        components: {
            headTop,
            alertTip,
        },
        created(){
            //this.getVerifyCode()
        },
        methods: {

            //获取验证吗
            async getVerifyCode(){
                //判断输入的电话号码
                if(/^1\d{10}$/gi.test(this.phoneNumber)){
                    this.rightPhoneNumber = true;
                }else{
                    this.rightPhoneNumber = false;
                    this.showAlert = true;
                    this.alertText = "手机号格式不正确";
                }

                if (this.rightPhoneNumber) {
                    //获取验证信息
                    let getCode = await mobileCode(this.phoneNumber);
                    // let res = await getcaptchas();
                    if (getCode.code == 200) {
                        //启动到计时
                        this.computedTime = 60;
                        //倒计时
                        this.timer = setInterval(() => {
                            this.computedTime --;
                            this.code_state = false;
                            if (this.computedTime == 0) {
                                clearInterval(this.timer)
                                this.code_state = true;
                            }
                        }, 1000)
                    }else {
                        this.showAlert = true;
                        this.alertText = getCode.msg;
                        return
                    }
                }
            },
            //重置密码
            async resetButton(){

                if (!this.phoneNumber) {
                    this.showAlert = true;
                    this.alertText = '请输入正确的账号';
                    return
                }else if(!this.newPassWord){
                    this.showAlert = true;
                    this.alertText = '请输入新密码';
                    return
                }else if(!this.confirmPassWord){
                    this.showAlert = true;
                    this.alertText = '请输确认密码';
                    return
                }else if(this.newPassWord != this.confirmPassWord){
                    this.showAlert = true;
                    this.alertText = '两次输入的密码不一致';
                    return
                }else if(!this.phoneCode){
                    this.showAlert = true;
                    this.alertText = '请输验证码';
                    return
                }

                // 发送重置信息
                let res = await forgetPwd(this.phoneNumber,this.newPassWord, this.confirmPassWord, this.phoneCode);
                if (res.code != 200) {
                    this.showAlert = true;
                    this.alertText = res.msg;
                    if (res.code==0 || res.code==-1) {
                      localStorage.clear();
                    }
                    return
                }else{
                    this.showAlert = true;
                    this.alertText = '找回密码成功';
                    this.successCode = 1;
                }
                //不再计时
                clearInterval(this.timer)
                this.code_state = true;
            },
            closeTip(){
                this.showAlert = false;
                if(this.successCode == 1){
                  //找回密码成功，调回登录页面
                  this.$router.push("/login");
                }
                //刷新页面
                // if(localStorage.getItem("token") == null){
                //   this.isLogin("/login");
                // }else {
                //   //刷新页面
                //   location.reload();
                // }
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

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
            .code{
              display: flex;
              align-items: center;
              /*margin: 1rem .5rem;*/
              @include sc(.3rem, #fff);
              background-color: $blue;
              padding: .3rem .3rem;
              border: 1px;
              border-radius: 0.85rem;
              text-align: center;
            }
            .code_time{
              display: flex;
              align-items: center;
              /*margin: 1rem .5rem;*/
              @include sc(.3rem, #fff);
              background-color: $blue;
              padding: 0.3rem 1.28rem;
              border: 1px;
              border-radius: 0.85rem;
              text-align: center;
            }
        }
    }
    .login_container{
        margin: 1rem .5rem;
        @include sc(.7rem, #fff);
        background-color: $blue;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.85rem;
        text-align: center;
    }
</style>
