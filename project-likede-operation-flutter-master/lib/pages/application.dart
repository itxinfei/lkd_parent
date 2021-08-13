// 1 系统包
import 'dart:ui';

// 2 package包
import 'package:flutter/material.dart';

// 3 功能包
import '../common/utils/function.dart';

// 4 页面包
import 'home_module/index/index_page.dart';
import 'task_module/index/index_page.dart';
import 'history_module/index/index_page.dart';

class ApplicationPage extends StatefulWidget {
  @override
  _ApplicationPageState createState() => _ApplicationPageState();
}

class _ApplicationPageState extends State<ApplicationPage>
    with SingleTickerProviderStateMixin {
  int _page = 0;
  PageController _pageController;

  final List<BottomNavigationBarItem> _bottomTabs = <BottomNavigationBarItem>[
    BottomNavigationBarItem(
      icon: _bottomNavigationBarItemIcon('assets/images/home_icon.png'),
      activeIcon:
          _bottomNavigationBarItemIcon('assets/images/home_active_icon.png'),
      label: '首页',
    ),
    BottomNavigationBarItem(
      icon: _bottomNavigationBarItemIcon('assets/images/task_icon.png'),
      activeIcon:
          _bottomNavigationBarItemIcon('assets/images/task_active_icon.png'),
      label: '进行工单',
    ),
    BottomNavigationBarItem(
      icon: _bottomNavigationBarItemIcon('assets/images/history_icon.png'),
      activeIcon:
          _bottomNavigationBarItemIcon('assets/images/history_active_icon.png'),
      label: '历史工单',
    ),
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: this._page);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return _buildTabNavMainView();
  }

  Widget _buildTabNavMainView() {
    return Scaffold(
      body: PageView(
        physics: NeverScrollableScrollPhysics(),
        children: <Widget>[
          HomeIndexPage(),
          TaskIndexPage(),
          HistoryIndexPage(),
        ],
        controller: _pageController,
        onPageChanged: _onPageChanged,
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: _bottomTabs,
        onTap: _onTap,
        currentIndex: _page,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: Color(0xFF222222),
        selectedLabelStyle: TextStyle(
          color: Color(0xFF222222),
          fontSize: hmSetFontSize(10),
        ),
        unselectedLabelStyle: TextStyle(
          color: Color(0xFF939393),
          fontSize: hmSetFontSize(10),
        ),
      ),
      backgroundColor: Color(0xFFF9F9F9),
    );
  }

  void _onPageChanged(int page) {
    setState(() {
      this._page = page;
    });
  }

  void _onTap(int index) {
    _pageController.animateToPage(index,
        duration: const Duration(milliseconds: 300), curve: Curves.ease);
  }

  static Widget _bottomNavigationBarItemIcon(String name) {
    return Image.asset(
      name,
      width: hmSetWidth(29),
      height: hmSetWidth(29),
    );
  }
}
