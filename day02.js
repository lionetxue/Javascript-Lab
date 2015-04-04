"use strict";

var ballY = 0;
var ballVelocity = 0;

window.onload = function () {
    $("bunny").style.top = ballY + "px";
    $("bunny").style.left = (window.innerWidth /2) + "px";
    $("trampoline").style.left = (window.innerWidth /2 - 50) + "px";
    setInterval(update, 20);
}

function update () {
    $("bunny").style.top = ballY + "px";
    ballY += ballVelocity;
    ballVelocity +=1;
    if ((ballY + 200) > window.innerHeight) {
        ballVelocity *= -.9;
    }
}
