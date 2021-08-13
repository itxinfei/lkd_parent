export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

// 手机号正则，参考：http://caibaojian.com/phone-regexp.html
export const validatePhone = (rule: any, value: any, callback: any) => {
  if (!/^1[0-9]{10}$/.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

// 型号编码正则
export const validateModel = (rule: any, value: any, callback: any) => {
  if (!/^[a-zA-Z0-9_-]{1,15}$/.test(value)) {
    callback(new Error('请输入合法的型号编码'))
  } else {
    callback()
  }
}
