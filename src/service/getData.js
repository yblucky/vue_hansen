import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'


/**
 * 获取短信验证码
 */

export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
	mobile: phone,
	scene: 'login',
	type: 'sms'
}, 'POST');


/**
 * 获取图片验证码
 */

export const getcaptchas = () => fetch('/common/pic64code', {},'GET');


/**
 * 检测帐号是否存在
 */

export const checkExsis = (checkNumber, type) => fetch('/v1/users/exists', {
	[type]: checkNumber,
	type
});


/**
 * 发送帐号
 */

export const sendMobile = (sendData, captcha_code, type, password) => fetch('/v1/mobile/verify_code/send', {
	action: "send",
	captcha_code,
	[type]: sendData,
	type: "sms",
	way: type,
	password,
}, 'POST');



/**
 * 获取用户信息
 */

export const getUser = () => fetch('/login/userinfo', {},'GET');


/**
 * 手机号登录
 */

var sendLogin = (code, mobile, validate_token) => fetch('/v1/login/app_mobile', {
	code,
	mobile,
	validate_token
}, 'POST');

/**
 * 账号密码登录
 */
export const loginIn = (loginName, password, key) => fetch('/login/loginIn', {loginName, password, key}, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');


/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');


/**
 * 用户提币
 */
export const cointOut = (address, amount, walletOrderType,payPassWord) => fetch('/wallet/coinout', {address, amount, walletOrderType,payPassWord}, 'POST');


/**
 * 用户相互之间转账--转币
 */
export const coinTransfer = (toUid, amount, walletOrderType,payPassWord) => fetch('/wallet/cointransfer', {toUid, amount, walletOrderType,payPassWord}, 'POST');
