import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import play from '../sounds/play.mp3';
import correct from '../sounds/correct.mp3';
import wrong from '../sounds/wrong.mp3';
import { v4 as uuidv4 } from 'uuid';

export default function Trivia({
  data,
  questionNumber,
  setQuestionNumber,
  setTimeOut
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState('main__answer');
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName('main__answer active');
    delay(3000, () => {
      setClassName(a.correct ? 'main__answer correct' : 'main__answer wrong');
    });
    // setTimeout(() => {
    //   setClassName(a.correct ? "answer correct" : "answer wrong");
    // }, 3000);

    // setTimeout(() => {
    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
        // setTimeout(() => {
        //   setQuestionNumber((prev) => prev + 1);
        //   setSelectedAnswer(null);
        // }, 1000);
      } else {
        wrongAnswer();
        delay(1000, () => {
          setTimeOut(true);
        });
        // setTimeout(() => {
        //   setTimeOut(true);
        // }, 1000);
      }
      // }, 5000);
    });
  };
  return (
    <div className="main__trivia">
      <div className="main__question">{question?.question}</div>
      <div className="main__answers">
        {question?.answers.map((a) => (
          <div
            key={uuidv4()}
            className={selectedAnswer === a ? className : 'main__answer'}
            onClick={() => !selectedAnswer && handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}
