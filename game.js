var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var lvl=0;
var started=false;

$(document).keypress(function(){
    if(!started){
        //$("#level-title").text("Level "+lvl);
        nextSequence();
        started=true;
    }

});
    
   

$(".btn").click(function(){
        var userChosenColor=$(this).attr("id");
        
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    });
    
    function startOver(){
        gamePattern=[];
        lvl=0;
        started=false;

    }

function nextSequence(){
    userClickedPattern=[];
    lvl++;
    $("#level-title").text("Level "+lvl);
    var randomNumber=Math.floor(Math.random()*4);
    //return randomNumber;
    var randomChosen=buttonColors[randomNumber];
    gamePattern.push(randomChosen);
    $("#"+randomChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosen);          
}
    
function playSound(name){
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }
    
function animatePress(currentColor){
        $("#"+currentColor).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColor).removeClass("pressed");},120);
        }

function checkAnswer(currentLevel){ //currentLevel is basically acting like an index
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },100);
            userClickedPattern=[];
        }
    }
        else {
            
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }


    

}