import 'package:likede/common/entity/task_detail.dart';
import 'package:likede/common/utils/http.dart';
import 'package:likede/common/entity/task_page.dart';
import 'package:likede/common/entity/task_rank.dart';
// import 'package:likede/pages/home_module/index/bloc/task_event.dart';

class TaskService {
  /// 获取用户排名情况
  static Future<TaskRankEntity> getTaskRank(String userId) async {
    var response =
        await HttpUtil.getInstance().get('/task-service/task/rank/$userId');
    return TaskRankEntity.fromJson(response);
  }

  /// 工单搜索
  static Future<TaskPageEntity> searchTask(Map<String, dynamic> params) async {
    var response = await HttpUtil.getInstance()
        .get('/task-service/task/search', params: params);
    return TaskPageEntity.fromJson(response);
  }

  /// 获取补货工单详情
  static Future<List<TaskDetailEntity>> getTaskDetail(String taskId) async {
    var response =
        await HttpUtil.getInstance().get('/task-service/taskDetails/$taskId');

    return response.map<TaskDetailEntity>((item) {
      return TaskDetailEntity.fromJson(item);
    }).toList();
  }

  /// 接受工单
  static Future<bool> acceptTask(String taskId) async {
    return await HttpUtil.getInstance()
        .get('/task-service/task/accept/$taskId');
  }

  /// 完成工单
  static Future<bool> completeTask(
      String taskId, Map<String, double> params) async {
    return await HttpUtil.getInstance()
        .get('/task-service/task/complete/$taskId', params: params);
  }

  /// 拒绝/取消工单
  static Future<bool> cancelTask(
      String taskId, Map<String, String> params) async {
    return await HttpUtil.getInstance()
        .post('/task-service/task/cancel/$taskId', params: params);
  }
}
