/**
 * Created by lin on 5/6/15.
 */
/* http://thecodeplayer.com/walkthrough/html5-game-tutorial-make-a-snake-game-using-html5-canvas-jquery*/

$(document).ready(function(){
    //Canvas stuff
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();

    //Save the cell width in a variable for easy control
    var cw = 10;
    var d;
    var food;
    var score;

    //Create the snake
    var snake_array; //an array of cells to make up the snake

    //Get the interval based on user's difficulty choice
    var interval = 120;
    $('#easy').click (function() {
        interval = 240;
    });
    $('#intermediate').click (function() {
        interval = 120;
    });
    $('#hard').click (function() {
        interval = 60;
    });

    //play again button
    $('#reset').click (function() {
        //restart game
        init();
    });

    function init()
    {
        $('#gameover').hide();
        d = "right"; //default direction
        create_snake();
        create_food(); //Create food particle
        //Display the score
        score = 0;

        //Move the snake using a timer which will trigger the paint function
        //every 60ms
        if(typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(paint, interval);
    }
    init();

    function create_snake()
    {
        var length = 10; //Length of the snake
        snake_array = []; //Empty array to start with
        for(var i = length-1; i>=0; i--)
        {
            //This will create a horizontal snake starting from the top left
            snake_array.push({x: i, y:0});
        }
    }

    //Create the food
    function create_food()
    {
        food = {
            x: Math.round(Math.random()*(w-cw)/cw),
            y: Math.round(Math.random()*(h-cw)/cw),
        };
        //This will create a cell with x/y between 0-44
        //Because there are 45(450/10) positions across the rows and columns
    }

    //Paint the snake
    function paint()
    {
        //Paint the BG on every frame to avoid the snake trail
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);

        //The movement code for the snake to come here.
        //The logic is simple
        //Pop out the tail cell and place it in front of the head cell
        var nx = snake_array[0].x;
        var ny = snake_array[0].y;
        //These were the position of the head cell.
        //Increment it to get the new head position
        //Add proper direction based movement now
        if(d == "right") nx++;
        else if(d == "left") nx--;
        else if(d == "up") ny--;
        else if(d == "down") ny++;

        //Add the game over clauses now
        //This will restart the game if the snake hits the wall
        //Add the code for body collision
        //Now if the head of the snake bumps into its body, the game will restart
        if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
        {
            // show game over message
            $('#gameover').show();
            //Lets organize the code a bit now.
            return;
        }

        //Lets write the code to make the snake eat the food
        //The logic is simple
        //If the new head position matches with that of the food,
        //Create a new head instead of moving the tail
        if(nx == food.x && ny == food.y)
        {
            var tail = {x: nx, y: ny};
            score++;
            //Create new food
            create_food();
        }
        else
        {
            var tail = snake_array.pop(); //pops out the last cell
            tail.x = nx; tail.y = ny;
        }
        //The snake can now eat the food.

        snake_array.unshift(tail); //puts back the tail as the first cell

        for(var i = 0; i < snake_array.length; i++)
        {
            var c = snake_array[i];
            //Lets paint 10px wide cells
            paint_cell(c.x, c.y);
        }

        //Lets paint the food
        paint_cell(food.x, food.y);
        //Lets paint the score
        var score_text = "Score: " + score;
        ctx.fillText(score_text, 5, h-5);
    }

    //Lets first create a generic function to paint cells
    function paint_cell(x, y)
    {
        ctx.fillStyle = "blue";
        ctx.fillRect(x*cw, y*cw, cw, cw);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x*cw, y*cw, cw, cw);
    }

    function check_collision(x, y, array)
    {
        //This function will check if the provided x/y coordinates exist
        //in an array of cells or not
        for(var i = 0; i < array.length; i++)
        {
            if(array[i].x == x && array[i].y == y)
                return true;
        }
        return false;
    }

    //keyboard controls
    $(document).keydown(function(e){
        var key = e.which;
        //add another clause to prevent reverse gear
        if(key == "37" && d != "right") d = "left";
        else if(key == "38" && d != "down") d = "up";
        else if(key == "39" && d != "left") d = "right";
        else if(key == "40" && d != "up") d = "down";
        //The snake is now keyboard controllable
    })


})