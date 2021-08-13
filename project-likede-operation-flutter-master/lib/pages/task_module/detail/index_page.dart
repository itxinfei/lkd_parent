import 'dart:convert';

import 'package:fbutton/fbutton.dart';
import 'package:flutter/material.dart';
import 'package:gradient_app_bar/gradient_app_bar.dart';
import 'package:likede/common/api/task.dart';
import 'package:likede/common/entity/task_detail.dart';
import 'package:likede/common/entity/task_page.dart';
import 'package:likede/common/enum/task_status.dart';
import 'package:likede/common/utils/function.dart';

import 'app_bar_bottom_widget.dart';

class TaskDetailPage extends StatefulWidget {
  final String taskStr;

  TaskDetailPage({Key key, this.taskStr}) : super(key: key);

  @override
  _TaskDetailPageState createState() => _TaskDetailPageState();
}

class _TaskDetailPageState extends State<TaskDetailPage> {
  TaskEntity _task;
  List<TaskDetailEntity> _taskDetails;
  TextEditingController _cancelController = TextEditingController();

  @override
  void initState() {
    super.initState();
    loadInitData();
  }

  loadInitData() async {
    _task = TaskEntity.fromJson(json.decode(widget.taskStr));
    if (_task.taskType.typeName == '补货工单') {
      _taskDetails = await TaskService.getTaskDetail(_task.taskId);
    }
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomPadding: false,
      appBar: _appBarWidget(),
      body: _bodyWidget(context),
    );
  }

  Widget _appBarWidget() {
    return GradientAppBar(
      leading: Builder(
        builder: (BuildContext context) {
          return IconButton(
            icon: Image.asset(
              'assets/images/back.png',
              width: hmSetWidth(18),
              height: hmSetWidth(18),
            ),
            onPressed: () {
              Navigator.maybePop(context);
            },
          );
        },
      ),
      title: Text(
        '工单详情',
        style: TextStyle(
          color: Color(0xFFFFFFFF),
          fontSize: hmSetFontSize(19),
        ),
      ),
      bottom: AppBarBottomWidget(task: _task),
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

  /// TODO: 拆分组件，用form布局，还原间距20px
  Widget _bodyWidget(BuildContext context) {
    return Column(
      children: <Widget>[
        Expanded(
          child: Column(
            children: <Widget>[
              ListTile(
                leading: Text(
                  '设备号：',
                  style: TextStyle(
                    color: Color(0xFF181818),
                    fontSize: hmSetFontSize(14),
                  ),
                ),
                title: Text(
                  '${_task.innerCode}',
                  style: TextStyle(
                    color: Color(0xFF181818),
                    fontSize: hmSetFontSize(14),
                  ),
                ),
              ),
              ListTile(
                leading: Text(
                  '创建时间：',
                  style: TextStyle(
                    color: Color(0xFF181818),
                    fontSize: hmSetFontSize(14),
                  ),
                ),
                title: Text(
                  hmFormatDateTimeStr('${_task.createTime}'),
                  style: TextStyle(
                    color: Color(0xFF181818),
                    fontSize: hmSetFontSize(14),
                  ),
                ),
              ),
              ListTile(
                leading: Text(
                  '地址：',
                  style: TextStyle(
                    color: Color(0xFF181818),
                    fontSize: hmSetFontSize(14),
                  ),
                ),
                title: Text(
                  '${_task.addr}',
                  style: TextStyle(
                    color: Color(0xFF181818),
                    fontSize: hmSetFontSize(14),
                  ),
                ),
              ),
              ListTile(
                leading: Text(
                  '工单类型：',
                  style: TextStyle(
                    color: Color(0xFF181818),
                    fontSize: hmSetFontSize(14),
                  ),
                ),
                title: Text(
                  '${_task.taskType.typeName}',
                  style: TextStyle(
                    color: Color(0xFF181818),
                    fontSize: hmSetFontSize(14),
                  ),
                ),
              ),
              _taskDetailWidget(),
              _locationWidget(),
              ListTile(
                leading: Text(
                  '备注：',
                  style: TextStyle(
                    color: Color(0xFF181818),
                    fontSize: hmSetFontSize(14),
                  ),
                ),
                title: Text(
                  '${_task.desc}',
                  style: TextStyle(
                    color: Color(0xFF181818),
                    fontSize: hmSetFontSize(14),
                  ),
                ),
              ),
            ],
          ),
        ),
        _operationButtonWidget(context),
      ],
    );
  }

  /// TODO: 补货详情有可能会很多，要考虑滚动情况
  Widget _taskDetailWidget() {
    if ('${_task.taskType.typeName}' != '补货工单' || _taskDetails == null) {
      return Container();
    }
    return ListTile(
      leading: Text(
        '补货详情：',
        style: TextStyle(
          color: Color(0xFF181818),
          fontSize: hmSetFontSize(14),
        ),
      ),
      title: Column(
        children: _taskDetails
            .map<Widget>((f) => Row(
                  children: <Widget>[
                    Text(
                      '货道：${f.channelCode}    ',
                      style: TextStyle(
                        color: Color(0xFF181818),
                        fontSize: hmSetFontSize(14),
                      ),
                    ),
                    Text(
                      '${f.skuName}：${f.expectCapacity}',
                      style: TextStyle(
                        color: Color(0xFF181818),
                        fontSize: hmSetFontSize(14),
                      ),
                    )
                  ],
                ))
            .toList(),
      ),
    );
  }

  /// 定位
  Widget _locationWidget() {
    if ('${_task.taskType.typeName}' != '装机工单') {
      return Container();
    }
    return ListTile(
      leading: Text(
        '定位：',
        style: TextStyle(
          color: Color(0xFF181818),
          fontSize: hmSetFontSize(14),
        ),
      ),
      title: Row(
        children: <Widget>[
          // TODO: 颜色需要UI提供
          InkWell(
            child: Text(
              '传智播客总部办公楼',
              style: TextStyle(
                color: Colors.blue,
                fontSize: hmSetFontSize(14),
              ),
            ),
            onTap: () {
              if (_task.taskStatus == TaskStatus.accepted.index + 1) {
                print('打开高德地图');
              }
            },
          ),
          Padding(
            padding: EdgeInsets.only(
              left: hmSetWidth(5),
            ),
            child: Image.asset(
              'assets/images/location.png',
              width: hmSetWidth(14),
              height: hmSetWidth(14),
            ),
          ),
        ],
      ),
    );
  }

  /// 操作按钮
  Widget _operationButtonWidget(BuildContext context) {
    TaskStatus taskStatus = TaskStatus.values[_task.taskStatus - 1];
    if (taskStatus == TaskStatus.canceled ||
        taskStatus == TaskStatus.completed) {
      return Container();
    }

    return Padding(
      padding: EdgeInsets.only(
        bottom: hmSetHeight(40),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Padding(
            padding: EdgeInsets.only(
              right: hmSetWidth(12),
            ),
            child: FButton(
              onPressed: () {
                _openCancelDialog(taskStatus);
              },
              text: '${taskStatus == TaskStatus.waiting ? '拒绝' : '取消工单'}',
              style: TextStyle(
                color: Color(0xFF2C2B2E),
                fontSize: hmSetFontSize(16),
              ),
              alignment: Alignment.center,
              color: Color(0xFFFFFFFF),
              highlightColor: Color(0xFFFFFFFF),
              width: hmSetWidth(150),
              height: hmSetHeight(50),
              corner: FCorner.all(hmSetWidth(7)),
              strokeColor: Color(0xFF979797),
              strokeWidth: 1,
            ),
          ),
          FButton(
            onPressed: () async {
              bool isSuccess = false;
              if (taskStatus == TaskStatus.waiting) {
                isSuccess = await TaskService.acceptTask(_task.taskId);
              } else {
                // TODO: 运维工单需要上传经纬度
                isSuccess = await TaskService.completeTask(_task.taskId, {});
              }
              hmShowDialog(context, isSuccess);
            },
            text: '${taskStatus == TaskStatus.waiting ? '接受' : '完成工单'}',
            style: TextStyle(
              color: Color(0xFFFFD2AA),
              fontSize: hmSetFontSize(16),
            ),
            alignment: Alignment.center,
            color: Color(0xFFFFFFFF),
            width: hmSetWidth(150),
            height: hmSetHeight(50),
            corner: FCorner.all(hmSetWidth(7)),
            strokeColor: Color(0xFF979797),
            gradient: LinearGradient(colors: [
              Color(0xFF555356),
              Color(0xFF161618),
            ]),
          ),
        ],
      ),
    );
  }

  /// TODO: 抽出组件放入单独的文件里
  /// TODO: 键盘默认是汉字键盘
  void _openCancelDialog(TaskStatus taskStatus) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Material(
          color: Colors.transparent,
          child: Container(
            color: const Color.fromRGBO(0, 0, 0, 0.5),
            child: Center(
              child: Container(
                decoration: BoxDecoration(
                  color: const Color(0xFFFFFFFF),
                  borderRadius: BorderRadius.all(
                    Radius.circular(
                      hmSetHeight(18),
                    ),
                  ),
                ),
                width: hmSetWidth(304),
                height: hmSetHeight(297),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Padding(
                      padding: EdgeInsets.only(
                        top: hmSetHeight(16),
                      ),
                      child: Text(
                        '${taskStatus == TaskStatus.waiting ? '拒绝原因' : '取消原因'}',
                        style: TextStyle(
                          color: Color(0xFF181A39),
                          fontSize: hmSetFontSize(18),
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    Expanded(
                      child: Padding(
                        padding: hmSetEdgeInsetsLTRB(20, 18, 20, 0),
                        child: TextField(
                          controller: _cancelController,
                          maxLines: 8,
                          decoration: InputDecoration(
                            prefixText: '',
                            hintText:
                                '${taskStatus == TaskStatus.waiting ? '请输入你对此工单的拒绝原因' : '请输入你对此工单的取消原因'}',
                            hintStyle: TextStyle(
                              color: Color(0xFFB4B4BD),
                              fontSize: hmSetFontSize(14),
                            ),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(
                                hmSetHeight(8),
                              ),
                              borderSide: BorderSide(
                                width: 0,
                                style: BorderStyle.none,
                              ),
                            ),
                            filled: true,
                            fillColor: Color(0xFFF7F4F5),
                          ),
                        ),
                      ),
                    ),
                    Row(
                      children: <Widget>[
                        Expanded(
                          child: FButton(
                            onPressed: () async {
                              Navigator.of(context).pop();
                            },
                            text: '取消',
                            style: TextStyle(
                              color: Color(0xFF181A39),
                              fontSize: hmSetFontSize(16),
                            ),
                            alignment: Alignment.center,
                            color: Color(0xFFFFFFFF),
                            highlightColor: Color(0xFFFFFFFF),
                            width: hmSetWidth(148),
                            height: hmSetHeight(49),
                            corner: FCorner(
                              leftBottomCorner: hmSetWidth(18),
                            ),
                            strokeColor: Color(0xFFECEAEA),
                            strokeWidth: 0.5,
                          ),
                        ),
                        FButton(
                          onPressed: () async {
                            // TODO: 原因为空的情况
                            bool isSuccess = await TaskService.cancelTask(
                                _task.taskId, {
                              'taskId': _task.taskId,
                              'desc': _cancelController.text
                            });
                            Navigator.of(context).pop();
                            hmShowDialog(context, isSuccess);
                          },
                          text: '提交',
                          style: TextStyle(
                            color: Color(0xFFB4B4BD),
                            fontSize: hmSetFontSize(16),
                          ),
                          alignment: Alignment.center,
                          color: Color(0xFFFFFFFF),
                          highlightColor: Color(0xFFFFFFFF),
                          width: hmSetWidth(148),
                          height: hmSetHeight(49),
                          corner: FCorner(
                            rightBottomCorner: hmSetWidth(18),
                          ),
                          strokeColor: Color(0xFFECEAEA),
                          strokeWidth: 0.5,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
