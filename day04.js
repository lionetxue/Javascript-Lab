
jQuery(document).ready(function() {
    
    var choice;
    var lastPlayer;
    /*Get value X or O based on which one the user clicked*/
    $('.choice').click( function(){
        if ($(this).text() == lastPlayer) {
            $("#message").text("It's not your turn!");
        } else {
        choice = $(this).text();
        lastPlayer = choice;
        $("#message").text("");
        }
    });

    /*Assign X or O to each grid that the user clicked*/

    $('.box').click(function () {
        $(this).text(choice);
        /*call the function to check winner after each click*/
        /*pass local variable "choice" to function checkWinner */
        checkWinner(choice);
        /*Automatically switch to the other player */
        if (choice == "X") {
            choice = "O";
        } else{
            choice = "X";
        }
    });
    
    /*reset button, window reload */
    $('#reset').click(function(){
        window.location.assign("day04.html");
    })
    
});

    /*Announce the winner*/
function checkWinner(choice) {
    if (choice == "") {
        $("#message").text("Please choose a player.");
    }else{
    // first row
    if ($("#box_1").text() == choice && $("#box_2").text() == choice && $("#box_3").text()== choice ) {
        $("#message").text(choice +" WINS! Congratulations");
        $("#box_1").css("background-color","#4faf45");
        $("#box_2").css("background-color","#4faf45");
        $("#box_3").css("background-color","#4faf45");      
    }
    // second row
    if ($("#box_4").text() == choice && $("#box_5").text() == choice && $("#box_6").text()== choice ) {
        $("#message").text(choice +" WINS! Congratulations");
        $("#box_4").css("background-color","#4faf45");
        $("#box_5").css("background-color","#4faf45");
        $("#box_6").css("background-color","#4faf45"); 
    }
    //third row
    if ($("#box_7").text() == choice && $("#box_8").text() == choice && $("#box_9").text()== choice ) {
        $("#message").text(choice +" WINS! Congratulations");
        $("#box_7").css("background-color","#4faf45");
        $("#box_8").css("background-color","#4faf45");
        $("#box_9").css("background-color","#4faf45");       
    }
    //first column
    if ($("#box_1").text() == choice && $("#box_4").text() == choice && $("#box_7").text()== choice ) {
        $("#message").text(choice +" WINS! Congratulations");
        $("#box_1").css("background-color","#4faf45");
        $("#box_4").css("background-color","#4faf45");
        $("#box_7").css("background-color","#4faf45");  
    }
    //second column
    if ($("#box_2").text() == choice && $("#box_5").text() == choice && $("#box_8").text()== choice ) {
        $("#message").text(choice +" WINS! Congratulations");
        $("#box_2").css("background-color","#4faf45");
        $("#box_5").css("background-color","#4faf45");
        $("#box_8").css("background-color","#4faf45");  
    }
    //third column
    if ($("#box_3").text() == choice && $("#box_6").text() == choice && $("#box_9").text()== choice ) {
        $("#message").text(choice +" WINS! Congratulations");
        $("#box_3").css("background-color","#4faf45");
        $("#box_6").css("background-color","#4faf45");
        $("#box_9").css("background-color","#4faf45");  
    }
    //top to bottom diagonal
    if ($("#box_1").text() == choice && $("#box_5").text() == choice && $("#box_9").text()== choice ) {
        $("#message").text(choice +" WINS! Congratulations");
        $("#box_1").css("background-color","#4faf45");
        $("#box_5").css("background-color","#4faf45");
        $("#box_9").css("background-color","#4faf45");  
    }
    //bottom to top diagonal
    if ($("#box_7").text() == choice && $("#box_5").text() == choice && $("#box_3").text()== choice ) {
        $("#message").text(choice +" WINS! Congratulations");
        $("#box_7").css("background-color","#4faf45");
        $("#box_5").css("background-color","#4faf45");
        $("#box_3").css("background-color","#4faf45");  
    }
    }
}
    

