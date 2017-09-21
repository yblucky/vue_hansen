import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'


/**
 * 获取短信验证码
 */

export const mobileCode = phoneNumber => fetch('/common/sendSms', {phoneNumber}, 'GET');


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
	修改密码
*/
export const changePassword = (oldPassWord,newPassWord,confirmPassWord,pwdType) => fetch('/user/updatePwd', {
		oldPassWord: oldPassWord,
		newPassWord: newPassWord,
		confirmPassWord: confirmPassWord,
		pwdType:pwdType
}, 'POST');


/**
 * 获取用户信息
 */

export const getUser = () => fetch('/login/userinfo', {},'GET');

/**
 * 账号密码登录
 */
export const loginIn = (loginName, password,picCode, key) => fetch('/login/loginIn', {loginName, password,picCode,key}, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');

/**
 * 用户提币
 */
export const cointOut = (address, amount, walletOrderType,payPassWord) => fetch('/wallet/coinout', {address, amount, walletOrderType,payPassWord}, 'POST');

/**
 * 获取用户激活码转账记录  1:激活码  2:注册码
 */

export const codeTransferList = (pageNo,pageSize,codeType) => fetch('/code/list', {pageNo,pageSize,codeType},'GET');

/**
 * 用户相互之间转账--转币
 */
export const coinTransfer = (toUid, amount, walletOrderType,payPassWord) => fetch('/wallet/cointransfer', {toUid, amount, walletOrderType,payPassWord}, 'POST');


/**
 * 用户相互之间转账--内部转币记录  orderType :1  4 8
 */
export const coinInnerTransferList = (pageNo,pageSize,orderType) => fetch('/wallet/coininnerlist', {pageNo,pageSize,orderType}, 'GET');


/**
 * 用户提币充币记录--外部转币记录
 */
export const coinOuterTransferList = (pageNo,pageSize,orderType) => fetch('/wallet/coinoutterlist', {pageNo,pageSize,orderType}, 'GET');

/**
 * 用户相互之间激活码注册码转让  1:激活码  2:注册码
 */
export const codeTransfer = (toUid, transferNo, codeType,payword) => fetch('/code/codetransfer', {toUid, transferNo, codeType,payword}, 'POST');
/**
 * 会员升级
 */
export const memberUpgrade = (upGradeWay, grade, payWord) => fetch('/user/memberUpgrade', {upGradeWay, grade, payWord}, 'POST');

/**
 * 获取开卡等级列表
 */
export const findCardGradeList = (cardGrade) => fetch('/cardgrade/list', {}, 'GET');

/**
 * 获取开卡等级
 */
export const findCardGrade = (cardGrade) => fetch('/cardgrade/info', {cardGrade}, 'GET');


/**
 * 补差价升级，获取开卡等级，后台接口计算各种数值
 */
export const findDifferInfoCardGrade = (cardGrade) => fetch('/cardgrade/differInfo', {cardGrade}, 'GET');

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
 * 邀请会员注册
 */
export const innerCreateUser = (loginName,phone,email,cardGrade,password,confirmPassword,payword,confirmPayWord,firstReferrer,contactUserId) => fetch('/user/innercreateuser', {loginName,phone,email,cardGrade,password,confirmPassword,payword,confirmPayWord,firstReferrer,contactUserId},'POST');

/**
 * 我的团队
 */
export const myteam = (pageNo,pageSize,parentUserId) => fetch('/user/myteam', {pageNo,pageSize,parentUserId}, 'GET');
/**
 * 我的团队
 */
export const signlist = (pageNo,pageSize) => fetch('/sign/signlist', {pageNo,pageSize}, 'GET');

/**
 * 获取红包金额
 */
export const rewardsign = () => fetch('/sign/rewardsign', {},'GET');

/**
 * 修改用户信息
 */
export const updateUserInfo = (phone, nickName, headImgUrl,email) => fetch('/user/updateUserInfo', {phone, nickName, headImgUrl,email}, 'POST');

/**
 * 修改用户银行卡
 */
export const updateUserBankInfo = (userName, bankType, bankCardNo) => fetch('/user/updateUserInfo', {userName, bankType,bankCardNo}, 'POST');

/**
 * 修改用户收货地址
 */
export const updateUserShopAddrInfo = (receiver, receiverPhone, shopAddr) => fetch('/user/updateUserInfo', {receiver, receiverPhone,shopAddr}, 'POST');


/**
 * 修改用户提币地址
 */
export const updateUserInfoOutAddress = (outPayAddress, outEquityAddress, outTradeAddress) => fetch('/user/updateUserInfo', {outPayAddress, outEquityAddress, outTradeAddress}, 'POST');

/**
 * 获取任务列表
 */
export const getTaskInfo = (pageNo,pageSize) => fetch('/task/getTaskInfo', {pageNo,pageSize}, 'GET');

/**
 * 点击任务做任务
 */
export const doTask = (userTaskId) => fetch('/task/dotask', {userTaskId}, 'POST');

/**
 * 首页获取激活信息
 */
export const activeInfo = () => fetch('/user/activeInfo', {}, 'GET');

/**
 * 首页激活用户
 */
export const activeUser = () => fetch('/user/firstActicveUser', {}, 'GET');

/**
 * 重新激活用户
 */
export const intervalActice = () => fetch('/code/intervalActice', {}, 'GET');

/**
 * 获取奖金列表信息
 */
export const rewardInfo = (tradeOrderType) => fetch('/reward/list', {tradeOrderType}, 'GET');


/**
 * 财务中心
 */
export const financialInfo = () => fetch('/financial/info', {}, 'GET');

/**
 * 获取分享二维码
 */
export const shareCode = () => fetch('/share/sharecode', {}, 'GET');


/**
 * 分享注册重新选择注册卡的等级
 */
export const shareChooseCardeGrade = (grade) => fetch('/share/shareChooseCardeGrade', {grade}, 'POST');

/**
 * 分享注册重新选择注册卡的等级
 */
export const chooseCardeGradeAgain = (grade) => fetch('/share/chooseCardeGradeAgain', {grade}, 'POST');

/**
 * 根据任务id查询任务信息
 */
export const getTaskInfoById = (taskId) => fetch('/task/getTaskInfoById', {taskId}, 'GET');
