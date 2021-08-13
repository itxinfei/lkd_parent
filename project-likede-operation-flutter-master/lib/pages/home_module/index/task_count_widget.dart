import 'package:flutter/material.dart';
import 'package:likede/common/utils/function.dart';

/// 工单标题
/// TODO: TabBar下工单个数未显示
Widget taskTitleWidget(String taskStatus, int totalCount) {
  return Padding(
    padding: EdgeInsets.only(
      top: hmSetHeight(21),
      bottom: hmSetHeight(15),
    ),
    child: Stack(
      children: <Widget>[
        Row(
          children: <Widget>[
            Image.asset(
              taskStatus == '进行工单'
                  ? 'assets/images/todo_task.png'
                  : 'assets/images/doing_task.png',
              width: hmSetWidth(18),
              height: hmSetWidth(18),
            ),
            Padding(
              padding: EdgeInsets.only(
                left: hmSetWidth(9),
              ),
              child: Text(
                '$taskStatus',
                style: TextStyle(
                  color: Color(0xFF181818),
                  fontSize: hmSetFontSize(15),
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
        ),
        Positioned(
          // TODO: top值不正确
          top: hmSetHeight(0),
          left: hmSetWidth(90),
          child: Container(
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: Color(0xFFFF7777),
              shape: BoxShape.circle,
            ),
            width: hmSetWidth(14),
            height: hmSetWidth(14),
            child: Text(
              '$totalCount',
              style: TextStyle(
                color: Color(0xFFFFFFFF),
                fontSize: hmSetFontSize(10),
              ),
            ),
          ),
        )
      ],
    ),
  );
}
