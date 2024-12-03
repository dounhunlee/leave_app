const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql2/promise');
const axios = require("axios");
require('dotenv').config();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', // React 주소 (React가 3000번 포트에서 실행)
    credentials: true,  // 쿠키를 전송 설정
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 세션 설정
app.use(session({
  secret: 'my_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,  
    secure: false,   
    maxAge: 1000 * 60 * 60 * 24, 
  },
}));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

async function initializeDatabase() {
  try {
    const pool = mysql.createPool({
      host: process.env.SERVER,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: parseInt(process.env.PORT),
    });

    console.log('데이터베이스 연결 성공');
    return pool;
  } catch (err) {
    console.error('데이터베이스 연결 실패:', err.message);
    process.exit(1);
  }
}

// 서버 시작
async function startServer() {
  const connection = await initializeDatabase();




  const loginRouter = require('./src/Back/loginRouter');
  app.use('/login', loginRouter(connection));

  const leaveRouter = require('./src/Back/leaveRouter');
  app.use('/leave_app', leaveRouter(connection));

  const sessionRouter = require('./src/Back/sessionRouter');
  app.use('/session', sessionRouter(connection));

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer();
