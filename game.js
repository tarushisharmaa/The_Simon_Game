var buttonColours=["red","blue","green","yellow"];
var gamePattern = [];
//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  //console.log(userClickedPattern);
  animatePress(userChosenColour);

   //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
   checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    
      if(gamePattern.length === userClickedPattern.length){

          setTimeout(function(){
              nextSequence();
          },1000);
      }
  }
  else{
      playSound("wrong");
     
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function(){
          $("body").removeClass("game-over")},200
      );
      startOver();
  }
}

function nextSequence(){

    userClickedPattern=[];

  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

    var randomNumber= Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];

gamePattern.push(randomChosenColour);
//1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
  
}

function playSound(name){
//3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
var audio = new Audio("sounds/" + name + ".mp3");
audio.play();
}
function animatePress(currentColour){

//2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
$("#" + currentColour).addClass("pressed");

//3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
setTimeout(function () {
  $("#" + currentColour).removeClass("pressed");
}, 100);
}


function startOver(){

    level = 0;
    gamePattern = [];
    started = false;
}