class UserLoginEntity {
  int userId;
  String userName;
  String roleCode;
  bool success;
  String msg;
  String regionId;
  bool isRepair;
  String token;

  UserLoginEntity(
      {this.userId,
      this.userName,
      this.roleCode,
      this.success,
      this.msg,
      this.regionId,
      this.isRepair,
      this.token});

  UserLoginEntity.fromJson(Map<String, dynamic> json) {
    userId = json['userId'];
    userName = json['userName'];
    roleCode = json['roleCode'];
    success = json['success'];
    msg = json['msg'];
    regionId = json['regionId'];
    isRepair = json['isRepair'];
    token = json['token'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['userId'] = this.userId;
    data['userName'] = this.userName;
    data['roleCode'] = this.roleCode;
    data['success'] = this.success;
    data['msg'] = this.msg;
    data['regionId'] = this.regionId;
    data['isRepair'] = this.isRepair;
    data['token'] = this.token;
    return data;
  }
}
