<template>
    <div class="loginContainer">
        <head-top head-title="瀚森科技">
        </head-top>

        <div>
            <h3 style="text-align:center">登录社区</h3>
        </div>
        <form class="loginForm">
            <section class="input_container">
                <input type="text" placeholder="账号" v-model.lazy="loginName">
            </section>
            <section class="input_container">
              <input type="password" placeholder="密码"  v-model="password">
                <!-- <input v-if="!showPassword" type="password" placeholder="密码"  v-model="passWord">
                <input v-else type="text" placeholder="密码"  v-model="passWord"> -->
                <!-- <div class="button_switch" :class="{change_to_text: showPassword}">
                    <div class="circel_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
                    <span>abc</span>
                    <span>...</span>
                </div> -->
            </section>
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" maxlength="4" v-model="picCode">
                <div class="img_change_img">
                    <img id="captchaCodeImg" v-show="showCaptchaCodeImg" v-bind:src="captchaCodeImg">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <div class="login_container" @click="checkLogin">登录</div>
        <router-link to="/forgetPwd" class="to_forget">忘记密码？</router-link>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import {localapi, proapi, imgBaseUrl,token,setToken} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {getcaptchas,loginIn} from '../../service/getData'

    export default {
        data(){
            return {
                loginName: "", //用户名
                password: "", //密码
                showCaptchaCodeImg:false,
                captchaCodeImg: null, //验证码地址
                picCode: null, //传回验证验证码picCode
                showPassword:false,
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                token,
                key:"",
            }
        },
        created(){
            this.getCaptchaCode();
        },
        mixins: [setToken],
        components: {
            headTop,
            alertTip,
        },
        computed: {
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
            async getCaptchaCode(){
                let res = await getcaptchas();
                 this.captchaCodeImg = res.result.picCode;
                 this.key= res.result.key;
                 this.showCaptchaCodeImg=true;
                //  document.getElementById("captchaCodeImg").src=this.captchaCodeImg;
                //  console.log( document.getElementById("captchaCodeImg").src);
            },
            //发送登录信息
            async checkLogin(){
                if (!this.loginName) {
                    this.showAlert = true;
                    this.alertText = '请输入用户名';
                    return
                }else if(!this.password){
                    this.showAlert = true;
                    this.alertText = '请输入密码';
                    return
                }else if(!this.picCode){
                    this.showAlert = true;
                    this.alertText = '请输入验证码';
                    return
                }
                //用户名登录
                this.data = await loginIn(this.loginName, this.password, this.picCode,this.key);
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (this.data.code == 200) {
                    this.RECORD_USERINFO(this.data.result);
                    this.setToken(this.data.result.token,this.data.result);
                    localStorage.setItem("token",this.data.result.token);
                    this.$router.push("/profile");
                }else{
                  this.showAlert = true;
                  this.alertText = this.data.msg;
                  this.getCaptchaCode();
                }
            },
            closeTip(){
                this.showAlert = false;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .loginContainer{
        padding-top: 6rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .change_login{
        position: absolute;
        @include ct;
        right: 0.75rem;
        @include sc(.7rem, #fff);
    }

    .loginForm{
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
    .login_tips{
        @include sc(.5rem, red);
        padding: .4rem .6rem;
        line-height: .5rem;
        a{
            color: #3b95e9;
        }
    }
    .login_container{
        margin: 1rem .5rem 1rem;
        @include sc(.7rem, #fff);
        background-color: #3b95e9;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
    .button_switch{
        background-color: #ccc;
        display: flex;
        justify-content: center;
        @include wh(2rem, .7rem);
        padding: 0 .2rem;
        border: 1px;
        border-radius: 0.5rem;
        position: relative;
        .circel_button{
            transition: all .3s;
            position: absolute;
            top: -0.2rem;
            z-index: 1;
            left: -0.3rem;
            @include wh(1.2rem, 1.2rem);
            box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
            background-color: #f1f1f1;
            border-radius: 50%;
        }
        .trans_to_right{
            transform: translateX(1.3rem);
        }
        span{
            @include sc(.45rem, #fff);
            transform: translateY(.05rem);
            line-height: .6rem;
        }
        span:nth-of-type(2){
            transform: translateY(-.08rem);
        }
    }
    .change_to_text{
        background-color: #4cd964;
    }
    .to_forget{
        float: right;
        @include sc(.6rem, #3b95e9);
        margin-right: .3rem;
    }
</style>
