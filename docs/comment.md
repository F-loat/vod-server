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
  "id": "591ff5568394f309e0e9db94"
}
```

返回结果：

```json
{
  "state": 1,
  "content": [
    {
      "_id": "591ff5568394f309e0e9db95",
      "updatedAt": "2017-05-20T07:50:46.171Z",
      "createdAt": "2017-05-20T07:50:46.171Z",
      "subject": "591ff5568394f309e0e9db94",
      "content": "评论评论评论",
      "commenter": {
        "_id": "591ff5568394f309e0e9db92",
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
  "id": "591ff5568394f309e0e9db98",
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
    "updatedAt": "2017-05-20T07:50:46.283Z",
    "createdAt": "2017-05-20T07:50:46.283Z",
    "subject": "591ff5568394f309e0e9db98",
    "content": "发布评论lalala",
    "commenter": "591ff5568394f309e0e9db96",
    "reply": null,
    "_id": "591ff5568394f309e0e9db9a",
    "deleted": false
  }
}
```