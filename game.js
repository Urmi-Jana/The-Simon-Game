buttonColours = ["r", "b", "g", "y"];
gamepattern = [];
userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(event) {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
    else{
        var userChosenColour = String.fromCharCode(event.which);
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);    
        checkAnswer(userClickedPattern.indexOf(userChosenColour));
    }
  });


$(".btn").click( function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);    
    checkAnswer(userClickedPattern.indexOf(userChosenColour));
})


function nextSequence(){
    userClickedPattern = [];
    level = level +1;
    $("h1").text("Level " + level);
    var randomnumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomnumber];
    gamepattern.push(randomChosenColour);   
    

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var audio = new Audio("./sounds/"+ name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamepattern[currentLevel])
       {
        if (userClickedPattern.length === gamepattern.length)
            setTimeout(function(){
                nextSequence()
            }, 1000);
       } 

    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver()
{
    level = 0;
    gamepattern = [];
    started = false;
}