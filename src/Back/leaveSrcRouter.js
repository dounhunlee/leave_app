const express = require('express');
const router = express.Router();

module.exports = (connection) => {

  // 로그인된 사용자 정보 반환 API
  router.get('/', async (req, res) => {
    const empId = req.session.user?.emp_id;  // Optional chaining 사용 // 로그인한 사용자의 ID (세션에서 가져옴)
    console.log("1212req.session ",empId)
    try {
      // 연차 신청 내역을 해당 emp_id로 조회
      const [rows] = await connection.query('SELECT * FROM leave_app WHERE emp_id = ?', [empId]);
      console.log("emp_id rows ",rows)
      // 연차 신청 내역이 없으면 빈 배열을 반환
      if (rows.length === 0) {
        return res.status(404).json({ message: '연차 신청 내역이 없습니다.' });
      }
  
      // 연차 신청 내역을 클라이언트에 반환
      res.json(rows);
    } catch (error) {

      res.status(500).json({ error: '연차 신청 내역을 가져오는 데 실패했습니다.' });
    }
  });
  

  
  


  return router;
};
