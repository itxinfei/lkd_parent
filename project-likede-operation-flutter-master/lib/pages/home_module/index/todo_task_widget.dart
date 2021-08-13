/*import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:likede/common/utils/function.dart';
import 'package:likede/common/widget/task_list.dart';
import 'package:likede/pages/home_module/index/task_count_widget.dart';

// import 'bloc/bloc.dart';

class TodoTaskWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    BlocProvider.of<TaskBloc>(context).dispatch(FetchTaskEvent());

    return BlocBuilder<TaskBloc, TaskState>(
      builder: (context, state) {
        if (state is InitialTaskState) {
          // TODO: 调整loading的样式
          return Center(
            child: CircularProgressIndicator(),
          );
        }
        if (state is TaskLoadSuccessState && state.totalCount > 0) {
          return Column(
            children: <Widget>[
              taskTitleWidget('进行工单', state.totalCount),
              TaskListWidget(tasks: state.tasks, showTaskStatus: false),
            ],
          );
        }
        return Center(
          child: Column(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Image.asset(
                'assets/images/empty_task.png',
                width: hmSetWidth(180),
                height: hmSetWidth(180),
              ),
              Text(
                '没有找到任何工单',
                style: TextStyle(
                  color: Color(0xFFC4C4C4),
                  fontSize: hmSetFontSize(14),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}*/

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
// import 'package:likede/common/widget/bottom_loader.dart';
// import 'package:likede/common/widget/post_list_item.dart';
import 'package:likede/common/widget/task_list.dart';
import 'package:likede/pages/home_module/index/bloc/task_bloc.dart';
import 'package:likede/pages/home_module/index/task_count_widget.dart';

class TodoTaskWidget extends StatefulWidget {
  @override
  _TodoTaskWidgetState createState() => _TodoTaskWidgetState();
}

class _TodoTaskWidgetState extends State<TodoTaskWidget> {
  final _scrollController = ScrollController();
  TaskBloc _taskBloc;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
    _taskBloc = context.read<TaskBloc>();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<TaskBloc, TaskState>(
      listener: (context, state) {
        if (!state.hasReachedMax && _isBottom) {
          TaskFetched.pageIndex++;
          TaskFetched.status = 1;
          _taskBloc.add(TaskFetched());
        }
      },
      builder: (context, state) {
        switch (state.status) {
          case TaskStatus.failure:
            return const Center(child: Text('加载失败'));
          case TaskStatus.success:
            if (state.tasks.isEmpty) {
              return const Center(child: Text('没有找到任何工单'));
            }
            return Column(
              children: <Widget>[
                taskTitleWidget('进行工单', state.totalCount),
                SingleChildScrollView(
                  controller: _scrollController,
                  child:
                      TaskListWidget(tasks: state.tasks, showTaskStatus: false),
                ),
              ],
            );
          // return ListView.builder(
          //   itemBuilder: (BuildContext context, int index) {
          //     return index >= state.tasks.length
          //         ? BottomLoader()
          //         : PostListItem(task: state.tasks[index]);
          //   },
          //   itemCount: state.hasReachedMax
          //       ? state.tasks.length
          //       : state.tasks.length + 1,
          //   controller: _scrollController,
          // );
          default:
            return const Center(child: CircularProgressIndicator());
        }
      },
    );
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_isBottom) _taskBloc.add(TaskFetched());
  }

  bool get _isBottom {
    if (!_scrollController.hasClients) return false;
    final maxScroll = _scrollController.position.maxScrollExtent;
    final currentScroll = _scrollController.offset;
    return currentScroll >= (maxScroll * 0.9);
  }
}
