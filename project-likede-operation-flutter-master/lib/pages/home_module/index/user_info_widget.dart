import 'package:extended_image/extended_image.dart';
import 'package:flutter/material.dart';
import 'package:likede/common/entity/task_rank.dart';
import 'package:likede/common/entity/user_base.dart';
import 'package:likede/common/utils/function.dart';

class UserInfoWidget extends SliverPersistentHeaderDelegate {
  final double expandedHeight;
  final UserBaseEntity userBase;
  final TaskRankEntity taskRank;

  UserInfoWidget(
      {@required this.expandedHeight,
      @required this.userBase,
      @required this.taskRank});

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return ClipPath(
      // 路径裁切组件
      clipper: BottomClipper(),
      clipBehavior: Clip.antiAliasWithSaveLayer,
      child: Stack(
        fit: StackFit.expand,
        overflow: Overflow.visible,
        children: [
          Image.asset(
            'assets/images/home_bg.png',
            fit: BoxFit.cover,
          ),
          Positioned(
            // TODO: UI说这个离顶部有点近，需要微调
            top: -shrinkOffset - 15,
            left: hmSetWidth(15),
            child: Opacity(
              opacity: (1 - shrinkOffset / expandedHeight),
              child: Column(
                children: <Widget>[
                  _userInfoWidget(userBase),
                  _workCardWidget(taskRank),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  double get maxExtent => expandedHeight;

  @override
  double get minExtent => kToolbarHeight;

  @override
  bool shouldRebuild(SliverPersistentHeaderDelegate oldDelegate) => true;

  /// 用户信息
  Widget _userInfoWidget(UserBaseEntity userBase) {
    return Container(
      margin: EdgeInsets.only(
        top: hmSetHeight(63),
      ),
      child: Column(
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  // 姓名、角色
                  _welcomeWidget(userBase),
                  // 地区
                  _regionWidget(userBase),
                ],
              ),
              // 头像
              _avatarWidget(userBase),
            ],
          ),
        ],
      ),
      width: hmSetWidth(309),
    );
  }

  /// 姓名、角色
  Widget _welcomeWidget(UserBaseEntity userBase) {
    return Row(
      children: <Widget>[
        Text(
          '${userBase != null ? userBase.userName : '欢迎您'}，上午好！',
          style: TextStyle(
            color: Color(0xFFFFFFFF),
            fontSize: hmSetFontSize(19),
            fontWeight: FontWeight.w500,
          ),
        ),
        Container(
          alignment: Alignment.center,
          padding: hmSetEdgeInsetsLTRB(9, 1, 9, 3),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: const [
                Color(0xFFD1C0B5),
                Color(0xFFD2C1B6),
              ],
            ),
            borderRadius: BorderRadius.all(
              Radius.circular(
                hmSetHeight(10),
              ),
            ),
          ),
          child: Text(
            '${userBase != null ? userBase.roleName : '未知角色'}',
            style: TextStyle(
              color: Color(0xFF323232),
              fontSize: hmSetFontSize(12),
            ),
          ),
        ),
      ],
    );
  }

  /// 地区
  Widget _regionWidget(UserBaseEntity userBase) {
    return Padding(
      padding: EdgeInsets.only(
        top: hmSetHeight(4),
      ),
      child: Row(
        children: <Widget>[
          Image.asset(
            'assets/images/location.png',
            width: hmSetWidth(12),
            height: hmSetWidth(14),
          ),
          Padding(
            padding: EdgeInsets.only(
              left: hmSetWidth(5),
            ),
          ),
          Text(
            '${userBase != null ? userBase.regionName : '未知地区'}',
            style: TextStyle(
              color: Color(0xFFFFFFFF),
              fontSize: hmSetFontSize(14),
            ),
          ),
        ],
      ),
    );
  }

  /// 头像
  Widget _avatarWidget(UserBaseEntity userBase) {
    return userBase != null
        ? ExtendedImage.network(
            userBase?.image,
            width: hmSetWidth(45),
            height: hmSetWidth(45),
            fit: BoxFit.cover,
            cache: true,
            enableLoadState: true,
            shape: BoxShape.circle,
          )
        : Container();
  }

  /// 工作量卡片
  Widget _workCardWidget(TaskRankEntity taskRank) {
    return Container(
      alignment: Alignment.topLeft,
      margin: EdgeInsets.only(
        top: hmSetHeight(19),
      ),
      padding: EdgeInsets.only(
        left: hmSetWidth(29),
      ),
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/images/home_card.png'),
          fit: BoxFit.fitWidth,
        ),
      ),
      width: hmSetWidth(345),
      height: hmSetHeight(70),
      child: Stack(
        children: <Widget>[
          _workRankWidget(taskRank),
          // TODO: 加上勋章，现在绝对定位不生效
          // _medalWidget(),
        ],
      ),
    );
  }

  /// 工作量排名
  Widget _workRankWidget(TaskRankEntity taskRank) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          '工单量排名：第${taskRank != null ? taskRank.rank : ''}名 / 总${taskRank != null ? taskRank.total : ''}人',
          style: TextStyle(
            color: Color(0xFF7D542F),
            fontSize: hmSetFontSize(14),
            fontFamily: 'Fontquan-XinYiGuanHeiTi',
          ),
        ),
        Padding(
          padding: EdgeInsets.only(
            top: hmSetHeight(5),
          ),
          child: Text(
            '今天也要努力呀！',
            style: TextStyle(
              color: Color(0xFFB4622E),
              fontSize: hmSetFontSize(10),
            ),
          ),
        ),
      ],
    );
  }

  /// 勋章
  Widget _medalWidget() {
    return Positioned(
      top: hmSetHeight(-5),
      right: hmSetWidth(20),
      child: Image.asset(
        'assets/images/medal.png',
        width: hmSetWidth(54),
        height: hmSetHeight(65),
      ),
    );
    // return Image.asset(
    //   'assets/images/home_medal.png',
    //   width: hmSetWidth(54),
    //   height: hmSetHeight(65),
    // );
  }
}

class BottomClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    var path = Path();
    path.lineTo(0, 0); //第1个点
    path.lineTo(0, hmSetHeight(size.height - 30.0)); //第2个点
    var firstControlPoint =
        Offset(hmSetWidth(size.width / 2), hmSetHeight(size.height));
    var firstEdnPoint =
        Offset(hmSetWidth(size.width), hmSetHeight(size.height - 30.0));
    path.quadraticBezierTo(firstControlPoint.dx, firstControlPoint.dy,
        firstEdnPoint.dx, firstEdnPoint.dy);
    path.lineTo(hmSetWidth(size.width), hmSetHeight(size.height - 30.0)); //第3个点
    path.lineTo(hmSetWidth(size.width), 0); //第4个点

    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) {
    return false;
  }
}
