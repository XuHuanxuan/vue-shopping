const INFO_KEY = 'vue_shopping_user_info'
const HISTORY_KEY = 'vue_history_list'

// 获取个人信息
export const storageGetInfo = () => {
  const info = localStorage.getItem(INFO_KEY)
  return info ? JSON.parse(info) : { token: '', UserId: '' }
}

// 设置个人信息
export const storageSetInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

// 移除个人信息
export const storageRemoveInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

// 设置搜索历史
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
