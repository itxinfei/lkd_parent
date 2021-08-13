part of 'task_bloc.dart';

enum TaskStatus { initial, success, failure }

class TaskState extends Equatable {
  const TaskState({
    this.status = TaskStatus.initial,
    this.tasks = const <TaskEntity>[],
    this.totalCount = 0,
    this.hasReachedMax = false,
  });

  final TaskStatus status;

  final List<TaskEntity> tasks;
  final int totalCount;
  final bool hasReachedMax;

  TaskState copyWith({
    TaskStatus status,
    List<TaskEntity> tasks,
    int totalCount,
    bool hasReachedMax,
  }) {
    return TaskState(
      status: status ?? this.status,
      tasks: tasks ?? this.tasks,
      totalCount: totalCount ?? this.totalCount,
      hasReachedMax: hasReachedMax ?? this.hasReachedMax,
    );
  }

  @override
  List<Object> get props => [status, tasks, totalCount, hasReachedMax];
}
