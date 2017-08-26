 <template>
  <div class="page">
        <head-top head-title="购物币钱包" go-back='true'>
          <div slot="changeLogin" class="change_login">
            <router-link to="/pay/detail" ><b>交易明细</b></router-link>
          </div>
        </head-top>
        <section class="topPanel">
          <div class="activateDiv">购物币余额</div>
          <div class="activateCode"><b>1000.00</b></div>
          <div class="explain">1购物币约2000元</div>
        </section>
        <section class="info-data">
            <ul class="clear">
              <li class="info-data-link">
                <span class="info-data-left"><img src="../../hsimages/5.png" /></span>
                <span class="info-data-center">充值购物币</span>
              </li>
              <li @click="turnType1=!turnType1" class="info-data-link">
                <span class="info-data-left"><img src="../../hsimages/3.png" /></span>
                <span class="info-data-center">购物币转账</span>
                <span class="info-data-right"><img src="../../hsimages/44.png" v-bind:class="{'showImg': turnType1, 'closeImg' : !turnType1  }"/></span>
              </li>
              <li @click="turnType2=!turnType2" class="info-data-link">
                <span class="info-data-left"><img src="../../hsimages/4.png" /></span>
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

    export default {
      data(){
            return{
                showAlert: false,
                alertText: null,
                turnType1:false,
                turnType2:false,
            }
        },
        mounted(){

        },
        components: {
            headTop,
            alertTip,
        },
        computed: {

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .page{
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
        color: darkgrey;
        padding-left:5%;
        padding-top: 3%;
        font-size: 0.65rem;
      }
      .activateCode{
         width: 100%;
         padding-left:10%;
         font-size: 0.65rem;
         color: #ccc;
         b{
           font-size: 3rem;
           color: white;
         }
      }
      .explain{
        width:100%;
        color: darkgrey;
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
         padding: 0.75rem;
         .info-data-left img{
           width: 1rem;
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
           font-family:"微软雅黑",Courier New, Courier, monospace;
         }
      }
    }
</style>
