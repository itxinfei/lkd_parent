import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:likede/pages/login_module/index/index_page.dart';

// import '../../application.dart';

class WelcomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // 设置适配尺寸
    ScreenUtil.init(context,
        designSize: Size(375, 812), allowFontScaling: false);
    // return ApplicationPage();
    return LoginIndexPage();
  }
}
