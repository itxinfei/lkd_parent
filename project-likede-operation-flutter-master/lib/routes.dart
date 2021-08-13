import 'package:fluro/fluro.dart';
import 'package:likede/pages/application.dart';
import 'package:likede/pages/search_module/index/index_page.dart';
import 'package:likede/pages/task_module/detail/index_page.dart';

import 'pages/login_module/index/index_page.dart';

var routes = {
  '/login/index': (context) => LoginIndexPage(), // 登录、验证码
  '/index': (context) => ApplicationPage(), // 首页
  '/search/index': (context) => SearchIndexPage(), // 搜索页
};

/// 动态路由
class Routes {
  static FluroRouter router;
  static String taskDetailPage = '/task/detail';

  static void configureRoutes(FluroRouter router) {
    // 工单详情
    router.define(
      taskDetailPage,
      handler: Handler(
        handlerFunc: (context, params) => TaskDetailPage(
          taskStr: params['taskStr'][0],
        ),
      ),
    );

    Routes.router = router;
  }
}
