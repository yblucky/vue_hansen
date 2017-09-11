 <template>
    <div class="rating_page">
        <head-top head-title="修改收货地址" go-back='true'></head-top>
        <section class="setname">
            <section class="setname-top">
              <p>
                收货人：<input type="text" placeholder="输入收货人名称" :class="{'setname-input':bordercolor}" v-model="receiver">
              </p>
              <p>
                手机号：<input type="text" placeholder="输入收货人手机号" :class="{'setname-input':bordercolor}" v-model="receiverPhone">
              </p>
              <p style="margin-left:8.5%;">
                收货地址：<input type="text" placeholder="输入收货人地址" :class="{'setname-input':bordercolor}" v-model="shopAddr">
              </p>
            </section>
            <section class="reset">
                <button :class="{fontopacity:opacityall}" @click="resetName">确认修改</button>
            </section>
        </section>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import {getImgPath} from 'src/components/common/mixin'
    import {mapMutations,mapState} from 'vuex'
    import {updateUserShopAddrInfo} from '../../../service/getData'
    import {updateLocalUser,getLoginUserInfo} from 'src/config/env'
    export default {
      data(){
            return{
                earn: false,     //输入框提醒
                bordercolor: false,  //输入框边框颜色
                opacityall: false,   //字体透明度
                inputValue: '',       //输入框的内容
                receiver: '',         //收货人姓名
                receiverPhone:'',     //收货人手机号
                shopAddr:'',          //收货地址
            }
        },
        created(){
            this.initData();
        },
        mixins: [getImgPath,getLoginUserInfo],
        components: {
            headTop,

        },
        mounted(){

        },
        computed:{
            ...mapState([
                'userInfo'
            ])
        },
        props:[],
        methods: {
            ...mapMutations([
                'RETSET_NAME'
            ]),
            // inputThing(){
            //     if(this.inputValue.length <5 || this.inputValue.length>24){
            //         this.earn=true;
            //         this.bordercolor=true;
            //         this.opacityall=false;
            //     }else{
            //         this.earn=false;
            //         this.bordercolor=false;
            //         this.opacityall=true;
            //     }
            // },
            async resetName(){
                let res = await updateUserShopAddrInfo(this.receiver, this.receiverPhone,this.shopAddr);
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (res.code == 200) {
                    //更改本地存储对象的json
                    // updateLocalUser("nickName",this.inputValue);
                    this.$router.go(-1);
                }else{
                    this.showAlert = true;
                    this.alertText = res.msg;
                    if (res.code==0 || res.code==-1) {
                       localStorage.clear();
                   }
                }
            },
            initData(){
              this.receiver = this.getLoginUserInfo("receiver");
              this.receiverPhone = this.getLoginUserInfo("receiverPhone");
              this.shopAddr = this.getLoginUserInfo("shopAddr");
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

    .rating_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 202;
        background:#f2f2f2;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .setname{
        width:15.2rem;
        margin:0 auto;
        .setname-top{
            padding-top:.4rem;
            input{
              background:none;
              width:9.2rem;
              border:1px solid #ddd;
              @include borderRadius(0.5rem);
              padding:.2rem .1rem;
              line-height:1.2rem;
              font-size:.7rem;
            }
            p{
                width:100%;
                @include sc(.6rem,#666);
                padding-top: 0.5rem;
                font-family: cursive;
                margin-left: 13%;
            }
        }
        .reset{
            margin-top: 5%;
            width:100%;
            background:#3199e8;
            button{
                display:block;
                width:100%;
                background:none;
                line-height:2rem;
                @include sc(.7rem,#fff);
                opacity:.6;
                transition: all 1s;
            }
            .fontopacity{
                transition: all 1s;
                opacity:1;
            }
        }
    }

    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
     /* WebKit browsers */
        color: #666;
        font-size:15px;
        font-family: cursive;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
        color: #666;
        font-size:15px;
        font-family: cursive;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
     /* Mozilla Firefox 19+ */
        color: #666;
        font-size:15px;
        font-family: cursive;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
     /* Internet Explorer 10+ */
        color: #666;
        font-size:15px;
        font-family: cursive;
    }

</style>
