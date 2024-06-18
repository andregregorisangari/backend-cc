<center>

# Kopra Lapak Backend API

</center>

This is the documentation for the Kopra Lapak Backend API. It is a part of the Capstone Project "Kopra Lapak" by CH2-PS114 Bangkit Academy 2023 Batch 2.

```markdown
# Prerequisites
Before running the application, make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (JavaScript Runtime Environment)
- [npm](https://www.npmjs.com/) (Node Package Manager)

# Tech We Use in Capstone Project
- Express.js (Node.js Framework)
- MySQL (Database)
- nanoid (Unique ID Generator)
- bcrypt (Password Hashing)
- jsonwebtoken (JWT Token)
- Cloud Run (Deployment)
- Cloud Build (CI/CD)
- Cloud SQL (Database)
- Cloud Storage (Image Storage)
- Cloud Security (Security Scanner)
```

## Getting Started

To run the API on your local computer, follow these steps:

1. Clone this repository
   ```bash
   git clone https://github.com/Kopra-Lapak/Koplak-API-CC.git
   ```
2. Install the required dependencies
    ```bash
     npm install
     ```
3. To run this project, you will need to add the following environment variables to your .env file
    ```bash
    PORT=8001
    #DATABASE CONFIG
    DB_HOST=127.0.0.1
    DB_USERNAME=root
    DB_PASSWORD=
    DB_NAME=Change this to your own database name!

    # JWT Token Key
    ACCESS_TOKEN_KEY=change this your own random token key!
    REFRESH_TOKEN_KEY=change this your own random refresh token!
    ```
4. create your own database like this
    
    <a href="">
      <img src="https://drive.google.com/uc?id=1oAOkj_Ebc4468Oh5dQd54z7Jonhyb2jz" />
    </a>
    
    <details>
    <summary>DBML Code</summary>
    
    ```sql
    Table blacklist {
      id bigint [pk, increment]
      token varchar(512)
    }
    
    Table comment {
      comment_id varchar(25) [pk]
      publish_id varchar(25) [ref: > publish.publish_id]
      profile_id varchar(25) [ref: > profile.profile_id]
      comment_text varchar(500)
      created_at datetime
      updated_at datetime
    }
    
    Table profile {
      profile_id varchar(25) [pk]
      user_id varchar(25) [ref: > user.user_id]
      image_profile varchar(255)
      fullname varchar(100)
      role enum('buyer', 'seller')
      address varchar(255)
      birth date
      gender enum('male', 'female')
      created_at datetime
      updated_at datetime
    }
    
    Table publish {
      publish_id varchar(25) [pk]
      profile_id varchar(25) [ref: > profile.profile_id]
      image_publish varchar(255)
      price varchar(50)
      supply varchar(50)
      grade enum('A', 'B', 'C')
      description varchar(255)
      address varchar(255)
      distance_from_user float
      likes int
      comments int
      views int
      created_at datetime
      updated_at datetime
    }
    
    Table user {
      user_id varchar(16) [pk]
      username varchar(100)
      email varchar(128) [unique]
      password varchar(256)
      created_at datetime
      updated_at datetime
    }
    ```
    </details>
5. Start the server
    ```bash
    npm start
    ```


6. The API will be running on http://localhost:8001.
7. [You can test the API using Postman or any other API testing tool.](#endpoints)


## Endpoints

If you want to test the API, you can use the following endpoints

OR 

You can use Postman to test the API. You can download the Postman documentation [HERE](https://documenter.getpostman.com/view/29787210/2s9YknANZe)


<details>
<summary>User Auth</summary>

- **Register**
<pre>POST /register</pre>
Request Body:
```json
{
    "username": "Andre",
    "email": "andre@gmail.com",
    "password": "andre1234"
}
```
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "Registration is successful",
    "data": {
        "username": "Andre",
        "email": "andre@gmail.com"
    }
}
```
- **Login**
<pre>POST /login</pre>
Request Body:
```json
{
    "email": "andre@gmail.com",
    "password": "andre1234"
}
```
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "Logged in successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFOVG94MG11TDZHZWZwTXoiLCJlbWFpbCI6ImFuZHJlQGdtYWlsLmNvbSIsImlhdCI6MTcwMjg3NTMzOCwiZXhwIjoxNzA4MDU5MzM4fQ.qv2l5D6axen9BeNYQXQe-2CoRakEbhOHKbyiZBQXUcQ",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFOVG94MG11TDZHZWZwTXoiLCJlbWFpbCI6ImFuZHJlQGdtYWlsLmNvbSIsImlhdCI6MTcwMjg3NTMzOH0.zhwwsC5mvCKhvH3PuTnc3jh5jVt0u0VsUG8saHe-WxU"
    }
}
```
- **Logout**
<pre>POST /logout</pre>
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "Logout successfully"
}
```

</details>

<details>
<summary>Profile</summary>

- **Create Profile**
<pre>POST /profile</pre>
<pre>Authorization: Token</pre>
Request Body:
```json
{
    "image_profile": "imageprofile.com",
    "fullname": "Andre Gregori Sangari",
    "address": "Jln. Kopra",
    "birth": "1999-08-07",
    "gender": "male"
}
```
Response Body:
```json
{
    "code": 201,
    "status": "CREATED",
    "message": "Profile added successfully",
    "data": {
        "profile_id": "csyGqVJ0ZuAztldn",
        "image_profile": "imageprofile.com",
        "fullname": "Andre Gregori Sangari",
        "address": "Jln. Kopra",
        "birth": "1999-08-07",
        "gender": "male"
    }
}
```
- **Get All Profile**
<pre>GET /profile</pre>
<pre>Authorization: Token</pre>
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "success grab data Profile",
    "data": [
        {
            "profile_id": "csyGqVJ0ZuAztldn",
            "user_id": "1NTox0muL6GefpMz",
            "image_profile": "imageprofile.com",
            "fullname": "Andre Gregori Sangari",
            "role": "buyer",
            "address": "Jln. Kopra",
            "birth": "1999-08-06T17:00:00.000Z",
            "gender": "male",
            "created_at": "2023-12-18T04:56:09.000Z",
            "updated_at": "2023-12-18T04:56:09.000Z"
        }
    ]
}
```

- **Get Profile by ID**
<pre>GET /profile/id</pre>
<pre>Authorization: Token</pre>
Response Body:
  ```json
{
    "code": 200,
    "status": "OK",
    "message": "Success grab data Profile",
    "data": [
        {
            "profile_id": "csyGqVJ0ZuAztldn",
            "user_id": "1NTox0muL6GefpMz",
            "image_profile": "imageprofile.com",
            "fullname": "Andre Gregori Sangari",
            "role": "buyer",
            "address": "Jln. Kopra",
            "birth": "1999-08-06T17:00:00.000Z",
            "gender": "male",
            "created_at": "2023-12-18T04:56:09.000Z",
            "updated_at": "2023-12-18T04:56:09.000Z"
        }
    ]
}
```
- **Update Profile by ID**
<pre>PUT /profile/id</pre>
<pre>Authorization: Token</pre>
Request Body:
```json
{
    "image_profile": "imageprofile.com",
    "fullname": "Andre",
    "role": "seller",
    "address": "Jln. Kopra",
    "birth": "1999-08-06",
    "gender": "male"
}
```
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "Profile updated successfully",
    "data": {
        "profile_id": "csyGqVJ0ZuAztldn",
        "image_profile": "imageprofile.com",
        "fullname": "Andre",
        "role": "seller",
        "address": "Jln. Kopra",
        "birth": "1999-08-06",
        "gender": "male"
    }
}
```
- **Delete Profile by ID**
<pre>DELETE /profile/id</pre>
<pre>Authorization: Token</pre>
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "Profile deleted successfully"
}
```
</details>

<details>
<summary>Publish</summary>

- **Create Publish**
<pre>POST /publish</pre>
<pre>Authorization: Token</pre>
Request Body:
```json
{
    "image_publish": "imagepublish.com",
    "price": "15.000.000",
    "supply": "3 TON",
    "grade": "A",
    "description": "Good quality copra",
    "address": "Jln. Kopra",
    "distance_from_user": 3.00
}
```
Response Body:
```json
{
    "code": 201,
    "status": "CREATED",
    "message": "Publish added successfully",
    "data": {
        "publish_id": "1amxRhw1pEbwhLcC",
        "image_publish": "imagepublish.com",
        "price": "15.000.000",
        "supply": "3 TON",
        "grade": "A",
        "description": "Good quality copra",
        "address": "Jln. Kopra",
        "distance_from_user": 3
    }
}
```
- **Get All Publish**
<pre>GET /publish</pre>
<pre>Authorization: Token</pre>
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "Success grab data Publish",
    "data": [
        {
            "publish_id": "1amxRhw1pEbwhLcC",
            "profile_id": "csyGqVJ0ZuAztldn",
            "image_publish": "imagepublish.com",
            "price": "15.000.000",
            "supply": "3 TON",
            "grade": "A",
            "description": "Good quality copra",
            "address": "Jln. Kopra",
            "distance_from_user": 3,
            "likes": null,
            "comments": null,
            "views": null,
            "created_at": "2023-12-18T04:59:20.000Z",
            "updated_at": "2023-12-18T04:59:20.000Z"
        }
    ]
}
```
- **Get Publish by ID**
<pre>GET /publish/id</pre>
Authorization: Token
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "Success grab data Publish",
    "data": [
        {
            "publish_id": "1amxRhw1pEbwhLcC",
            "profile_id": "csyGqVJ0ZuAztldn",
            "image_publish": "imagepublish.com",
            "price": "15.000.000",
            "supply": "3 TON",
            "grade": "A",
            "description": "Good quality copra",
            "address": "Jln. Kopra",
            "distance_from_user": 3,
            "likes": null,
            "comments": null,
            "views": null,
            "created_at": "2023-12-18T04:59:20.000Z",
            "updated_at": "2023-12-18T04:59:20.000Z"
        }
    ]
}
```
- **Update Publish by ID**
<pre>PUT /publish/id</pre>
<pre>Authorization: Token</pre>
Request Body:
```json
{
    "image_publish": "updateimagepublish.com",
    "price": "15.000.000",
    "supply": "3 TON",
    "grade": "A",
    "description": "Very good quality copra",
    "address": "Jln. Kopra",
    "distance_from_user": 5
}
```
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "Update Publish is success",
    "data": {
        "image_publish": "updateimagepublish.com",
        "price": "15.000.000",
        "supply": "3 TON",
        "grade": "A",
        "description": "Very good quality copra",
        "address": "Jln. Kopra",
        "distance_from_user": 5
    }
}
```


- **Delete Publish by ID**
<pre>DELETE /publish/id</pre>
<pre>Authorization: Token</pre>
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "Success deleted Publish"
}
```
</details>

<details>
<summary>Comment</summary>

- **Create Comment**
<pre>POST /comment</pre>
<pre>Authorization: Token</pre>
Request Body:
```json
{
    "comment_text": "testing comment_text"
}
```
Response Body:
```json
{
    "code": 201,
    "status": "CREATED",
    "message": "Comment added successfully",
    "data": {
        "comment_id": "5YwxSt1LtFAVF260",
        "comment_text": "testing comment_text"
    }
}
```
- **Get All Comment**
<pre>GET /comment</pre>
Authorization: Token
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "success grab data Comment",
    "data": [
        {
            "comment_id": "5YwxSt1LtFAVF260",
            "publish_id": "1amxRhw1pEbwhLcC",
            "profile_id": "csyGqVJ0ZuAztldn",
            "comment_text": "testing comment_text",
            "created_at": "2023-12-18T05:01:36.000Z",
            "updated_at": "2023-12-18T05:01:36.000Z"
        }
    ]
}
```
- **Get Comment by ID**
<pre>GET /comment/id</pre>
<pre>Authorization: Token</pre>
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "Success grab data Comment",
    "data": [
        {
            "comment_id": "5YwxSt1LtFAVF260",
            "publish_id": "1amxRhw1pEbwhLcC",
            "profile_id": "csyGqVJ0ZuAztldn",
            "comment_text": "testing comment_text",
            "created_at": "2023-12-18T05:01:36.000Z",
            "updated_at": "2023-12-18T05:01:36.000Z"
        }
    ]
}
```
- **Update Comment by ID**
<pre>PUT /comment/id</pre>
<pre>Authorization: Token</pre>
Request Body:
```json
{
    "comment_text": "update comment_text"
}
```
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "Update Comment is success",
    "data": {
        "comment_text": "update comment_text"
    }
}
```
- **Delete Comment by ID**
<pre>DELETE /comment/id</pre>
<pre>Authorization: Token</pre>
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "success deleted Comment"
}
```
</details>

<details>
<summary>User</summary>

- **Get All User**
<pre>GET /users</pre>
<pre>Authorization: Token</pre>
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "Success grab data user",
    "data": [
        {
            "username": "Andre",
            "email": "andre@gmail.com"
        }
    ]
}
```
- **Change Password User**
<pre>PUT /users/changePassword</pre>
<pre>Authorization: Token</pre>
Request Body:
```json
{
    "oldPassword": "andre1234",
    "newPassword": "newpasswordandre1234",
    "confirmPassword": "newpasswordandre1234"
}
```
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "change password is success"
}
```
- **Delete User by ID**
<pre>DELETE /users/id</pre>
<pre>Authorization: Token</pre>
Response Body:
```json
{
    "code": 200,
    "status": "OK",
    "message": "User deleted successfully"
}
```

</details>

## Architecture
<a href="">
    <img src="https://drive.google.com/uc?id=1m8yUxhSIOMwwspr_i6NU98MlqGERNXdc" />
 </a>