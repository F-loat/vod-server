## 弹幕相关API
### 获取弹幕列表
#### 接口：`GET` /request/danmaku
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
id | String | 是 | 视频Id
max | Number | 否 | 最大数量



#### 使用示例

请求参数：

```json
{
  "id": "592268fa5a02d9157c985f14",
  "max": 1000
}
```

返回结果：

```json
{
  "code": 1,
  "danmaku": [
    {
      "_id": "592268fa5a02d9157c985f15",
      "author": "592268fa5a02d9157c985f12",
      "time": 64,
      "text": "测试",
      "color": "#fff",
      "type": "right",
      "ip": "127.0.0.1",
      "referer": "localhost:test",
      "__v": 0,
      "player": [
        "592268fa5a02d9157c985f14"
      ]
    }
  ]
}
```
### 新增弹幕
#### 接口：`POST` /request/danmaku
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
author | String | 是 | 用户Id
color | String | 是 | 弹幕颜色
player | String | 是 | 视频Id
text | String | 是 | 弹幕内容
time | Number | 是 | 弹幕出现时间
token | String | 是 | token
type | String | 是 | 弹幕类型



#### 使用示例

请求参数：

```json
{
  "author": "592268fa5a02d9157c985f16",
  "color": "#fff",
  "player": "590bf24bc099e009e78e591c",
  "text": "111",
  "time": 0,
  "token": "youngon_vod",
  "type": "right"
}
```

返回结果：

```json
{
  "code": 1,
  "data": {
    "__v": 0,
    "author": "592268fa5a02d9157c985f16",
    "time": 0,
    "text": "111",
    "color": "#fff",
    "type": "right",
    "ip": "::ffff:127.0.0.1",
    "_id": "592268fa5a02d9157c985f1a",
    "player": [
      "590bf24bc099e009e78e591c"
    ]
  }
}
```