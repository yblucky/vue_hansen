 <template>
    <div class="rating_page">
        <head-top head-title="修改手机号" go-back='true'></head-top>
        <section class="setname">
            <section class="setname-top">
                <input type="text" placeholder="输入手机号" :class="{'setname-input':bordercolor}" @input="inputThing" v-model="inputValue">
                <div>
                    <p v-if="earn">手机号长度为11位</p>
                    <p class="unlikep" v-else>手机号输入不正确</p>
                </div>
            </section>
            <section class="reset">
                <button :class="{fontopacity:opacityall}" @click="resetName">确认修改</button>
            </section>
        </section>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import {getImgPath} from 'src/components/common/mixin'
    import {mapMutations,mapState} from 'vuex'
    import {updateUserInfo} from '../../../service/getData'
    import {updateLocalUser} from 'src/config/env'
    import alertTip from 'src/components/common/alertTip'
    export default {
      data(){
            return{
                earn: true,     //输入框提醒
                bordercolor: false,  //输入框边框颜色
                opacityall: false,   //字体透明度
                inputValue: '',       //输入框的内容
                newphone: '',         //新用户名
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
            }
        },
        created(){

        },
        mixins: [getImgPath],
        components: {
            headTop,
            alertTip,
        },
        mounted(){

        },
        computed:{
          //判断手机号码
          rightPhoneNumber: function (){
              return /^1\d{10}$/gi.test(this.phoneNumber)
          }
        },
        props:[],
        methods: {
            ...mapMutations([
                'RETSET_NAME'
            ]),
            inputThing(){
                console.error();
                if(this.inputValue.length != 11){
                    this.earn=false;
                    this.bordercolor=true;
                    this.opacityall=false;
                }else{
                    this.earn=true;
                    this.bordercolor=false;
                    this.opacityall=true;
                }
            },
            async resetName(){
                if(!/^1\d{10}$/gi.test(this.inputValue)){
                    this.showAlert = true;
                    this.alertText = "请输入正确的手机号码";
                    return
                }
                let res = await updateUserInfo(this.inputValue,'', '','');
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (res.code == 200) {
                    //更改本地存储对象的json
                    updateLocalUser("phone",this.inputValue);
                    this.$router.go(-1);
                }else{
                  this.showAlert = true;
                  this.alertText = res.msg;
                  if (res.code==0 || res.code==-1) {
                     localStorage.clear();
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
                width:15.2rem;
                border:1px solid #ddd;
                @include borderRadius(2px);
                padding:.2rem .1rem;
                line-height:1.2rem;
                font-size:.7rem;
                display:block;
            }
            .setname-input{
                border-color:#ea3106;
            }
            p{
                width:100%;
                @include sc(.7rem,#666);
                padding:.4rem 0 1rem;
                font-family: cursive;
            }
            .unlikep{
                @include sc(.58rem,#ea3106);
                padding-top:.1rem;
            }
        }
        .reset{
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
</style>
