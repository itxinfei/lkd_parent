class UserBaseEntity {
  int userId;
  String userName;
  String roleName;
  String regionName;
  String regionId;
  String image;

  UserBaseEntity(
      {this.userId,
      this.userName,
      this.roleName,
      this.regionName,
      this.regionId,
      this.image});

  UserBaseEntity.fromJson(Map<String, dynamic> json) {
    userId = json['userId'];
    userName = json['userName'];
    roleName = json['roleName'];
    regionName = json['regionName'];
    regionId = json['regionId'];
    image = json['image'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['userId'] = this.userId;
    data['userName'] = this.userName;
    data['roleName'] = this.roleName;
    data['regionName'] = this.regionName;
    data['regionId'] = this.regionId;
    data['image'] = this.image;
    return data;
  }
}
