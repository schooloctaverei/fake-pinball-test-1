var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 15;
var x = 360;
var y = 685;
var dx = 0;
var dy = Math.random() * -20;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var score = 0;
var lives = 1;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#9932CC";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, 550, paddleWidth, paddleHeight);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

function drawObjects() {
  ctx.strokeStyle = "#0095DD";
  ctx.fillStyle = "#0095DD";
  ctx.beginPath();
  ctx.moveTo(340, 700);
  ctx.lineTo(340, 200);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(380, 150);
  ctx.quadraticCurveTo(170, -100, 1, 150);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(1, 700);
  ctx.lineTo(1, 150);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(379, 700);
  ctx.lineTo(379, 150);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.rect(0, 640, 130, 60);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(0, 640);
  ctx.lineTo(0, 600);
  ctx.lineTo(130, 640);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.rect(210, 640, 130, 60);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(210, 640);
  ctx.lineTo(340, 600);
  ctx.lineTo(340, 640);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(170, 200, 30, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(120, 130, 30, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(220, 130, 30, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(220, 450);
  ctx.lineTo(300, 430);
  ctx.lineTo(300, 300);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(120, 450);
  ctx.lineTo(40, 430);
  ctx.lineTo(40, 300);
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawObjects();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();

  if(x + dx + ballRadius < 0 || x + dx + ballRadius > 340) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > 550) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
  else if(y + dy + ballRadius > 700) {
    lives--;
    if(!lives) {
      alert("GAME OVER");
      document.location.reload();
    }
    else {
      x = canvas.width/2;
      y = canvas.height-30;
      dx = 3;
      dy = -3;
      paddleX = (canvas.width-paddleWidth)/2;
    }
  }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

function startDraw() {
  setInterval(draw(), 10);
}