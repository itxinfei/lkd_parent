import { PageModelView } from './page'

export interface LoginModelView {
  /**
   * 客户端请求验证码的token，两个后台登录需要提供
   */
  clientToken: string;
  /**
   * 验证码
   */
  code: string;
  /**
   * 用户名(后台登录需要提供)
   */
  loginName: string;
  /**
   * 登录类型 0：后台；1：运营运维端；2：合作商后台
   */
  loginType: number;
  /**
   * 客户端登录需要提供
   */
  mobile?: string;
  /**
   * 密码(后台或代理商登录需要提供)
   */
  password: string;
}

export interface UserPageModelView extends PageModelView {
  /**
   * 人员名称
   */
  userName?: string;
  /**
   * 角色Id
   */
  roleId?: number
  /**
   * 是否是运维人员
   */
  isRepair?: boolean
}

export interface UserWorkPageModelView extends PageModelView {
  /**
   * 用户名
   */
  userName?: string;
  /**
   * 角色Id
   */
  roleId?: number;
  /**
   * 是否是运维人员
   */
  isRepair?: boolean
}

export interface UserLogin {
  /**
   * 是否是维修员(运营、运维客户端专用)
   */
  isRepair: boolean
  msg: string
  /**
   * 区域Id(运营、运维客户端专用)
   */
  regionId: string
  /**
   * 角色code
   */
  roleCode: string
  /**
   * 是否成功
   */
  success: boolean
  /**
   * jwt令牌
   */
  token: string
  userId: number
  userName: string
}

export interface User {
  /**
   * 用户Id
   */
  id: number;
  /**
   * 联系电话
   */
  mobile: string;
  /**
   * 所属区域Id
   */
  regionId: string;
  /**
   * 归属区域
   */
  regionName: string;
  /**
   * 角色信息
   */
  role: Role;
  /**
   * 角色Id
   */
  roleId: number;
  /**
   * 人员名称
   */
  userName: string;
  /**
   * 头像
   */
  image: string;
  /**
   * 启用状态
   */
  status: boolean;
}

export interface Role {
  /**
   * 角色编码
   */
  roleCode: string;
  /**
   * 角色Id
   */
  roleId: number;
  /**
   * 角色名称
   */
  roleName: string;
}

export interface UserModelView {
  /**
   * 头像Url
   */
  image: string;
  /**
   * 手机号
   */
  mobile: string;
  /**
   * 所属区域Id
   */
  regionId: string;
  /**
   * 所属区域名称
   */
  regionName: string;
  /**
   * 角色Id
   */
  roleId?: number;
  /**
   * 启用状态
   */
  status: boolean;
  /**
   * 用户名
   */
  userName: string;
}

export interface UserWork {
  /**
   * 拒绝工单数
   */
  cancelCount: number;
  /**
   * 当日进行中的工单
   */
  progressTotal: number;
  roleName: string;
  userId: number;
  userName: string;
  mobile: string;
  /**
   * 完成工单数
   */
  workCount: number;
}

export interface TaskUser {
  userId: string;
  userName: string;
}
