import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios 설치 필요
import { useNavigate } from 'react-router-dom';

const Login = ({setAuthenticate}) => {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();


  // 이미 로그인 상태라면 홈으로 리다이렉트
  useEffect(() => {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      navigate('/'); // 홈으로 리다이렉트
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3100/login', { id, pwd }, { withCredentials: true });
        console.log(response.data.message)
        if (response.data.message === '로그인 성공') {
          sessionStorage.setItem('isAuthenticated', 'true');
          setAuthenticate(true);
            navigate('/');
          } 
        // 로그인 성공 후 원하는 페이지로 리다이렉트
      } catch (error) {
        if (error.response) {
          // 서버에서 응답이 왔을 때
          console.error('로그인 실패:', error.response.data);
          console.error('응답 상태 코드:', error.response.status);  // 상태 코드 확인
          

          if (error.response.status === 401) {
            alert("아이디 또는 비밀번호가 잘못되었습니다.");
          }

        } else if (error.request) {
          // 요청은 갔으나 응답이 없을 때
          console.error('응답이 없습니다. 서버를 확인하세요.');
       
        } else {
          // 그 외의 오류
          console.error('에러 발생:', error.message);
       
        }
      }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">아이디</label>
          <input
            type="text"
            id="id"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">비밀번호</label>
          <input
            type="password"
             id="pwd"
            className="form-control"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">로그인</button>
      </form>
      
    </div>
  );
};

export default Login;