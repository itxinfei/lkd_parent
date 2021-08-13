enum TaskStatus { waiting, accepted, canceled, completed }

extension TaskStatusExtension on TaskStatus {
  String toShortString() {
    return this.toString().split('.').last;
  }

  String get name {
    switch (this) {
      case TaskStatus.waiting:
        return '待办中';
      case TaskStatus.accepted:
        return '进行中';
      case TaskStatus.canceled:
        return '已取消';
      case TaskStatus.completed:
        return '已完成';
      default:
        return null;
    }
  }
}
