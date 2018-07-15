var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

var score=0

var x = canvas.width/2
var y = canvas.height-60
var ballRadius = 14
var dx=4
var dy=-4

var paddleHeight = 15
var paddleWidth = 90
var paddleX = (canvas.width - paddleWidth) / 2
var paddleY = canvas.height - paddleHeight






var brickRows = 5
var brickCols = 13
var brickWidth = 75
var brickHeight = 20
var brickPadding = 30
var brickOffsetTop = 30
var brickOffsetLeft = 10

var bricks = []

for(c=0;c<brickCols;c++) {
	for(r=0;r<brickRows;r++) {
		bricks.push({
			x : (c * (brickWidth + brickPadding)) + brickOffsetLeft,
			y : (r * (brickHeight + brickPadding)) + brickOffsetTop,
			status : 1
		})
	}
}







var paddleDx=7
var rightPressed
var leftPressed

function keyDownHandler(event) {
	if (event.keyCode == 39){
		rightPressed = true
	}
	else if (event.keyCode == 37) {
		leftPressed = true
	}
}

function keyUpHandler(event) {
	if (event.keyCode == 39){
		rightPressed = false
	}
	else if (event.keyCode == 37) {
		leftPressed = false
	}
}

document.onkeydown = keyDownHandler    //document.addEventlistener('keydown', keyDownHandler, false)
document.onkeyup = keyUpHandler

function drawBall() {
	ctx.beginPath()
	ctx.arc(x , y , ballRadius , 0 , Math.PI*2)
	ctx.fillStyle = "red"
	ctx.fill()
	ctx.closePath()
}

function drawPaddle() {
	ctx.beginPath()
	ctx.rect(paddleX , paddleY , paddleWidth , paddleHeight)
	ctx.fillStyle = "blue"
	ctx.fill()
	ctx.closePath()
}








function drawBricks() {
	bricks.forEach(function (brick) {
		if (!brick.status) return;

		ctx.beginPath()
		ctx.rect(brick.x, brick.y, brickWidth, brickHeight)
		ctx.fillStyle = "indigo"
		ctx.fill()
		ctx.closePath()
	})
}

function collisionDetection() {												//For collision between the ball and bricks
	bricks.forEach(function(b) {
		if (!b.status) return;

		var inBrickColumn = x > b.x - ballRadius && x < b.x + brickWidth + ballRadius
		var inBrickRow = y > b.y - ballRadius  && y < b.y + brickHeight + ballRadius

		if (inBrickColumn && inBrickRow) {
			dy = -dy
			b.status = 0
			score+=1
		}
	})
}






function draw() {
	ctx.clearRect(0 , 0 , canvas.width , canvas.height)

	drawBall()
	drawPaddle()


	drawBricks()
	collisionDetection()


	Score.innerHTML = "SCORE: " + score
	
	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx
	}
	
	if(y + dy < ballRadius){
		dy=-dy
	}

	if (y + dy > canvas.height - paddleHeight - ballRadius && x + dx > paddleX && x + dx < paddleX + paddleWidth) {
		dy=-dy

		if (rightPressed && dx<0) {
			if (dx<-2 || dx>2) {
				dx-=2	
			}
		}
		if (leftPressed && dx>0) {
			if (dx<-2 || dx>2) {
				dx+=2
			}
		}

		if (rightPressed && dx>0) {
			if (dx<-2 || dx>2) {
				dx-=2
			}
		}
		if (leftPressed && dx<0) {
			if (dx<-2 || dx>2) {
				dx+=2
			}
		}

	}

	else if (y - 5*dy > canvas.height) {
		alert("GamE OveR : Your Score" + score)
		location.reload()
	}

	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += paddleDx
	}
	else if (leftPressed && paddleX > 0) {
		paddleX -= paddleDx
	}

	x += dx
	y += dy

	requestAnimationFrame(draw)
}

requestAnimationFrame(draw)