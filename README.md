# 🍀 SQL Performance Test & AI Optimization Tool

## Overview
This is a web tool that allows developers and data analysts to:
- Measure SQL query execution time and visualize it with charts
- Analyze execution plan (EXPLAIN)
- Summarize resource usage including EXPLAIN-based estimated rows
- Get optimization suggestions using generative AI(Gemini)

This project is built using **Node.js**, **MySQL**, **Chart.js**, and **Gemini AI API**.

---

## Features

###  SQL Execution Test
- Submit a SQL query and see execution time
- Chart visualization

###  Execution Plan (EXPLAIN)
- Displays table access type, keys, rows, and extra info using EXPLAIN in SQL
- Easily view the summary presented in a table
- View comments regarding the plan

### Resource Summary Card
- View DB-level metrics like:
  - Query Cost (Estimated)
  - Handler Read Key
  - EXPLAIN Total Estimated Rows

### AI Query Optimization (Gemini)
- Ask Gemini to suggest better SQL queries

### Example Data and queries
- Can test this tool by using random queries

---

## How to Run
1. **Install dependencies**
```
npm install express body-parser mysql2 dotenv axios
```

2. **Set up `.env` file**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=performance_tool_db
GEMINI_API_KEY=your_gemini_api_key
```

3. Download example data and queries
```
node data/initAdvancedData.js
```

3. **Start the server**
```
node server.js
```

4. **Open in browser**
```
http://localhost:3000
```

---

## Folder Structure
```
.
├── README.md
├── data
│   └── initAdvancedData.js
├── db
│   └── index.js
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── routes
│   ├── aiSuggest.js
│   ├── explain.js
│   └── queryTest.js
└── server.js
```

---

## Contact
Contact chole02.han@gmail.com for further questions!

---
## More Information
https://velog.io/@jiiiiin02/SQL-Performance-Tool-%EC%A0%9C%EC%9E%91%EA%B8%B0

