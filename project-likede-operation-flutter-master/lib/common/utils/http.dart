// import 'dart:io';
import 'dart:async';

// import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart'
    hide Options; // 过滤掉 Options 与 dio 冲突
import 'package:fluttertoast/fluttertoast.dart';
import 'package:likede/common/utils/authentication.dart';

import '../config/index.dart';

// import '../widget/loading_dialog.dart' show Loading;

class HttpUtil {
  static dynamic ctx;
  final storage = new FlutterSecureStorage();
  static HttpUtil instance;
  Dio dio;
  BaseOptions options;

  CancelToken cancelToken = new CancelToken();

  static HttpUtil getInstance() {
    if (null == instance) instance = new HttpUtil();
    return instance;
  }

  HttpUtil() {
    //BaseOptions、Options、RequestOptions 都可以配置参数，优先级别依次递增，且可以根据优先级别覆盖参数
    options = new BaseOptions(
      //请求基地址,可以包含子路径
      baseUrl: '',
      // baseUrl: storage.read(key: STORAGE_KEY_APIURL) ?? SERVICE_API_BASEURL,
      //连接服务器超时时间，单位是毫秒.
      connectTimeout: 60000,
      //响应流上前后两次接受到数据的间隔，单位为毫秒。
      receiveTimeout: 60000,
      //Http请求头.
      headers: {
        "version": "1.0.0",
        'accept-language': 'zh-cn',
        // 'content-type': 'application/json'
      },
      //请求的Content-Type，默认值是[ContentType.json]. 也可以用ContentType.parse("application/x-www-form-urlencoded")
      contentType: 'application/json; charset=utf-8',
      //表示期望以那种格式(方式)接受响应数据。接受三种类型 `json`, `stream`, `plain`, `bytes`. 默认值是 `json`,
      responseType: ResponseType.json,
    );

    dio = new Dio(options);

    //Cookie管理
    // dio.interceptors.add(CookieManager(CookieJar()));

    //添加拦截器
    dio.interceptors
        .add(InterceptorsWrapper(onRequest: (RequestOptions options) {
      // print("请求之前");
      // Loading.before(options.uri, '正在通讯...');
      return options; //continue
    }, onResponse: (Response response) {
      // print("响应之前");
      // Loading.complete(response.request.uri);
      return response; // continue
    }, onError: (DioError e) {
      // print("错误之前");
      // Loading.complete(e.request.uri);
      return e; //continue
    }));

    // // 在调试模式下需要抓包调试，所以我们使用代理，并禁用HTTPS证书校验
    // (dio.httpClientAdapter as DefaultHttpClientAdapter).onHttpClientCreate =
    //     (client) {
    //   client.findProxy = (uri) {
    //     return "PROXY 192.168.42.70:8888";
    //   };
    //   //代理工具会提供一个抓包的自签名证书，会通不过证书校验，所以我们禁用证书校验
    //   client.badCertificateCallback =
    //       (X509Certificate cert, String host, int port) => true;
    // };
  }

  /*
   * error统一处理
   */
  void formatError(DioError e) {
    String errMessage = '';
    if (e.type == DioErrorType.CONNECT_TIMEOUT) {
      // It occurs when url is opened timeout.
      errMessage = '连接超时';
    } else if (e.type == DioErrorType.SEND_TIMEOUT) {
      // It occurs when url is sent timeout.
      errMessage = '请求超时';
    } else if (e.type == DioErrorType.RECEIVE_TIMEOUT) {
      //It occurs when receiving timeout
      errMessage = '响应超时';
    } else if (e.type == DioErrorType.RESPONSE) {
      // When the server response, but with a incorrect status, such as 404, 503...
      // errMessage = e.response.data['errMessage'] ?? '出现异常, 详情请按接口说明自定义错误体！';
      if (e.response.data is String) {
        errMessage =
            e.response.data == '' ? '出现异常, 详情请按接口说明自定义错误体！' : e.response.data;
        // errMessage = '网络开小差啦';
      } else {
        errMessage = e.response.data['errMessage'];
      }
      if (e.response.statusCode == 401) {
        gotoLogin(ctx);
      }
    } else if (e.type == DioErrorType.CANCEL) {
      // When the request is cancelled, dio will throw a error with this type.
      errMessage = '请求取消';
    } else {
      //DEFAULT Default error type, Some other Error. In this case, you can read the DioError.error if it is not null.
      errMessage = '请求取消';
    }
    Fluttertoast.showToast(
      msg: errMessage,
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.CENTER,
      // timeInSecForIos: 1,
      // backgroundColor: Colors.red,
      // textColor: Colors.white,
      fontSize: 16.0,
    );
    throw e;
  }

  /*
   * 取消请求
   *
   * 同一个cancel token 可以用于多个请求，当一个cancel token取消时，所有使用该cancel token的请求都会被取消。
   * 所以参数可选
   */
  void cancelRequests(CancelToken token) {
    token.cancel("cancelled");
  }

  // 读取本地配置
  Future<Options> getMyOptions() async {
    Options options;
    var token = await storage.read(key: STORAGE_KEY_USER_TOKEN);
    if (token != null) {
      options = Options(headers: {
        "version": "1.0.0",
        'accept-language': 'zh-cn',
        // 'content-type': 'application/json',
        'Authorization': token
        // 'Authorization': 'Bearer $token'
      });
    }
    return options;
  }

  // 读取 baseUrl
  Future<String> getBaseUrl() async {
    var baseUrl = await storage.read(key: STORAGE_KEY_APIURL);
    return baseUrl ?? SERVICE_API_BASEURL;
  }

  /// restful get 操作
  Future get(String url,
      {Map<String, dynamic> params,
      Options options,
      CancelToken cancelToken}) async {
    try {
      var tokenOptions = options ?? await getMyOptions();
      var baseUrl = await getBaseUrl();
      var response = await dio.get(baseUrl + url,
          queryParameters: params,
          options: tokenOptions,
          cancelToken: cancelToken);
      return response.data;
    } on DioError catch (e) {
      formatError(e);
    }
  }

  /// restful post 操作
  Future post(String url,
      {Map<String, dynamic> params,
      Options options,
      CancelToken cancelToken}) async {
    try {
      var tokenOptions = options ?? await getMyOptions();
      var baseUrl = await getBaseUrl();
      var response = await dio.post(baseUrl + url,
          data: params, options: tokenOptions, cancelToken: cancelToken);
      return response.data;
    } on DioError catch (e) {
      formatError(e);
    }
  }

  /// restful put 操作
  Future put(String url,
      {Map<String, dynamic> params,
      Options options,
      CancelToken cancelToken}) async {
    try {
      var tokenOptions = options ?? await getMyOptions();
      var baseUrl = await getBaseUrl();
      var response = await dio.put(baseUrl + url,
          data: params, options: tokenOptions, cancelToken: cancelToken);
      return response.data;
    } on DioError catch (e) {
      formatError(e);
    }
  }

  /// restful delete 操作
  Future delete(String url,
      {Map<String, dynamic> params,
      Options options,
      CancelToken cancelToken}) async {
    try {
      var tokenOptions = options ?? await getMyOptions();
      var baseUrl = await getBaseUrl();
      var response = await dio.delete(baseUrl + url,
          data: params, options: tokenOptions, cancelToken: cancelToken);
      return response.data;
    } on DioError catch (e) {
      formatError(e);
    }
  }

  /// restful post form 表单提交操作
  Future postForm(String url,
      {Map<String, dynamic> params,
      Options options,
      CancelToken cancelToken}) async {
    try {
      var tokenOptions = options ?? await getMyOptions();
      var baseUrl = await getBaseUrl();
      var response = await dio.post(baseUrl + url,
          data: FormData.fromMap(params),
          options: tokenOptions,
          cancelToken: cancelToken);
      return response.data;
    } on DioError catch (e) {
      formatError(e);
    }
  }
}
