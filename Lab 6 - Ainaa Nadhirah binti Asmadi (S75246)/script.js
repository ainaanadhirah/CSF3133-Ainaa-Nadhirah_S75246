// Wait for HTML to fully load before running quiz code
document.addEventListener("DOMContentLoaded", function () {
  // Questions Array
  const questions = [
    {
      text: "Which HTML tag is used to link an external CSS file?",
      options: ["<link>", "<style>", "<script>", "<css>"],
      answer: 0
    },
    {
      text: "Which CSS property changes the text color?",
      options: ["font-style", "background-color", "color", "text-decoration"],
      answer: 2
    },
    {
      text: "Which keyword declares a variable in JavaScript?",
      options: ["int", "var", "define", "letvar"],
      answer: 1
    },
    {
      text: "Where should the JavaScript file usually be linked in HTML?",
      options: ["Inside <head>", "Before </body>", "Before <html>", "Inside a <p>"],
      answer: 1
    }
  ];

  // Global state
  let shuffledQuestions = [];
  let currentIndex = 0;
  let score = 0;
  let timeLeft = 15;
  let timerId = null;

  // DOM elements
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const feedback = document.getElementById("feedback");
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const scoreDisplay = document.getElementById("score");
  const totalQuestionsDisplay = document.getElementById("total-questions");
  const timeLeftSpan = document.getElementById("time-left");
  const questionNumberDisplay = document.getElementById("question-number");

  // shuffleQuestions()
  function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [
        shuffledQuestions[j],
        shuffledQuestions[i]
      ];
    }
  }

  // startTimer()
  function startTimer() {
    clearInterval(timerId);
    timeLeft = 15;
    timeLeftSpan.textContent = timeLeft;
    timerId = setInterval(() => {
      timeLeft--;
      timeLeftSpan.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerId);
        feedback.textContent = "Time is up!";
        feedback.className = "incorrect";
        disableOptions();
        nextBtn.disabled = false;
      }
    }, 1000);
  }

  // displayQuestion()
  function displayQuestion() {
    const q = shuffledQuestions[currentIndex];
    questionText.textContent = q.text;
    optionsContainer.innerHTML = "";

    q.options.forEach((opt, idx) => {
      const button = document.createElement("button");
      button.className = "option-btn";
      button.textContent = opt;
      button.dataset.index = idx;
      button.addEventListener("click", () => checkAnswer(idx));
      optionsContainer.appendChild(button);
    });

    feedback.textContent = "";
    feedback.className = "";
    startBtn.disabled = true;
    nextBtn.disabled = true;
    questionNumberDisplay.textContent = `Question ${currentIndex + 1}`;
  }

  // helper: disable all option buttons
  function disableOptions() {
    const buttons = optionsContainer.querySelectorAll(".option-btn");
    buttons.forEach(btn => {
      btn.disabled = true;
    });
  }

  // checkAnswer()
  function checkAnswer(selectedIndex) {
    clearInterval(timerId);
    const correctIndex = shuffledQuestions[currentIndex].answer;

    const buttons = optionsContainer.querySelectorAll(".option-btn");
    buttons.forEach((btn, idx) => {
      if (idx === correctIndex) {
        btn.classList.add("correct");
      } else if (idx === selectedIndex && idx !== correctIndex) {
        btn.classList.add("wrong");
      }
      btn.disabled = true;
    });

    if (selectedIndex === correctIndex) {
      score++;
      feedback.textContent = "Correct!";
      feedback.className = "correct";
    } else {
      feedback.textContent = "Incorrect.";
      feedback.className = "incorrect";
    }

    scoreDisplay.textContent = score;
    nextBtn.disabled = false;
  }

  // nextQuestion()
  function nextQuestion() {
    currentIndex++;
    if (currentIndex >= shuffledQuestions.length) {
      clearInterval(timerId);
      questionText.textContent = "Quiz finished!";
      optionsContainer.innerHTML = "";
      feedback.textContent = `Your final score is ${score}/${shuffledQuestions.length}`;
      feedback.className = "";
      startBtn.disabled = true;
      nextBtn.disabled = true;
      totalQuestionsDisplay.textContent = shuffledQuestions.length;
      return;
    }
    displayQuestion();
    startTimer();
  }

  // startQuiz()
  function startQuiz() {
    shuffleQuestions();
    currentIndex = 0;
    score = 0;
    scoreDisplay.textContent = "0";
    totalQuestionsDisplay.textContent = questions.length;
    displayQuestion();
    startTimer();
  }

  // Event listeners
  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", nextQuestion);
});
