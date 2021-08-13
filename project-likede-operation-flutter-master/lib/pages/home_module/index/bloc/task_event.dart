part of 'task_bloc.dart';

abstract class TaskEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class TaskFetched extends TaskEvent {
  static int pageIndex = 1;
  static int pageSize = 10;
  static String userId = '';
  static int status = 1;
}
