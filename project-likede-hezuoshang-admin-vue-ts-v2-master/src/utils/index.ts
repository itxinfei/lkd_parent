// /**
// * 获取本周、本季度、本月、上月的开始日期、结束日期
// */
// var now = new Date() //当前日期 
// var nowDayOfWeek = now.getDay() //今天本周的第几天 
// var nowDay = now.getDate() //当前日 
// var nowMonth = now.getMonth() //当前月 
// var nowYear = now.getYear() //当前年 
// nowYear += (nowYear < 2000) ? 1900 : 0 //

// var lastMonthDate = new Date() //上月日期
// lastMonthDate.setDate(1)
// lastMonthDate.setMonth(lastMonthDate.getMonth()-1)
// var lastYear = lastMonthDate.getYear()
// var lastMonth = lastMonthDate.getMonth()

// function formatDateNew (date: Date) { 
//   var myyear: string | number = date.getFullYear()
//   var mymonth: string | number = date.getMonth() + 1
//   var myweekday: string | number = date.getDate()
  
//   if(mymonth < 10){ 
//   mymonth = "0" + mymonth
//   } 
//   if(myweekday < 10){ 
//   myweekday = "0" + myweekday
//   } 
//   return (myyear+"-"+mymonth + "-" + myweekday)
// }

// //获得某月的天数 
// function getMonthDays (myMonth: number) { 
//   var monthStartDate: Date= new Date(nowYear, myMonth, 1)
//   var monthEndDate: Date = new Date(nowYear, myMonth + 1, 1)
//   var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
//   return days
// }
// // 获得上月开始时间
// function getLastMonthStartDate () {
//   var lastMonthStartDate = new Date(nowYear, lastMonth, 1)
//   return formatDateNew(lastMonthStartDate)
// }
  
// // 获得上月结束时间
// function getLastMonthEndDate () {
//   var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth))
//   return formatDateNew(lastMonthEndDate)
// }