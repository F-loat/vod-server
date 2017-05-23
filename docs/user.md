## 用户相关API
### 用户登录
#### 接口：`POST` /request/user/login
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
stuid | String | 是 | 学号
pwd | String | 是 | 密码



#### 使用示例

请求参数：

```json
{
  "stuid": "00000000",
  "pwd": "test"
}
```

返回结果：

```json
{
  "state": 0,
  "msg": "学号或密码错误"
}
```
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
        "_id": "5923f3deb74d6d08f4ae8af4",
        "updatedAt": "2017-05-23T08:33:34.750Z",
        "createdAt": "2017-05-23T08:33:34.750Z",
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
      "lastLoginAt": "2017-05-23T08:33:34.794Z",
      "_id": "5923f3deb74d6d08f4ae8af5",
      "updatedAt": "2017-05-23T08:33:34.779Z",
      "createdAt": "2017-05-23T08:33:34.779Z",
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
  "_id": "5923f3deb74d6d08f4ae8af6",
  "type": 12
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "5923f3deb74d6d08f4ae8af6",
    "updatedAt": "2017-05-23T08:33:34.851Z",
    "createdAt": "2017-05-23T08:33:34.823Z",
    "stuid": "000000",
    "__v": 0,
    "deleted": false,
    "type": 12,
    "score": 0
  }
}
```