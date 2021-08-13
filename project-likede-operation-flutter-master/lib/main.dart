import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:likede/routes.dart';
import 'package:likede/simple_bloc_observer.dart';

import 'pages/login_module/welcome/index_page.dart';

import 'common/config/theme.dart';
import 'common/utils/sp.dart';

Future<void> main() async {
  // runApp之前必须手动调用
  WidgetsFlutterBinding.ensureInitialized();
  // 初始化SPUtil
  await SPUtil.getInstance();
  // TODO: I/Choreographer(24360): Skipped 119 frames!  The application may be doing too much work on its main thread.
  /// 初始化动态路由
  final router = new FluroRouter();
  Routes.configureRoutes(router);

  Bloc.observer = SimpleBlocObserver();
  runApp(MyApp(router: router));
}

class MyApp extends StatelessWidget {
  final router;

  const MyApp({Key key, this.router}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // TODO: 创建一个全局主题
      theme: ThemeData(primaryColor: THEME_COLOR_PRIMARY),
      home: WelcomePage(),
      routes: routes, // 配置静态路由
      onGenerateRoute: router.generator,
      debugShowCheckedModeBanner: false,
    );
  }
}
