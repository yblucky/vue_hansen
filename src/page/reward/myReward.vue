<template>
    <div class="upGradeContainer">
        <head-top :head-title="'任务奖励红包'" goBack="true"></head-top>
        <section class="show-data" v-load-more="loaderMore">
          <div v-for="item in recordList">
            <div class="showLine">
              <span class="showDate">{{item.signTime | formatDate}}</span>
              <span class="showAmount">￥{{item.amt}}</span>
            </div>
            <ul>
               <li class="page">
                   <span class=""><img  src="../../hsimages/11.png"/>&nbsp;&nbsp;交易币<b>{{item.tradeAmt}}JYB 约{{item.tradeAmtRmb}}元</b></span>
                   <div class="">+{{item.tradeAmtRmb}}</div>
               </li>
              <li class="page">
                  <span class=""><img  src="../../hsimages/10.png"/>&nbsp;&nbsp;购物币<b>{{item.equityAmt}}GWB 约{{item.equityAmtRmb}}元</b></span>
                  <div class="">+{{item.equityAmtRmb}}</div>
              </li>
             <li class="page">
                 <span class=""><img  src="../../hsimages/12.png"/>&nbsp;&nbsp;股权币<b>{{item.payAmt}}GQB 约{{item.payAmtRmb}}元</b></span>
                 <div class="">+{{item.payAmtRmb}}</div>
             </li>
            </ul>
          </div>
        </section>

    	  <p v-if="touchend" class="empty_data">没有更多了</p>
    		<aside class="return_top" @click="backTop" v-if="showBackStatus">
    			<svg class="back_top_svg">
    				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
    			</svg>
    		</aside>

        <div v-if="recordList == null || recordList == ''">
           <nullData></nullData>
        </div>

        <section class="coverpart" v-if="showLoading">
            <section class="cover-background"></section>
            <section class="cover-content">
                <loading></loading>
            </section>
        </section>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {localapi, proapi, imgBaseUrl,formatDate} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {signlist} from 'src/service/getData'
    import {showBack, animate} from 'src/config/mUtils'
    import {loadMore, getImgPath} from 'src/components/common/mixin'
    import loading from 'src/components/common/loading'
    import nullData from 'src/components/common/nullData'

    export default {
        data(){
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                recordList:null,//任务奖励
                pageNo:1,
                pageSize:10,
          		  preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
          			showBackStatus: false, //显示返回顶部按钮
          			showLoading: false, //显示加载动画
          			touchend: false, //没有更多数据
            }
        },
        created(){
          this.getSignlist();
        },
        components: {
            headTop,
            alertTip,
            loading,
            nullData,
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
           		let res = await signlist(this.pageNo,this.pageSize);
               if (res.code==200) {
                  this.showLoading = false;
                   let rs = res.result.rows;
                   if(rs.length > 0){
                      this.recordList = [...this.recordList, ...rs];
                   }
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
            async getSignlist(){
                  //调用接口前显示loading
                  this.showLoading = true;
                  let res = await signlist(this.pageNo,this.pageSize);
                    if (res.code==200) {
                    this.showLoading = false;
                      if(res.result.rows !=null && res.result.rows != ''){
                        this.showLoading = false;
                        this.recordList = [...res.result.rows];
                        //返回数据集合个数大于0的时候做
                        if (res.result.rows.length < 10) {
                     			this.touchend = true;
                     		}
                     		//开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
                     		showBack(status => {
                     			this.showBackStatus = status;
                     		});
                      }else {
                        this.showLoading = false;
                        return;
                      }

                  }else {
                    this.showLoading = false;
                    this.showAlert = true;
                    this.alertText = res.msg;
                    if (res.code==0 || res.code==-1) {
                      localStorage.clear();
                    }
                  }

            },
            toggleTabs (index,tabText) {
                 this.active = index;
             },
             selCard (index) {
                  this.selCardType = index;
              },
            closeTip(){
                this.showAlert = false;
            }
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
    @import '../../style/mixin';

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
    .category_title{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 2rem;
        background-color: #fff;
        border-bottom: 0.1rem solid #eee;
        span{
            text-align: center;
            @include sc(.65rem, #333);
            padding-bottom: .2rem;
            border-bottom: 0.1rem solid #fff;
        }
        .choosed{
            border-bottom-color: $blue;
            color: $blue;
        }
    }
    .show-data{
       background-color: #eee;
       .showLine{
         margin: 0.10rem;
         height:1.5rem;
         width: 100%;
         .showDate{
           font-family: Helvetica Neue,Tahoma,Arial;
           font-size: 0.65rem;
           font-weight: normal;
           color: darkgrey;
           padding: 0 0.35rem;
         }
         .showAmount{
           width: 100%;
           padding: 0 0 0 7rem;
           font-size:16px;
           font-family: cursive;
         }
       }
       ul{
         background-color: white;
       }
      .page{
         border-bottom: 0.1rem solid #eee;
         font-family: Helvetica Neue,Tahoma,Arial;
         font-size: 0.75rem;
         font-weight: normal;;
         width: 100%;
         height: 2rem;
         span{
           padding:0 1rem;
           height: 100%;
           font-weight: bold;
           line-height: 1.8rem;
           b{
            padding:0.45rem;
            font-size:0.35rem;
           }
           img{
             width: 1rem;
             text-align: center;
             vertical-align: middle;
           }
         }
         div{
           float: right;
           height: 100%;
           text-align: center;
           padding:0 0.75rem;
           line-height: 1.8rem;
           color: green;
         }
      }
    }

    .push-data{
      .page{
         border-bottom: 0.1rem solid #eee;
         font-family: Helvetica Neue,Tahoma,Arial;
         font-size: 0.65rem;
         font-weight: normal;;
         background-color: white;
         width: 100%;
         height: 3rem;
         .page-left,.page-right{
           float: left;
         }
         .page-left{
             width: 70%;
             padding:0.35rem 1rem;
             span{
               font-weight: bold;
             }
         }
         .page-right{
             width: 30%;
             height: 100%;
             text-align: right;
             padding:0.35rem 0.65rem;
             span{
               color:darkgrey;
             }
             div{
               color: green;
               padding: 0.25rem 0rem;
             }
         }
         .page-record-bottom{
           float: none;
           width: 100%;
           font-size: 0.55rem;
           padding: 0.25rem 0rem;
           color:darkgrey;
         }
      }

    }

    .change_login{
        position: absolute;
        @include ct;
        right: 0.75rem;
        @include sc(.7rem, #fff);
    }
    .upGradeContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .active_container{
        margin: 0 .5rem 1rem;
        @include sc(.7rem, #fff);
        background-color: #3b95e9;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
    .change_to_text{
        background-color: #4cd964;
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
