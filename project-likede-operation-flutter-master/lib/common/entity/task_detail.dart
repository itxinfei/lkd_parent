class TaskDetailEntity {
  String channelCode;
  String skuId;
  String skuName;
  String skuImage;
  int expectCapacity;

  TaskDetailEntity(
      {this.channelCode,
      this.skuId,
      this.skuName,
      this.skuImage,
      this.expectCapacity});

  TaskDetailEntity.fromJson(Map<String, dynamic> json) {
    channelCode = json['channelCode'];
    skuId = json['skuId'];
    skuName = json['skuName'];
    skuImage = json['skuImage'];
    expectCapacity = json['expectCapacity'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['channelCode'] = this.channelCode;
    data['skuId'] = this.skuId;
    data['skuName'] = this.skuName;
    data['skuImage'] = this.skuImage;
    data['expectCapacity'] = this.expectCapacity;
    return data;
  }
}
