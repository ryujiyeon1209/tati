import React,{useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import style from './ApplyStudy.module.css'
import { useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';

export default function ApplyStudy(){

  const navigate = useNavigate();

  // 신청한 스터디 목록
  const [applyStudy, setApplyStudy] = useState([])
  const handleButtonClick = (tab) => {
    navigate(tab);
  };

  const tokenInfo = localStorage.getItem('decodedToken');
  console.log(JSON.parse(tokenInfo));
  const parseJwt = JSON.parse(tokenInfo);

  // 가입한 스터디 ======================================================================================

  console.log(`memberId - ${parseJwt.memberId}`)
  useEffect(() => {

    console.log(process.env.REACT_APP_URL)
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/application-list/${parseJwt.memberId}`,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
        RefreshToken: localStorage.getItem('refreshtoken')
      }
    })
      .then((res) => {
        console.log('신청한스터디=================================')
        console.log(res.data);
        setApplyStudy(res.data)
        console.log('==============================')
      })
      .catch((err) => {
        console.log(err,'신청한스터디 ------------------');
      });

  },[])


  //studyApplicantId- int,studyName - StringtotalMember - int,currentMemberCount - int
  // 가입한 스터디 ======================================================================================

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const NoticeItem = ({ studyApplicantId, studyName, totalMember, currentMemberCount }) => {
    const handleItemClick = () => {
      navigate(`/Study/${studyApplicantId}`);
    };
    return (
      <div>
        <div className={style.ApplyStudy_box}>
          <p className={style.ApplyStudy_text}><h2  className={style.studyName} onClick={handleItemClick}>{studyName}</h2>
          <span role="img" aria-label="writing hand">👥 {currentMemberCount}/{totalMember} </span>
          </p>
          <hr className={style.Study_hr}/>
        </div>
      </div>
    );
  };
  


  //====================================================
  const handlePageClick = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.max(Math.ceil(applyStudy.length / itemsPerPage), 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = applyStudy.slice(startIndex, endIndex);

  return(
    <div className={style.point}>

      <div className={style.JoinStudy_box}>

        <nav className={style.point_nav_btn}>
          <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/JoinStudy")}>가입된 스터디</button>
          <button className={`${style.nav_blue} ${style.nav_btn}`} onClick={() => handleButtonClick("/MyPage/ApplyStudy")}>신청한 스터디</button>
          <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/MyPagePost")}>내 작성글</button>
        </nav>

        <div className={style.content}>


          <div className={style.point_History_box}>
          
          <div className={style.studyItem_box}>
          {applyStudy.length === 0 ? (
                <p className={style.ApplyStudy_text_box}>스터디를 신청해주세요!</p>
              ) : (
                <div className={style.box}>
                  {currentNotices.map((notice, index) => (
                    <NoticeItem
                      key={index}
                      studyApplicantId={notice.studyApplicantId}
                      studyName={notice.studyName}
                      totalMember={notice.totalMember}
                      currentMemberCount={notice.currentMemberCount}
                    />
                  ))}
                </div>
              )}
              </div>

              <div className={style.pagination}>
              <Button className="pagination_button" onClick={handlePrevClick} disabled={currentPage === 1}>
                  이전
                </Button>
                <span style={{ 
                  marginTop: '3px',
              }}>
                {currentPage}/{totalPages}
                </span>
                <Button className="pagination_button" onClick={handleNextClick} disabled={currentPage === totalPages}>
                  다음
                </Button>
              </div>
        </div>

        </div>
      </div>
    </div>
  )
}