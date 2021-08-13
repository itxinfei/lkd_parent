

/**
* 获取本周、本季度、本月、上月的开始日期、结束日期
*/
// 当前日期 
const now = new Date()
 // 今天本周的第几天 
const nowDayOfWeek = now.getDay()
//当前日 
const nowDay = now.getDate()
//当前月 
const nowMonth = now.getMonth()
// 当前年 
let nowYear = now.getFullYear()
nowYear += (nowYear < 2000) ? 1900 : 0
// 上月日期
const lastMonthDate = new Date()
lastMonthDate.setDate(1)
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)

function dateFormat(fmt: string, date: Date) {
  let ret;
  const opt: { [platname: string]: string } = {
    // 年
    "Y+": date.getFullYear().toString(),  
    // 月
    'm+': (date.getMonth() + 1).toString(),
    // 日
    'd+': date.getDate().toString(),
    // 时  
    'H+': date.getHours().toString(),
    // 分   
    'M+': date.getMinutes().toString(),
    // 秒  
    'S+': date.getSeconds().toString()
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  } 
  for ( const k in opt ) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

//获得某月的天数
function getMonthDays(myMonth: number) {
  // const now = new Date()
  const nowYearDays = now.getFullYear()
  const monthStartDate = Number(new Date(nowYearDays, myMonth, 1))
  const monthEndDate = Number(new Date(nowYearDays, myMonth + 1, 1))
  const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
  return days
}

export const getLastMonthStartDateAndEndDate = () => {
  //当前日期
  // const now = new Date()
  //当前年
  // let nowYear = now.getFullYear()
  // nowYear += (nowYear < 2000) ? 1900 : 0
  //上月日期
  const lastMonthDate = new Date()
  lastMonthDate.setDate(1)
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
  const lastMonth = lastMonthDate.getMonth()
  const lastMonthStartDate = new Date(nowYear, lastMonth, 1)
  const lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth))
  return [dateFormat('YYYY-mm-dd', lastMonthStartDate), dateFormat('YYYY-mm-dd', lastMonthEndDate)]
}





//格式化日期：yyyy-MM-dd 
function formatDate(date: Date, show = false) {
  const myyear = date.getFullYear()
  let mymonth: string | number = date.getMonth() + 1
  // let myweekday: string | number = date.getDate() + 1
  let myweekday: string | number = date.getDate()
  
  if(mymonth < 10){ 
    mymonth = '0' + mymonth
  }
  if(myweekday < 10){ 
    myweekday = '0' + myweekday
  }
  if (show) {
    return (myyear + '-' + mymonth + '-' + myweekday + ' ' + '00:00:00')
  } else {
    return (myyear + '-' + mymonth + '-' + myweekday)
  }
  
}

// 获得本周的开始日期 
export const getWeekStartDate = () => {
  const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)
  return formatDate(weekStartDate, true)
} 

// 获得本周的结束日期 
export const getWeekEndDate = () => {
  const weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek))
  return formatDate(weekEndDate, true)
}

// 获得本周的开始日期 
export const getWeekStartDateChart = () => {
  const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)
  return formatDate(weekStartDate, false)
} 

// 获得本周的结束日期 
export const getWeekEndDateChart = () => {
  const weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek))
  return formatDate(weekEndDate, false)
}

export const randomWord = (randomFlag: boolean, min: number, max: number) => {
  let str = ''
  let range = min
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

// 获取当天0点开始
export const startToday = () => {
  const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
  return dateFormat('YYYY-mm-dd HH:MM:SS', start)
}

// 获取当天0点开始 无十分秒
export const startTodayNoHMS = () => {
  const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
  return dateFormat('YYYY-mm-dd', start)
}

// 获取当天59结束
export const endToday = () => {
  const end = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
  return dateFormat('YYYY-mm-dd HH:MM:SS', end)
}



/**

* 获得相对当月AddMonthCount个月的起止日期

* AddMonthCount为0 代表当月 为-1代表上一个月 为1代表下一个月 以此类推

* ***/

function getDateStr3 (date: Date) {
  let year = ''
  let month = ''
  let day = ''
  const now = date
  year = '' + now.getFullYear()
  
  if ((now.getMonth() + 1) < 10) {
    month = '0' + (now.getMonth() + 1)
  } else {
    month = '' + (now.getMonth() + 1)
  }
  
  if ((now.getDate()) < 10) {
    day = '0' + (now.getDate())
  } else {
    day = '' + (now.getDate())
  }
  return year + '-' + month + '-' + day
}

export const getMonthStartAndEnd = (AddMonthCount: number) => {
  // 起止日期数组
  // const startStop = new Array()
  const startStop = []
  // 获取当前时间
  let currentDate = new Date()
  let month = currentDate.getMonth() + AddMonthCount
  if (month < 0) {
    const n = parseInt(String((-month) / 12))
    // const n = month / 12
    month += n * 12
    currentDate.setFullYear(currentDate.getFullYear() - n)
  }
  currentDate = new Date(currentDate.setMonth(month))
  // 获得当前月份0-11
  const currentMonth = currentDate.getMonth()
  // 获得当前年份4位年
  const currentYear = currentDate.getFullYear()
  // 获得上一个月的第一天
  const currentMonthFirstDay = new Date(currentYear, currentMonth, 1)
  // 获得上一月的最后一天
  const currentMonthLastDay = new Date(currentYear, currentMonth + 1, 0)
  // 添加至数组
  startStop.push(getDateStr3(currentMonthFirstDay))
  startStop.push(getDateStr3(currentMonthLastDay))
  // 返回
  return startStop
  }

// 获取当前日期yy-mm-dd

// date 为时间对象

