import React, { createRef, useEffect, useState } from 'react';
import styles from './option.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import Questions from '../../common/api/questionsApi/../questionsApi';

const Options = () => {
  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(1);
  const slideRef = createRef(null);
  const TOTAL_SLIDES = 12;
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bestName = searchParams.get('bestName');
  const worstName = searchParams.get('worstName');
  const [mbti, setMbti] = useState([]);

  const nextSlideFir = () => {
    setMbti(mbti + Questions[num].answers[0].type);
    setNum(num + 1);
    setCurrentSlide(currentSlide + 1);
    slideRef.current.style.transform += 'translateX(-100vw)';
  };

  const nextSlideSec = () => {
    setMbti(mbti + Questions[num].answers[1].type);
    setNum(num + 1);
    setCurrentSlide(currentSlide + 1);
    slideRef.current.style.transform += 'translateX(-100vw)';
  };

  const mbtiChecker = () => {
    setLoading(true);
    let map = {};
    let result = [];
    for (let i = 0; i < mbti.length; i++) {
      if (mbti[i] in map) {
        map[mbti[i]] += 1;
      } else {
        map[mbti[i]] = 1;
      }
    }
    for (let count in map) {
      if (map[count] >= 2) {
        result.push(count);
      }
    }

    setTimeout(() => {
      const examResult = result.join('');
      history.push(`/result/${examResult}`);
    }, 3000);
  };

  useEffect(() => {
    currentSlide > TOTAL_SLIDES && mbtiChecker();
  }, [currentSlide]);

  const goBack = () => {
    history.push('/');
  };

  return (
    <div>
      <section className={styles.container}>
        <button className={styles.goback_button} onClick={goBack}>
          <img className={styles.back_btn} src="img/back_icon.png" />
          &nbsp;&nbsp;전현무 TEST
        </button>

        {!loading && (
          <>
            <div className={styles.slider} ref={slideRef}>
              {Questions.map((item, index) => {
                let question;
                if (num === 0) {
                  question = "내가 친구들을 만나러 같이 가자고 했을 때 \n" + "  '" + bestName + "' " + "은/는?";
                } else if (num === 2) {
                  question = "'" + bestName + "' " + "이/가 여름에 가자고 했던 데이트는?";
                } else if (num === 1) {
                    question = "크리스마스 데이트 때 " + " '" + bestName + "' " + "은/는?";
                  }
                  else if (num === 3) {
                    question = "영화를 보고 나왔을때 " +  "'" + bestName + "' " + "의 영화평은?";
                  }
                  else if (num === 4) {
                    question = "'" + bestName + "' " + "이/가 선호했던 대화는?";
                  }
                  else if (num === 5) {
                    question = "'" + bestName + "' " + "이/가 추천해주던 노래는?";
                  }
                  else if (num === 6) {
                    question = "마음이 식었을때" + "' " + worstName + "'"  + "은/는?";
                  }
                  else if (num === 7) {
                    question = "'" + worstName + "' " + "(이)랑 첫 눈을 봤을때 최악의 멘트는?";
                  }
                  else if (num === 8) {
                    question = "우리가 싸울때" +" '" + worstName + "' "  +  "은/는?";
                  }
                  else if (num === 9) {
                    question = "'" + worstName + "' "  +  "과/와 한 최악의 여행은?";
                  }
                  else if (num === 10) {
                    question = "'" + worstName + "' "  +  "이/가 준 최악의 생일 선물은?";
                  }
                  else if (num === 11) {
                    question = "데이트 약속 시간에 " + "'" + worstName + "' "   + "은/는?";
                  }

                return (
                  <div className={styles.content} key={item.id}>
                    <div className={styles.top}>
                      <div className={styles.mbti__counter}>
                        <span className={styles.mbti__progress__color}>
                          {currentSlide}
                        </span>
                        <span className={styles.mbti__end__color}>
                          /{TOTAL_SLIDES}
                        </span>
                      </div>
                      <h1 className={styles.mbti__question}>{question}</h1>
                    </div>
                    <img
                      className={styles.logo}
                      src={item.id >= 7 ? 'img/angry.png' : 'img/angel.png'}
                      alt="전현무"
                    />
                    <article className={styles.mbti__btn__box}>
                      <button
                        className={styles.mbti__button}
                        onClick={nextSlideFir}
                      >
                        {item.answers[0].content}
                      </button>
                      <button
                        className={styles.mbti__button}
                        onClick={nextSlideSec}
                      >
                        {item.answers[1].content}
                      </button>
                    </article>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {loading && (
          <div className={styles.loading__container}>
            <h5 className={styles.ticket_font}>
              당신의 짝을 찾는 중 입니다
            </h5>
            <div className={styles.ticket_div}>
              <img
                className={styles.ticket}
                src="img/love.png"
                alt="ticket"
              />
            </div>
            <div className={styles.loading}></div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Options;
