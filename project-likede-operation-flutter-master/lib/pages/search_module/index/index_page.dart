import 'package:flutter/material.dart';
import 'package:likede/common/utils/function.dart';
import 'package:likede/pages/search_module/index/search_task_widget.dart';

class SearchIndexPage extends StatefulWidget {
  @override
  _SearchIndexPageState createState() => _SearchIndexPageState();
}

class _SearchIndexPageState extends State<SearchIndexPage> {
  final _textController = TextEditingController();
  bool _showResult = false;

  @override
  void initState() {
    super.initState();
    print(_textController.text);
    _textController.addListener(() {
      setState(() {
        if (_textController.text == '') {
          _showResult = false;
        }
      });
    });
  }

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF9F9F9),
      body: Padding(
        padding: hmSetEdgeInsetsLTRB(15, 50, 15, 0),
        child: Column(
          children: <Widget>[
            _searchBar(context),
            Expanded(
              child: !_showResult ? _searchHistory() : SearchTaskWidget(),
            ),
          ],
        ),
      ),
    );
  }

  /// TODO: 键盘默认是英文键盘
  Widget _searchBar(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: hmSetHeight(21),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Container(
            width: hmSetWidth(302),
            height: hmSetHeight(34),
            child: TextField(
              controller: _textController,
              decoration: InputDecoration(
                hintText: '请输入工单号',
                hintStyle: TextStyle(
                  color: Color(0xFFB4B4BD),
                  fontSize: hmSetFontSize(14.0),
                ),
                contentPadding: hmSetEdgeInsetsLTRB(0, 10, 9, 8),
                prefixIcon: Padding(
                  padding: hmSetEdgeInsetsLTRB(13, 8, 9, 10),
                  child: Image.asset(
                    'assets/images/search_grey.png',
                    width: hmSetWidth(16),
                    height: hmSetHeight(16),
                  ),
                ),
                // TODO: 图标需要UI提供
                suffixIcon: IconButton(
                  icon: Icon(
                    Icons.cancel,
                    color: Color(0xFFB4B4BD),
                  ),
                  onPressed: () {
                    Future.delayed(Duration(milliseconds: 50)).then((_) {
                      _textController.clear();
                    });
                  },
                ),
                filled: true,
                fillColor: Color(0xFFFFFFFF),
                focusedBorder: OutlineInputBorder(
                  borderSide: const BorderSide(
                    color: Color(0xFF000000),
                    width: 1,
                  ),
                  borderRadius: BorderRadius.circular(
                    hmSetHeight(17),
                  ),
                ),
                border: OutlineInputBorder(
                  borderSide: const BorderSide(
                    color: Color(0xFF000000),
                    width: 1,
                  ),
                  borderRadius: BorderRadius.circular(
                    hmSetHeight(17),
                  ),
                ),
              ),
              textInputAction: TextInputAction.search,
              onSubmitted: (String val) {
                setState(() {
                  _showResult = true;
                });
                print(val);
              },
            ),
          ),
          InkWell(
            child: Text(
              '取消',
              style: TextStyle(
                color: Color(0xFF222222),
                fontSize: hmSetFontSize(14.0),
              ),
            ),
            onTap: () {
              hmHiddenKeyboard(context);
              Navigator.of(context).pop();
            },
          ),
        ],
      ),
    );
  }

  /// 搜索历史
  Widget _searchHistory() {
    return Padding(
      padding: EdgeInsets.only(
        top: hmSetHeight(35),
      ),
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Text(
                  '搜索历史',
                  style: TextStyle(
                    color: Color(0xFF222222),
                    fontSize: hmSetFontSize(19),
                    fontWeight: FontWeight.w500,
                  ),
                ),
                // TODO: 添加清空按钮方法，点击历史直接搜索
                Text(
                  '清空',
                  style: TextStyle(
                    color: Color(0xFF939393),
                    fontSize: hmSetFontSize(12),
                  ),
                ),
              ],
            ),
            Padding(
              padding: EdgeInsets.only(
                left: hmSetWidth(11),
                top: hmSetHeight(25),
              ),
              child: Wrap(
                spacing: hmSetWidth(36),
                runSpacing: hmSetHeight(26),
                alignment: WrapAlignment.start,
                children: <Widget>[
                  Text(
                    'Lkd1234567',
                    style: TextStyle(
                      color: Color(0xFF222222),
                      fontSize: hmSetFontSize(12),
                    ),
                  ),
                  Text(
                    'Lkd1234',
                    style: TextStyle(
                      color: Color(0xFF222222),
                      fontSize: hmSetFontSize(12),
                    ),
                  ),
                  Text(
                    'Lkd1234',
                    style: TextStyle(
                      color: Color(0xFF222222),
                      fontSize: hmSetFontSize(12),
                    ),
                  ),
                  Text(
                    'Lkd12',
                    style: TextStyle(
                      color: Color(0xFF222222),
                      fontSize: hmSetFontSize(12),
                    ),
                  ),
                  Text(
                    'Lkd123',
                    style: TextStyle(
                      color: Color(0xFF222222),
                      fontSize: hmSetFontSize(12),
                    ),
                  ),
                  Text(
                    'Lkd1234',
                    style: TextStyle(
                      color: Color(0xFF222222),
                      fontSize: hmSetFontSize(12),
                    ),
                  ),
                ],
              ),
            )
          ]),
    );
  }
}
