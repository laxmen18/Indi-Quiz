const questions = [
  {
      question: "Which game is known for its battle royale mode?",
      answers: ["Call of Duty", "Minecraft", "Fortnite", "FIFA"],
      correctAnswer: 2
  },
  {
      question: "What does NPC stand for in gaming?",
      answers: ["Non-Playable Character", "National Playing Championship", "New Player Character", "Next-Gen PC"],
      correctAnswer: 0
  },
  {
      question: "In the game Minecraft, what do you use to mine blocks?",
      answers: ["Sword", "Axe", "Pickaxe", "Shovel"],
      correctAnswer: 2
  },
  {
      question: "Which gaming console is manufactured by Sony?",
      answers: ["Xbox", "PlayStation", "Nintendo Switch", "PC"],
      correctAnswer: 1
  },
  {
      question: "What is the main objective of the game Among Us?",
      answers: ["Complete tasks", "Defeat the impostors", "Collect coins", "Build structures"],
      correctAnswer: 0
  }
];

let currentQuestionIndex = 0;
let score = 0; // Initialize score to 0
let timer;

function startTimer() {
  let timeLeft = 10;
  document.getElementById("timer").textContent = `Time Left: ${timeLeft}`;
  timer = setInterval(() => {
      timeLeft--;
      if (timeLeft >= 0) {
          document.getElementById("timer").textContent = `Time Left: ${timeLeft}`;
      }
      if (timeLeft === 0) {
          clearInterval(timer);
          checkAnswer(-1); // Timeout, check as incorrect
      }
  }, 1000);
}

function displayQuestion() {
  const questionText = document.getElementById("question-text");
  const options = document.querySelectorAll(".option");

  questionText.textContent = questions[currentQuestionIndex].question;

  for (let i = 0; i < options.length; i++) {
      options[i].textContent = questions[currentQuestionIndex].answers[i];
  }
}

function checkAnswer(selectedOption) {
  clearInterval(timer); // Reset the timer
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  const isCorrect = selectedOption === correctAnswer;

  if (isCorrect) {
      playSound(true);
      score++; // Increment the score for a correct answer
  } else {
      playSound(false);
  }

  displayImage(isCorrect);

  document.querySelectorAll(".option").forEach(option => {
      option.disabled = true;
  });

  document.getElementById("next-button").style.display = "block";
  document.getElementById("score").textContent = `Score: ${score}`; // Update the displayed score
}

function playSound(isCorrect) {
  const sound = document.getElementById(isCorrect ? "correct-sound" : "incorrect-sound");
  sound.currentTime = 0;
  sound.play();
}

function displayImage(isCorrect) {
  const imageUrl = isCorrect ? "correct-image.png" : "incorrect-image.png";
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<img src="${imageUrl}" alt="${isCorrect ? 'Correct' : 'Incorrect'}">`;
}

function nextQuestion() {
  currentQuestionIndex++;
  document.querySelectorAll(".option").forEach(option => {
      option.disabled = false;
  });

  document.getElementById("next-button").style.display = "none";
  document.getElementById("result").innerHTML = "";

  if (currentQuestionIndex < questions.length) {
      displayQuestion();
      startTimer();
  } else {
      endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer); // Clear the timer when the quiz ends
  document.querySelectorAll(".option").forEach(option => {
      option.disabled = true;
  });
  document.getElementById("next-button").style.display = "none"; // Hide the "Next" button
  document.getElementById("restart-button").style.display = "block"; // Show the "Restart" button
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0; // Reset the score to 0 when restarting
  displayQuestion();
  document.querySelectorAll(".option").forEach(option => {
      option.disabled = false;
  });
  document.getElementById("next-button").style.display = "none";
  document.getElementById("restart-button").style.display = "none"; // Hide the "Restart" button
  document.getElementById("result").innerHTML = "";
  document.getElementById("score").textContent = `Score: ${score}`; // Update the displayed score
  startTimer();
}

displayQuestion();
startTimer();
