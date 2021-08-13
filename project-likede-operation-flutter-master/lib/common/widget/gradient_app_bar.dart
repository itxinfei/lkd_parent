import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:gradient_app_bar/gradient_app_bar.dart';
import 'package:likede/common/utils/function.dart';

Widget gradientAppBar(BuildContext context, String title) {
  return GradientAppBar(
    automaticallyImplyLeading: false,
    title: Text(
      '$title',
      style: TextStyle(
        color: Color(0xFFFFFFFF),
        fontSize: hmSetFontSize(19),
      ),
    ),
    actions: <Widget>[
      IconButton(
        icon: Image.asset(
          'assets/images/search_white.png',
          width: hmSetWidth(18),
          height: hmSetWidth(18),
        ),
        onPressed: () {
          Navigator.pushNamed(context, '/search/index', arguments: null);
        },
      ),
    ],
    gradient: LinearGradient(
      colors: [
        Color(0xFF404040),
        Color(0xFF080808),
      ],
      begin: Alignment.topCenter,
      end: Alignment.bottomCenter,
    ),
    centerTitle: true,
  );
}
