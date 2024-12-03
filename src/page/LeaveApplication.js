import React, {useState, useEffect} from 'react'
import axios from 'axios';
const LeaveApplication = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:3100/session', { withCredentials: true });
        setUserInfo(response.data);
       
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
      }
    };
  
    fetchUserInfo();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!startDate || !endDate || !reason) {
      alert('시작일, 종료일, 연차사유를 모두 입력해주세요.');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:3100/leave_app',
        {
          emp_id: userInfo?.emp_id, 
          start_date: startDate,
          end_date: endDate,
          reason: reason,
        },
        { withCredentials: true }
      );
  
      if (response.status === 201) {
        alert('연차 신청이 완료되었습니다.');
        setStartDate('');
        setEndDate('');
        setReason('');
      }
    } catch (error) {
      console.error('연차 신청 실패:', error);
      alert('연차 신청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="container">
      <h2>연차 신청</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>이름</label>
          <input type="text" className="form-control" value={userInfo?.emp_name || ''}disabled />
        </div>

        <div className="mb-3">
          <label>부서</label>
          <input type="text" className="form-control"  value={userInfo?.dept || ''} disabled />
        </div>
        <div className="mb-3">
          <label>직급</label>
          <input type="text" className="form-control" value={userInfo?.position || ''}disabled />
        </div>
        <div className="mb-3">
          <label>연차 시작일</label>
          <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>연차 종료일</label>
          <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>연차사유</label>
          <textarea className="form-control" value={reason} onChange={(e) => setReason(e.target.value)} />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">연차 신청</button>
          <button type="button" className="btn btn-secondary ml-2">취소</button>
        </div>
      </form>
    </div>
  );
};

export default LeaveApplication
