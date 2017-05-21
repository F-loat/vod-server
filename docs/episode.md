## 剧集相关API
### 获取视频列表
#### 接口：`GET` /request/episode/list
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
videoId | String | 是 | 视频Id
state | String | 否 | 剧集状态



#### 使用示例

请求参数：

```json
{
  "videoId": "5921b5cfe1279c04905ee739",
  "state": "[0]"
}
```

返回结果：

```json
{
  "state": 1,
  "content": [
    {
      "_id": "5921b5cfe1279c04905ee73a",
      "updatedAt": "2017-05-21T15:44:15.302Z",
      "createdAt": "2017-05-21T15:44:15.302Z",
      "name": "测试",
      "filePath": "episode/2017/5/20/hahaha.mp4",
      "video": "5921b5cfe1279c04905ee739",
      "creater": {
        "_id": "5921b5cfe1279c04905ee737",
        "stuid": "000000"
      },
      "__v": 0,
      "deleted": false,
      "sort": 0,
      "state": 0
    }
  ]
}
```