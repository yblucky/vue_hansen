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
		setToken(newToken) {
		 this.token=newToken;
			return  this.token
		}
	}
}
