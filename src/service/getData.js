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

export const getUser = () => fetch('/login/userinfo', {token: getStore('USER_TOKEN')});


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
export const loginIn = (loginName, password,picCode, key) => fetch('/login/loginIn', {loginName, password,picCode,key}, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');


/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');
/**
 * 会员升级
 */
export const memberUpgrade = (upGradeWay, grade, payWord) => fetch('/user/memberUpgrade', {upGradeWay, grade, payWord}, 'POST');
/**
 * 会员等级详细信息
 */
export const findUserCardGrade = (grade) => fetch('/user/findUserCardGrade', {grade}, 'GET');
/**
 * 会员升级记录
 */
export const upGradeRecord = (pageNo,pageSize) => fetch('/user/upGradeRecord', {pageNo,pageSize}, 'GET');
/**
 * 修改登录密码和支付密码
 */
export const updatePwd = (pwdType,oldPassWord, newPassWord, confirmPassWord,oldPayWord,newPayWord,confirmPayWord,picCode,picKey) => fetch('/user/updatePwd', {pwdType,oldPassWord, newPassWord, confirmPassWord,oldPayWord,newPayWord,confirmPayWord,picCode,picKey}, 'POST');
/**
 * 反馈消息记录
 */
export const feedbacklist = (pageNo,pageSize) => fetch('/index/feedbacklist', {pageNo,pageSize}, 'GET');
/**
 * 意见反馈
 */
export const feedback = (type, title, detail,phone) => fetch('/index/feedback', {type, title, detail,phone}, 'POST');
