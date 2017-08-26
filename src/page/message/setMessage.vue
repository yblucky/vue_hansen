<template>
    <div class="msmContainer">
        <head-top :head-title="'反馈'" goBack="true">
        </head-top>
        <section class="input_container">
          <div>
            <span>反馈类型：</span>
            <select name="msgType" placeholder="请选择" v-model="type">
              <option value="1">test1</option>
              <option value="2">test2</option>
            </select>
          </div>
          <div>
            <span>标题：</span>
            <input type="text" placeholder="" v-model="title">
          </div>
          <div>
            <textarea rows="10" cols="55"  placeholder="请输入反馈内容" v-model="detail"></textarea>
          </div>
          <div>
            <span>反馈结果邮箱：</span>
            <input class="msgMaill" type="text" placeholder=""  v-model="phone">
          </div>
        </section>
        <div class="active_container" @click="addfeedback">提交反馈</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import footGuide from 'src/components/footer/footGuide'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {feedback} from '../../service/getData'

    export default {
        data(){
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                title:null,
                detail:null,
                phone:null,
                type:1,
                isAdd:false,
            }
        },
        created(){
        },
        components: {
            headTop,
            alertTip,
            footGuide,
        },
        computed: {
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1\d{10}$/gi.test(this.phoneNumber)
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            async addfeedback () {
                if(!this.title){
                    this.showAlert = true;
                    this.alertText = '请输入标题';
                    return
                }
                if(!this.detail){
                    this.showAlert = true;
                    this.alertText = '请输入内容';
                    return
                }
                if(!this.phone){
                    this.showAlert = true;
                    this.alertText = '请输入联系消息';
                    return
                }
                 //从后台获取记录
                 let res = await feedback(this.type, this.title, this.detail,this.phone);
                 //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                 if (res.code == 200) {
                   this.showAlert = true;
                   this.alertText = res.msg;
                   this.isAdd = true;
                 }else{
                   this.showAlert = true;
                   this.alertText = res.msg;
                 }
             },
            toggleTabs (index,tabText) {
                 this.active = index;
             },
            closeTip(){
                this.showAlert = false;
                if(this.isAdd){
                  this.$router.push("/message");
                }

            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .jumpRecord{
        position: absolute;
        @include ct;
        right: 0.75rem;
        @include sc(.7rem, #fff);
    }
    .msmContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .active_container{
        margin: 0.5rem 0.5rem;
        @include sc(.7rem, #fff);
        background-color: #3b95e9;
        padding: .5rem 0.5rem;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;

        background: #3b95e9; /* Old browsers */
      	background: -moz-linear-gradient(top,  #3b95e9 0%, #39a0be 100%); /* FF3.6+ */
      	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3b95e9), color-stop(100%,#39a0be)); /* Chrome,Safari4+ */
      	background: -webkit-linear-gradient(top,  #3b95e9 0%,#39a0be 100%); /* Chrome10+,Safari5.1+ */
      	background: -o-linear-gradient(top,  #3b95e9 0%,#39a0be 100%); /* Opera 11.10+ */
      	background: -ms-linear-gradient(top,  #3b95e9 0%,#39a0be 100%); /* IE10+ */
      	background: linear-gradient(top,  #3b95e9 0%,#39a0be 100%);
    }
    .change_to_text{
        background-color: #4cd964;
    }
    .input_container{
        font-size: 0.65rem;
        font-weight:500;
        width:100%;
        text-align:right;
        display:block;
        textarea{
          border:1px solid #ececec;
        }
        div{
          padding: .15rem .35rem;
        }
        input,select{
            @include sc(0.65rem, #666);
            border:1px solid #dedede;
            width:11.3rem;
            height:1.45rem;
        }
        .msgMaill{
          width:10rem;
        }
    }
</style>
