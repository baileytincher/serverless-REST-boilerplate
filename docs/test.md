---
title: Serverless REST Boilerplate
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - javascript--nodejs: Node.JS
  - ruby: Ruby
  - python: Python
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<h1 id="serverless-rest-boilerplate">Serverless REST Boilerplate v1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

A simple example demonstrating serverless usage

Base URLs:

* <a href="https://c8sjmoy85l.execute-api.us-east-2.amazonaws.com/dev">https://c8sjmoy85l.execute-api.us-east-2.amazonaws.com/dev</a>

Email: <a href="mailto:bailey.tincher@btin.io">Bailey Tincher</a> Web: <a href="https://btin.io">Bailey Tincher</a> 
 License: MIT

<h1 id="serverless-rest-boilerplate-users">Users</h1>

## Creates a user

`POST /users/register`

Registers a user for the service by storing their information  and a hash of their password in the users database.

> Body parameter

```json
{
  "user": {
    "password": "string",
    "username": "string"
  }
}
```

<h3 id="creates-a-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[NewUser](#schemanewuser)|true|none|

> Example responses

> 200 Response

```json
{
  "user": {
    "message": "string",
    "username": "string"
  }
}
```

<h3 id="creates-a-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|200 response|[CreatedUser](#schemacreateduser)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|400 response|[UserAlreadyExistsError](#schemauseralreadyexistserror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|500 response|[ServerError](#schemaservererror)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocSuseralreadyexistserror">UserAlreadyExistsError</h2>

<a id="schemauseralreadyexistserror"></a>

```json
{
  "input": "string",
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input|string|false|none|none|
|message|string|false|none|none|

<h2 id="tocScreateduser">CreatedUser</h2>

<a id="schemacreateduser"></a>

```json
{
  "user": {
    "message": "string",
    "username": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user|object|false|none|none|
|» message|string|false|none|none|
|» username|string|false|none|none|

<h2 id="tocSservererror">ServerError</h2>

<a id="schemaservererror"></a>

```json
{
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|false|none|none|

<h2 id="tocSnewuser">NewUser</h2>

<a id="schemanewuser"></a>

```json
{
  "user": {
    "password": "string",
    "username": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user|object|false|none|none|
|» password|string|false|none|none|
|» username|string|false|none|none|

