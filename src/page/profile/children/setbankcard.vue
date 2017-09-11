 <template>
    <div class="rating_page">
        <head-top head-title="修改银行卡" go-back='true'></head-top>
        <section class="setname">
            <section class="setname-top">
                <p>
                  账户名称：<input type="text" placeholder="输入用户名" :class="{'setname-input':bordercolor}" v-model="userName">
                </p>
                <p>
                  银行名称：<select v-model="bankType">
                              <option value="中国银行">中国银行</option>
                              <option value="中国农业银行">中国农业银行</option>
                              <option value="中国建设银行">中国建设银行</option>
                              <option value="中国邮政银行">中国邮政银行</option>
                           </select>
                </p>
                <p>
                  银行卡号：<input type="text" placeholder="输入银行卡账号" :class="{'setname-input':bordercolor}" v-model="bankCardNo">
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
    import {updateUserBankInfo} from '../../../service/getData'
    import {updateLocalUser,getLoginUserInfo} from 'src/config/env'
    export default {
      data(){
            return{
                earn: false,     //输入框提醒
                bordercolor: false,  //输入框边框颜色
                opacityall: false,   //字体透明度
                userName: '',         //新用户名
                bankType:'中国银行',          //银行名称
                bankCardNo:'',          //银行卡号
            }
        },
        created(){

        },
        mixins: [getImgPath,getLoginUserInfo],
        components: {
            headTop,

        },
        mounted(){
          this.initData();
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
                let res = await updateUserBankInfo(this.userName, this.bankType,this.bankCardNo);
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (res.code == 200) {
                    //更改本地存储对象的json
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
              this.userName = this.getLoginUserInfo("userName");
              this.bankType = this.getLoginUserInfo("bankType");
              this.bankCardNo = this.getLoginUserInfo("bankCardNo");
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
                width:10.2rem;
                border:1px solid #ddd;
                @include borderRadius(0.5rem);
                padding:.2rem .1rem;
                line-height:1.2rem;
                font-size:.7rem;
                /*display:block;*/
            }
            select{
                background:none;
                width:8.2rem;
                border:1px solid #ddd;
                @include borderRadius(0.5rem);
                padding:.2rem .1rem;
                line-height:1.2rem;
                font-size:.7rem;
                /*display:block;*/
            }
            .setname-input{
                border-color:#ea3106;
            }
            p{
                width:100%;
                @include sc(.6rem,#666);
                padding-top: 0.5rem;
                font-family: cursive;
                margin-left: 8%;
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
