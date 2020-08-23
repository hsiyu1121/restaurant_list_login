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

## 環境變數設定
* 在資料夾的根目錄建立 ``.env``
* 檔案內的變數如下：
  
  ``MONGODB_URI=mongodb://localhost/restaurant``
  
  ``FACEBOOK_ID=[應用程式編號]``
  
  ``FACEBOOK_SECRET=[應用程式密鑰]``
  
  ``FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback``
  
  ``SESSION_SECRET=[自行定義一段字串]``
  
  ``PORT=3000``

* 其中[應用程式編號]和[應用程式密鑰] 是由 [facebook for developers](https://developers.facebook.com/) 取得
* 在"facebook for developers" 左上角「我的應用程式」裡找到「新增應用程式」的按鈕，為你的應用程式取個名字
* 選擇 "Facebook 登入"
* 在左側選單中點選 "設定 > 基本資料"
* 即可以取得相對應的值

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