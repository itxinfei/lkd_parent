/// TODO: 分页抽出类
class TaskPageEntity {
  int pageIndex;
  int pageSize;
  int totalPage;
  int totalCount;
  List<TaskEntity> currentPageRecords;

  TaskPageEntity(
      {this.pageIndex,
      this.pageSize,
      this.totalPage,
      this.totalCount,
      this.currentPageRecords});

  TaskPageEntity.fromJson(Map<String, dynamic> json) {
    pageIndex = int.parse(json['pageIndex']);
    pageSize = int.parse(json['pageSize']);
    totalPage = int.parse(json['totalPage']);
    totalCount = int.parse(json['totalCount']);
    if (json['currentPageRecords'] != null) {
      currentPageRecords = new List<TaskEntity>();
      json['currentPageRecords'].forEach((v) {
        currentPageRecords.add(new TaskEntity.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['pageIndex'] = this.pageIndex;
    data['pageSize'] = this.pageSize;
    data['totalPage'] = this.totalPage;
    data['totalCount'] = this.totalCount;
    if (this.currentPageRecords != null) {
      data['currentPageRecords'] =
          this.currentPageRecords.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class TaskEntity {
  String taskId;
  String taskCode;
  int taskStatus;
  String innerCode;
  String addr;
  int assignorId;
  String userName;
  String desc;
  String regionId;
  String createTime;
  TaskType taskType;

  TaskEntity(
      {this.taskId,
      this.taskCode,
      this.taskStatus,
      this.innerCode,
      this.addr,
      this.assignorId,
      this.userName,
      this.desc,
      this.regionId,
      this.createTime,
      this.taskType});

  TaskEntity.fromJson(Map<String, dynamic> json) {
    taskId = json['taskId'];
    taskCode = json['taskCode'];
    taskStatus = json['taskStatus'];
    innerCode = json['innerCode'];
    addr = json['addr'];
    assignorId = json['assignorId'];
    userName = json['userName'];
    desc = json['desc'];
    regionId = json['regionId'];
    createTime = json['createTime'];
    taskType = json['taskType'] != null
        ? new TaskType.fromJson(json['taskType'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['taskId'] = this.taskId;
    data['taskCode'] = this.taskCode;
    data['taskStatus'] = this.taskStatus;
    data['innerCode'] = this.innerCode;
    data['addr'] = this.addr;
    data['assignorId'] = this.assignorId;
    data['userName'] = this.userName;
    data['desc'] = this.desc;
    data['regionId'] = this.regionId;
    data['createTime'] = this.createTime;
    if (this.taskType != null) {
      data['taskType'] = this.taskType.toJson();
    }
    return data;
  }
}

class TaskType {
  String typeName;
  int type;

  TaskType({this.typeName, this.type});

  TaskType.fromJson(Map<String, dynamic> json) {
    typeName = json['typeName'];
    type = json['type'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['typeName'] = this.typeName;
    data['type'] = this.type;
    return data;
  }
}
