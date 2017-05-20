## 用户相关API
### *获取用户列表*
#### 接口：`GET` /request/user/list
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
type | String | 否 | 用户类型
limit | Number | 否 | 查询条数
page | Number | 否 | 查询页数



#### 使用示例

请求参数：

```json
{
  "type": null,
  "limit": 10,
  "page": 1
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "users": [
      {
        "_id": "591ff5568394f309e0e9dbbc",
        "updatedAt": "2017-05-20T07:50:46.562Z",
        "createdAt": "2017-05-20T07:50:46.562Z",
        "stuid": "000000",
        "__v": 0,
        "deleted": false,
        "type": 10,
        "score": 0
      }
    ],
    "totalCount": 1
  }
}
```
### 获取用户信息
#### 接口：`GET` /request/user
#### 使用示例

请求参数：无


返回结果：

```json
{
  "state": 1,
  "content": {
    "user": {
      "lastLoginAt": "2017-05-20T07:50:46.583Z",
      "_id": "591ff5568394f309e0e9dbbd",
      "updatedAt": "2017-05-20T07:50:46.578Z",
      "createdAt": "2017-05-20T07:50:46.578Z",
      "stuid": "000000",
      "__v": 0,
      "deleted": false,
      "type": 10,
      "score": 0
    }
  }
}
```
### *修改用户信息*
#### 接口：`PUT` /request/user
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
_id | String | 是 | 用户Id
type | Number | 是 | 用户类型



#### 使用示例

请求参数：

```json
{
  "_id": "591ff5568394f309e0e9dbbe",
  "type": 12
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "591ff5568394f309e0e9dbbe",
    "updatedAt": "2017-05-20T07:50:46.600Z",
    "createdAt": "2017-05-20T07:50:46.588Z",
    "stuid": "000000",
    "__v": 0,
    "deleted": false,
    "type": 12,
    "score": 0
  }
}
```