import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:likede/common/config/storage.dart';

/// 是否授权登录
/// 检查是否有 token
Future<bool> isAuthenticated() async {
  var token = await FlutterSecureStorage().read(key: STORAGE_KEY_USER_TOKEN);
  return token != null ? true : false;
}

/// 清空授权登录
/// 删除缓存 token
deleteAuthentication() async {
  await FlutterSecureStorage().delete(key: STORAGE_KEY_USER_TOKEN);
}

/// 重新登录
gotoLogin(BuildContext context) async {
  await FlutterSecureStorage().delete(key: STORAGE_KEY_USER_TOKEN);
  Navigator.pushNamedAndRemoveUntil(
      context, "/login/index", (Route<dynamic> route) => false);
}