<template>
    <div class="page">
      <section class="coverpart" v-if="show">
          <section class="cover-background"></section>
          <section class="cover-content">
              <div class="head">
                  <h4>请输入支付密码</h4>
              </div>

              <div class="head_name">
                  <h4>向(李小龙)支付</h4>
                  <h5>￥500.00</h5>
              </div>

              <div class="enter-box" @click="openkey()">
                  <div class="main-box">
                      <ul class="code-box">
                          <li><span class="point" v-show="pwdIndex > 0"></span></li>
                          <li><span class="point" v-show="pwdIndex > 1"></span></li>
                          <li><span class="point" v-show="pwdIndex > 2"></span></li>
                          <li><span class="point" v-show="pwdIndex > 3"></span></li>
                          <li><span class="point" v-show="pwdIndex > 4"></span></li>
                          <li><span class="point" v-show="pwdIndex > 5"></span></li>
                      </ul>
                  </div>
              </div>
          </section>

          <section class="cover-content_key" v-if="key_show">
              <div class="head" @click="openkey()">
                  <img src="../../hsimages/44.png" class="privateImg" />
              </div>
                <div class="key-box">
                  <ul class="key-board" @click="getKey($event)">
                      <li>
                          <div>1</div>
                          <div>2</div>
                          <div>3</div>
                      </li>
                      <li>
                          <div>4</div>
                          <div>5</div>
                          <div>6</div>
                      </li>
                      <li>
                          <div>7</div>
                          <div>8</div>
                          <div>9</div>
                      </li>
                      <li>
                          <div class="grey-key" @click="noZuo()"></div>
                          <div>0</div>
                          <div class="grey-key iconfont icon-delete" @click="deleteKey()">删除</div>
                      </li>
                  </ul>
              </div>
          </section>
      </section>
    </div>
</template>

<script>
    export default {
      data(){
          return {
              show:true,     //显示提示框
              key_show:false,
              tradePwd: '',
              pwdIndex: 0
          }
      },
      props:{
            reset: Boolean,
        },
        watch:{
            reset(val){
                if(val){
                    console.log('reset',val);
                    this.tradePwd = '';
                    this.pwdIndex = 0;
                }
            }
        },
        methods:{
            getKey(e){
                let target = e.target;
                let n = target.innerText;

                target.className = 'active';
                setTimeout(()=>{
                    target.className = '';
                },100);
                let pwdLength = this.tradePwd.length;
                if(pwdLength < 6){
                    this.tradePwd += n;
                    this.pwdIndex ++;
                    this.$emit('inputIndex',this.pwdIndex);
                    if(this.tradePwd.length == 6){
                        setTimeout(()=>{
                            this.$emit('pwdCompleted',this.tradePwd);
                        },1000);
                    }
                }
            },
            deleteKey(){
                event.stopPropagation();
                let el = event.target;
                el.className += ' active';
                setTimeout(()=>{
                    el.className = el.className.replace(' active','');
                },100);
                let tradePwdlength = this.tradePwd.length;
                if(tradePwdlength > 0){
                    this.tradePwd = this.tradePwd.substring(0,tradePwdlength-1);
                    this.pwdIndex --;
                }
                this.$emit('inputIndex',this.pwdIndex);
            },
            noZuo(){
              event.stopPropagation();
              let el = event.target;
              el.className += ' active';
              setTimeout(()=>{
                  el.className = el.className.replace(' active','');
              },100);
            },
            openkey(){
              this.key_show = !this.key_show;
            }
        }
    };
</script>

<style lang="scss" scoped>
    /*@import 'styles/vars.css';*/
    @import '../../style/mixin';

    .page{
        background-color: white;
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
            }
            .head_name{
                width: 100%;
                margin-bottom:4%;
                h4{
                    text-align:center;
                    @include sc(15px,#575757);
                    font-weight:500;
                    margin-bottom:4%;
                }
                h5{
                    padding-left: 25%;
                    @include sc(36px,#575757);
                    font-weight:700;
                    margin-bottom:4%;
                }
            }
        }

        .cover-content_key{
            width:100%;
            background:$fc;
            position:absolute;
            top:59%;
            z-index:1000;
            @include borderRadius(5px);
            .head{
                width: 100%;
                text-align: center;
                .privateImg{
                    transform: rotate(90deg);
                }
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

    .enter-box {
        .main-box {
            .code-box {
                display: flex;
                margin: 0px 20px;
                border: 1px solid #000;
                li {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                    height: 50px;
                    border-right: 1px solid #000;
                    &:last-child{
                        border-right: none;
                    }
                    .point{
                        /*position: relative;*/
                        /*top: 45%;*/
                        /*left: 45%;*/
                        /*transform: translate(-50%,-50%);*/
                        content: '';
                        display: inline-block;
                        background: #333;
                        width: 12px;
                        height: 12px;
                        border-radius: 100%;
                    }
                }
            }
        }
    }

    .key-box{
        background: white;
        position: relative;;
        left: 0;
        right: 0;
        bottom: 0;
        .key-board{
            li{
                display: flex;
                border-top: 0.001rem solid #EBEBEB;
                div{
                    flex: 1;
                    text-align: center;
                    width: 33.33%;
                    line-height: 55px;
                    font-size: 30px;
                    &:nth-child(2){
                        width: 32%;
                        border-right: 0.001rem solid #EBEBEB;
                        border-left: 0.001rem solid #EBEBEB;
                    }
                    &.grey-key {
                        background: #EBEBEB;
                        /*color: #EBEBEB;*/
                        font-size: 30px;
                        &.active{
                            background: #CCCCCC;
                            color: #EEEE00;
                        }
                    }
                    &.active{
                        background: #CCCCCC;
                        /*color: #EEE8CD;*/
                    }
                }
            }
        }
    }
</style>
