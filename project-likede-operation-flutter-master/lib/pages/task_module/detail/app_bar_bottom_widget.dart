import 'package:flutter/material.dart';
import 'package:likede/common/entity/task_page.dart';
import 'package:likede/common/enum/task_status.dart';
import 'package:likede/common/utils/function.dart';

class AppBarBottomWidget extends StatelessWidget
    implements PreferredSizeWidget {
  final TaskEntity task;

  AppBarBottomWidget({Key key, this.task}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: hmSetEdgeInsetsLTRB(43, 8, 43, 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                '${TaskStatus.values[task.taskStatus - 1].name}',
                style: TextStyle(
                  color: Color(0xFFFFFFFF),
                  fontSize: hmSetFontSize(15),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(
                  top: hmSetHeight(6),
                ),
                child: Text(
                  '工单号：${task.taskCode}',
                  style: TextStyle(
                    color: Color(0xFFFFFFFF),
                    fontSize: hmSetFontSize(12),
                  ),
                ),
              ),
            ],
          ),
          Image.asset(
            'assets/images/${TaskStatus.values[task.taskStatus - 1].toShortString()}.png',
            width: hmSetWidth(94),
            height: hmSetWidth(94),
          )
        ],
      ),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(100);
}
