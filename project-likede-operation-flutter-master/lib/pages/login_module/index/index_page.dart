import 'package:fbutton/fbutton.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:likede/common/api/user.dart';
import 'package:likede/common/config/index.dart';
import 'package:likede/common/entity/user_login.dart';
import 'package:likede/common/utils/function.dart';
import 'package:likede/common/widget/text_field.dart';

class LoginIndexPage extends StatefulWidget {
  @override
  _LoginIndexPageState createState() => _LoginIndexPageState();
}

class _LoginIndexPageState extends State<LoginIndexPage> {
  TextEditingController _mobileController = TextEditingController();
  TextEditingController _codeController = TextEditingController();
  final FocusNode _nodeMobile = FocusNode();
  final FocusNode _nodeCode = FocusNode();
  bool _checkboxSelected = false; //维护复选框状态

  @override
  void initState() {
    super.initState();
    // TODO: 添加校验
    // _mobileController.addListener(_verify);
    // _codeController.addListener(_verify);
  }

  // void _verify() {}

  @override
  void dispose() {
    _mobileController.dispose();
    _codeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // TODO: 封装appbar组件
      appBar: PreferredSize(
        child: AppBar(
          elevation: 0,
          backgroundColor: Colors.transparent,
        ),
        preferredSize: Size.fromHeight(
          hmSetHeight(48),
        ),
      ),
      body: Container(
        padding: hmSetEdgeInsetsLTRB(34, 41, 39, 0),
        decoration: BoxDecoration(
          border: Border(
            top: BorderSide(
              width: 1.0,
              color: Color(0xFFEFEFEF),
            ),
          ),
        ),
        width: double.infinity, // 宽度100%
        height: double.infinity, // 高度100%
        child: _loginFormWidget(),
      ),
    );
  }

  /// 登录表单组件
  Widget _loginFormWidget() {
    // TODO: 样式调整
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          '手机快捷登录',
          style: TextStyle(
            color: Color(0xFF222222),
            fontSize: hmSetFontSize(19),
          ),
        ),
        MyTextField(
          focusNode: _nodeMobile,
          placeHolder: '请输入手机号',
          maxLength: 11,
          controller: _mobileController,
          keyboardType: TextInputType.phone,
        ),
        MyTextField(
          focusNode: _nodeCode,
          placeHolder: '请输入短信验证码',
          maxLength: 6,
          controller: _codeController,
          keyboardType: TextInputType.phone,
          getVCode: () async {
            await UserService.getMobileCode(_mobileController.text);
          },
        ),
        // ListTileTheme(
        //   contentPadding: EdgeInsets.all(0),
        //   child: CheckboxListTile(
        //     value: _checkboxSelected,
        //     onChanged: (bool value) {
        //       setState(() {
        //         _checkboxSelected = value;
        //       });
        //     },
        //     title: Text(
        //       '30天免登登录',
        //       style: TextStyle(
        //         color: Color(0xFFC4C4C4),
        //         fontSize: hmSetFontSize(12),
        //       ),
        //     ),
        //     controlAffinity: ListTileControlAffinity.leading,
        //   ),
        // ),
        Row(
          children: <Widget>[
            Checkbox(
              value: this._checkboxSelected,
              onChanged: (value) {
                setState(() {
                  this._checkboxSelected = value;
                });
              },
            ),
            Text(
              '30天免登登录',
              style: TextStyle(
                color: Color(0xFFC4C4C4),
                fontSize: hmSetFontSize(12),
              ),
            ),
          ],
        ),
        FButton(
          onPressed: () async {
            // TODO: 添加异常校验，手机输入错误时，验证码过期时
            UserLoginEntity user = await UserService.login({
              'mobile': _mobileController.text,
              'code': _codeController.text,
              'loginType': 1
            });
            // 本地缓存
            await FlutterSecureStorage()
                .write(key: STORAGE_KEY_USER_TOKEN, value: user.token);
            await FlutterSecureStorage()
                .write(key: KEY_USER_ID, value: user.userId.toString());
            Navigator.pushNamed(context, '/index', arguments: null);
          },
          text: '登 录',
          style: TextStyle(
            color: Color(0xFFFFD2AA),
            fontSize: hmSetFontSize(16),
          ),
          alignment: Alignment.center,
          color: Color(0xFFFFFFFF),
          width: hmSetWidth(298.0),
          height: hmSetHeight(50),
          corner: FCorner.all(hmSetWidth(7)),
          strokeColor: Color(0xFF979797),
          gradient: LinearGradient(colors: [
            Color(0xFF555356),
            Color(0xFF161618),
          ]),
        ),
      ],
    );
  }
}
