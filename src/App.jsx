import React, { useState, useEffect } from 'react';
import './App.css';

const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: "Blue Whale"
  },
  {
    question: "Which language is used primarily for web development?",
    options: ["Java", "Python", "JavaScript", "C++"],
    correctAnswer: "JavaScript"
  }
];


const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('quizProgress');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};

function App() {
  const savedData = loadFromStorage();
  
  const [currentQuestion, setCurrentQuestion] = useState(savedData?.currentQuestion || 0);
  const [score, setScore] = useState(savedData?.score || 0);
  const [showScore, setShowScore] = useState(savedData?.showScore || false);
  const [answered, setAnswered] = useState(
    savedData?.answered || Array(quizQuestions.length).fill(false)
  );
  const [userAnswers, setUserAnswers] = useState(
    savedData?.userAnswers || Array(quizQuestions.length).fill(null)
  );
  const [selectedOption, setSelectedOption] = useState(savedData?.userAnswers?.[currentQuestion] || "");
  const [isSubmitted, setIsSubmitted] = useState(savedData?.answered?.[currentQuestion] || false);

  // Save 
  useEffect(() => {
    const saveToStorage = () => {
      try {
        const quizProgress = {
          currentQuestion,
          score,
          showScore,
          answered,
          userAnswers
        };
        localStorage.setItem('quizProgress', JSON.stringify(quizProgress));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    };
    
    saveToStorage();
  }, [currentQuestion, score, showScore, answered, userAnswers]);

  const handleOptionSelect = (option) => {
    if (!answered[currentQuestion]) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === quizQuestions[currentQuestion].correctAnswer;
    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = selectedOption;
    setUserAnswers(newUserAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(userAnswers[currentQuestion + 1] || "");
      setIsSubmitted(answered[currentQuestion + 1]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(userAnswers[currentQuestion - 1] || "");
      setIsSubmitted(answered[currentQuestion - 1]);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption("");
    setScore(0);
    setShowScore(false);
    setAnswered(Array(quizQuestions.length).fill(false));
    setUserAnswers(Array(quizQuestions.length).fill(null));
    setIsSubmitted(false);
    localStorage.removeItem('quizProgress');
  };

  const handleFinishQuiz = () => {
    const quizProgress = {
      currentQuestion: 0,
      score: 0,
      answered: Array(quizQuestions.length).fill(false),
      userAnswers: Array(quizQuestions.length).fill(null),
      showScore: true
    };
    localStorage.setItem('quizProgress', JSON.stringify(quizProgress));
    setShowScore(true);
  };

  const getOptionClass = (option) => {
    if (!isSubmitted) return "";
    if (option === quizQuestions[currentQuestion].correctAnswer) {
      return "correct";
    }
    if (option === selectedOption && option !== quizQuestions[currentQuestion].correctAnswer) {
      return "incorrect";
    }
    return "";
  };

  if (showScore) {
    return (
      <div className="quiz-container">
        <div className="score-section">
          <h2>Quiz Completed!</h2>
          <p>Your final score is {score} out of {quizQuestions.length}</p>
          <button onClick={handleRestartQuiz} className="restart-btn">
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="score-display">
        Score: {score}/{quizQuestions.length}
      </div>
      <div className="question-section">
        <div className="question-count">
          <span>Question {currentQuestion + 1}</span>/{quizQuestions.length}
        </div>
        <div className="question-text">
          {quizQuestions[currentQuestion].question}
        </div>
      </div>
      <div className="options-section">
        {quizQuestions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${selectedOption === option ? "selected" : ""} ${getOptionClass(option)}`}
            onClick={() => handleOptionSelect(option)}
            disabled={answered[currentQuestion]}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="navigation-section">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          className="nav-btn"
        >
          Previous
        </button>
        {!answered[currentQuestion] ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="submit-btn"
          >
            Submit
          </button>
        ) : currentQuestion === quizQuestions.length - 1 ? (
          <button onClick={handleFinishQuiz} className="finish-btn">
            Finish Quiz
          </button>
        ) : (
          <button onClick={handleNextQuestion} className="nav-btn">
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default App;