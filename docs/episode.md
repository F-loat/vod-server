## 剧集相关API
### 获取剧集列表
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
  "videoId": "592268fa5a02d9157c985f1d",
  "state": "[0]"
}
```

返回结果：

```json
{
  "state": 1,
  "content": [
    {
      "_id": "592268fa5a02d9157c985f1e",
      "updatedAt": "2017-05-22T04:28:42.836Z",
      "createdAt": "2017-05-22T04:28:42.836Z",
      "name": "测试",
      "filePath": "episode/2017/5/20/hahaha.mp4",
      "video": "592268fa5a02d9157c985f1d",
      "creater": {
        "_id": "592268fa5a02d9157c985f1b",
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