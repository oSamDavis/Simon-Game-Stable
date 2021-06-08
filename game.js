var gamePattern = []; // global var array to store game pattern
var userClickedPattern = []; // global var array to store user clicked pattern
var level = 0; 
var gameStarted = false;

var game = () => {
  $(document).on("keypress", () => {
    if (!gameStarted) {
      startGame();
    }
  });
};

var startGame = () => {
  gameStarted = true;
  playGameCard();
};

var playSound = (name) => {
  $("body").append(
    `<audio id=sound-${name}> <source src = "sounds/${name}.mp3" type = "audio/mpeg" > </audio>`
  );
  $(`audio#sound-${name}`)[0].play();
};

var animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");

  setTimeout(() => $(`#${currentColor}`).removeClass("pressed"), 100);
};

var checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => playGameCard(), 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
};

var nextSequence = () => {
  let randomNumber = Math.floor(Math.random() * 10);
  randomNumber = randomNumber % 4;
  level += 1;
  $("h1").text(`Level ${level}`);
  return randomNumber;
};

var playGameCard = () => {
  userClickedPattern = [];
  var buttonColours = ["red", "blue", "green", "yellow"];
  var randomChosenColour = buttonColours[nextSequence()];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
};

var addOnClickEventListenerOnCard = () => {
  $(".btn").on("click", (event) => {
    let userChosenColor = event.target.getAttribute("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
};

var startOver = () => {
    // reset variables
  gamePattern = [];
  level = 0; 
  gameStarted = false;
};

game();
addOnClickEventListenerOnCard();