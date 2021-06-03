var gamePattern = [];  // global var array to store game pattern
var userClickedPattern = [];  // global var array to store user clicked pattern
var level = 0; // user levels
var gameStarted = false;

var game = () =>{
    
    $(document).on("keypress", ()=>{
        if(!gameStarted){
            startGame();
        }    
    });


};

var startGame = () =>{
    
    gameStarted = true;  
    playGameCard();
  
       
           
    
};




var playSound = (name)=>{    
    $("body").append(`<audio id=sound-${name}> <source src = "sounds/${name}.mp3" type = "audio/mpeg" > </audio>`);
    $(`audio#sound-${name}`)[0].play();};

var animatePress = (currentColor) =>{
    $(`#${currentColor}`).addClass("pressed");
    
    setTimeout(()=> $(`#${currentColor}`).removeClass("pressed"), 100);
} 

var checkAnswer= (currentLevel)=>{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=>playGameCard(),1000);
            userClickedPattern = [];
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(()=>{$("body").removeClass("game-over")},200);
        startOver();
    }

};


var nextSequence = ()=>{
    let randomNumber = Math.floor(Math.random() * 10);
    randomNumber =  (randomNumber % 4);
    console.log("in here");
    level += 1;
    $("h1").text(`Level ${level}`);
    return randomNumber;

};


var playGameCard = ()=>{
    userClickedPattern = [];
    var buttonColours = ["red", "blue", "green", "yellow"];
    var randomChosenColour =  buttonColours[nextSequence()];
    gamePattern.push(randomChosenColour);
    console.log(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);

    

    };



var addOnClickEventListenerOnButton = ()=>{
    $(".btn").on("click", (event)=>{
        let userChosenColor = event.target.getAttribute("id");
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        console.log(userClickedPattern);
        checkAnswer(userClickedPattern.length-1);
    });   

}

var startOver = ()=>{
    gamePattern = [];  // global var array to store game pattern
    level = 0; // user levels
    gameStarted = false;

};


game();
addOnClickEventListenerOnButton();