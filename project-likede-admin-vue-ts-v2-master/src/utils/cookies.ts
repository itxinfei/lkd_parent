import Cookies from 'js-cookie'

// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatusKey, sidebarStatus)

// Token
const tokenKey = 'app_token'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)

// UserId
const userIdKey = 'app_user_id'
export const getUserId = () => Number(Cookies.get(userIdKey))
export const setUserId = (token: number) =>
  Cookies.set(userIdKey, token.toString())
export const removeUserId = () => Cookies.remove(userIdKey)

// UserName
const userNameKey = 'app_user_name'
export const getUserName = () => Cookies.get(userNameKey)
export const setUserName = (token: string) => Cookies.set(userNameKey, token)
export const removeUserName = () => Cookies.remove(userNameKey)
