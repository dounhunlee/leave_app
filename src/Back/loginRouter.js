const express = require('express');
const router = express.Router();


module.exports = (connection) => {
    

    // 로그인 처리
    router.post('/', async (req, res) => {
      const { id, pwd } = req.body;
      console.log("로그인 시 사용자가 입력한 id, pw 정보", req.body);
      
    
      // SQL 쿼리 실행
      const [result] = await connection.query(`
        SELECT * FROM emp_info WHERE CONCAT(emp_name, emp_id) = ? AND emp_pwd = ?`, [id, pwd]);

      if (result.length > 0) {
          const user = result[0];
          
          // 세션에 사용자 정보 저장
          req.session.user = user ;
            
          console.log("세션에 저장된 사용자 정보:", req.session);  // 세션 정보 출력 확인
          res.status(200).json({ message: '로그인 성공' });
      } else {
        res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
      }
 
  });



    return router; 
};
