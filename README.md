
# HOW ORDER ARE YOU 點餐小幫手  
一起點餐．一起分帳．不再混亂 🍽️  


一個幫助團體點餐時輕鬆紀錄與分帳的應用平台，提供自動彙整訂單、智慧分帳金額、一鍵匯出明細等實用功能，幫助你高效地管理訂單，讓你不再為結帳而煩惱。

立刻開始簡化你的點餐過程，無論是公司部門聚餐、朋友外送合點，**How Order Are You** 都能讓你不再手忙腳亂。！

-

## ✨ 核心功能特色

- 🧾 **自動彙整訂單**：誰點什麼一目了然  
- 💸 **智慧分帳金額**：自動算出每人該付多少  
- 📤 **一鍵匯出明細**：匯出整單資料
- 🖱️ **靈活切換付款狀態**：手動標註付款情況，隨時更新付款狀態。


### 其他功能：


🔐 **建立揪團、設定密碼**，讓你的團體訂單更安全。

✍️ **自由輸入點餐名稱與金額**，靈活定制自己的點餐流程。

📊 **團體訂單自動統計**，支援依人或依品項分類顯示。

📝 **簡單的註冊、登入、修改個人資料**，讓每個使用者都能輕鬆管理自己的帳戶。

💌 **忘記密碼？** 系統會自動通過電子郵件發送重設連結。




## 🛠️ 技術架構

### 🔹 前端 (Frontend)

- **框架**：Next.js
- **樣式處理**：Tailwind CSS

### 🔸 後端 (Backend)

- **框架**：Node.js + Express
- **資料庫**：MySQL
- **認證**：JWT (JSON Web Token)


## 🧱 專案結構


### 1. 前端 (`order-front`)

- **技術棧**：Next.js, Tailwind CSS, GSAP
- **功能簡介**：
  - 採用 Next.js 構建 React 前端。
  - Tailwind CSS 實現高效開發與 RWD。
  - 使用 GSAP 流暢的動畫效果，提升使用者體驗。
  
  📍 預設運行端口：`http://localhost:3000`

--
### 2. 後端 (`order-back`)

- **技術棧**：Node.js, Express, MySQL
- **功能簡介**：
  - 提供 RESTful API，處理開團及訂單建立、更新、查詢、刪除。
  - 實作揪團密碼保護、點餐內容儲存、自動結算等功能。
  - 資料庫採用 MySQL 管理所有訂單與使用者資料。

  📍 預設運行端口：`http://localhost:3001`

--

## 📦 安裝與執行方式

### 1️⃣ 下載專案

1. 前端：`https://github.com/yijing0310/order-front`
2. 後端：`https://github.com/yijing0310/order-back`

### 2️⃣ 前端安裝與啟動

```bash
cd order-front
npm install
npm run dev
```


### 3️⃣ 後端安裝與啟動

```bash
cd order-back
npm install
npm run dev
```

##  🧩 資料庫建置

###  1️⃣ 匯入資料庫

在開始之前，你需要創建資料庫。請按照以下步驟操作：

- 前往後端的 `database` 資料夾，並匯入 `order.sql`資料庫文件（MySQL）來創建資料表和初始化數據。

```bash
cd order-back
npm install
npm run dev
```
###  2️⃣  環境變數設定
請依照以下方式設定環境變數：

1. 複製 .env 檔案範例：

```bash
cp sample.env dev.env
```

2. 填寫 .env 檔案中的內容：

```bash
WEB_PORT=3001

DB_HOST=127.0.0.1
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=how_order

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password    # ⚠️ 請至信箱帳戶中的「應用程式密碼」取得，不能使用一般登入密碼

JWT_KEY=your_secret_key
```

### 3️⃣ 後端重新啟動
設置完成後，重新啟動後端服務，並確認一切運行正常。

##  ✅  完成開發環境
完成上述步驟後，你的開發環境已經設置完成，並且 前端 和 後端 服務已經可以正常運行。現在，你可以開始享受無縫的點餐與分帳體驗！🚀