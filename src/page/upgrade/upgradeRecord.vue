<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="升级记录" go-back='true'></head-top>
       <ul v-load-more="loaderMore">
          <li class="page" v-for="item in upgradeRecordList">
              <div class="page-record">
                <span class="">{{item.createTime | formatDate}}</span>
                <div  class="page-record-bottom">
                  <span>{{item.historyGradeName}}</span>
                  <img src="../../images/rightLogo.png"/>
                  <span>{{item.currencyGradeName}}</span>
                </div>
              </div>
              <div>{{item.upGradeTypeName}}</div>
          </li>
       </ul>

       <p v-if="touchend" class="empty_data">没有更多了</p>
       <aside class="return_top" @click="backTop" v-if="showBackStatus">
         <svg class="back_top_svg">
           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
         </svg>
       </aside>
       <transition name="loading">
         <loading v-show="showLoading"></loading>
       </transition>
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


   export default {
     data(){
           return{
              upgradeRecordList:[],//升级记录
              pageNo:1,
              pageSize:10,
        		  preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
        			showBackStatus: false, //显示返回顶部按钮
        			showLoading: true, //显示加载动画
        			touchend: false, //没有更多数据
           }
       },
       created(){
         this.getUpGradeRecord();
       },
       components: {
           headTop,
           footGuide,
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
              let rs = res.upgradeRecordList.rows;
          		this.msgList = [...this.upgradeRecordList, ...rs];
          }else {
            this.showAlert = true;
            this.alertText = res.msg;
            if (res.code==0 || res.code==-1) {
              localStorage.clear();
            }
          }
      		this.hideLoading();
      		//当获取数据小于20，说明没有更多数据，不需要再次请求数据
      		if ( res.result.rows.length < 10) {
      			this.touchend = true;
      			return
      		}
      		this.preventRepeatReuqest = false;
      	},
        //获取会员升级记录
        async getUpGradeRecord () {
             //从后台获取记录
             let res = await upGradeRecord(this.pageNo,this.pageSize);
             if(res.code==200){
               this.upgradeRecordList = [...res.result.rows];
             }else {
               if (res.code==0 || res.code==-1) {
                  this.showAlert = true;
                  this.alertText = this.data.msg;
                  localStorage.clear();
               }
             }
         		this.hideLoading();
         		//当获取数据小于20，说明没有更多数据，不需要再次请求数据
         		if ( res.result.rows.length < 10) {
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
      height: 3rem;
      div,span,li{
        color: darkgrey;
      }
      div{
        float: left;
      }
      div:nth-of-type(1){
          width: 75%;
      }
      div:nth-of-type(2){
          width: 25%;
          height: 100%;
          text-align: center;
          line-height: 3rem;
      }
      .page-record{
        padding: 0.5rem 0.5rem;
        width: 100%;
      }
      .page-record-bottom{
        float: none;
      }
      img{
        width: 1.5rem;
      }
   }
</style>
