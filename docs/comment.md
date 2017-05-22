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
  "id": "59226657773c2a2d88c11017"
}
```

返回结果：

```json
{
  "state": 1,
  "content": [
    {
      "_id": "59226657773c2a2d88c11018",
      "updatedAt": "2017-05-22T04:17:27.967Z",
      "createdAt": "2017-05-22T04:17:27.967Z",
      "subject": "59226657773c2a2d88c11017",
      "content": "评论评论评论",
      "commenter": {
        "_id": "59226657773c2a2d88c11015",
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
  "id": "59226658773c2a2d88c1101b",
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
    "updatedAt": "2017-05-22T04:17:28.133Z",
    "createdAt": "2017-05-22T04:17:28.133Z",
    "subject": "59226658773c2a2d88c1101b",
    "content": "发布评论lalala",
    "commenter": "59226658773c2a2d88c11019",
    "reply": null,
    "_id": "59226658773c2a2d88c1101d",
    "deleted": false
  }
}
```