import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'


/**
 * 获取短信验证码
 */

export const mobileCode = (phoneNumber) => fetch('/common/sendSms', {
	phoneNumber: phoneNumber
}, 'GET');


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
 * 	忘记密码
 */

export const forgetPwd = (phoneNumber, newPassWord, confirmPassWord,phoneCode) => fetch('/user/forgetPwd', {
		phoneNumber: phoneNumber,
		newPassWord: newPassWord,
		confirmPassWord: confirmPassWord,
		phoneCode:phoneCode
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
export const loginIn = (loginName, password, picCode,key) => fetch('/login/loginIn', {loginName, password, picCode,key}, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');


/**
 * 修改登录密码和支付密码
 */
export const changePassword = (oldPassWord, newPassWord, confirmPassWord,pwdType) => fetch('/user/updatePwd', {oldPassWord, newPassWord, confirmPassWord, pwdType}, 'POST');


/**
 * 用户提币
 */
export const cointOut = (address, amount, walletOrderType,payPassWord) => fetch('/wallet/coinout', {address, amount, walletOrderType,payPassWord}, 'POST');


/**
 * 用户相互之间转账--转币
 */
export const coinTransfer = (toUid, amount, walletOrderType,payPassWord) => fetch('/wallet/cointransfer', {toUid, amount, walletOrderType,payPassWord}, 'POST');




/**
 * 用户相互之间激活码注册码转让  1:激活码  2:注册码
 */
export const codeTransfer = (toUid, transferNo, codeType,payword) => fetch('/code/codetransfer', {toUid, transferNo, codeType,payword}, 'POST');
