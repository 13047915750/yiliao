const getters = {
  // 全局
  isCollapse: state => state.global.isCollapse,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  // 账号模块
  userInfo: state => state.account.userInfo,
  isLogin: state => !!state.account.userInfo.token,
  // privilege: state => state.account.userInfo.admin.roles.privilege || [],
  permission: state => state.account.permission,
  privilege: state => state.account.privilege,
  userInfoDetail: state => state.account.userInfoDetail,
  // 医生详情
  doctorInfo: state => state.account.doctorInfo,
  // 创建文章缓存
  documentInsertInfo: state => state.document.documentInsertInfo,
  documentUpdateInfo: state => state.documentUpdateInfo
}
export default getters
