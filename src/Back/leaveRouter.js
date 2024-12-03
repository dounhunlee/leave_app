const express = require('express');
const router = express.Router();

module.exports = (connection) => {
  // 연차 신청 API
  router.post('/', async (req, res) => {
    const { emp_id, start_date, end_date, reason } = req.body; // 클라이언트에서 전달된 데이터
    const request_date = new Date().toISOString().split('T')[0]; // 현재 날짜를 YYYY-MM-DD 형식으로 저장
    const status = '대기'; // 신청 상태 기본값

    try {
      const query = `
        INSERT INTO leave_app (emp_id, request_date, start_date, end_date, reason, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [result] = await connection.execute(query, [
        emp_id,
        request_date,
        start_date,
        end_date,
        reason,
        status,
      ]);

      res.status(201).json({ message: '연차 신청 성공', request_id: result.insertId });
    } catch (error) {
      console.error('연차 신청 실패:', error);
      res.status(500).json({ message: '연차 신청 실패', error: error.message });
    }
  });

  return router;
};
