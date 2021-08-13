import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';

/// 根据屏幕宽度适配尺寸
double hmSetWidth(double width) {
  return ScreenUtil().setWidth(width);
}

/// 根据屏幕高度适配尺寸
double hmSetHeight(double height) {
  return ScreenUtil().setHeight(height);
}

/// 设置 EdgeInsets.fromLTRB
EdgeInsets hmSetEdgeInsetsLTRB(
    double left, double top, double right, double bottom) {
  return EdgeInsets.fromLTRB(
    ScreenUtil().setWidth(left),
    ScreenUtil().setHeight(top),
    ScreenUtil().setWidth(right),
    ScreenUtil().setHeight(bottom),
  );
}

/// 设置 EdgeInsets.all
EdgeInsets hmSetEdgeInsetsAll(value) {
  return EdgeInsets.all(ScreenUtil().setWidth(value));
}

/// 适配字体
double hmSetFontSize(double size) {
  return ScreenUtil().setSp(size);
}

/// 关闭键盘
hmHiddenKeyboard(BuildContext context) {
  FocusScope.of(context).requestFocus(FocusNode());
}

/// 格式化日期
hmFormatDateTimeStr(dateTimeStr) {
  return DateFormat("yyyy.MM.dd HH:mm:ss").format(DateTime.parse(dateTimeStr));
}

/// tosta
hmShowTosta(String message) {
  Fluttertoast.showToast(
    msg: message,
    toastLength: Toast.LENGTH_SHORT,
    gravity: ToastGravity.BOTTOM,
    // timeInSecForIos: 1,
    // backgroundColor: Colors.red,
    // textColor: Colors.white,
    fontSize: 16.0,
  );
}

/// 操作完成/失败对话框
void hmShowDialog(BuildContext context, isSuccess) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      /// 2秒钟自动关闭
      Future.delayed(Duration(seconds: 2), () {
        Navigator.of(context)..pop()..pop();
      });

      return Material(
        color: Colors.transparent,
        child: Container(
          color: const Color.fromRGBO(0, 0, 0, 0.5),
          child: Center(
            child: Container(
              decoration: BoxDecoration(
                color: const Color(0xFFFFFFFF),
                borderRadius: BorderRadius.all(
                  Radius.circular(
                    hmSetWidth(14),
                  ),
                ),
              ),
              height: hmSetWidth(152),
              width: hmSetWidth(152),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Image.asset(
                    isSuccess
                        ? 'assets/images/success.png'
                        : 'assets/images/fail.png',
                    width: hmSetWidth(44),
                    height: hmSetWidth(44),
                  ),
                  Padding(
                    padding: EdgeInsets.only(
                      top: hmSetHeight(15),
                    ),
                    child: Text(
                      isSuccess ? '操作完成' : '操作失败',
                      style: TextStyle(
                        color: Color(0xFF181A39),
                        fontSize: hmSetFontSize(18),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
    },
  );
}
