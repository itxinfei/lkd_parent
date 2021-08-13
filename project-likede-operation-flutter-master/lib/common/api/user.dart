import 'package:likede/common/utils/http.dart';
import 'package:likede/common/entity/user_login.dart';
import 'package:likede/common/entity/user_base.dart';

class UserService {
  /// 生成手机验证码
  static Future<void> getMobileCode(String mobile) {
    return HttpUtil.getInstance().get('/user-service/user/code/$mobile');
  }

  /// 登录
  static Future<UserLoginEntity> login(Map<String, dynamic> params) async {
    var response = await HttpUtil.getInstance()
        .post('/user-service/user/login', params: params);
    return UserLoginEntity.fromJson(response);
  }

  /// 获取用户基本信息
  static Future<UserBaseEntity> getUserInfo(String id) async {
    var response = await HttpUtil.getInstance().get('/user-service/user/$id');
    return UserBaseEntity.fromJson(response);
  }
}
