import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import {
  getToken,
  setToken,
  removeToken,
  setUserId,
  setUserName,
  getUserId,
  getUserName,
  removeUserId,
  removeUserName
} from '@/utils/cookies'
import { login } from '@/api/users'
import { UserLogin } from '@/entity/user'

export interface IUserState {
  token: string
  userId: number
  userName: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public userId = getUserId() || 0
  public userName = getUserName() || ''

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_USER_ID(userId: number) {
    this.userId = userId
  }

  @Mutation
  private SET_USER_NAME(userName: string) {
    this.userName = userName
  }

  @Action
  public async Login(userInfo: { loginName: string; password: string; code: string; clientToken: string }) {
    let result: any
    let { loginName, password, code, clientToken } = userInfo
    loginName = loginName.trim()
    const loginType = 0
    try {
      const { data } = await login({ loginName, password, code, clientToken, loginType })
      if (data.success) {
        setToken(data.token)
        this.SET_TOKEN(data.token)
        setUserId(data.userId)
        this.SET_USER_ID(data.userId)
        setUserName(data.userName)
        this.SET_USER_NAME(data.userName)
      }
      result = data
    } catch (err) {
      console.log('err: ' + err)
    }
    return result
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    removeUserId()
    this.SET_USER_ID(0)
    removeUserName()
    this.SET_USER_NAME('')
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    removeToken()
    this.SET_TOKEN('')
    removeUserId()
    this.SET_USER_ID(0)
    removeUserName()
    this.SET_USER_NAME('')
  }
}

export const UserModule = getModule(User)
