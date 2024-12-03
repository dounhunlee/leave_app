const express = require('express');
const router = express.Router();
module.exports = (connection) => {
// 로그인된 사용자 정보 반환 API
router.get('/', (req, res) => {
  const user = req.session.user;  // 세션에서 사용자 정보 가져오기
 // console.log("leave :: ",user)
  
  if (user) {
    res.json({
      emp_id: user.emp_id,
      emp_name: user.emp_name,
      dept: user.dept,
      position: user.position
    });
  } else {
    res.status(401).json({ message: 'User not logged in' });
  }
});

return router;
}
