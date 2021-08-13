import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:likede/common/api/task.dart';
import 'package:likede/common/config/storage.dart';
import 'package:likede/common/entity/task_page.dart';
import 'package:rxdart/rxdart.dart';

part 'task_event.dart';
part 'task_state.dart';

const _postLimit = 10;
const _storage = FlutterSecureStorage();

class TaskBloc extends Bloc<TaskEvent, TaskState> {
  TaskBloc() : super(const TaskState());

  @override
  Stream<Transition<TaskEvent, TaskState>> transformEvents(
      Stream<TaskEvent> events,
      TransitionFunction<TaskEvent, TaskState> transitionFn) {
    return super.transformEvents(
      events.debounceTime(const Duration(milliseconds: 500)),
      transitionFn,
    );
  }

  @override
  Stream<TaskState> mapEventToState(
    TaskEvent event,
  ) async* {
    if (event is TaskFetched) {
      yield await _mapTaskFetchedToState(state);
    }
  }

  Future<TaskState> _mapTaskFetchedToState(TaskState state) async {
    if (state.hasReachedMax) {
      return state;
    }
    TaskFetched.userId = await _storage.read(key: KEY_USER_ID);
    try {
      if (state.status == TaskStatus.initial) {
        final taskPage = await TaskService.searchTask({
          'pageIndex': TaskFetched.pageIndex,
          'pageSize': TaskFetched.pageSize,
          'userId': TaskFetched.userId,
          'status': TaskFetched.status,
        });
        final tasks = taskPage.currentPageRecords;

        return state.copyWith(
          status: TaskStatus.success,
          tasks: tasks,
          totalCount: taskPage.totalCount,
          hasReachedMax: _hasReachedMax(tasks.length),
        );
      }
      final taskPage = await TaskService.searchTask({
        'pageIndex': TaskFetched.pageIndex,
        'pageSize': TaskFetched.pageSize,
        'userId': TaskFetched.userId,
        'status': TaskFetched.status,
      });
      final tasks = taskPage.currentPageRecords;
      return tasks.isEmpty
          ? state.copyWith(hasReachedMax: true)
          : state.copyWith(
              status: TaskStatus.success,
              totalCount: taskPage.totalCount,
              tasks: List.of(state.tasks)..addAll(tasks),
              hasReachedMax: _hasReachedMax(tasks.length),
            );
    } on Exception {
      return state.copyWith(status: TaskStatus.failure);
    }
  }

  bool _hasReachedMax(int tasksCount) => tasksCount < _postLimit ? true : false;
}
