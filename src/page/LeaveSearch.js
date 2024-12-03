import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveSearch = () => {
  const [leaveRecords, setLeaveRecords] = useState([]); // 연차 신청 내역
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보

  useEffect(() => {
    // 로그인한 사용자 정보 가져오기
    const fetchUserInfo = async () => {
      try {
        const userResponse = await axios.get('http://localhost:3100/session', { withCredentials: true });
        setUserInfo(userResponse.data);
        console.log("내역의 유저정보 ",userResponse)
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
      }
    };

    // 연차 신청 내역 가져오기
    const fetchLeaveRecords = async () => {
      try {
        const leaveResponse = await axios.get(`http://localhost:3100/leave_src`, { withCredentials: true });
        setLeaveRecords(leaveResponse.data);
        console.log("내역의 신청정보 ",leaveResponse)
      } catch (error) {
        console.error("연차 신청 내역을 가져오는 데 실패했습니다.", error);
      }
    };

    fetchUserInfo();
    fetchLeaveRecords();
  }, []);

  return (
    <div className="container">
      <h2>연차 신청 내역</h2>

      {/* 사용자 정보 표시 */}
      <div className="mb-3">
        <label>이름</label>
        <input type="text" className="form-control" value={userInfo?.emp_name || ''} disabled />
      </div>
      <div className="mb-3">
        <label>부서</label>
        <input type="text" className="form-control" value={userInfo?.dept || ''} disabled />
      </div>
      <div className="mb-3">
        <label>직급</label>
        <input type="text" className="form-control" value={userInfo?.position || ''} disabled />
      </div>

      {/* 연차 신청 내역 테이블 */}
      <table className="table">
        <thead>
          <tr>
            <th>연차 시작일</th>
            <th>연차 종료일</th>
            <th>연차 사유</th>
            <th>신청일자</th>
          </tr>
        </thead>
        <tbody>
          {leaveRecords.length > 0 ? (
            leaveRecords.map((record, index) => (
                
              <tr key={index}>
                <td>{new Date(record.request_date).toISOString().split('T')[0]}</td>
                <td>{new Date(record.start_date).toISOString().split('T')[0]}</td>
                <td>{new Date(record.end_date).toISOString().split('T')[0]}</td>
                <td>{record.reason}</td>

                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">연차 신청 내역이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveSearch;
