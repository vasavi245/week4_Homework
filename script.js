var submitBtn = document.querySelector("button.submitBtn");

var secondsRemaining = questions.length * 10 + 1;

var timerEl = document.getElementById("timer");

var submitScoreEl = document.querySelector("#submit-score");

var userScoreEl = document.getElementById("user-score");

var userNameInput;

var questionHead = document.getElementById("questions");

var answerChoices = document.getElementById("answers");

var answer;

var title = questions[title];

var questionNumber = -1;

var startBtn = document.getElementById("start-btn");

var startPage = document.getElementById("startpage");

function startTimer() {
  startPage.style.display = "none";

  document.getElementById("quiz").classList.remove("d-none");

  // timer begins
  setTimer();

  // create questions to display

  displayQuestions();
}

function setTimer() {
  var countdown = setInterval(function() {
    secondsRemaining--;

    timerEl.textContent = "Time: " + secondsRemaining;

    if (secondsRemaining <= 0 || questionNumber > questions.length) {
      clearInterval(countdown);

      setTimeout(displayScore, 500);
    }
  }, 1000);
}
//display questions in the div

function displayQuestions() {
  ++questionNumber;
  console.log(questionNumber);
  if (questionNumber < questions.length) {
    answer = questions[questionNumber].answer;

    questionHead.textContent = questions[questionNumber].title;

    answerChoices.innerHTML = "";

    var choices = questions[questionNumber].choices;

    for (var q = 0; q < choices.length; q++) {
      var nextChoice = document.createElement("button");

      nextChoice.textContent = choices[q];

      answerBtn = answerChoices
        .appendChild(nextChoice)
        .setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }
  } else {
    displayScore();
  }
}

function displayScore() {
  document.getElementById("quiz").classList.add("d-none");

  document.getElementById("submit-score").classList.remove("d-none");

  userScoreEl.textContent = "Your final score is " + secondsRemaining + ".";
}

// Event Listeners for Main Buttons

startBtn.addEventListener("click", startTimer);

submitBtn.addEventListener("click", function(event) {
  event.stopPropagation();

  getScore();

  window.location.href = "highscore.html";
});

function getScore() {
  var userNameInput = document.getElementById("userName").value;

  var newScore = {
    name: userNameInput,
    score: secondsRemaining
  };
  // check if there are scores in local storage first(get it)

  //if not, make a new/blank array

  var fromls = localStorage.getItem("highScores");
  var highScores = [];
  if (fromls != undefined) {
    highScores = JSON.parse(fromls);
  }

  //var highScores = JSON.parse(localStorage.getItem("highScores"));

  // push object into score array

  highScores.push(newScore);

  // turn objects into an array of strings then put it into local storage

  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function hideFeedback() {
  var pEl = document.getElementsByClassName("feedback")[0];

  pEl.style.display = "none";
}

function showFeedback() {
  var pEl = document.getElementsByClassName("feedback")[0];

  pEl.removeAttribute("style");
}

answerChoices.addEventListener("click", function(event) {
  var pEl = document.getElementsByClassName("feedback")[0];

  // evaluation of user's answer choices & feedback

  if (answer === event.target.textContent) {
    pEl.innerHTML = "Correct!";

    setTimeout(hideFeedback, 1000);

    showFeedback();
  } else {
    pEl.innerHTML = "Sorry, that's incorrect.";

    setTimeout(hideFeedback, 1000);

    secondsRemaining = secondsRemaining - 10;

    showFeedback();
  }

  displayQuestions();
});
