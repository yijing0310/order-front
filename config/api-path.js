export const API_SERVER = "http://localhost:3001"
// JWT 登入
export const JWT_LOGIN = `${API_SERVER}/login-jwt`
// 註冊
export const REGISTER_POST = `${API_SERVER}/admin/register/api`
// 獲取用戶資訊
export const PROFILE_GET = `${API_SERVER}/admin/profile/api`
// 修改用戶資訊
export const PROFILE_EDIT_POST = `${API_SERVER}/admin/editProfile/api`
// 我的揪團
export const GROUP_GET = `${API_SERVER}/group/api`
// 新增揪團 
export const ADD_GROUP_POST = `${API_SERVER}/group/add/api`
// 加入揪團
export const JOIN_GROUP_POST  = `${API_SERVER}/group/join/api`
// 刪除揪團
export const DELETE_GROUP_POST  = `${API_SERVER}/group/delete/api`
// 編輯揪團
export const EDIT_GROUP_POST  = `${API_SERVER}/group/edit/api`
// 獲取該團點餐總覽
export const ORDER_LIST_GET  = `${API_SERVER}/order/api`
// 獲取該團詳細資訊
export const ORDER_DETAIL_GET  = `${API_SERVER}/order/list/api`
//  獲取點餐模板
export const ORDER_TEMPLATE_GET  = `${API_SERVER}/order/templates/api`
// 新增餐點
export const ORDER_ADD_POST  = `${API_SERVER}/order/add/api`
//  修改付款狀態
export const TOGGLE_STATUS  = `${API_SERVER}/order/updatePaid/api`
// 刪除指定餐點
export const DELETE_ORDER  = `${API_SERVER}/order/delete/api`

