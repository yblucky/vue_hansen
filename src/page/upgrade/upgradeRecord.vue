<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="升级记录" go-back='true'></head-top>
       <ul v-load-more="loaderMore">
          <li class="page" v-for="item in upgradeRecordList">
              <div class="page-record">
                  <!-- <span>{{item.historyGradeName}}</span> -->
                  <!-- <img src="../../images/rightLogo.png"/> -->
                  <span>{{item.upGradeTypeName}}</span>
                  <!-- <span>{{item.currencyGradeName}}</span> -->

                  <span>{{item.currencyGradeName}}</span>
                  <span class="">{{item.createTime | formatDate}}</span>
              </div>
          </li>
       </ul>

       <div v-if="upgradeRecordList == null || upgradeRecordList == ''">
          <nullData></nullData>
       </div>

       <p v-if="touchend" class="empty_data"></p>
       <aside class="return_top" @click="backTop" v-if="showBackStatus">
         <svg class="back_top_svg">
           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
         </svg>
       </aside>


       <section class="coverpart" v-if="showLoading">
           <section class="cover-background"></section>
           <section class="cover-content">
               <loading></loading>
           </section>
       </section>
       <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
       <!-- <foot-guide></foot-guide> -->
   </div>
</template>

<script>

    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import footGuide from 'src/components/footer/footGuide'
    import {localapi, proapi, imgBaseUrl,formatDate} from 'src/config/env'
    import {upGradeRecord,findUserCardGrade} from '../../service/getData'
    import {mapState, mapMutations} from 'vuex'
    import {showBack, animate} from 'src/config/mUtils'
    import {loadMore, getImgPath} from 'src/components/common/mixin'
    import loading from 'src/components/common/loading'
    import nullData from 'src/components/common/nullData'


   export default {
     data(){
           return{
              showAlert: false, //显示提示组件
              alertText: null, //提示的内容
              upgradeRecordList:null,//升级记录
              pageNo:1,
              pageSize:10,
        		  preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
        			showBackStatus: false, //显示返回顶部按钮
        			showLoading: false, //显示加载动画
        			touchend: false, //没有更多数据
           }
       },
       created(){
         this.getUpGradeRecord();
       },
       components: {
           headTop,
           footGuide,
           loading,
           nullData,
       },
       methods: {
    		//开发环境与编译环境loading隐藏方式不同
    		hideLoading(){
    			this.showLoading = false;
    		},
    		//返回顶部
    		backTop(){
    			animate(document.body, {scrollTop: '0'}, 400,'ease-out');
    		},
      	//到达底部加载更多数据
      	async loaderMore(){
      		if (this.touchend) {
      			return
      		}
      		//防止重复请求
      		if (this.preventRepeatReuqest) {
      			return
      		}
      		this.showLoading = true;
      		this.preventRepeatReuqest = true;

      		//数据的定位加1位
      		this.pageNo += 1;
      		let res = await upGradeRecord(this.pageNo,this.pageSize);
          if (res.code==200) {
              this.hideLoading();
              if(res.result.rows != null && res.result.rows !=''){
                let rs = res.result.rows;
                this.upgradeRecordList = [...this.upgradeRecordList, ...rs];
              }
          }else {
            this.hideLoading();
            this.showAlert = true;
            this.alertText = res.msg;
            if (res.code==0 || res.code==-1) {
              localStorage.clear();
            }
          }
      		//当获取数据小于20，说明没有更多数据，不需要再次请求数据
      		if (res.result.rows != null && res.result.rows.length < 10) {
      			this.touchend = true;
      			return
      		}
      		this.preventRepeatReuqest = false;
      	},
        //获取会员升级记录
        async getUpGradeRecord () {
              this.showLoading = true;
             //从后台获取记录
             let res = await upGradeRecord(this.pageNo,this.pageSize);
             if(res.code==200){
                  this.showLoading = false;
                 if(res.result.rows != null && res.result.rows !=''){
                    this.upgradeRecordList = [...res.result.rows];
                 }
             }else {
               this.showLoading = false;
               if (res.code==0 || res.code==-1) {
                  this.showAlert = true;
                  this.alertText = this.data.msg;
                  localStorage.clear();
               }
             }
         		//当获取数据小于20，说明没有更多数据，不需要再次请求数据
         		if (res.result.rows != null && res.result.rows.length < 10) {
         			this.touchend = true;
         			return
         		}
         		this.preventRepeatReuqest = false;
         },
       },
       filters:{
         formatDate(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy-MM-dd');
         }
       }
   }
</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';

   	.empty_data{
   		@include sc(0.5rem, #666);
   		text-align: center;
   		line-height: 2rem;
   	}
   	.return_top{
   		position: fixed;
   		bottom: 3rem;
   		right: 1rem;
   		.back_top_svg{
   			@include wh(2rem, 2rem);
   		}
   	}

   .upGradeRecordContainer{
       background-color:white;
       padding-top: 1.95rem;
       p, span, input{
           font-family: Helvetica Neue,Tahoma,Arial;
       }
   }
   .page{
      border-bottom: 0.1rem solid #eee;
      font-family: Helvetica Neue,Tahoma,Arial;
      font-size: 0.75rem;
      font-weight: normal;;
      width: 100%;
      height: 2rem;
      div,span,li{
        color: darkgrey;
      }
      div{
        float: left;
      }
      /*div:nth-of-type(1){
          width: 75%;
      }
      div:nth-of-type(2){
          width: 25%;
          height: 100%;
          text-align: center;
          line-height: 3rem;
      }*/
      .page-record{
        padding: 0.5rem 1rem;
        width: 100%;
        span{
          padding-left: 3%;
          margin: auto 5%;
          font-size: 0.66rem;
          font-family: cursive;
        }

      }
      .page-record-bottom{
        float: none;
      }
      img{
        width: 1.5rem;
      }
   }

   .coverpart{
       @include wh(100%,100%);
       @include allcover;
       .cover-background{
           @include wh(100%,105%);
           @include allcover;
           background:#000;
           z-index:100;
           opacity:.2;
       }
       .cover-content{
           width:94%;
           z-index:1000;
           .redbao{
             position: absolute;
             top: 15%;
             left: 4%;
             vertical-align:middle;
             display:inline-block;
             width:15rem;
             z-index:1010;
           }
           .redbao_button{
             position: absolute;
             top: 71%;
             left: 19%;
             vertical-align:middle;
             display:inline-block;
             width:10rem;
             z-index:1010;
           }
           .redbao_text{
             position: absolute;
             top: 0;
             left: 0;
             z-index:1020;
             font-size: 30px;
             text-align: center;
             width: 60%;
             height: 50px;
             line-height: 50px;
             color: #DA4E3F;
             margin: 40% 20% 0 20%;
           }
       }
   }
</style>
