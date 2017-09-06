 <template>
  <div class="page">
        <head-top head-title="购物币钱包" go-back='true'>
          <div slot="changeLogin" class="change_login">
            <router-link to="/pay/detail" ><b>交易明细</b></router-link>
          </div>
        </head-top>
        <section class="topPanel">
          <div class="activateDiv">购物币余额</div>
          <div class="activateCode"><b>{{payAmt}}</b></div>
          <div class="explain">1HQC 约{{payConverRmbScale}}元</div>
        </section>
        <section class="info-data">
            <ul class="clear">
              <li class="info-data-link">
                <span class="info-data-left"><img src="../../hsimages/5.png" class="privateImage" /></span>
                <span class="info-data-center">充值购物币地址</span><div class="login_container" @click="fuzhi()">复制</div>
                <div class="info-data-center" style="margin-left:14%;padding-top:1%;"><input id="fuzhi" size="64" type="text" readonly="true" name="inPayAddress" v-model.lazy="inPayAddress"></div>
              </li>
              <li @click="turnType1=!turnType1" class="info-data-link">
                <span class="info-data-left"><img src="../../hsimages/3.png" class="privateImage" /></span>
                <span class="info-data-center">购物币转账</span>
                <span class="info-data-right"><img src="../../hsimages/44.png" v-bind:class="{'showImg': turnType1, 'closeImg' : !turnType1  }"/></span>
              </li>
              <li @click="turnType2=!turnType2" class="info-data-link">
                <span class="info-data-left"><img src="../../hsimages/4.png" class="privateImage" /></span>
                <span class="info-data-center">商城购物</span>
                <span class="info-data-right"><img src="../../hsimages/44.png" v-bind:class="{'showImg': turnType2, 'closeImg' : !turnType2  }"/></span>
              </li>
            </ul>
        </section>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {isLogin,getLoginUserInfo} from 'src/config/env'
    import {getUser} from '../../service/getData'

    export default {
      data(){
            return{
                showAlert: false,
                alertText: null,
                turnType1:false,
                turnType2:false,
                inPayAddress:"",
                payAmt:0,
                payConverRmbScale:0,
            }
        },
        created(){
            this.isLogin("/login");
            //初始化信息
            this.initData();
        },
        mixins: [isLogin,getLoginUserInfo],
        mounted(){
        },
        components: {
            headTop,
            alertTip,
        },
        computed: {

        },
        methods: {
          fuzhi(){
            var url = document.getElementById('fuzhi');
            url.select(); // 选取input元素的内容
            var succeeded;
            try {
                // 将选区内容复制到剪贴板
                succeeded = document.execCommand("copy");
              } catch (e) {
                succeeded = false;
              }
              if (succeeded) {
                // 复制成功
                this.showAlert = true;
                this.alertText = "复制成功";
              } else {
                // 复制失败
                this.showAlert = true;
                this.alertText = "复制失败";
              }
          },
          async initData(){
            let res = await getUser();
            if(res.code == 200){
                this.payAmt=res.result.payAmt;
                this.inPayAddress=res.result.inPayAddress;
                this.payConverRmbScale=res.result.payConverRmbScale;
            }else {
              this.showAlert = true;
              this.alertText = res.msg;
              if(res.code==0 || res.code==-1){
                localStorage.clear();
              }
            }
          },
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .page{
        overflow-x:hidden;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }

    .topPanel{
      background: $blue;
      width: 100%;
      height: 7rem;
      .activateDiv{
        color: Silver;
        padding-left:5%;
        padding-top: 3%;
        font-size: 0.65rem;
      }
      .activateCode{
         width: 100%;
         text-align: center;
         font-size: 0.65rem;
         color: #ccc;
         b{
           font-size: 3rem;
           color: white;
         }
      }
      .explain{
        width:100%;
        color: Silver;
        font-size: 0.65rem;
        padding-left:5%;
      }
    }

    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }

    .change_login{
        position: absolute;
        @include ct;
        right: 0.75rem;
        @include sc(.7rem, #fff);
        b{
          color:white;
        }
    }

    .showImg{
      transform: rotate(90deg);
    }
    .closeImg{
      transform: rotate(270deg);
    }

    .info-data{
      .info-data-link{
         border-bottom: 0.1rem solid #eee;
         width: 100%;
         padding: 0.35rem;
         .info-data-left{
            padding-left: 3%;
             .privateImage{
               display:inline-block;
               width: 1.5rem;
               vertical-align:middle;
             }
          }
         .info-data-right{
           text-align: right;
           position: absolute;
           right:5%;
           display: inline-block;
           img{
               width: 1rem;
           }
         }
         .info-data-center{
           font-size:16px;
           font-weight: 500;
           font-family:"微软雅黑",Courier New, Courier, monospace;
         }
         .login_container{
             display:inline-block;
             vertical-align:middle;
             margin-left: 22%;
             width:20%;
             @include sc(.3rem, #fff);
             background-color: #3b95e9;
             padding: .3rem 0;
             border: 1px;
             border-radius: 1rem;
             text-align: center;
         }
      }
    }


</style>
