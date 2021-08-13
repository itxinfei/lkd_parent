import 'package:flutter/material.dart';
import 'package:likede/common/utils/function.dart';
import 'package:likede/common/widget/gradient_app_bar.dart';
import 'package:likede/pages/history_module/index/history_task_widget.dart';

class HistoryIndexPage extends StatefulWidget {
  @override
  _HistoryIndexPageState createState() => _HistoryIndexPageState();
}

class _HistoryIndexPageState extends State<HistoryIndexPage> {
  @override
  Widget build(BuildContext context) {
    // TODO: 上拉刷新，下拉加载
    return Scaffold(
      appBar: gradientAppBar(context, '历史工单'),
      body: Padding(
        padding: hmSetEdgeInsetsLTRB(15, 16, 15, 0),
        child: HistoryTaskWidget(),
      ),
    );
  }
}
