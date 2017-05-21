## 评论相关API
### 获取评论列表
#### 接口：`GET` /request/comment/list
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
id | String | 是 | 帖子Id



#### 使用示例

请求参数：

```json
{
  "id": "5921b5cee1279c04905ee727"
}
```

返回结果：

```json
{
  "state": 1,
  "content": [
    {
      "_id": "5921b5cee1279c04905ee728",
      "updatedAt": "2017-05-21T15:44:14.880Z",
      "createdAt": "2017-05-21T15:44:14.880Z",
      "subject": "5921b5cee1279c04905ee727",
      "content": "评论评论评论",
      "commenter": {
        "_id": "5921b5cee1279c04905ee725",
        "stuid": "000000"
      },
      "__v": 0,
      "deleted": false
    }
  ]
}
```
### 新增评论
#### 接口：`POST` /request/comment
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
id | String | 是 | 帖子Id或视频Id
content | String | 是 | 评论内容
reply | String | 否 | 回复目标



#### 使用示例

请求参数：

```json
{
  "id": "5921b5cfe1279c04905ee72b",
  "content": "发布评论lalala",
  "reply": null
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "__v": 0,
    "updatedAt": "2017-05-21T15:44:15.061Z",
    "createdAt": "2017-05-21T15:44:15.061Z",
    "subject": "5921b5cfe1279c04905ee72b",
    "content": "发布评论lalala",
    "commenter": "5921b5cfe1279c04905ee729",
    "reply": null,
    "_id": "5921b5cfe1279c04905ee72d",
    "deleted": false
  }
}
```