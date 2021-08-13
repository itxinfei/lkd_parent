import 'package:flutter/material.dart';
import 'package:likede/common/entity/task_page.dart';

class PostListItem extends StatelessWidget {
  const PostListItem({Key key, @required this.task}) : super(key: key);

  final TaskEntity task;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return ListTile(
      leading: Text('${task.taskId}', style: textTheme.caption),
      title: Text(task.taskCode),
      isThreeLine: true,
      subtitle: Text(task.addr),
      dense: true,
    );
  }
}
