<template>
   <div class="upGradeRecordContainer">
       <head-top head-title="消息中心" go-back='true'>
           <div slot="changeLogin" class="jumpRecord">
             <router-link to="/setMessage" >反馈</router-link>
           </div>
       </head-top>
       <ul  v-load-more="loaderMore">
          <li class="page" v-for="item in msgList">
              <div class="page-record">
                  <div class="imgdiv">
                    <img src="../../hsimages/6.png"  class="privateImage"/>
                  </div>
                  <div class="rightContent">
                      <div class="top">
                          <span class="spanLeft">{{item.title}}</span>
                          <span class="spanRight">{{item.createTime | formatDate}}</span>
                      </div>
                      <div class="bottom">
                          {{item.detail}}
                      </div>
                  </div>
              </div>
          </li>
       </ul>

       <div v-if="msgList == null || msgList == ''">
          <nullData></nullData>
       </div>

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
   import {mapState, mapMutations} from 'vuex'
  //  import footGuide from 'src/components/footer/footGuide'
   import {formatDate, proapi, imgBaseUrl,token,setToken} from 'src/config/env'
   import {feedbacklist} from '../../service/getData'
   import {showBack, animate} from 'src/config/mUtils'
   import {loadMore, getImgPath} from 'src/components/common/mixin'
   import loading from 'src/components/common/loading'
   import nullData from 'src/components/common/nullData'

   export default {
     data(){
           return{
              msgList:[],
              pageNo:1,
              pageSize:10,
        		  preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
        			showBackStatus: false, //显示返回顶部按钮
        			showLoading: true, //显示加载动画
        			touchend: false, //没有更多数据
           }
       },
       created(){
         this.getfeedbacklist();
       },
       components: {
           headTop,
           loading,
           nullData,
          //  footGuide,
       },
       mixins: [loadMore, getImgPath],
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
      		let res = await feedbacklist(this.pageNo,this.pageSize);
          if (res.code==200) {
              let rs = res.result.rows;
          		this.msgList = [...this.msgList, ...rs];
          }else {
            this.showLoading = false;
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
        async getfeedbacklist () {
             //从后台获取记录
             let res = await feedbacklist(this.pageNo,this.pageSize);
             if (res.code==200) {
                 if(res.result.rows == null){
                    this.showLoading = false;
                    return
                 }
                 this.msgList = [...res.result.rows];
             }else {
               this.showLoading = false;
               this.showAlert = true;
               this.alertText = res.msg;
               if (res.code==0 || res.code==-1) {
                 localStorage.clear();
               }
             }
        		if (res.result.rows.length < 10) {
        			this.touchend = true;
        		}
        		this.hideLoading();
        		//开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
        		showBack(status => {
        			this.showBackStatus = status;
        		});

         },
       },
       filters:{
         formatDate(createTime){
           let date = new Date(createTime);
           return formatDate(date,'yyyy年MM月dd日');
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
       padding-top: 1.95rem;
       z-index: 203;
       background-color: #fff;
       p, span{
           font-family: Helvetica Neue,Tahoma,Arial;
       }
   }
   .jumpRecord{
       position: absolute;
       @include ct;
       right: 0.75rem;
       @include sc(.7rem, #fff);
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
      .page-record{
        width: 100%;
        padding: 0.5rem 0.5rem;
      }
      .imgdiv{
        float: left;
        width: 20%;
      }
      .rightContent{
          font-size: 0.55rem;
          float: left;
          width:80%;
          display: block;
          div,span{
            color: black;
          }
          .top{
            width: 100%;
            .spanRight{
              padding: 0 0 0 4rem;
              position: absolute;
              right: 0.35rem;
            }
          }
          .bottom{
            width: 100%;
            height: 1.5rem;
            word-wrap:break-word;
            overflow:hidden;
          }
      }
      img{
        width: 2rem;
      }
   }
</style>
