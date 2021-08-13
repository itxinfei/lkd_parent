import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:likede/common/entity/task_page.dart';
import 'package:likede/common/enum/task_status.dart';
import 'package:likede/common/utils/function.dart';
import 'package:likede/routes.dart';

class TaskListWidget extends StatelessWidget {
  final List<TaskEntity> tasks;
  final bool showTaskStatus;

  TaskListWidget({this.tasks, this.showTaskStatus});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: _taskListWidget(context, tasks),
      ),
    );
  }

  /// 工单列表
  List<Widget> _taskListWidget(
      BuildContext context, List<TaskEntity> taskList) {
    return taskList
        .map((TaskEntity task) => _taskItemWidget(context, task))
        .toList();
  }

  /// 单个工单
  Widget _taskItemWidget(BuildContext context, TaskEntity task) {
    return InkWell(
      child: Container(
        padding: hmSetEdgeInsetsLTRB(14, 0, 11, 0),
        decoration: BoxDecoration(
          color: Color(0xFFFFFFFF),
          // TODO: 还原阴影效果，先用背景色替代阴影
          borderRadius: BorderRadius.all(
            Radius.circular(
              hmSetHeight(10),
            ),
          ),
        ),
        height: hmSetHeight(76),
        margin: EdgeInsets.only(
          bottom: hmSetHeight(12),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Text(
                  '${task.taskCode}',
                  style: TextStyle(
                    color: Color(0xFF181818),
                    fontSize: hmSetFontSize(15),
                    fontWeight: FontWeight.w500,
                  ),
                ),
                showTaskStatus ? _taskStatusWidget(task) : Container(),
                Text(
                  hmFormatDateTimeStr('${task.createTime}'),
                  style: TextStyle(
                    color: Color(0xFFB9B9B9),
                    fontSize: hmSetFontSize(12),
                  ),
                ),
              ],
            ),
            Padding(
              padding: EdgeInsets.only(
                top: hmSetHeight(6),
              ),
              child: Row(
                children: <Widget>[
                  Image.asset(
                    'assets/images/location.png',
                    width: hmSetWidth(9),
                    height: hmSetWidth(12),
                  ),
                  Padding(
                    padding: EdgeInsets.only(
                      left: hmSetWidth(5),
                    ),
                    child: Text(
                      '${task.addr}',
                      style: TextStyle(
                        color: Color(0xFF929292),
                        fontSize: hmSetFontSize(12),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      onTap: () {
        Routes.router.navigateTo(context,
            '${Routes.taskDetailPage}?taskStr=${Uri.encodeQueryComponent(json.encode(task))}');
      },
    );
  }

  /// 历史工单状态
  Widget _taskStatusWidget(TaskEntity task) {
    TaskStatus taskStatus = TaskStatus.values[task.taskStatus - 1];

    return Container(
      alignment: Alignment.center,
      padding: EdgeInsets.only(
        left: hmSetWidth(8),
        right: hmSetWidth(8),
      ),
      // TODO: 待办中和进行中的状态
      decoration: BoxDecoration(
        gradient: taskStatus == TaskStatus.completed
            ? const LinearGradient(colors: [
                Color(0xFFFFCC99),
                Color(0xFFFEEA36A),
              ])
            : const LinearGradient(colors: [
                Color(0xFFFB6B6B6),
                Color(0xFFF818181),
              ]),
        borderRadius: BorderRadius.all(
          Radius.circular(
            hmSetHeight(10),
          ),
        ),
      ),
      height: hmSetHeight(17),
      child: Text(
        '${TaskStatus.values[task.taskStatus - 1].name}',
        style: TextStyle(
          color: taskStatus == TaskStatus.completed
              ? Color(0xFF592A06)
              : Color(0xFFFFFFFF),
          fontSize: hmSetFontSize(10),
        ),
      ),
    );
  }
}
