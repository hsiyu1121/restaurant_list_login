# 我的餐廳清單_登入版(2020/08/23)

使用Node.js, Express, Express-handlebars, mongodb 套件製作而成

![Alt text](https://github.com/hsiyu1121/restaurant_list_login/blob/master/restaurant_list_login.png)

## 功能清單
* 使用者可以註冊自己的帳號 (new)
* 使用者操作錯誤，會給予適當的回應 (new)
* 使用者可以透過 Facebook Login 直接登入 (new)
* 使用者可以建立並管理自己的餐廳清單 (new)
* 點選"我的餐廳清單"即可重新整理
* 可以透過搜尋店家名稱，找到自己要的餐廳
* 使用者可以新增一家餐廳
* 使用者可以瀏覽一家餐廳的詳細資訊
* 使用者可以瀏覽全部所有餐廳
* 使用者可以修改一家餐廳的資訊
* 使用者可以刪除一家餐廳
* 根據餐廳名稱、類型與評分可排列順序
* 根據餐廳名稱、類型與評分可搜尋相關資訊

## 環境需求
* Node.js: v10.15.0
* express: v4.17.1
* mongoose: v5.9.26

## 啟動方式
* 將專案下載至本機內

  ``git clone https://github.com/hsiyu1121/restaurant_list_login.git``
* 切換至資料夾內

  ``cd restaurant_list_login``
* 安裝相關的套件

  ``npm install``
* 建立資料庫

  ``npm run seed``
* 透過node執行程式

  ``npm run start``
* 透過nodemno執行程式

  ``npm run dev``
* 開啟瀏覽器輸入以下網址

  ``http://localhost:3000``
  
## 更改檔名 .env.example
 請將此檔案更名為 .env ，將可以順利運作。
  

## 測試帳號密碼清單
<table>
  <tr>
    <td>Email</td>
    <td>Password</td>
  </tr>
  <tr>
    <td>user1@example.com</td>
    <td>12345678</td>
  </tr>
    <tr>
    <td>user2@example.com</td>
    <td>12345678</td>
  </tr>
</table>
