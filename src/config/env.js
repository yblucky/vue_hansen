/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let routerMode = 'history';
// let imgBaseUrl = 'http://images.cangdu.org/';
let imgBaseUrl="http://oum0lyvjq.bkt.clouddn.com/logo.png";

if (process.env.NODE_ENV == 'development') {
		// baseUrl="http://hs.6pyun.com/api";
		// baseUrl="http://www.hansenshare.com/api";
		baseUrl="http://192.168.2.113:8090/api";
}else if(process.env.NODE_ENV == 'production'){
	// baseUrl = 'http://cangdu.org:8001';
		// baseUrl="http://hs.6pyun.com/api";
		baseUrl="http://www.hansenshare.com/api";
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
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
			localStorage.setItem("token", newToken);
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
			if(!this.obj.hasOwnProperty(key) ){
				return null;
			}
			return this.obj[key];
		}
	}
}
//根据key值获取本地存储的用户信息
export function getUserInfo (key) {
	let obj = getUserJson();
	if(!obj.hasOwnProperty(key) ){
		return null;
	}
	return obj[key];
}
//根据key-value值修改本地存储的用户信息
export function updateLocalUser(key,value) {
	let obj = getUserJson();
	if(!obj.hasOwnProperty(key) ){
		return null;
	}
	obj[key]=value;
	localStorage.setItem("loginUserInfo", JSON.stringify(obj));
}
//获取本地存储的用户json对象
function getUserJson(){
	let userinfo=localStorage.getItem("loginUserInfo");
	if (!userinfo) {
		return null;
	}
  let obj = JSON.parse(userinfo);
	return obj;
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

export function subStr(str,start,end){
	return (str).substr(start,end)
}
