import './App.css';
import { useEffect, useMemo, useState } from 'react';
import Start from './components/Start';
import Timer from './components/Timer';
import Trivia from './components/Trivia';
import { v4 as uuidv4 } from 'uuid';
import { fetchData } from './api/api';

function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState('$ 0');
  const [data, setData] = useState([]);

  useEffect(() => {
  const fetchTriviaData = async () => {
    const response = await fetchData();
    const quizData = [];

    response.results.forEach((questionObj, index) => {
      const { question, correct_answer, incorrect_answers } = questionObj;

      // shuffle the answer choices to create a randomized order
      const allAnswers = [correct_answer, ...incorrect_answers];
      allAnswers.sort(() => Math.random() - 0.5);

      quizData.push({
        id: index + 1,
        question: question,
        answers: [
          {
            text: allAnswers[0],
            correct: allAnswers[0] === correct_answer
          },
          {
            text: allAnswers[1],
            correct: allAnswers[1] === correct_answer
          },
          {
            text: allAnswers[2],
            correct: allAnswers[2] === correct_answer
          },
          {
            text: allAnswers[3],
            correct: allAnswers[3] === correct_answer
          }
        ]
      });
    });

    setData(quizData);
  };
  
  fetchTriviaData();
}, []);
console.log(data, 'data');

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: '$ 100' },
        { id: 2, amount: '$ 200' },
        { id: 3, amount: '$ 300' },
        { id: 4, amount: '$ 500' },
        { id: 5, amount: '$ 1.000' },
        { id: 6, amount: '$ 2.000' },
        { id: 7, amount: '$ 4.000' },
        { id: 8, amount: '$ 8.000' },
        { id: 9, amount: '$ 16.000' },
        { id: 10, amount: '$ 32.000' },
        { id: 11, amount: '$ 64.000' },
        { id: 12, amount: '$ 125.000' },
        { id: 13, amount: '$ 250.000' },
        { id: 14, amount: '$ 500.000' },
        { id: 15, amount: '$ 1.000.000' }
      ].reverse(),
    []
  );
  console.log(data);
  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="main__top">
                  <div className="main__timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="main__bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          <div className="money">
            <ul className="money__list">
              {moneyPyramid.map((m) => (
                <li
                  key={uuidv4()}
                  className={
                    questionNumber === m.id
                      ? 'money__item active'
                      : 'money__item'
                  }
                >
                  <span className="money__number">{m.id}</span>
                  <span className="money__amount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
