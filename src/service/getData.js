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
export const loginIn = (loginName, password,picCode, key) => fetch('/login/loginIn', {loginName, password,picCode,key}, 'POST');


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
/**
 * 修改用户信息
 */
export const updateUserInfo = (phone, nickName, headImgUrl,email) => fetch('/user/updateUserInfo', {phone, nickName, headImgUrl,email}, 'POST');

/**
 * 获取红包金额
 */
export const rewardsign = () => fetch('/sign/rewardsign', {},'GET');
