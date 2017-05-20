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
  "videoId": "591ff5568394f309e0e9dba6",
  "state": "[0]"
}
```

返回结果：

```json
{
  "state": 1,
  "content": [
    {
      "_id": "591ff5568394f309e0e9dba7",
      "updatedAt": "2017-05-20T07:50:46.374Z",
      "createdAt": "2017-05-20T07:50:46.374Z",
      "name": "测试",
      "filePath": "episode/2017/5/20/hahaha.mp4",
      "video": "591ff5568394f309e0e9dba6",
      "creater": {
        "_id": "591ff5568394f309e0e9dba4",
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