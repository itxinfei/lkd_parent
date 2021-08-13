import 'package:flutter/material.dart';
import 'package:likede/common/utils/function.dart';
import 'package:likede/common/widget/gradient_app_bar.dart';
// import 'package:likede/pages/home_module/index/bloc/task_event.dart';
import 'package:likede/pages/home_module/index/task_count_widget.dart';
import 'package:likede/pages/task_module/index/todo_task_widget.dart';

class TaskIndexPage extends StatefulWidget {
  @override
  _TaskIndexPageState createState() => _TaskIndexPageState();
}

class _TaskIndexPageState extends State<TaskIndexPage>
    with SingleTickerProviderStateMixin {
  final List _tabs = ['进行工单', '待办工单'];

  TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: _tabs.length, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // TODO: 上拉刷新，下拉加载
    return Scaffold(
      appBar: gradientAppBar(context, '进行工单'),
      body: Padding(
        padding: hmSetEdgeInsetsLTRB(15, 0, 15, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            TabBar(
              tabs: _tabBarListWidget(),
              controller: _tabController,
              isScrollable: true,
              indicator: UnderlineTabIndicator(
                // TODO: 渐变色
                borderSide: BorderSide(
                  width: 2,
                  color: Color(0xFFFFCC99),
                ),
                insets: EdgeInsets.only(
                  left: 22,
                  right: 40,
                  bottom: 15,
                ),
              ),
              indicatorSize: TabBarIndicatorSize.label,
              labelPadding: EdgeInsets.only(
                left: 0,
                right: hmSetWidth(44),
              ),
              // TODO：添加未选中的颜色
              unselectedLabelColor: Color(0xFF7F7F7F),
            ),
            Expanded(
              child: TabBarView(
                children: <Widget>[
                  TodoTaskWidget(),
                  TodoTaskWidget(),
                ],
                controller: _tabController,
              ),
            ),
          ],
        ),
      ),
    );
  }

  List<Widget> _tabBarListWidget() {
    return _tabs.map((e) => taskTitleWidget(e, 50)).toList();
  }
}
