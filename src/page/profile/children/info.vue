 <template>
    <div class="rating_page">
        <head-top head-title="修改个人账户信息" go-back='true'></head-top>
        <section class="profile-info">
            <section class="headportrait">
                <input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
                <h2>头像</h2>
                <div class="headportrait-div">
                    <input type="hidden" id="imagePath">
                    <img v-if="avatar!=null && avatar!=''" :src="avatar" id="showImage" class="headportrait-div-top">
                    <span class="headportrait-div-top" v-else>
                        <img :src="defaultAvatar" id="showImage" class="headportrait-div-top">
                    </span>
                    <span class="headportrait-div-bottom">
                        <svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </div>
            </section>
            <section class="headportrait headportraitwo">
                <h2>账号</h2>
                <div class="headportrait-div">
                    <p>{{uid}}</p>
                </div>
            </section>
            <router-link to="/profile/setusername" class="info-router">
                <section class="headportrait headportraitwo">
                    <h2>昵称</h2>
                    <div class="headportrait-div">
                        <p>{{nickName}}</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <router-link to="/profile/setphone" class="info-router">
                <section class="headportrait headportraitwo">
                    <h2>手机号</h2>
                    <div class="headportrait-div">
                        <p>{{phone}}</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <router-link to="/forget" class="info-router">
                <section class="headportrait headportraitwo">
                    <h2>密码修改</h2>
                    <div class="headportrait-div">
                        <p>修改</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <router-link to="/profile/setmail" class="info-router">
                <section class="headportrait headportraitwo">
                    <h2>邮箱</h2>
                    <div class="headportrait-div">
                        <p>{{mail}}</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <router-link to="/profile/setbankcard" class="info-router">
                <section class="headportrait headportraitwo">
                    <h2>银行卡</h2>
                    <div class="headportrait-div">
                        <p>{{bankCardNo}}</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <router-link to="/profile/setaddress" class="info-router">
                <section class="headportrait headportraitwo">
                    <h2>收货地址</h2>
                    <div class="headportrait-div">
                        <p>{{shopAddr}}</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <section class="exitlogin" @click="exitlogin">完成</section>
        </section>

        <section class="coverpart" v-if="show">
            <section class="cover-background"></section>
            <section class="cover-content " :class="{'cover-animate' : isEnter, 'cover-animate-leave' : isLeave}">
                <div class="sa-icon">
                    <span class="sa-body"></span>
                    <span class="sa-dot"></span>
                </div>
                <h2>是否保存修改</h2>
                <div class="sa-botton">
                    <button class="waiting" @click="waitingThing">取消</button>
                    <div style="display:inline-block;">
                        <button class="quitlogin"  @click="outLogin">确认</button>
                    </div>
                </div>
            </section>
        </section>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
       <loading v-show="showLoading"></loading>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import headTop from 'src/components/header/head'
    import {signout,getUser} from 'src/service/getData'
    import alertTip from 'src/components/common/alertTip'
    import {getImgPath} from 'src/components/common/mixin'
    import {isLogin,getLoginUserInfo,updateLocalUser,setToken} from 'src/config/env'
    import {removeStore} from 'src/config/mUtils'
    import {updateUserInfo} from '../../../service/getData'
    import loading from 'src/components/common/loading'
    var test = null;
    var _this = null;
    export default {
        data(){
            return{
                uid:'', //账号
                nickName:'',    //昵称
                phone:'', //用户手机
                mail:'',     //用户邮箱
                avatar:'',      //用户头像
                bankCardNo:'',    //银行卡账号
                shopAddr:'',     //收货地址
                //默认图片
                defaultAvatar:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MTI4MjgwQzdFNjExMUU3QkU5MkE1NTg0NURFOTJEMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MTI4MjgwRDdFNjExMUU3QkU5MkE1NTg0NURFOTJEMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjYxMjgyODBBN0U2MTExRTdCRTkyQTU1ODQ1REU5MkQwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjYxMjgyODBCN0U2MTExRTdCRTkyQTU1ODQ1REU5MkQwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Va+1rAAAFsNJREFUeNrsXQd4XNWV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',
                show:false,     //显示提示框
                isEnter:true,  //是否登录
                isLeave:false, //是否退出
                showAlert: false,
                alertText: null,
                isUpimg:false,//是否更新头像
                showLoading: false, //显示加载动画
            }
        },
        created(){
          this.isLogin("/login");
          this.initData();
          _this = this;
        },
        mounted(){
          this.isLogin("/login");
          this.initData();
        },
        mixins: [isLogin,getLoginUserInfo,setToken],
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
                let res = await getUser();
                if(res.code == 200){
                    this.uid=res.result.uid;
                    this.nickName=res.result.nickName;
                    this.phone=res.result.phone;
                    this.mail=res.result.email;
                    this.avatar=res.result.headImgUrl;
                    this.shopAddr = res.result.shopAddr;
                    this.bankCardNo = res.result.bankCardNo;
                    this.setToken(res.result.token,res.result);
                }else {
                  this.showAlert = true;
                  this.alertText = res.msg;
                  if(res.code==0 || res.code==-1){
                    localStorage.clear();
                  }
                }
            },
            exitlogin(){
                // this.show=true;
                // this.isEnter=true;
                //this.isLeave=false;
                this.$router.go(-1);
            },
            waitingThing(){
                //取消推出
                clearTimeout(this.timer)
                this.isEnter=false;
                this.isLeave=true;
                this.timer = setTimeout(() =>{
                    clearTimeout(this.timer)
                    this.show=false;
                },200)
            },
            //退出登录
            async outLogin(){
                this.OUT_LOGIN();
                this.waitingThing();
                this.$router.go(-1);
                removeStore('user_id')
                await signout();
            },
            changePhone(){
                this.showAlert = true;
                this.alertText = '请在手机APP中设置';
            },
            async saveImg(img){
               let res = await updateUserInfo('','', img,'');
               //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
               if (res.code == 200) {
                   this.showAlert = true;
                   this.alertText = "保存头像成功";
                   this.isUpimg=true;
                   //更改本地存储对象的json
                   updateLocalUser("headImgUrl",img);
               }else{
                 this.showAlert = true;
                 this.alertText = res.msg;
               }
               //隐藏动画
               this.showLoading=false;
            },
            //上传头像
            uploadAvatar(){
                //获取input中的头像
                let input = document.querySelector('.profileinfopanel-upload');

                if (!input.files[0] || !window.FileReader) return;

                //创建一个reader
                let reader = new FileReader();
                // 将图片将转成 base64 格式
                reader.readAsDataURL(input.files[0]);
                // 读取成功后的回调
                reader.onload  = function () {
                    //设置并保存修改
                    document.getElementById("showImage").src = this.result;
                    document.getElementById("imagePath").value = this.result;

                    var $img = this.result;
                    //压缩图片
                    let img = new Image();

                    if (this.result.length <= (100 * 1024)) {
                      var $img = this.result;
                    }else {
                        img.onload = function () {
                          $img = input.files[0].compress(img,Orientation);
                        }
                    }
                    _this.showLoading=true;
                    _this.saveImg($img);
                }

                this.avatar = document.getElementById("imagePath").value;

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
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .profile-info{
        @include wh(100%,3.1rem);
        .profileinfopanel-upload{
            display: block;
            position: absolute;
            opacity: 0;
            top: 2.35rem;
            left: 0;
            @include wh(100%,3.1rem);
        }
        .headportrait{
            margin-top:.8rem;
            padding:.5rem .4rem;
            @include fj(space-between);
            align-items:center;
            border-top:1px solid #ddd;
            background:#fff;

            h2{
                @include sc(.6rem,#333);
                font-weight:500;
                display:flex;
                align-items:center;
            }
            .headportrait-div{
                span{
                    display:inline-block;

                    svg{
                        @include wh(100%,100%);
                    }
                }
                .headportrait-div-top{
                    @include wh(2rem,2rem);
                    @include borderRadius(50%);
                    vertical-align:middle;
                }
                .headportrait-div-bottom{
                    @include wh(.66667rem,1.4rem);
                    position:relative;
                    top:0.44rem;
                }
            }
        }
        .headportraitwo{
            margin-top:0;
            padding:.3rem .4rem;
            .headportrait-div{
                @include fj(left)
                p{
                    text-align:left;
                    line-height:1.39rem;
                    @include sc(.7rem,#999);
                    margin-right:.2rem;
                    font-weight:100;
                    font-family:Arial;
                }
                .headportrait-div-bottom{
                    top:0;
                }
            }
        }
        .headportraithree{
            border-bottom:1px solid #ddd;
        }
        .bind-phone{
            padding:.4rem .4rem;
            @include sc(.5rem,#666);
        }
        .exitlogin{
            width:96%;
            margin:1.3rem auto 0;
            line-height:1.5rem;
            @include borderRadius(5px);
            text-align:center;
            background:#0080FF;
            @include sc(.6rem,#fff);

        }
        .exitlogin:active{
            opacity:.8;
            background:#C1C1C1;
        }
    }
    .info-router{
        display:block;
    }
    .coverpart{
        @include wh(100%,100%);
        @include allcover;
        .cover-background{
            @include wh(100%,100%);
            @include allcover;
            background:#000;
            z-index:100;
            opacity:.2;
        }
        .cover-content{
            width:94%;
            background:$fc;
            padding:17px;
            position:absolute;
            top:20%;
            left:3%;
            z-index:1000;
            @include borderRadius(5px);
            .sa-icon{
                @include wh(90px,90px);
                border:4px solid #f8bb86;
                @include borderRadius(50%);
                margin:20px auto;
                position:relative;
                .sa-body{
                    @include wh(5px,47px);
                    @include borderRadius(2px);
                    background:#f8bb86;
                    @include cl;
                    top:10px;
                }
                .sa-dot{
                    @include wh(7px,7px);
                    @include borderRadius(50%);
                    background:#f8bb86;
                    @include cl;
                    bottom:10px;
                }
            }
            h2{
                width:100%;
                text-align:center;
                @include sc(30px,#575757);
                font-weight:500;
                margin:25px 0;
            }
            .sa-botton{
                width:100%;
                text-align:center;

                button{
                    display:inline-block;
                    padding:.4rem 1rem;
                    @include borderRadius(5px);
                    @include sc(.6rem,$fc);
                    letter-spacing:1px;
                    margin-top:26px;
                }
                .waiting{
                    background:#C1C1C1;
                    margin-right:.4rem;
                }
                .quitlogin{
                    background:rgb(221, 107, 85);
                }
            }

        }
    }
    @-webkit-keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, 100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, 100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@-webkit-keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  100% {
    opacity: 0;
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  100% {
    opacity: 0;
  }
}
body .coverpart .cover-animate{
    transition:all 1s;
    animation:bounceIn .6s;
}
body .coverpart .cover-animate-leave{
    animation:zoomOut .4s;
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>
