import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'package:likede/common/api/task.dart';
import 'package:likede/common/api/user.dart';
import 'package:likede/common/config/storage.dart';
import 'package:likede/common/entity/user_base.dart';
import 'package:likede/common/entity/task_rank.dart';
import 'package:likede/common/utils/function.dart';
import 'package:likede/pages/home_module/index/bloc/task_bloc.dart';

import 'package:likede/pages/home_module/index/todo_task_widget.dart';
import 'package:likede/pages/home_module/index/user_info_widget.dart';

class HomeIndexPage extends StatefulWidget {
  @override
  _HomeIndexPageState createState() => _HomeIndexPageState();
}

class _HomeIndexPageState extends State<HomeIndexPage>
    with AutomaticKeepAliveClientMixin {
  // TODO: 没有生效
  // 保持页面状态
  // TODO：loading加载样式需要UI提供
  @override
  bool get wantKeepAlive => true;

  final storage = FlutterSecureStorage();

  ScrollController _controller;
  UserBaseEntity _userBase;
  TaskRankEntity _taskRank;

  @override
  void initState() {
    super.initState();
    _controller = ScrollController();
    // 读取数据
    loadInitData();
    _controller.addListener(() async {
      if (_controller.position.pixels == _controller.position.maxScrollExtent) {
        print('滑动到底部');
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  loadInitData() async {
    String userId = await storage.read(key: KEY_USER_ID);
    try {
      _userBase = await UserService.getUserInfo(userId);
    } catch (e) {
      hmShowTosta('接口/api/user-service/user/:id出现异常');
    }
    try {
      _taskRank = await TaskService.getTaskRank(userId);
    } catch (e) {
      hmShowTosta('接口/api/task-service/task/rank/:userId出现异常');
    }
    setState(() {});
  }

  // TODO: 有个警告
  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      child: _customScrollView(),
      onRefresh: () {
        return _refreshPull().then((value) {
          // print('success');
        }).catchError((error) {
          // print('failed');
        });
      },
    );
  }

  Widget _customScrollView() {
    // TODO: 这种写法需要再思考下
    TaskFetched.pageIndex = 1;
    TaskFetched.pageSize = 10;
    TaskFetched.status = 1;

    return CustomScrollView(
      controller: _controller,
      primary: false,
      // 滑动效果，如阻尼效果等等
      // physics: const BouncingScrollPhysics(),
      slivers: [
        SliverPersistentHeader(
          delegate: UserInfoWidget(
            expandedHeight: 202,
            userBase: _userBase,
            taskRank: _taskRank,
          ),
          pinned: true,
        ),
        SliverPadding(
          padding: hmSetEdgeInsetsLTRB(15, 0, 15, 0),
          sliver: SliverToBoxAdapter(
            child: BlocProvider(
              create: (_) => TaskBloc()..add(TaskFetched()),
              child: TodoTaskWidget(),
            ),
          ),
        ),
      ],
    );
  }

  Future<String> _refreshPull() async {
    TaskFetched.pageIndex = 1;
    TaskBloc()..add(TaskFetched());
    await Future.delayed(new Duration(seconds: 1));
    return '_RrefreshPull';
  }
}
