const readlineSync = require("readline-sync");

// Questions array
const questions = [
  {
    question: "What is the capital of France?",
    options: ["1. Paris", "2. London", "3. Berlin", "4. Madrid"],
    answer: 1,
  },
  {
    question:
      "Which programming language is known as the backbone of web development?",
    options: ["1. Python", "2. JavaScript", "3. C++", "4. Java"],
    answer: 2,
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: [
      "1. Harper Lee",
      "2. J.K. Rowling",
      "3. Mark Twain",
      "4. Charles Dickens",
    ],
    answer: 1,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

// Function to display a question and handle user input
function askQuestion(questionObj) {
  console.log(`\nQuestion: ${questionObj.question}`);
  questionObj.options.forEach((option) => console.log(option));

  let timeLeft = 10;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      console.log(`⏳ Time left: ${timeLeft}s`);
      timeLeft--;
    } else {
      console.log("\n⏰ Time is up!");
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);

  // Handle user input asynchronously
  setTimeout(() => {
    const userAnswer = readlineSync.question("\nEnter your answer (1-4): ");
    clearInterval(timer);

    // Validate input
    if (parseInt(userAnswer) === questionObj.answer) {
      console.log("✅ Correct!");
      score++;
    } else if (userAnswer >= 1 && userAnswer <= 4) {
      console.log("❌ Wrong answer!");
    } else {
      console.log("⚠️ Invalid input!");
    }

    nextQuestion();
  }, 500); // Adding slight delay for smooth user input handling
}

// Function to move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    askQuestion(questions[currentQuestionIndex]);
  } else {
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  console.log("\n🎉 Quiz Finished!");
  console.log(`Your final score is: ${score}/${questions.length}`);
  process.exit(); // Exit the program
}

// Start the quiz
console.log("📚 Welcome to the Quiz Application!");
askQuestion(questions[currentQuestionIndex]);
