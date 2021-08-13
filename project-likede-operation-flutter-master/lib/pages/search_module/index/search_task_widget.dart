import 'package:flutter/material.dart';
// import 'package:flutter_bloc/flutter_bloc.dart';
// import 'package:likede/common/utils/function.dart';
// import 'package:likede/common/widget/task_list.dart';
// import 'package:likede/pages/home_module/index/bloc/bloc.dart';

class SearchTaskWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text('搜索工单列表');
    // BlocProvider.of<TaskBloc>(context).dispatch(FetchTaskEvent());

    // return BlocBuilder<TaskBloc, TaskState>(
    //   builder: (context, state) {
    //     if (state is InitialTaskState) {
    //       return Center(
    //         child: CircularProgressIndicator(),
    //       );
    //     }
    //     if (state is TaskLoadSuccessState && state.totalCount > 0) {
    //       return TaskListWidget(tasks: state.tasks, showTaskStatus: true);
    //     }
    //     return Center(
    //       child: Column(
    //         mainAxisSize: MainAxisSize.max,
    //         mainAxisAlignment: MainAxisAlignment.center,
    //         children: <Widget>[
    //           Image.asset(
    //             'assets/images/empty_task.png',
    //             width: hmSetWidth(180),
    //             height: hmSetWidth(180),
    //           ),
    //           Text(
    //             '没有找到任何工单',
    //             style: TextStyle(
    //               color: Color(0xFFC4C4C4),
    //               fontSize: hmSetFontSize(14),
    //             ),
    //           ),
    //         ],
    //       ),
    //     );
    //   },
    // );
  }
}
