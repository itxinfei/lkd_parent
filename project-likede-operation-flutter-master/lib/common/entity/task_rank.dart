class TaskRankEntity {
  int total;
  int rank;

  TaskRankEntity({this.total, this.rank});

  TaskRankEntity.fromJson(Map<String, dynamic> json) {
    total = json['total'];
    rank = json['rank'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['total'] = this.total;
    data['rank'] = this.rank;
    return data;
  }
}
