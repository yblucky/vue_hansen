/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let token=null;
let baseUrl = '';
let routerMode = 'history';
// let imgBaseUrl = 'http://images.cangdu.org/';
let imgBaseUrl="http://oum0lyvjq.bkt.clouddn.com/logo.png";

if (process.env.NODE_ENV == 'development') {
		baseUrl="http://192.168.2.222:8090/api";
		// baseUrl="http://192.168.2.128:8090/hansen";
}else if(process.env.NODE_ENV == 'production'){
	// baseUrl = 'http://cangdu.org:8001';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
	token
}


export const isLogin = {
	methods: {
			isLogin(url) {
				 this.token=localStorage.getItem("token");
				 if (!this.token) {
				 	  this.$router.push("/login");
				 }
		 }
 }
}

export const setToken = {
	methods: {
		setToken(newToken,obj) {
		 this.token=newToken;
 	 		localStorage.setItem("loginUserInfo", JSON.stringify(obj));
			return  this.token;
		}
	}
}

export const getLoginUserInfo = {
	methods: {
		getLoginUserInfo(key) {
			this.info=localStorage.getItem("loginUserInfo");
			if (!this.info) {
				return null;
			}
			this.obj = JSON.parse(this.info);
			if(!this.obj){
				return null;
			}
				console.log(this.obj[key]);
			if (this.obj[key]) {
				console.log(this.obj[key]);
				return this.obj[key];
			}
			return  null;
		}
	}
}
//格式化日期 eg:formatDate(new Date(),'yyyy-MM-dd hh:mm')
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
