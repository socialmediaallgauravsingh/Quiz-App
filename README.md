# 🎯 Quiz App – Interactive Multiple-Choice Quiz Platform

This project is a dynamic, user-friendly quiz application designed to test users' knowledge while offering a smooth and interactive experience. The app displays one question at a time, provides instant feedback, tracks scores in real-time, and even saves user progress using local storage. Perfect for educational use, practice tests, or fun quizzes!

## 🧩 Main Features

### 📄 Single Question View
- The quiz displays one question at a time to maintain focus and clarity.
- Each question comes with 4 multiple-choice options for selection.

### 🧠 Answer Submission
- A **Submit** button allows users to confirm their answer before moving on.

### 🧭 Navigation Controls
- Includes **Next ➡️** and **Previous ⬅️** buttons for easy movement between questions.
- The **Previous** button is disabled on the first question, and the **Next** button is disabled on the last to prevent invalid navigation.

### 🏆 Scoring System

#### 📊 Live Score Display
- A live score tracker is visible on the screen, updating as users submit correct answers.

#### 🎨 Answer Feedback
- After submitting an answer:
  - If correct, the selected option turns green ✅.
  - If incorrect, the selected option turns red ❌, and the correct one is highlighted in green ✅.

#### 🏁 Final Score Display
- At the end of the quiz, the app shows the final score along with a message summarizing the user’s performance.

### 🔁 Restart Quiz
- A **Restart Quiz** button allows users to retake the quiz from the beginning, resetting all progress and scores.

### 💾 Local Storage Integration
- 💡 The app uses `localStorage` to:
  - Save current progress, including the current question and score.
  - Allow users to resume the quiz if the page is refreshed or accidentally closed.

## ✨ Tech Stack
- **HTML, CSS, JavaScript (Vanilla)**  
- No frameworks – simple and lightweight  
- Clean and responsive UI
